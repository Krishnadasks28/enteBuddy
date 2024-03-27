import { Router } from "express";
import { userAuth } from "../controllers/userAuth.controller.js";

const router = Router()

router.post('/userAuth',userAuth)
// router.post('/googleAuth',googleAuth)

export default router