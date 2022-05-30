import chalk from "chalk";

import db from "../db.js";
import { rentalsSchema } from "../untils/schemas.js";

export async function postRentalsMiddle(req,res,next){
    const validation = rentalsSchema.validate(req.body,{abortEarly:false});
    if (validation.error) {
        return res.status(400).send(
            validation.error.details.map(detail=>detail.message)
        );
    }
    try {
        const status = await validatePostData(req.body);
        if(status==="error")return res.sendStatus(400);
        res.locals.priceGame = status;
        next();
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error rentalsMiddleware post");
    }
}

export async function deleteRentalsMiddle(req,res,next){
    try {
        const status = await validateDeleteData(req.params);
        if(status==="invalid rental"){
            return res.sendStatus(404);
        }else if(status==="already returned"){
            return res.sendStatus(400);
        }
        res.locals.rentalInfos = status;
        next();
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error rentalsMiddleware delete");
    }
}

async function validatePostData(body){
    try {
        const {rows:validCustomer} = await db.query(
            'SELECT * FROM customers WHERE id=$1;',[body.customerId]
        );
        const {rows:validGame} = await db.query(
            'SELECT * FROM games WHERE id=$1;',[body.gameId]
        );
        const {rows:rentals} = await db.query(
            'SELECT * FROM rentals WHERE "gameId"=$1;',[validGame[0].id]
        );
        if(
            validCustomer.length===0 || 
            validGame.length===0 || 
            rentals.length>=validGame[0].stockTotal
        )
        {return "error";}
        return validGame[0].pricePerDay;
    } catch (error) {
        console.log(chalk.red(error));
        return "server error";
    }
}
async function validateDeleteData(params){
    try {
        const {rows:validRental} = await db.query(
            'SELECT * FROM rentals WHERE id=$1;',[params.id]
        );
        if(validRental.length===0)return "invalid rental";
        else if(validRental[0].returnDate)return "already returned";
        return [
            validRental[0].rentDate,
            validRental[0].daysRented,
            validRental[0].originalPrice/validRental[0].daysRented
        ];
    } catch (error) {
        console.log(chalk.red(error));
        return "server error";
    }
}