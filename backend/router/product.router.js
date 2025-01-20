import express from "express";

import upload from "../middlewares/multer.js";
import { addProductMiddleware } from "../middlewares/product.middleware.js";
import { addProductControllers, deleteById, getAllProducts } from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.route("/add-product").post(upload.single('image'), addProductMiddleware, addProductControllers)
productRouter.route("/products").get(getAllProducts)
productRouter.route("/product/:id").delete(deleteById)


export default productRouter