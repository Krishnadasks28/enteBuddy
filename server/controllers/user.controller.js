import cart from "../models/cart.model.js";
import { errorHandler } from "../utils/error.js";


/// add a new item to the product
export const addToCart = async (req, res, next) => {
  try {
    if (req.user) {
      const productData = req.body;
      const userCart = await cart.findOne({userId:req.user._id});
      console.log("user cart : ",req.user._id )
      if (userCart) {
        console.log("first condition true")
        userCart.addProduct(productData);
        console.log("NEw cart : ",userCart)
        userCart.save()
      } else {
        const newCart = new cart({
          userId: req.user._id,
          username: req.user.name,
          items:[]
        });
        newCart.save();
        newCart.addProduct(productData);
        console.log("cart : ",newCart)
       
      }
      res.status(200).json("product added to cart");
    } else {
      return errorHandler(401, "Unauthorised");
    }
  } catch (err) {
    next(err);
  }
};

///query products in the cart
export const getCartItems = async (req,res,next) => {
  try{
    const cartItems = await cart.find({userId:req.user._id})
    res.status(200).json(cartItems)
  }
  catch(err){
    next(err)
  }
}