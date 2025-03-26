// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import { notFound } from "./controllers/notFound.controller";
import { Request } from "express";
import { verificationEmail } from "./controllers/auth.controller";

// Routes
import userRoutes from "./routes/users.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/orders.routes";
import categoryRoutes from "./routes/categories.routes";
import reviewRoutes from "./routes/reviews.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import authRoutes from "./routes/auth.routes";
import Products from "./models/productsModel";
import usersModel from "./models/usersModel";

// Middleware

import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { isAdmin, isAuth } from "./middleware/authMiddleware";
import localAuthMiddleware from "./middleware/localAuthMiddleware";
import categoriesModel from "./models/categoriesModel";

// Multer
import multer from "multer";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { addProfilePicture } from "./controllers/profilePictureController";
import profilePictureModel from "./models/profilePictureModel";
// Extend Express Request interface to include 'file'
declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}

// Variables
// Variables
const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://gw2-rfg0.onrender.com/api",
    "http://localhost:5174",
    "https://gw-2-pi.vercel.app",
    "https://gw2-ecoshop.surge.sh",
  ], // Allow the front-end to access the API
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
//uploads imgs
app.use("/uploads", express.static("uploads"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "test",
    allowedFormats: ["jpg", "png", "jpeg", "gif", "webp"],
  } as any,
});

// limit 3MG

const upload = multer({ storage: storage, limits: { fileSize: 3000000 } });

// Routes
app.get("/", (req, res) => {
  res.sendFile("/index.html");
});
//routes multer
// const upload = multer({ dest: "uploads/" });

// app.post("/upload", upload.single("image"), async (req, res) => {
//   try {
  
//     if (!req.file) {
//       res.status(400).json({ message: "No file uploaded." });  return 
//       }
//     console.log(req.body);
//     console.log("img",req.file);

//     // Extract user_id from request body and set image_url using the uploaded file path
//     req.body.image_url = `/uploads/${req.file.filename}`;

 
   
  

//   console.log(req.file);
//   const baseUrl = "http://res.cloudinary.com/djuqnuesr/image/upload/";
//   const trans = "c_thumb,g_face,h_200,w_200/r_max/f_auto";
//   const end = req.file.filename + path.extname(req.file.originalname);
// if (!req.user) {
//   res.status(401).json({ message: "Unauthorized: User not authenticated." });
//   return;
// }
// if (typeof req.user !== "string" && "name" in req.user) {

//   const newProfilePicture = new profilePictureModel({ user_id: "67e284b388b6b40d1ae56e14", image_url: req.body.image_url });
//   await newProfilePicture.save();
//     res.status(201).json({ message: "Image uploaded successfully" });
// } else {
//   res.status(400).json({ message: "Invalid user data." });
//   return;
// }
// //   res.status(200).send(`
// //     <h1 style="text-align: center; color: green" >Image uploaded successfully</h1>
// //     <img src="${baseUrl}${trans}/${end}" alt="Uploaded Image" width="300" style="display: block; margin: 0 auto;">
// //     `);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

 

    console.log("Received file:", req.file);
    console.log("Received body:", req.body);

 
    // Construct Image URL
    const imageUrl = `/uploads/${req.file.filename}`;

    // Save to database
    const newProfilePicture = new profilePictureModel({ user_id: "67e284b388b6b40d1ae56e14", image_url: imageUrl });
    await newProfilePicture.save();

    res.status(201).json({ message: "Image uploaded successfully", user_id: "67e284b388b6b40d1ae56e14", image_url: imageUrl });

  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", localAuthMiddleware, async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;
    const skip = (page - 1) * limit;

    const totalProducts = await Products.countDocuments();
    const products = await Products.find()
      .populate("category", "name")
      .skip(skip)
      .limit(limit);

    res.render("index", {
      title: "Product management system",
      products,
      currentPage: page,
      totalPages: Math.ceil(totalProducts / limit),
      limit,
      user: res.locals.user,
    });
  } catch (error) {
    console.error("Error fetching paginated products:", error);
    res.status(500).send("Internal Server Error");
  }
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
app.get(
  "/edit/product",
  localAuthMiddleware,
  async (req, res): Promise<void> => {
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
  }
);

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
app.use("/api", wishlistRoutes);
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
