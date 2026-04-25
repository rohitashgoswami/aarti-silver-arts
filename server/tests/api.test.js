import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { createApp } from "../src/app.js";
import { connectToDatabase, disconnectFromDatabase } from "../src/config/db.js";
import { Product } from "../src/models/Product.js";
import { Inquiry } from "../src/models/Inquiry.js";

let mongoServer;
let app;

test.before(async () => {
  process.env.JWT_SECRET = "test-secret";
  process.env.ADMIN_USERNAME = "admin";
  process.env.ADMIN_PASSWORD = "password123";

  mongoServer = await MongoMemoryServer.create();
  await connectToDatabase(mongoServer.getUri());
  app = createApp();
});

test.after(async () => {
  await disconnectFromDatabase();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

test.beforeEach(async () => {
  await Product.deleteMany({});
  await Inquiry.deleteMany({});
});

test("creates an inquiry when payload is valid", async () => {
  const product = await Product.create({
    name: "Sample Silver Box",
    category: "Silver Boxes",
    image: "https://example.com/box.jpg",
    description: "Gift-ready silver box",
    featured: false,
  });

  const response = await request(app).post("/api/inquiries").send({
    name: "Rohit Sharma",
    phone: "+91 9876543210",
    email: "rohit@example.com",
    productType: "Custom Silver Boxes",
    description: "Need 50 engraved pieces for gifting.",
    productId: product._id.toString(),
  });

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.message, "Inquiry submitted successfully.");

  const inquiryCount = await Inquiry.countDocuments();
  assert.equal(inquiryCount, 1);
});

test("rejects inquiry with invalid email", async () => {
  const response = await request(app).post("/api/inquiries").send({
    name: "Invalid Email",
    phone: "+91 1111111111",
    email: "invalid-email",
    productType: "Silver Bartan",
    description: "Need custom order.",
  });

  assert.equal(response.statusCode, 400);
  assert.equal(response.body.message, "Please enter a valid email address.");
});

test("protects admin product routes without a token", async () => {
  const response = await request(app).post("/api/admin/products").send({
    name: "Unauthorized Product",
    category: "Silver Boxes",
    image: "https://example.com/product.jpg",
    description: "Should not be created",
  });

  assert.equal(response.statusCode, 401);
});

test("allows an authenticated admin to create a product", async () => {
  const token = jwt.sign({ role: "admin", username: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const response = await request(app)
    .post("/api/admin/products")
    .set("Authorization", `Bearer ${token}`)
    .send({
      name: "Admin Silver Chhatar",
      category: "Silver Chhatar",
      image: "https://example.com/chhatar.jpg",
      description: "Temple-focused handcrafted silver chhatar.",
      artisanNote: "Demo artisan note",
      featured: true,
    });

  assert.equal(response.statusCode, 201);
  assert.equal(response.body.name, "Admin Silver Chhatar");

  const savedProduct = await Product.findOne({ name: "Admin Silver Chhatar" });
  assert.ok(savedProduct);
  assert.equal(savedProduct.category, "Silver Chhatar");
});

test("returns product filters for category and featured", async () => {
  await Product.insertMany([
    {
      name: "Featured Bartan",
      category: "Silver Bartan",
      image: "https://example.com/a.jpg",
      description: "Featured item",
      featured: true,
    },
    {
      name: "Regular Box",
      category: "Silver Boxes",
      image: "https://example.com/b.jpg",
      description: "Regular item",
      featured: false,
    },
  ]);

  const response = await request(app).get("/api/products?category=Silver%20Bartan&featured=true");

  assert.equal(response.statusCode, 200);
  assert.equal(response.body.length, 1);
  assert.equal(response.body[0].name, "Featured Bartan");
});
