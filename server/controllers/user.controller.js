import userAddress from "../models/address.model.js";
import cart from "../models/cart.model.js";
import { errorHandler } from "../utils/error.js";

/// add a new item to the product
export const addToCart = async (req, res, next) => {
  try {
    if (req.user) {
      const productData = req.body;
      const userCart = await cart.findOne({ userId: req.user._id });
      console.log("user cart : ", req.user._id);
      if (userCart) {
        console.log("first condition true");
        userCart.addProduct(productData);
        console.log("NEw cart : ", userCart);
        userCart.save();
      } else {
        const newCart = new cart({
          userId: req.user._id,
          items: [],
        });
        newCart.save();
        newCart.addProduct(productData);
        console.log("cart : ", newCart);
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
export const getCartItems = async (req, res, next) => {
  try {
    const cartItems = await cart.find({ userId: req.user._id });
    res.status(200).json(cartItems);
  } catch (err) {
    next(err);
  }
};

///remove item from cart
export const removeFromCart = async(req,res,next) =>{
  try{
    const productId = req.body.productId
    const thisCart = await cart.findOne({userId:req.user._id})
    thisCart.removeFromCart(productId)
    thisCart.save()
    res.status(200).json("item removed from cart")
  }
  catch(err){
    next(err)
  }
}


///add new address
export const addAddress = async (req, res, next) => {
  try {
    const address = await userAddress.findOne({userId:req.user._id})
    if(address == null){
      const addressData = {
        userId:req.user._id,
        addresses:[req.body]
      }
      const newAddress = new userAddress(addressData)
      await newAddress.save()
    }
    else{
      await address.pushAddress(req.body)
      address.save()
    }
    res.status(200).json("Address added to database")
  } catch (err) {
    next(err);
  }
};


///get all addresses

export const getAddresses = async(req,res,next) =>{
  try{
    const addresses = await userAddress.find({userId:req.user._id})
    if(addresses == null){
      res.status(400).json("No addresses")
    }
    res.status(200).json(addresses)
  }
  catch(err){
    next(err)
  }
}

///remove address
export const removeAddress = async(req,res,next) =>{
  try{
    const addressId = req.body.addressId
    const address = await userAddress.findOne({userId:req.user._id})
    address.removeAddress(addressId)
    address.save()
    res.status(200).json("Address removed")
  }
  catch(err){
    next(err)
  }
}


///updateAddress
export const updateAddress = async(req,res,next) => {
  try{
    const addressId = req.body.addressId
    const updateData = req.body
    const address = await userAddress.findOne({userId:req.user._id})
    address.updateAddress(addressId, updateData)
    address.save()
    res.status(200).json("Address updated")
  }
  catch(err){
    next(err)
  }
}

//get product list
export const getProduct = async (req, res, next) => {
  try {
    let products = await product.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};