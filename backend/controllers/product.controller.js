import productModel from "../models/product.model.js";
import { v2 as cloudinary } from "cloudinary"
import fs from "fs/promises";

export const addProductControllers = async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload an image.",
            });
        }

        const filePath = req.file.path;

        try {
            // Upload to Cloudinary
            const uploadResult = await cloudinary.uploader.upload(filePath, {
                resource_type: "image",
                folder: "products",
                quality: "auto:low",
            });

            // Get the secure Cloudinary URL
            const image = uploadResult.secure_url;

            // Save product details to the database
            const addNewData = new productModel({
                name,
                price,
                image,
            });

            await addNewData.save();

            // Clean up the temporary file
            await fs.unlink(filePath);

            return res.status(201).json({
                success: true,
                message: "Product created successfully!",
                data: addNewData,
            });
        } catch (cloudinaryError) {
            // Clean up the temporary file if Cloudinary upload fails
            await fs.unlink(filePath);
            return res.status(500).json({ success: false, message: "Cloudinary Error", cloudinaryError})
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const data = await productModel.find({})
        return res
            .status(200)
            .json({
                success: true,
                message: "Products fetch successfully",
                data
            })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const deleteById = async (req, res) => {
    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required" })
        }

        const productExist = await productModel.findById({ _id: id });
        if (!productExist) {
            return res.status(400).json({ success: false, message: "Product not exist" })
        }

        try {
            const imageUrl = productExist.image;
            const publicId = imageUrl.split('/').slice(-2).join('/').split('.')[0];

            await cloudinary.uploader.destroy(publicId)

            await productModel.findByIdAndDelete(productExist)
            return res.status(200).json({ success: true, message: "Product deleted successfull" })
        }
        catch (error) {
            return res
                .status(500)
                .json({
                    success: false,
                    message: "Cloudianry error",
                    error
                })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = req.body;

        if (!id) {
            return res.status(400).json({ success: false, message: "Id is required" })
        }

        const productExist = await productModel.findById({ _id: id });
        if (!productExist) {
            return res.status(400).json({ success: false, message: "Product Id is required" })
        }

        if (req.file) {
            try {
                const filePath = req.file.path;
                const uploadResult = await cloudinary.uploader.upload(filePath, {
                    resource_type: "image",
                    folder: "products",
                    quality: "auto:low",
                });

                // Add the new image URL to the update object
                product.image = uploadResult.secure_url;

                // Clean up the temporary file
                await fs.unlink(filePath);

                // Delete the old image from Cloudinary
                const oldImageUrl = productExist.image;
                const publicId = oldImageUrl.split('/').slice(-2).join('/').split('.')[0];
                await cloudinary.uploader.destroy(publicId);

            } catch (cloudinaryError) {
                return res.status(500).json({
                    success: false,
                    message: "Image upload failed",
                    error: cloudinaryError,
                });
            }
        }
        
        const updatedProducts = await productModel.findByIdAndUpdate(id, product, {
            new: true
        })

        return res
            .status(200)
            .json({
                success: true,
                message: "Product updated successfull",
                updatedProducts
            })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Internal Server error" })
    }
}