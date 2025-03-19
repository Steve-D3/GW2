import { Response, Request } from "express";
import productsModel from "../models/productsModel";
import categoriesModel from "../models/categoriesModel";

// CRUD
// CREATE
/**
 * The function creates a new product with required fields and associates it with an existing category
 * in a TypeScript application.
 * @param {Request} req - The req parameter in the createProduct function represents the request
 * object, which contains information about the HTTP request that triggered the function. This object
 * typically includes details such as the request headers, request body, request method, URL, and other
 * relevant information sent by the client to the server.
 * @param {Response} res - The res parameter in the createProduct function is the response object
 * that will be used to send responses back to the client making the request. It is an instance of the
 * Response class from the Express.js framework. This object allows you to send HTTP responses with
 * status codes, headers
 * @returns If all the required fields are present and the category is found, a new product object is
 * created and saved in the database. The response will include the newly created product with status
 * code 201 (Created). If there are missing fields or the category is not found, appropriate error
 * messages will be returned with status codes 400 (Bad Request) or 404 (Not Found) respectively. If
 * there is
 */
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      description,
      price,
      stock,
      category_name,
      image_url,
      created_at,
    } = req.body;
    if (
      !name ||
      !description ||
      !price ||
      !stock ||
      !category_name ||
      !image_url
    ) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }

    const category = await categoriesModel.findOne({ name: category_name });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    const newProduct = new productsModel({
      name,
      description,
      price,
      stock,
      category: category, // Include full category information
      image_url,
      created_at,
    });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * This TypeScript function adds a new image to a product in a database and returns the updated product
 * data.
 * @param {Request} req - The req parameter in the addImage function stands for the request object.
 * It contains information about the HTTP request that triggered the function, such as request headers,
 * parameters, body, and more. In this case, it is being used to extract the id parameter from the
 * request
 * @param {Response} res - The res parameter in the addImage function is an object representing the
 * HTTP response that an Express app sends when it gets an HTTP request. It has methods and properties
 * that allow you to send a response back to the client, such as setting the status code, sending data,
 * or redirect
 * @returns The addImage function is returning a JSON response with the status code and data of the
 * updated product. If successful, it will return a status of "success" along with the updated product
 * data. If there is an error, it will return a status code of 500 and a message of "Internal server
 * error".
 */
export const addImage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { image_url } = req.body;

    const product = await productsModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const newImageId = product.image_url.length + 1;
    const newImage = { id: newImageId, url: image_url };

    const updatedProduct = await productsModel.findByIdAndUpdate(
      id,
      { $push: { image_url: newImage } },
      { new: true }
    );

    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// READ
/**
 * The function getProducts retrieves all products from a database and sends them as a JSON response,
 * handling errors appropriately.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The res parameter in the getProducts function is an instance of the
 * Response object in Express.js. It is used to send a response back to the client making the
 * request. In this case, the function is sending a JSON response with the products data when the
 * products are successfully
 */
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * The function getProductById retrieves a product by its ID and sends a response with the product
 * data or an error message if the product is not found or an internal server error occurs.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The res parameter in the getProductById function stands for the response
 * object in Express.js. It is used to send a response back to the client making the request. In this
 * function, res is used to send JSON responses with appropriate status codes based on the outcome of
 * the
 * @returns The getProductById function is returning a specific product based on the ID provided in
 * the request parameters. If the product is found, it returns a status of 200 along with the product
 * data in JSON format. If the product is not found, it returns a status of 404 with a message
 * indicating that the product was not found. If there is an error during the process, it returns
 */
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * This function retrieves products based on a specified category name.
 * @param {Request} req - The req parameter in the getProductsByCategory function stands for the
 * request object. It contains information about the HTTP request that was made to the server, such as
 * the request headers, parameters, body, and more. In this case, req.params is used to access the
 * @param {Response} res - The res parameter in the getProductsByCategory function is the response
 * object that will be used to send the response back to the client making the request. It is an
 * instance of the Express Response object, which provides methods for sending responses such as
 * res.status() and 
 * @returns The getProductsByCategory function is an asynchronous function that takes a request
 * (req) and response (res) object as parameters. It attempts to find a category by name, then
 * finds products associated with that category by category ID. If the category or products are not
 * found, appropriate error messages are sent in the response. If an error occurs during the process,
 * an internal server error message is
 */
