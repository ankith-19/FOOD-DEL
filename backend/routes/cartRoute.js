import express from 'express';
import { addToCart, getCart, removeFromCart } from '../controller/cartController.js';
import authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

//Add item to cart route
cartRouter.post("/add",authMiddleware,addToCart);

//Remove item from cart route
cartRouter.post("/remove",authMiddleware,removeFromCart);

//get cart items route
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;