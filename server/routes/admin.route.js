import { Router } from "express";
import { adminSignin, uploadProduct } from "../controllers/admin.controller.js";
import { imageUpload } from "../utils/fileUpload.js";
const router = Router();

router.post("/signin", adminSignin);

//add new product
router.post("/addProduct", imageUpload, uploadProduct);

export default router;
