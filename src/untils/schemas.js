import Joi from 'joi';

export const categoriesSchema = Joi.string().required();
export const gamesSchema = Joi.object({
    name:Joi.string().required(),
    image:Joi.string().required(),
    stockTotal:Joi.number().integer().min(1).required(),
    pricePerDay:Joi.number().integer().min(1).required(),
    categoryId:Joi.number().integer().required()
});