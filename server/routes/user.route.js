import { Router } from "express";
import { addAddress, addToCart, getAddresses, getCartItems, removeAddress, removeFromCart, updateAddress } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/authorisation.js";

const router = Router()

///add new product to cart and also update quantity in the cart
router.post('/addToCart/:userId',verifyUser,addToCart)

///get products from cart
router.get('/getCart/:userId',verifyUser,getCartItems)

///remove product from cart
router.delete('/removeFromCart/:userId',verifyUser,removeFromCart)

///add new address
router.post('/addAddress/:userId',verifyUser,addAddress)

///list all address
router.get('/getAddresses/:userId',verifyUser,getAddresses)

///updateADdress
router.put('/updateAddress/:userId',verifyUser,updateAddress)

///remove address
router.delete("/removeAddress/:userId",verifyUser,removeAddress)


export default router