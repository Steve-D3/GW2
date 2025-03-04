import express from "express";
import { 
    createUser, 
    getUsers, 
    getUserById,
    searchUsers,
    deleteUser,
    updateUser
} from "../controllers/users.controller";
import { isAuth } from "../middleware/authMiddleware";


const router = express.Router();
router
.get("/users", getUsers)
.get("/users/:id", getUserById)
.get("/users/search", searchUsers)
.post("/users", createUser)
.put("/users/:id", updateUser)
.delete("/users/:id", deleteUser);



export default router;