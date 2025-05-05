import express from "express";


import { CreateCustomer } from "../controllers/customerController" 


const router = express.Router();


router.post("/create-customer", CreateCustomer);


export default router;
