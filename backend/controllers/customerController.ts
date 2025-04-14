import { Request, Response, NextFunction } from "express";
import { Customer } from "../models/Customer";

export const CreateCustomer = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        const { name, email, org_number } = req.body;
        let existingCustomer = await Customer.findOne({ email: email });
        if(existingCustomer){
            res.status(409).json({
                success: false,
                message: "This customer existed"
            })
            return 
        }
        let data = {
            name: name,
            email: email,
            org_number: org_number
        }
        let customer = await Customer.create(data);
        if(customer){
            res.status(201).json({
                success: true,
                message: "Customer created successfully"
            })
            return 
        }
    }catch(err: any){
        res.status(500).json({
            success: false,
            message: err.message
        })
        return 
    }
}