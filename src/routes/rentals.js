import { Router } from 'express';

import {
    getRentals,postRentals,deleteRentals,returnRentals
} from '../controllers/rentalsCont.js';
import {
    postRentalsMiddle,deleteRentalsMiddle
} from '../middlewares/rentalsMiddle.js';

const rentalsRouter = Router();

rentalsRouter.get("/rentals",getRentals);
rentalsRouter.post("/rentals",postRentalsMiddle,postRentals);
rentalsRouter.post("/rentals/:id/return",deleteRentalsMiddle,returnRentals);
rentalsRouter.delete("/rentals/:id",deleteRentalsMiddle,deleteRentals);

export default rentalsRouter;