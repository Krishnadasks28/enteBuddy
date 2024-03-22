import { Router } from "express";
import { addAddress, addToCart, getAddresses, getCartItems } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/authorisation.js";

const router = Router()

router.get('/proflie',(req,res)=>{
    res.json("THis is profile page")
})

///add new product to cart and also update quantity in the cart
router.post('/addToCart/:userId',verifyUser,addToCart)

///get products from cart
router.get('/getCart/:userId',verifyUser,getCartItems)


///add new address
router.post('/addAddress/:userId',verifyUser,addAddress)

///list all address
router.get('/getAddresses/:userId',verifyUser,getAddresses)
export default router