import express from "express";
import { logout, register , login} from "../controllers/auth.controller";

const router = express.Router();

router
// .post("/register", register)
.post("/register/admin", (req, res, next) => {
    req.body.role = "admin";
    next();
}, register)
.post("/logout", logout)
.post("/login", login);



export default router;
