import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./routes/routes.js";
import db from "./db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.get("/categories",async (req,res)=>{
    try {
        const {rows:categories} = await db.query('SELECT * FROM categories;');
        console.log(categories);
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red(error));
    }
});

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(chalk.blue(`servidor ok`));
});