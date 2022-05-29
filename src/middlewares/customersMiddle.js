import chalk from "chalk";

import db from "../db.js";
import { customersSchema } from "../untils/schemas.js";

export default async function customersMiddle(req, res, next) {
    const validation = customersSchema.validate(req.body,{abortEarly: false});
    if (validation.error) {
        return res.status(400).send(
            validation.error.details.map(detail => detail.message)
        );
    }
    try {
        const {rows:alreadyExist} = await db.query(
            'SELECT * FROM customers WHERE cpf=$1;',[req.body.cpf]
        );
        if(alreadyExist.length>0){
            return res.sendStatus(409);
        }
        next();
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error customersMiddleware");
    }
}
