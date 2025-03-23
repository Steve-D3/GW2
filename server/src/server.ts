// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFound.controller";
import { verificationEmail } from "./controllers/auth.controller";

// Routes
import userRoutes from "./routes/users.routes"
import productRoutes from "./routes/product.routes"
import orderRoutes from "./routes/orders.routes"
import categoryRoutes from "./routes/categories.routes"
import reviewRoutes from "./routes/reviews.routes"
import wishlistRoutes from "./routes/wishlist.routes"
import authRoutes from "./routes/auth.routes"
import Products from "./models/productsModel"
import usersModel from "./models/usersModel";

// Middleware

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { isAdmin, isAuth } from "./middleware/authMiddleware";
import localAuthMiddleware from "./middleware/localAuthMiddleware";
import categoriesModel from "./models/categoriesModel";



// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: ["http://localhost:5173", "https://gw2-rfg0.onrender.com/api","http://localhost:5174" ], // Allow the front-end to access the API
  credentials: true, // Allow credentials like cookies to be sent
};
// Middleware
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// EJS Template Engine -----------------------------------
app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("src/public"));

app.get("/", localAuthMiddleware, async (req, res) => {
  const allProducts = await Products.find().populate("category", "name");
  res.render("index", {
    title: "Product management system",
    products: allProducts,
    user: res.locals.user,
  });
});

app.get("/verify/:token", verificationEmail);


app.get("/register/admin", async (req, res) => {
  res.render("register", {
    title: "Register",
  });
});

app.get("/login/admin", async (req, res) => {
  res.render("login", {
    title: "Login",
  });
});


app.get("/users", localAuthMiddleware, async (req, res) => {
  const allUsers = await usersModel.find();
  res.render("users", {
    title: "Users",
    users: allUsers,
  });
});

// ------------------------------------------------------

// Update the /edit route in server.ts
app.get("/edit/product", localAuthMiddleware, async (req, res): Promise<void> => {
  try {
    const { product_id } = req.query;
    const product = await Products.findById(product_id).populate(
      "category",
      "name"
    ); //  Ensure category is populated
    const categories = await categoriesModel.find({}, "name _id"); // Fetch all categories for dropdown

    if (!product) {
      res.status(404).send("Product not found");
      return;
    }

    res.render("edit", {
      product_id: product?._id,
      name: product?.name,
      description: product?.description,
      price: product?.price,
      stock: product?.stock,
      category: product?.category || null, // Ensure category is sent properly
      categories, //  Pass all available categories for the dropdown
    });


    return;
  } catch (error) {
    console.error(" Error loading edit page:", error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.get("/edit/user", localAuthMiddleware, async (req, res): Promise<void> => {
  try {
    const { user_id } = req.query;
    const user = await usersModel.findById(user_id);

    res.render("editUser", {
      title: "Edit User",
      user_id: user?.id,
      name: user?.name,
      email: user?.email,
      role: user?.role,
    });

    return;
  } catch (error) {
    console.error("Error loading add user page:", error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.get("/add", localAuthMiddleware, async (req, res): Promise<void> => {
  try {
    const categories = await categoriesModel.find({}, "name _id"); // ✅ Get all categories for the dropdown

    res.render("add", {
      title: "Add Product",
      categories,
    });

    return;
  } catch (error) {
    console.error("Error loading add product page:", error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

app.get("/add/images", localAuthMiddleware, async (req, res): Promise<void> => {
  try {
    const { product_id } = req.query;
    const product = await Products.findById(product_id);

    console.log("Product ID: ", product_id);

    res.render("addImages", {
      title: "Add Images",
      product,
    });

    return;
  } catch (error) {
    console.error("Error loading add product page:", error);
    res.status(500).send("Internal Server Error");
    return;
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use(
  "/api",
  userRoutes,
  productRoutes,
  orderRoutes,
  categoryRoutes,
  reviewRoutes
);
app.use("/api",  wishlistRoutes);
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
  console.log(`Server listening on port ${PORT}! `);
});
