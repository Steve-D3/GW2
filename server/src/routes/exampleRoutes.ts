import express from "express";
import {
  getHelloWorld,
} from "../controllers/exampleController";

const router = express.Router();

router
  .get("/test", getHelloWorld)

export default router;
