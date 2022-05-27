import express from "express";
import cors from "cors";
import chalk from "chalk";
import dotenv from "dotenv";
import router from "./routes/routes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(chalk.blue(`servidor ok na porta ${port}`));
});