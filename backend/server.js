import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderModel from './models/orderModel.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

//middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;

//Database connection
const connectDB = async () => {
    await mongoose
      .connect(
        'mongodb+srv://ankith:8340953756@cluster0.ik4tmxs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
      )
      .then(() => {
        console.log("DB Connected");
      });
  };

connectDB();

//api endpoints
app.use("/images",express.static('uploads'));
app.use("/api/food",foodRouter)
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

app.listen(port,()=> {
    console.log("app is listening to port 3000")
})

