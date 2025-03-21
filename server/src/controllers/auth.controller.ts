import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;
import bcrypt from "bcrypt";
import User from "../models/usersModel";
import jwt from "jsonwebtoken";
import { signToken } from "../utils/helpers";
import validator from "validator";
import mongoose from "mongoose";


const saltRounds = 10;
const SECRET = process.env.JWT_SECRET;

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Email already exists" });
      return;
    }

    // Check if email is valid
    if (!validator.isEmail(email)) {
      res.status(400).json({ message: "Email is not valid" });
      return;
    }

    // Check if password is strong enough
    const isStrongPassword = validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    });

    if (!isStrongPassword) {
      res.status(403).json({ message: "Password is not strong enough" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userRole = role || "basic";

    const response = await User.create({
      name,
      email,
      password: hashedPassword,
      role: userRole,
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

    const token = await signToken({ user: user, secret: SECRET, expiresIn: "7d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created successfully", user: response });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "Please fill all fields" });
      return;
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "User not Found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Wrong password" });
      return;
    }

    if (user.role !== "admin") {
      res.status(403).json({ message: "Unauthorized, Admins only" });
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

    // Create cookie
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
      res.status(401).json({ message: "User not Found" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Wrong password" });
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

    // Create cookie
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
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
    });

    console.log("Logged out successfully!");
    res
      .status(200)
      .json({ status: "success", message: "Logged out successfully!" });
    return;
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
