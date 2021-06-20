import * as dotenv from "dotenv";

dotenv.config();

export default {
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  cloudinaryKey: process.env.CLOUDINARY_KEY ?? "",
  cloudinarySecret: process.env.CLOUDINARY_SECRET ?? "",
  cookieSecret: process.env.COOKIE_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  frontendUrl: process.env.FRONTEND_URL ?? "",
  mailHost: process.env.MAIL_HOST ?? "",
  mailPassword: process.env.MAIL_PASS ?? "",
  mailUser: process.env.MAIL_USER ?? "",
  mailPort: process.env.MAIL_PORT,
  stripeSecret: process.env.STRIPE_SECRET ?? "",
};
