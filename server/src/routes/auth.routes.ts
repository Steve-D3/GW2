import express from "express";
import { logout, register, login, loginAdmin } from "../controllers/auth.controller";

const router = express.Router();

router
    .post("/register", register)
    .post("/register/admin", (req, res, next) => {
        req.body.role = "admin";
        next();
    }, register)
    .post("/login/admin", loginAdmin)
    .post("/login", login)
    .post("/logout", logout);


export default router;
