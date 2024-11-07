import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { router } from './routes/bookRoute.js';
import cors from "cors";
 
const app = express();

app.use(cors());
app.use(express.json());
app.use('/books', router);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("MongoDB connection successful");
        app.listen(PORT, () => {
          console.log(`server is running on ${PORT}`);
        });
        
    })
    .catch(() => {
        console.log("Error occured while connecting MongoDB", error);
        
    })