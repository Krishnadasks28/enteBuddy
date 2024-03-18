import { Router } from "express";
import { signin } from "../controllers/userAuth.controller";

const router = Router()

router.post('/signin',signin)