import express from "express";

import upload from "../middlewares/multer.js";

import { addProductMiddleware, updateProductMiddleware } from "../middlewares/product.middleware.js";
import { addProductControllers, deleteById, getAllProducts, updateProduct } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(upload.single('image'), addProductMiddleware, addProductControllers)
productRouter.route("/products").get(getAllProducts)
productRouter.route("/product/:id").delete(deleteById)
productRouter.route("/product/update/:id").put(upload.single('image'),updateProductMiddleware, updateProduct )


export default productRouter