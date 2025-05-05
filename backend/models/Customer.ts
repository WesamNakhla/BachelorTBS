
const mongoose = require("mongoose");

// const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
    customer: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    contact_person: {
        type: String,
        required: true
    },
    org_number: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    invoices: [{
        type: mongoose.Types.ObjectId,
        ref: "Invoice",
        required: false

    }],
    inventory: [{
        type: mongoose.Types.ObjectId,
        ref: "Inventory"
    }]
   

},
{timestamps: true});

export const Customer = mongoose.model("Customer", customerSchema);