
const mongoose = require("mongoose");

const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    org_number: {
        type: String,
        required: true
    },

},
{timeStamps: true});

export const Customer = mongoose.model("Customer", customerSchema);