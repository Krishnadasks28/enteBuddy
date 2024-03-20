import admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import product from "../models/prodect.model.js";

export const adminSignin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const Admin = await admin.findOne({});
    console.log("ADmin : ", Admin);
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
};


///add new product
export const uploadProduct = async (req, res, next) => {
  try {
    console.log("req.body : ",req.body)
    const primaryImage = {
      name: req.files.primaryImage[0].filename,
      path: req.files.primaryImage[0].path,
    };
    let secondaryImages = req.files.secondaryImages;
    secondaryImages = secondaryImages.map((image) => {
      return {
        name: image.filename,
        path: image.path,
      };
    });
    console.log("secondaryImages : ", secondaryImages);

    const newProduct = new product({
      title: req.body.title,
      description: req.body.description,
      brand: req.body.brand || "EnteBuddy",
      color: req.body.color || "",
      price: req.body.price,
      quantity: req.body.quantity,
      features: req.body.features,
      discount: req.body.discount,
      primaryImage: primaryImage,
      secondaryImages: secondaryImages,
    });
    newProduct.save();
    res.status(200).json({"New product added with id :" : newProduct._id});
  } catch (err) {
    next(err);
  }
};
