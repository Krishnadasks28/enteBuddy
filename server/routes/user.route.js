import { Router } from "express";

const router = Router()

router.get('/proflie',(req,res)=>{
    res.json("THis is profile page")
})