import { Router } from 'express';

import categoriesRouter from './categories.js';
import gamesRouter from './games.js';
import customersRouter from './customers.js';

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);
router.use(customersRouter);

export default router;