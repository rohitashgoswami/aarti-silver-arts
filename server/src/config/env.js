import dotenv from "dotenv";

dotenv.config();

export const env = {
  get port() {
    return Number(process.env.PORT || 5000);
  },
  get mongodbUri() {
    return process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/jaipur-silver";
  },
  get jwtSecret() {
    return process.env.JWT_SECRET || "development-secret";
  },
  get adminUsername() {
    return process.env.ADMIN_USERNAME || "admin";
  },
  get adminPassword() {
    return process.env.ADMIN_PASSWORD || "change-this-password";
  },
  get clientOrigin() {
    return process.env.CLIENT_ORIGIN || "http://localhost:5173";
  },
  get useInMemoryDb() {
    return process.env.USE_IN_MEMORY_DB === "true";
  },
  get smtpHost() {
    return process.env.SMTP_HOST || "";
  },
  get smtpPort() {
    return Number(process.env.SMTP_PORT || 587);
  },
  get smtpSecure() {
    return process.env.SMTP_SECURE === "true";
  },
  get smtpUser() {
    return process.env.SMTP_USER || "";
  },
  get smtpPass() {
    return process.env.SMTP_PASS || "";
  },
  get smtpFrom() {
    return process.env.SMTP_FROM || process.env.SMTP_USER || "";
  },
  get ownerEmail() {
    return process.env.OWNER_EMAIL || "";
  },
};
