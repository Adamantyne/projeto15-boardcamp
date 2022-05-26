import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const {Pool}= pg;

const db = new Pool({
    connectionString: process.env.DATABASE_URL,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

export default db;