import * as dotenv from "dotenv";

export const NODE_ENV = process.env.NODE_ENV || "development";

let path;
switch (process.env.NODE_ENV) {
  case "test":
    path = `../.env.test`;
    break;
  case "production":
    path = `.env.production`;
    break;
  default:
    path = `.env.development`;
}
dotenv.config({ path: path });
console.log(`LOADING ${NODE_ENV} CONFIG FROM ${path}`);

export const apiBaseUrl = process.env.NODE_ENV == "production" ? "" : "http://localhost:3000";
export const API_PORT = process.env.API_PORT || "3000";
export const FRONTEND_URL = process.env.FRONTEND_URL || "";

export const AUTH_DOMAIN = `${process.env.AUTH_DOMAIN}/` || "";
export const AUTH_AUDIENCE = process.env.AUTH_AUDIENCE || "";
export const AUTH_CLIENT = process.env.AUTH_CLIENT || "";

export const APPLICATION_NAME = process.env.APPLICATION_NAME || "";

export const MAIL_FROM = process.env.MAIL_FROM || "signing-authority@yukon.ca";
export const MAIL_HOST = process.env.MAIL_HOST || "smtp.gov.yk.ca";
export const MAIL_PORT = process.env.MAIL_PORT || 25;
export const MAIL_USER = process.env.MAIL_USER || "";
export const MAIL_PASS = process.env.MAIL_PASS || "";

export const MAIL_CONFIG_DEV = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
};

export const MAIL_CONFIG = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: false, // true for 465, false for other ports
};

export const PROXY_BASE_URL = process.env.PROXY_BASE_URL || "http://localhost:3100/api/portal";

export const SENTRY_DSN = process.env.SENTRY_DSN || "";
