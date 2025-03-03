import jwt from "jsonwebtoken";
import { ObjectId } from "mongoose";
import * as ms from "ms";
import { Types } from "mongoose";



interface UserPayload    {
    _id: Types.ObjectId;
    email: string;
    name: string;
    role: string;

  }

  interface Params{
    user : UserPayload,
    secret : string,
    expiresIn: number | ms.StringValue | undefined;
  }

 
export const signToken = async ({ user, secret, expiresIn }: Params) => {
    const payload = {
      _id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
    };  
    return jwt.sign(payload, secret, { expiresIn });
  };

