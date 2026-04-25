import { Router } from "express";
import { loginAdmin, logoutAdmin } from "../controllers/adminController.js";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/productsController.js";
import { requireAdminAuth } from "../middleware/auth.js";

export const adminRouter = Router();

adminRouter.post("/login", loginAdmin);
adminRouter.post("/logout", logoutAdmin);
adminRouter.get("/products", requireAdminAuth, getProducts);
adminRouter.post("/products", requireAdminAuth, createProduct);
adminRouter.put("/products/:id", requireAdminAuth, updateProduct);
adminRouter.delete("/products/:id", requireAdminAuth, deleteProduct);

