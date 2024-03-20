import { Router } from "express";
import { adminSignin } from "../controllers/admin.controller.js";
const router = Router();

router.post("/signin", adminSignin);

export default router;
