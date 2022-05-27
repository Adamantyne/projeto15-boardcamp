import chalk from "chalk";

import db from "../db.js";

export async function getCategories(req,res){
    try {
        const {rows:categories} = await db.query('SELECT * FROM categories;');
        res.status(200).send(categories);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error getCategories");
    }
}

export async function postCategories(req,res){
    const category = res.locals.category;
    try {
        const result = await db.query(
            'INSERT INTO categories (name) VALUES ($1);',[category]
        );
        console.log(chalk.green(result));
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error postCategories");
    }
}