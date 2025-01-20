import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./config/db.js";
import productRouter from "./router/product.router.js";
import { cloudinaryConnect } from "./services/cloudinary.config.js"

// dotenv configartion
dotenv.config()

// app initialize using express
const app = express();

// cors initialize so our frontend and backend will communicate 
app.use(cors());

// port initialize where server is start default 5000
const PORT = process.env.PORT || 5000;

// database calling 
connectDb()

// connect cloudinary
cloudinaryConnect()

// convert frontend data into json format 
app.use(bodyParser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// api end points 
app.use("/api", productRouter)

// server started
app.listen(PORT, () => {
    console.log(`server started on http://localhost:${PORT}`);
})