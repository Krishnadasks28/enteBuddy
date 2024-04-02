import admin from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import product from "../models/product.model.js";
import { banner } from "../models/banner.model.js";

export const adminSignin = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    const Admin = await admin.findOne({});
    if (Admin.name == name && Admin.password == password) {
      const token = jwt.sign({ id: Admin._id }, process.env.JWT_SECRET);

      res
        .cookie("admin_token", token, {
          httpOnly: true,
          secure: true,
          sameSite: true,
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
    console.log("req.body : ", req.body);
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
    res.status(200).json({ "New product added with id :": newProduct._id });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    let products = await product.find({});
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

export const updateProduct = async (req, res, next) => {
  const productId = req.params.productId
  try {
    console.log("req.body : ", req.body);
    let primaryImage;

    if (req.files.primaryImage) {
      primaryImage = {
        name: req.files.primaryImage[0].filename,
        path: req.files.primaryImage[0].path,
      };
    }
    let secondaryImages;
    if (req.files.secondaryImages) {
      secondaryImages = req.files.secondaryImages;
      secondaryImages = secondaryImages.map((image) => {
        return {
          name: image.filename,
          path: image.path,
        };
      });
    }

    const update = {
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
    };
    await product.updateOne({ _id: productId }, { $set: update });
    res.status(200).json({"product updated with id :":productId});
  } catch (err) {
    next(err);
  }
};

/// Banner management

//add new banner
export const addBanner = async(req,res,next)=>{
  try{
    const bannerData = {
      title:req.body.title,
      path:req.file.path,
      startDate:new Date(req.body.startDate),
      endDate:new Date(req.body.endDate)
    }
    const newBanner = new banner(bannerData)
    await newBanner.save()
    res.status(200).json("New banner added")
  }
  catch(err){
    next(err)
  }
}

//update banner
export const updateBanner = async(req,res,next)=>{
  try{
    const bannerId = req.params.bannerId
    const bannerData = {
      title:req.body.title,
      startDate:req.body.startDate ? new Date(req.body.startDate) : undefined ,
      endDate:req.body.endDate ? new Date(req.body.endDate) : undefined
    }
    console.log("banner image : ",req.file)
    if(req.file){
      console.log("Bannder image true")
      bannerData.path = req.file.path
    }

    await banner.updateOne({_id:bannerId},{$set:bannerData})
    res.status(200).json("Banner updated")
  }
  catch(err){
    next(err)
  }
}

//get all banners data
export const getBanners = async(req,res,next)=>{
  try{
    const allBanners = await banner.find({})
    res.status(200).json(allBanners)
  }
  catch(err){
    next(err)
  }
}
