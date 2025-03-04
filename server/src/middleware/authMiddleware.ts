import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload;
  }
}

const { JWT_SECRET } = process.env;
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
 const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (!JWT_SECRET) {
    throw new Error("Internal error");
  }
 const user = jwt.verify(token, JWT_SECRET)
 console.log(user);
 console.log(req)
 req.user = user;
  next();
};