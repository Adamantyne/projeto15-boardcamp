import Joi from 'joi';

export const categoriesSchema = Joi.string().required();
export const gamesSchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
    stockTotal:Joi.number().integer().min(1).required(),
    pricePerDay:Joi.number().integer().min(1).required(),
    categoryId:Joi.number().integer().required()
});
export const customersSchema = Joi.object({
    name:Joi.string().required(),
    phone:Joi.string().min(10).max(11).pattern(/^[0-9]{10,11}$/).required(),
    cpf:Joi.string().length(11).pattern(/^[0-9]{11}$/).required(),
    birthday:Joi.date().required()
});
export const rentalsSchema= Joi.object({
    customerId: Joi.number().integer().required(),
    gameId: Joi.number().integer().required(),
    daysRented: Joi.number().integer().min(1).required()
});