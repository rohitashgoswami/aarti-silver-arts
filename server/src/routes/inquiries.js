import { Router } from "express";
import { createInquiry } from "../controllers/inquiriesController.js";

export const inquiriesRouter = Router();

inquiriesRouter.post("/", createInquiry);

