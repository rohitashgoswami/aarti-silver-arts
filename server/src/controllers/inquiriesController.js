import mongoose from "mongoose";
import { Inquiry } from "../models/Inquiry.js";
import { Product } from "../models/Product.js";
import { sendInquiryEmail } from "../utils/email.js";

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function createInquiry(req, res, next) {
  try {
    const { name, phone, email, productType, description, productId } = req.body;

    if (!name?.trim() || !phone?.trim() || !email?.trim() || !productType?.trim() || !description?.trim()) {
      return res.status(400).json({ message: "All required inquiry fields must be provided." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (productId) {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid linked product id." });
      }

      const productExists = await Product.exists({ _id: productId });
      if (!productExists) {
        return res.status(400).json({ message: "Linked product was not found." });
      }
    }

    const inquiry = await Inquiry.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
      productType: productType.trim(),
      description: description.trim(),
      productId: productId || null,
    });

    let emailNotification = {
      delivered: false,
      skipped: true,
      reason: "Email notification was not attempted.",
    };

    try {
      emailNotification = await sendInquiryEmail(inquiry);
    } catch (emailError) {
      emailNotification = {
        delivered: false,
        skipped: false,
        reason: emailError.message,
      };
    }

    return res.status(201).json({
      message: emailNotification.delivered
        ? "Inquiry submitted successfully and emailed to the owner."
        : "Inquiry submitted successfully.",
      inquiry,
      emailNotification,
    });
  } catch (error) {
    return next(error);
  }
}