export const getProductsByCategory = async (req: Request, res: Response) => {
  try {
    const { category_name } = req.params;

    // Find the category by name
    const category = await categoriesModel.findOne({ name: category_name });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // Find products by category ID
    const products = await productsModel.find({ category_id: category._id });
    if (!products.length) {
      res.status(404).json({ message: "No products found for this category" });
      return;
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * The function getProductsByPriceRange retrieves products within a specified price range and handles
 * error cases appropriately.
 * @param {Request} req - The req parameter in the getProductsByPriceRange function stands for the
 * Request object, which represents the HTTP request received by the server. It contains information
 * about the request made by the client, such as the request headers, query parameters, body content,
 * and more. In this function
 * @param {Response} res - The res parameter in the getProductsByPriceRange function is the
 * response object that is used to send a response back to the client making the request. It is an
 * instance of the Response class from the Express.js framework. The res object has methods like
 * status
 * @returns The function getProductsByPriceRange is an asynchronous function that handles a request
 * to retrieve products within a specified price range. It extracts the lower and upper bounds of the
 * price range from the request query parameters, validates that both bounds are provided, finds
 * products within the specified price range using a MongoDB query, and returns the found products if
 * any.
 */
export const getProductsByPriceRange = async (req: Request, res: Response) => {
  try {
    // Extract lower and upper bounds of the price range from query parameters
    const { lower, upper } = req.query;

    // Validate that both lower and upper bounds are provided
    if (!lower || !upper) {
      res.status(400).json({ message: "Missing price range parameters" });
      return;
    }

    // Find products within the specified price range
    const products = await productsModel.find({
      price: { $gte: Number(lower), $lte: Number(upper) },
    });

    // Check if any products were found
    if (!products.length) {
      res
        .status(404)
        .json({ message: "No products found within the given price range" });
      return;
    }

    // Return the found products
    res.status(200).json(products);
  } catch (error) {
    // Log the error and return a 500 status code with an error message
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * The function getImages retrieves the image URL of a product based on its ID and handles error
 * responses accordingly.
 * @param {Request} req - The req parameter in the getImages function stands for the request
 * object, which contains information about the HTTP request made to the server. This object includes
 * details such as the request headers, parameters, body, URL, and more. In this case, req.params is
 * used to
 * @param {Response} res - The res parameter in the getImages function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, it is used to send JSON responses with status codes such as 404 for "Product not
 * found"
 * @returns If the product is found, the image URL of the product is being returned with a status code
 * of 200. If the product is not found, a JSON response with a message "Product not found" and a status
 * code of 404 is being returned. If there is an internal server error, a JSON response with a message
 * "Internal server error" and a status code of 500 is being
 */
export const getImages = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json(product.image_url);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE
/**
 * The function updateProduct updates a product in a database using its ID and returns the updated
 * product data or an error message.
 * @param {Request} req - The req parameter in the updateProduct function stands for the request
 * object. It contains information about the HTTP request that was made to the server, such as the
 * request headers, parameters, body, and more. In this context, it is specifically used to extract the
 * id parameter
 * @param {Response} res - The res parameter in the updateProduct function is an object
 * representing the HTTP response that the server sends back to the client. It allows you to send data
 * back to the client, set HTTP status codes, and more. In the provided code snippet, res is used to
 * send
 * @returns The updateProduct function returns a JSON response with status code and data. If the
 * product is successfully updated, it returns a status of "success" along with the updated product
 * data. If the product is not found, it returns a 404 status with a message "Product not found". If
 * there is an internal server error during the update process, it returns a 500 status with a message
 */
// export const updateProduct = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         const { category_name, ...updateData } = req.body;

//         if (category_name) {
//             const category = await categoriesModel.findOne({ name: category_name });
//             if (!category) {
//                 res.status(404).json({ message: "Category not found" });
//                 return;
//             }
//             updateData.category = category._id;
//         }

//         const itemToUpdate = await productsModel.findByIdAndUpdate(
//             id,
//             { ...updateData },
//             { new: true }
//         );

//         if (!itemToUpdate) {
//             res.status(404).json({ message: "Product not found" });
//             return;
//         }

//         res.status(200).json({ status: "success", data: itemToUpdate });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { category_name, ...updateData } = req.body;

    console.log("✅ Received update request for ID:", id);
    console.log("🔹 Data received in request:", updateData);

    if (category_name) {
      const category = await categoriesModel.findOne({ name: category_name });
      if (!category) {
        res.status(404).json({ message: "Category not found" });
        return;
      }
      updateData.category = category._id;
    }

    // Ensure stock and price are treated as numbers
    if (updateData.stock) updateData.stock = Number(updateData.stock);
    if (updateData.price) updateData.price = Number(updateData.price);

    const itemToUpdate = await productsModel.findByIdAndUpdate(
      id,
      { $set: updateData }, // Ensure full update
      { new: true }
    );

    if (!itemToUpdate) {
      console.log("🔴 Product not found.");
      res.status(404).json({ message: "Product not found" });
      return;
    }

    console.log("✅ Updated Product:", itemToUpdate);
    res.status(200).json({ status: "success", data: itemToUpdate });
  } catch (error) {
    console.error("🔴 Update Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
// DELETE
/**
 * The function deleteProduct deletes a product by its ID and returns a success message if the
 * deletion is successful.
 * @param {Request} req - The req parameter in the deleteProduct function stands for the request
 * object. It contains information about the HTTP request that triggered the function, such as request
 * headers, parameters, body, and more. In this case, it is of type Request, which is typically
 * provided by web frameworks
 * @param {Response} res - The res parameter in the deleteProduct function stands for the response
 * object. It is used to send a response back to the client making the request. In this function, it is
 * being used to send JSON responses with appropriate status codes such as 404 for "Product not found"
 * and
 * @returns If the product is successfully deleted, a JSON response with a status code of 200 and a
 * message "Product deleted" is being returned. If the product is not found (i.e., deletedProduct is
 * falsy), a JSON response with a status code of 404 and a message "Product not found" is being
 * returned. If an error occurs during the deletion process, a JSON response
 */
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await productsModel.findByIdAndDelete({ _id: id });
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * This TypeScript function deletes an image associated with a product based on the provided image ID.
 * @param {Request} req - The req parameter in the deleteImage function stands for the request
 * object. It contains information about the HTTP request that triggered the function, such as headers,
 * parameters, body, and more. In this case, it is of type Request, which is likely from a web
 * framework like
 * @param {Response} res - The res parameter in the deleteImage function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, it is used to send JSON responses with status codes and messages based on the outcome
 * of the image deletion
 * @returns The deleteImage function returns a JSON response with the status code and data of the
 * updated product. If successful, it returns a status of "success" and the updated product data. If
 * there is an error, it returns a status code of 500 and a message of "Internal server error".
 */
export const deleteImage = async (req: Request, res: Response) => {
  try {
    const { id, image_id } = req.params;
    const product = await productsModel.findById(id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    const updatedImages = product.image_url.filter(
      (image) => image.id !== Number(image_id)
    );
    const updatedProduct = await productsModel.findByIdAndUpdate(
      id,
      { image_url: updatedImages },
      { new: true }
    );

    res.status(200).json({ status: "success", data: updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};