import { Request, Response, NextFunction } from "express";
import Inventory from "../models/Inventory";
export const getAllInventoryCustomer = async (req: Request, res: Response, next: NextFunction): Promise<void>=>{
    try{
        let inventory = await Inventory.find({}).populate({ path: "customer", select: "customer" }).exec();
        res.status(200).json({
            success: true,
            data: inventory
        });
        return 
    }catch(error){
        res.status(500).json({
            success: false,
            message: error
        });
    }
}