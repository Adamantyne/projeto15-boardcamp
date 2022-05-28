import { Router } from 'express';

import categoriesRouter from './categories.js';
import gamesRouter from './games.js';

const router = Router();

router.use(categoriesRouter);
router.use(gamesRouter);

export default router;