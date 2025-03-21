import path from "node:path";
import { config } from "dotenv";

config({
  path: path.join(__dirname, "../../.env"),
});

// Define all required environment variables
const envVars = {
  node_env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  frontend_uri: process.env.FRONTEND_URI,

  google_clientId: process.env.GOOGLE_CLIENT_ID,
  google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
  google_callback_url: process.env.GOOGLE_CALLBACK_URL,

  database_url: process.env.DATABASE_URL,

  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  access_token_expiry: process.env.ACCESS_TOKEN_EXPIRY,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  refresh_token_expiry: process.env.REFRESH_TOKEN_EXPIRY,
};

/**
 * This function returns an environment variable and throws an error if unavailable.
 * @param varName - The key of the environment variable.
 * @returns The value of the specified environment variable.
 */
export default function getEnv(varName: keyof typeof envVars): string {
  if (typeof envVars[varName] === "undefined") {
    console.error(`'${varName}' is not available`);
    process.exit(1);
  } else {
    return envVars[varName] as string;
  }
}
