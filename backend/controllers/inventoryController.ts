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
        let customer = await Customer.findByIdAndDelete({ _id: id }).exec();
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
    let updatedData = {
        arrival_date: arrival_date,
        sender: sender,
        goods: goods,
        quantity: quantity,
        weight: weight,
        departure_date: departure_date
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
export const getAllCustomerForInventory = async (req: Request, res: Response, next: NextFunction)=>{
    try{
        let customer = await Inventory.find({}).populate({ path: "customer", select: "customer -_id" }).exec();
        if(!customer){
            res.status(404).json({
                success: true,
                message: "No inventory found"
            });
            return ;
        }
        res.status(200).json({
            success: true,
            data: customer
        });

    }catch(error: any){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}
export const getAllInventoryPerCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    const { id } = req.params;
    try{
        let inventory = await Inventory.find({ customer: id }).select("arrival_date sender goods quantity weight  departure_date").lean();
        if(!inventory){
            res.status(404).json({
                success: false,
                message: "No inventory found"
            });
            return ;
        }
            res.status(404).json({
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