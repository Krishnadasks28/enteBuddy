import { Router } from "express";
import {
  addBanner,
  adminSignin,
  getBanners,
  getProduct,
  updateBanner,
  updateProduct,
  uploadProduct,
} from "../controllers/admin.controller.js";
import { bannerImageUpload, changeBannerImage, imageUpload } from "../utils/fileUpload.js";
import { verifyAdmin } from "../utils/authorisation.js";
const router = Router();

router.post("/signin", adminSignin);

//add new product
router.post("/addProduct/:adminId", verifyAdmin, imageUpload, uploadProduct);

//get all products from database
router.get("/getProducts/:adminId", verifyAdmin, getProduct);

//product update api
router.put(
  "/updateProduct/:adminId/:productId",
  verifyAdmin,
  imageUpload,
  updateProduct
);


///banner management

//add new banner
router.post("/addBanner/:adminId",verifyAdmin,bannerImageUpload,addBanner)

// update banner
router.put("/updateBanner/:adminId/:bannerId",verifyAdmin,bannerImageUpload,updateBanner)

// list all banners
router.get("/getBanners/:adminId",verifyAdmin,getBanners)
export default router;
