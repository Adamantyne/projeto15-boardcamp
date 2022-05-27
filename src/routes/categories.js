import { Router } from 'express';

import {getCategories,postCategories} from '../controllers/categoriesCont.js';
import categoriesMiddle from '../middlewares/categoriesMiddle.js';

const categoriesRouter = Router();

categoriesRouter.get("/categories",getCategories);
categoriesRouter.post("/categories",categoriesMiddle,postCategories);

export default categoriesRouter;