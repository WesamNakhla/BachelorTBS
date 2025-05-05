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