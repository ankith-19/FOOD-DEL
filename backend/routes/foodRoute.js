import express from 'express';
import { addFood, listFood, removeFood } from '../controller/foodController.js';
import multer from 'multer';

const foodRouter = express.Router();

//Image Storage Engine
const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=> {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({storage:storage});

//addFood Route
foodRouter.post("/add",upload.single("image"),addFood);

//getFoodlist Route
foodRouter.get("/list",listFood);

//removeFood Route
foodRouter.post("/remove",removeFood);








export default foodRouter;