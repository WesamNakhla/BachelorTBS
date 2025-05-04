import mongoose from "mongoose";

const InventorySchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "Invoice"
    },
    arrival_date: {
        type: Date,
        default: Date.now()
    },
    sender: {
        type: String,
        required: true,
    },
    goods: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    departure_date: {
        type: String,
        required: true
    }
},
{timestamps: true});

const Inventory = mongoose.model("Inventory", InventorySchema);
export default Inventory;