import chalk from "chalk";

import db from "../db.js";

export async function getGames(req,res){
    try {
        const {rows:games} = await db.query(
            'SELECT games.*,categories.name as "categoryName" FROM games JOIN categories ON games."categoryId"=categories.id;'
            );
        res.status(200).send(games);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error getCategories");
    }
}

export async function postGames(req,res){
    const{name,image,stockTotal,categoryId,pricePerDay}=req.body;
    try {
        const result = await db.query(
            `INSERT INTO games(name,image,"stockTotal","categoryId","pricePerDay") VALUES ($1,$2,$3,$4,$5)`,
            [name,image,stockTotal,categoryId,pricePerDay]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error postCategories");
    }
}