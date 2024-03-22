import { Router } from "express";
import {
  adminSignin,
  getProduct,
  updateProduct,
  uploadProduct,
} from "../controllers/admin.controller.js";
import { imageUpload } from "../utils/fileUpload.js";
import { verifyAdmin } from "../utils/authorisation.js";
const router = Router();

router.post("/signin", adminSignin);

//add new product
router.post("/addProduct", verifyAdmin, imageUpload, uploadProduct);

//get all products from database
router.get("/getProducts/:userId", verifyAdmin, getProduct);

//product update api
router.post(
  "/updateProduct/:userId/:productId",
  verifyAdmin,
  imageUpload,
  updateProduct
);
export default router;
