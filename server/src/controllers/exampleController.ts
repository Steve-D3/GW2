import { Request, Response } from "express";
import { Error as MongooseError } from "mongoose";
const { ValidationError } = MongooseError;

export const getHelloWorld = (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello World!" });
};

