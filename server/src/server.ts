// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFound.controller";

// Routes
import userRoutes from "./routes/users.routes"
import productRoutes from "./routes/product.routes"
import orderRoutes from "./routes/orders.routes"
import categoryRoutes from "./routes/categories.routes"
import reviewRoutes from "./routes/reviews.routes"
import wishlistRoutes from "./routes/wishlist.routes"
import authRoutes from "./routes/authRoutes"

// Middleware
import { helloMiddleware } from "./middleware/exampleMiddleware";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/authMiddleware";
// import { isAuth } from "./middleware/authMiddleware";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api", authRoutes);

app.use("/api", 
  userRoutes, 
  productRoutes,
  orderRoutes,
  categoryRoutes,
  reviewRoutes,
 
);

app.use("/api", isAuth, wishlistRoutes);


app.all("*", notFound);

console.log("Mongo URI: ", process.env.MONGO_URI_LIVE); 
// Database connection
try {
  // DB connected to render
  await mongoose.connect(process.env.MONGO_URI_LIVE!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
