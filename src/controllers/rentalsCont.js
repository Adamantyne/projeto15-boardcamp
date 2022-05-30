import chalk from "chalk";
import dayjs from "dayjs";

import db from "../db.js";

export async function getRentals(req,res){
    try {
        let {rows:rentals} = await db.query(
            'SELECT rentals.*,customers.name as "customerName",games.name as "gameName",games."categoryId",categories.name as "categoryName" FROM rentals JOIN games ON rentals."gameId"=games.id JOIN categories ON games."categoryId"=categories.id JOIN customers ON rentals."customerId"=customers.id;'
        );
        rentals=buildingRentalsObject(rentals);
        res.status(200).send(rentals);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error getRentals");
    }
}
export async function postRentals(req,res){
    const{customerId,gameId,daysRented}=req.body;
    const currentDate= dayjs().format("YYYY-MM-DD");
    const priceGame = res.locals.priceGame;
    const originalPrice = req.body.daysRented*priceGame;
    
    try {
        const result = await db.query(
            `INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","returnDate","originalPrice","delayFee") VALUES($1,$2,$3,$4,$5,$6,$7)`,
            [customerId,gameId,currentDate,daysRented,null,originalPrice,null]
        );
        res.sendStatus(201);
    } catch (error) {
        
    }
}
export async function deleteRentals(req,res){
    const {id}=req.params;
    try {
        const result = await db.query(
            `DELETE FROM rentals WHERE id=$1`,[id]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error deleteRentals");
    }
}
export async function returnRentals(req,res){
    const {id}=req.params;
    const currentDate= dayjs().format("YYYY-MM-DD");
    const lastDate = dayjs(res.locals.rentalInfos[0]);
    const diference = dayjs(currentDate).diff(dayjs(lastDate), 'day');
    const daysRented = res.locals.rentalInfos[1];
    const dayPriece = res.locals.rentalInfos[2];
    let delayFee = (diference-daysRented)*dayPriece;
    if(delayFee<=0)delayFee=null;
    try {
        const result = await db.query(
            `UPDATE rentals SET "delayFee"=$2, "returnDate"=$3 WHERE id=$1;`,[id,delayFee,currentDate]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error returnRentals");
    }
}
function buildingRentalsObject(rentals){
    const result =[];
    rentals.forEach(rental => {
        const {
            id,customerId,gameId,rentDate,daysRented,returnDate,originalPrice,delayFee,customerName,gameName,categoryId,categoryName
        }=rental;
        result.push({
            id: id,
            customerId: customerId,
            gameId: gameId,
            rentDate: rentDate,
            daysRented: daysRented,
            returnDate: returnDate,
            originalPrice: originalPrice,
            delayFee: delayFee,
            customer: {
             id: customerId,
             name: customerName
            },
            game: {
              id: gameId,
              name: gameName,
              categoryId: categoryId,
              categoryName: categoryName
            }
          });
    });
    return result;
}