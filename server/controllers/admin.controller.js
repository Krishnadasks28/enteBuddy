import admin from "../models/admin.model";
import jwt from 'jsonwebtoken'
import { errorHandler } from "../utils/error";


export const adminSignin = async (req, res, next) => {
    const { name, password } = req.body;
    try {
      const Admin = await admin.findOne({});
      console.log("ADmin : ",Admin)
      if (Admin.name == name && Admin.password == password) {
        const token = jwt.sign({ id: Admin._id }, process.env.JWT_SECRET);
  
        res
          .cookie("admin token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + 24 * 60 * 60 * 100),
          })
          .status(200)
          .json(Admin._id);
      } else {
        return next(errorHandler(403, "Access denied"));
      }
    } catch (Err) {
      next(Err);
    }
  }