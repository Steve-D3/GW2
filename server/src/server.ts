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

// Middleware
import { helloMiddleware } from "./middleware/exampleMiddleware";
import mongoose from "mongoose";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", helloMiddleware, 
  userRoutes, 
  productRoutes,
  orderRoutes,
  categoryRoutes,
  reviewRoutes,
  wishlistRoutes
);
app.all("*", notFound);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
