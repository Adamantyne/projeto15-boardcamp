import Joi from "joi";

import db from "../db.js";
import { categoriesSchema } from "../untils/schemas.js";

export default async function categoriesMiddle(req,res,next){
    const {name} = req.body;
    const validation = categoriesSchema.validate(name);
    if (validation.error) {
        return res.status(400).send(
            validation.error.details.map(detail=>detail.message)
        );
    }
    try {
        const {rows:alreadyExist} = await db.query(
            'SELECT * FROM categories WHERE name=$1;',[name]
        );
        if(alreadyExist.length>0){
            return res.sendStatus(409);
        }
        res.locals.category = name;
        next();
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error categoriesMiddleware");
    }
}
