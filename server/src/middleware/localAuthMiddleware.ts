import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/usersModel";

const JWT_SECRET = process.env.JWT_SECRET;
/**
 * The `authMiddleware` function is a TypeScript middleware that verifies a JWT token in a request and
 * sets the user information in the request object if the token is valid.
 * @param {Request} req - The `req` parameter in the `authMiddleware` function stands for the request
 * object. It contains information about the HTTP request being made, such as the request headers,
 * body, parameters, cookies, and more. In this context, `req` is of type `Request`, which likely comes
 * from
 * @param {Response} res - The `res` parameter in the `authMiddleware` function stands for the response
 * object in Express.js. It is used to send a response back to the client making the request. In the
 * provided code snippet, `res` is used to set the status of the response and send JSON data with
 * appropriate
 * @param {NextFunction} next - The `next` parameter in the `authMiddleware` function is a function
 * that is called to pass control to the next middleware function in the stack. It is typically used to
 * move to the next middleware in the chain. In Express.js, for example, calling `next()` within a
 * middleware function will
 * @returns The `authMiddleware` function returns different responses based on the conditions met
 * during its execution:
 */
const localAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            res.redirect('/login/admin');
            return;
        }

        if (!JWT_SECRET) {
            res.status(500).json({ message: 'JWT_secret is not defined' });
            return;
        }

        const decoded = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
        if (!decoded) {
            res.redirect('/login/admin');
            return;
        }

        const user = {
            _id: decoded._id,
            email: decoded.email,
            role: decoded.role,
        };

        const userDetails = await User.findById(user._id).select("-password");
        if (!userDetails) {
            res.redirect('/login/admin');
            return;
        }

        req.user = user;
        res.locals.user = userDetails;
        next();

    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return; 
        }
        res.status(400).json({ message: 'Unexpected error' });
        return;
    }
};

export default localAuthMiddleware;