import mongoose from "mongoose";
import { Product } from "../models/Product.js";
import { defaultProducts } from "../seed/defaultProducts.js";

const fallbackProducts = defaultProducts.map((product, index) => ({
  _id: `seed-${index + 1}`,
  ...product,
  createdAt: new Date(2026, 0, index + 1).toISOString(),
  updatedAt: new Date(2026, 0, index + 1).toISOString(),
}));

function buildProductFilters(query) {
  const filters = {};

  if (query.category) {
    filters.category = query.category;
  }

  if (query.featured !== undefined) {
    filters.featured = query.featured === "true";
  }

  return filters;
}

function filterFallbackProducts(query) {
  return fallbackProducts
    .filter((product) => {
      if (query.category && product.category !== query.category) {
        return false;
      }

      if (query.featured !== undefined && product.featured !== (query.featured === "true")) {
        return false;
      }

      return true;
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

function validateProductInput(payload) {
  const requiredFields = ["name", "category", "image", "description"];

  for (const field of requiredFields) {
    if (!payload[field] || !String(payload[field]).trim()) {
      return `${field} is required.`;
    }
  }

  const allowedCategories = ["Silver Bartan", "Silver Chhatar", "Silver Boxes"];
  if (!allowedCategories.includes(payload.category)) {
    return "category must match one of the supported product groups.";
  }

  return null;
}

export async function getProducts(req, res, next) {
  try {
    if (mongoose.connection.readyState !== 1) {
      const fallbackData = filterFallbackProducts(req.query);
      res.set("Cache-Control", "public, max-age=60"); // Cache fallback for 1 minute
      return res.json(fallbackData);
    }

    const products = await Product.find(buildProductFilters(req.query)).sort({
      featured: -1,
      createdAt: -1,
    });

    res.set("Cache-Control", "public, max-age=300"); // Cache for 5 minutes
    return res.json(products);
  } catch (error) {
    const fallbackData = filterFallbackProducts(req.query);
    res.set("Cache-Control", "public, max-age=60"); // Cache fallback for 1 minute
    return res.json(fallbackData);
  }
}

export async function getProductById(req, res, next) {
  try {
    const fallbackProduct = fallbackProducts.find((product) => product._id === req.params.id);
    if (fallbackProduct) {
      return res.json(fallbackProduct);
    }

    if (mongoose.connection.readyState !== 1) {
      return res.status(404).json({ message: "Product not found." });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    const fallbackProduct = fallbackProducts.find((product) => product._id === req.params.id);
    if (fallbackProduct) {
      return res.json(fallbackProduct);
    }

    return next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const validationMessage = validateProductInput(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const product = await Product.create({
      name: req.body.name.trim(),
      category: req.body.category,
      image: req.body.image.trim(),
      description: req.body.description.trim(),
      artisanNote: req.body.artisanNote?.trim() || "",
      featured: Boolean(req.body.featured),
    });

    return res.status(201).json(product);
  } catch (error) {
    return next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const validationMessage = validateProductInput(req.body);
    if (validationMessage) {
      return res.status(400).json({ message: validationMessage });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name.trim(),
        category: req.body.category,
        image: req.body.image.trim(),
        description: req.body.description.trim(),
        artisanNote: req.body.artisanNote?.trim() || "",
        featured: Boolean(req.body.featured),
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.json(product);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id." });
    }

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found." });
    }

    return res.status(204).send();
  } catch (error) {
    return next(error);
  }
}
