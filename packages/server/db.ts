import pgPromise from "pg-promise";
import dotenv from "dotenv";

dotenv.config();

const pgp = pgPromise({
  /* Initialization Options */
});

const db = pgp(process.env.DB_CONNECTION_STRING || "");

export default db;
