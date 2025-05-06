import { Request, Response, NextFunction } from "express";
import Inventory from "../models/Inventory";
import { Customer } from "../models/Customer";
export const CreateInventory =  async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
    const { customer_name, arrival_date, sender, goods, quantity, weight,  departure_date } = req.body;
    try{
        let customer = await Customer.findOne({ customer: customer_name }).exec();
        if(!customer_name){
            res.status(404).json({
              success: false,
              message: "No customer with the name you entered"
          })
        }
        let data = {
            customer: customer._id,
            arrival_date: arrival_date,
            sender: sender,
            goods: goods,
            quantity: quantity,
            weight: weight,
            departure_date: departure_date
        }
        let inventory = await Inventory.create(data);
        res.status(201).json({
            success: true,
            message: "Inventory created successfully",
            data: inventory 
          });
    }catch(error: any){
        console.log(error)
        res.status(500).json({
            success: true,
            message: error.message
          });
    }
}
export const DeleteInventory = async (req: Request, res: Response, next:NextFunction): Promise<void>=>{
    const { id } = req.params;
    try{
        let customer = await Inventory.findByIdAndDelete({ _id: id }).exec();
        if(!customer){
            res.status(404).json({
                success: false,
                message: "Inventory not found"
            });
            return 
        }
        res.status(200).json({
            success: true,
            message: "Inventory deleted successfully"
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
export const UpdateInventory = async (req: Request, res:Response, next:NextFunction): Promise<void>=>{
    const {  arrival_date, sender, goods, quantity, weight,  departure_date } = req.body;
    const { id } = req.params;
    console.log(id);
    let updatedData = {
        arrival_date: arrival_date,
        sender: sender,
        goods: goods,
        quantity: quantity,
        weight: weight,
        departure_date: departure_date
    }
    try{
        let updatedCustomer = await Inventory.findByIdAndUpdate({ _id: id  }, updatedData, { new: true }).exec();
        console.log(updatedCustomer);
        if(!updatedCustomer){
            res.status(404).json({
                success: false,
                message: "Customer not found"
            });
            return 
        }
        res.status(200).json({
            success: true,
            message: "Customer updated successfully",
            data: updatedCustomer
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
export const getAllCustomerForInventory = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        let customer = await Customer.find({}).select("customer -_id").exec();
        if(!customer){
            res.status(404).json({
                success: true,
                message: "No inventory found"
            });
            return ;
        }
        console.log(customer);
        let inventory_customer = customer.filter((data: any)=>{
            return data.customer != null
        });
        
        res.status(200).json({
            success: true,
            data: inventory_customer
        });

    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getAllInventoryPerCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    const { profile } = req.params;
    try{
        let cus_tomer = await Customer.findOne({ customer: profile }).exec();
        if(!cus_tomer){
            res.status(404).json({
                success: false,
                message: "No customer found"
            });
            return ;
        }
        let inventory = await Inventory.find({ customer: cus_tomer._id }).select("arrival_date sender goods quantity weight  departure_date").exec();
        if(!inventory){
            res.status(404).json({
                success: false,
                message: "No inventory found"
            });
            return ;
        }
       
            res.status(200).json({
                success: true,
                data: inventory
            });
    }catch(error: any){

            res.status(404).json({
                success: false,
                message: error.message
            });
    }
}