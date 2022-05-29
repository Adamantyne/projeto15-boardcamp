import chalk from "chalk";

import db from "../db.js";

export async function getCustomers(req,res){
    const {cpf} = req.query;
    try {
        if(cpf){
            const {rows:customer} = await db.query(`SELECT * FROM customers WHERE cpf LIKE $1;`,[`${cpf}%`]);
            return res.status(200).send(customer);
        }
        const {rows:customers} = await db.query('SELECT * FROM customers;');
        res.status(200).send(customers);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error getCustomers");
    }
}
export async function getCustomersID(req,res){
    const {id} = req.params;
    try {
        const {rows:customer} = await db.query(`SELECT * FROM customers WHERE id=$1;`,[parseInt(id)]);
        if(customer.length===0){
            return res.sendStatus(404);
        }
        res.status(200).send(customer);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error getCustomers");
    }
}

export async function postCustomers(req,res){
    const {name,phone,cpf,birthday} = req.body;
    try {
        const result = await db.query(
            `INSERT INTO customers(name,phone,cpf,birthday) VALUES ($1,$2,$3,$4)`,
            [name,phone,cpf,birthday]
        );
        res.sendStatus(201);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error postCustomers");
    }
}
export async function putCustomers(req,res){
    const {name,phone,cpf,birthday} = req.body;
    const{id}=req.params;
    try {
        const {rows:validID} = await db.query(
            `SELECT * FROM customers WHERE id=$1`,[id]
        );
        if(validID.length===0){
            return res.sendStatus(404);
        }
        const result = await db.query(
            `UPDATE customers SET name=$1,phone=$2,cpf=$3,birthday=$4 WHERE id=$5`,
            [name,phone,cpf,birthday,id]
        );
        res.sendStatus(200);
    } catch (error) {
        console.log(chalk.red(error));
        res.status(500).send("error putCustomers");
    }
}