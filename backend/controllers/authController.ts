import { Request, Response, NextFunction } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { validationResult } from "express-validator";
import ForgetEmail from "../utils/email/forgetEmail"

// Generate JWT Token
const generateToken = (id: string, role: string): string => {
  return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET as string, {
    expiresIn: "30d",
  });
};

// Register user
export const registerUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role, username } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({ name, email, password: hashedPassword, role, username });

    if (!user) {
      return res.status(400).json({ message: "Invalid user data" });
    }

    // Send response
    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      username: user.username
    });
  } catch (error) {
    next(error);
  }
};

// Login user
export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Find user by usename
    const user = await User.findOne({ username });

    // Check password
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: "Invalid username or password" });
    // }
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    

    // Send response
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: username,
      token: generateToken(user._id.toString(), user.role),
    });
  } catch (error) {
    next(error);
  }
};
//forget password
export const ForgetPassword = async(req: Request, res: Response, next: NextFunction): Promise<void>=>{
  const { email } = req.body;
  try{
    crypto.randomBytes(12, async (err, buffer)=>{
      if(err){
        return res.status(400).json({
            success: false,
            message: err
        })
      }
      const token = buffer.toString("hex");
      const user = await User.findOne({ email: email });
      if(!user){
        return res.status(404).json({
          success: false,
          message: "This email does not have an account"
        })
      }
      user.token = token;
      user.tokenExpiration = Date.now() + 3600 * 1000;
      await user.save();
      let mail = await ForgetEmail(user.name, user.email, user.token );
      console.log(mail);
      if(mail?.messageId){
        return res.status(201).json({
          success: false,
          message: "Email sent"
        })
      }else{
        return res.status(500).json({
          success: false,
          message: mail
        })
      }
    })
  }catch(err){
    res.status(501).json({
      success: false,
      message: err
    })
    return
  }
}