import userModel from '../models/userModel.js';


//add item to cart
const addToCart = async(req,res) => {
    try {
      const userData = await userModel.findById(req.body.userId);
      console.log(userData);
      const cartData = await userData.cartData;

      if (!cartData[req.body.itemId]) {
        cartData[req.body.itemId] = 1;
      } else {
        cartData[req.body.itemId] += 1;
      }

      await userModel.findByIdAndUpdate(req.body.userId,{ cartData });
      res.json({ success: true, message: "Added to cart" });
    } catch (err) {
      console.log(err);
      res.json({ success: false, message: "Error" });
    }
};

//remove from cart
const removeFromCart = async (req,res) => {
    try {
      const userData = await userModel.findById(req.body.userId);
      console.log(userData);
      const cartData = await userData.cartData;

      if(cartData[req.body.itemId]>0) {
        cartData[req.body.itemId] -= 1;
      }

      await userModel.findByIdAndUpdate(req.body.userId,{cartData});
      res.json({success:true,message:"Removed from cart"});
    } catch (err) {
      console.log(err);
      res.json({success:false,message:"Error"})
    }
};

//get cart items
const getCart = async(req,res) => {
    try {
      const userData = await userModel.findById(req.body.userId);
      const cartData = await userData.cartData;
      res.json({success:true,cartData});
    } catch (err) {
      console.log(err);
      res.json({success:false,message:"Error"});
    }
};



export {addToCart,removeFromCart,getCart};