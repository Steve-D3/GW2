import express from "express";
import { logout, register , login} from "../controllers/authController";

const router = express.Router();

router.post("/register", register).get("/logout", logout).post("/login", login);



export default router;
