import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  driver: "pg",
  out: "./drizzle",
  schema: "./src/lib/db/schema.js",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
};
