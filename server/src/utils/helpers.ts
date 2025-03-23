import jwt from "jsonwebtoken";

import * as ms from "ms";
import { Types } from "mongoose";

import sgMail from "@sendgrid/mail";

const FROM_EMAIL = process.env.FROM_EMAIL;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_TEMPLATE_ID = process.env.SENDGRID_TEMPLATE_ID;

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



  interface MailContent {
    type: string;
    value: string;
  }
  
  interface EmailData {
    name: string;
    email: string;
    link: string;
    type: "verify";
  }
  
  export const sendEmail = async (data: EmailData) => {
    sgMail.setApiKey(SENDGRID_API_KEY as string);
    try {
      const msg = {
        from: FROM_EMAIL as string,
        template_id:SENDGRID_TEMPLATE_ID as string
         ,
  
        personalizations: [
          {
            to: [
              {
                email: data.email,
              },
            ],
            dynamic_template_data: {
              ...data,
              date: new Date().toLocaleDateString("nl-BE"),
            },
          },
        ],
        content: [
          {
            type: "text/html",
            value: "<p>This is a placeholder content.</p>",
          },
        ] as [MailContent],
      };
      JSON.stringify(msg.personalizations);
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
    }
  };

