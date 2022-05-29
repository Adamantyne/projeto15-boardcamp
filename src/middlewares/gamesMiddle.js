import chalk from "chalk";

import db from "../db.js";
import { gamesSchema } from "../untils/schemas.js";

export default async function gamesMiddle(req,res,next){
    const validation = gamesSchema.validate(req.body,{abortEarly:false});
    if (validation.error) {
        return res.status(400).send(
            validation.error.details.map(detail=>detail.message)
        );
    }
    try {
        const error= await validateData(req.body);
        if(error==="invalid category"){
            return res.sendStatus(400);
        }else if(error==="already exist"){
            return res.sendStatus(409);
        }else if(error==="server error"){
           return res.statusStatus(500);
        }
        next();
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error gamesMiddleware");
    }
}

async function validateData(body){
    try {
        const {rows:validCategory} = await db.query(
            'SELECT * FROM categories WHERE id=$1;',[body.categoryId]
        );
        if(validCategory.length===0){
            return "invalid category";
        }
        const {rows:alreadyExist} = await db.query(
            'SELECT * FROM games WHERE name=$1;',[body.name]
        );
        if(alreadyExist.length>0){
            return "already exist";
        }
    } catch (error) {
        console.log(chalk.red(error));
        return "server error";
    }
}