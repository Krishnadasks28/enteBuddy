import { Router } from "express";
import { googleAuth, signin, signup } from "../controllers/userAuth.controller.js";

const router = Router()

router.post('/signin',signin)
router.post('/signup',signup)
router.post('/googleAuth',googleAuth)

export default router