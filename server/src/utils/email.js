import nodemailer from "nodemailer";
import { env } from "../config/env.js";

function formatInquiryEmail(inquiry) {
  return [
    "A new inquiry was submitted from the Aarti Silver Arts website.",
    "",
    `Name: ${inquiry.name}`,
    `Phone: ${inquiry.phone}`,
    `Email: ${inquiry.email}`,
    `Product Type: ${inquiry.productType}`,
    `Product ID: ${inquiry.productId || "Not linked"}`,
    "",
    "Requirement:",
    inquiry.description,
    "",
    `Submitted At: ${new Date(inquiry.createdAt).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    })}`,
  ].join("\n");
}

function hasEmailConfig() {
  return Boolean(env.smtpHost && env.smtpUser && env.smtpPass && env.smtpFrom && env.ownerEmail);
}

export async function sendInquiryEmail(inquiry) {
  if (!hasEmailConfig()) {
    return { delivered: false, skipped: true, reason: "Email config is incomplete." };
  }

  const transporter = nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth: {
      user: env.smtpUser,
      pass: env.smtpPass,
    },
  });

  await transporter.sendMail({
    from: env.smtpFrom,
    to: env.ownerEmail,
    subject: `New website inquiry: ${inquiry.productType}`,
    text: formatInquiryEmail(inquiry),
  });

  return { delivered: true, skipped: false };
}
