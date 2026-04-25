import { Router } from "express";
import { getProductById, getProducts } from "../controllers/productsController.js";

export const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);

