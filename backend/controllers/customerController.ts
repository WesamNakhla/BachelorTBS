import { Request, Response, NextFunction } from "express";
import  { Customer } from "../models/Customer";

export const CreateCustomer = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        console.log(req.body);
        const { customer, type, contact_person, org_number, address, telephone, email } = req.body;
        let existingCustomer = await Customer.findOne({ email: email });
        if(existingCustomer){
            res.status(409).json({
                success: false,
                message: "This customer existed"
            })
            return 
        }
        let data = {
            customer: customer,
            type: type, 
            contact_person: contact_person, 
            org_number: org_number, 
            address: address, 
            telephone: telephone, 
            email: email,
        }
        let new_customer = await new Customer(data).save();
        
        if(new_customer){
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
export const DeleteCustomer = async (req: Request, res: Response, next:NextFunction): Promise<void>=>{
    const { id } = req.params;
    try{
        let customer = await Customer.findByIdAndDelete({ _id: id }).exec();
        if(!customer){
            res.status(404).json({
                success: false,
                message: "Customer not found"
            });
            return 
        }
        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });
        return 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        });
        return 
    }
}
export const UpdateCustomer = async (req: Request, res:Response, next:NextFunction): Promise<void>=>{
    const { customer, type, contact_person, org_number, address, telephone, email } = req.body;
    const { id } = req.params;
    let updatedData = {
        customer: customer,
        type: type, 
        contact_person: contact_person, 
        org_number: org_number, 
        address: address, 
        telephone: telephone, 
        email: email,
    }
    try{
        let updatedCustomer = await Customer.findByIdAndUpdate({ _id: id }, updatedData, { new: true }).exec();
        if(!updatedCustomer){
            res.status(404).json({
                success: false,
                message: "Customer not found"
            });
            return 
        }
        res.status(200).json({
            success: true,
            message: "Customer updated successfully"
        });
        return 
    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        });
        return 
    }

}