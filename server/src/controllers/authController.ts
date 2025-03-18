import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import bcrypt from "bcrypt";
import User  from "../models/usersModel";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/helpers";
import mongoose from "mongoose";


const saltRounds = 10;
const SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const response = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!SECRET) {
      throw new Error("Internal error");
    }

    const user = {
      _id: new mongoose.Types.ObjectId(response._id),
      email: response.email,
      name: response.name,
      role: response.role,
    };

    // JWT creation
    const token = await signToken({ user: user, secret: SECRET, expiresIn: "7d" });

    // Cookie creation
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Email or password is incorrect" });
      return;
    }
    if (!SECRET) {
      throw new Error("Internal error");
    }

    const tokenUser = {
      _id: new mongoose.Types.ObjectId(user._id),
      email: user.email,
      name: user.name,
      role: user.role,
    };

    const token = await signToken({
      user: tokenUser,
      secret: SECRET,
      expiresIn: "7d",
    });

    console.log(token);

    // Cookie aanmaken
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token,  
    });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      maxAge: 1,
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
