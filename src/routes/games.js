import { Router } from 'express';

import {getGames,postGames} from '../controllers/gamesCont.js';
import gamesMiddle from '../middlewares/gamesMiddle.js';

const gamesRouter = Router();

gamesRouter.get("/games",getGames);
gamesRouter.post("/games",gamesMiddle,postGames);

export default gamesRouter;