import { Router } from 'express';

import {
    getCustomers,postCustomers,getCustomersID,putCustomers
} from '../controllers/customersCont.js';
import customersMiddle from '../middlewares/customersMiddle.js';

const customersRouter = Router();

customersRouter.get("/customers",getCustomers);
customersRouter.get("/customers/:id",getCustomersID);
customersRouter.post("/customers",customersMiddle,postCustomers);
customersRouter.put("/customers/:id",customersMiddle,putCustomers);

export default customersRouter;