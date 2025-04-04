import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new Schema(
  {
    firstName: { 
      type: String,
      required: true
     },
    lastName: { 
      type: String,
      required: true
     },
    dateOfBirth: { 
      type: String,
      required: true
     },
    email: { 
      type: String, 
      required: true, 
      unique: true
    },
    password: { 
      type: String, 
      required: true
    },
    role: { 
      type: String, 
      default: "user"
    },
  },
  { timestamps: true }
);




const User = mongoose.model("User", UserSchema);
export default User;
