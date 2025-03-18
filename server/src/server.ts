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
import Products from "./models/productsModel"

// Middleware
import { helloMiddleware } from "./middleware/exampleMiddleware";

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { isAuth } from "./middleware/authMiddleware";


// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["http://localhost:5173", "https://gw2-rfg0.onrender.com/api"], // Allow the front-end to access the API
  credentials: true,  // Allow credentials like cookies to be sent
};
// Middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());


// EJS Template Engine -----------------------------------
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));
// use arcmiddleware?

app.get("/", async (req, res) => {
  const allProducts = await Products.find();
  res.render("index", {
    title: "Product management system",
    products: allProducts,
    user: res.locals.user
  });
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Register",
  })
});

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Login",
  })
});

/*
Not yet tested, login and register could cause issues 
if so put register and login in comments
*/ 

// ------------------------------------------------------


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
