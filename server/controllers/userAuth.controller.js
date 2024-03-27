import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";


// signup controller
export const userAuth = async (req, res, next) => {
  const mobile = req.body.mobile;
  try {
    const existingUser = await User.findOne({ mobile });
    let userInfo;
    let newUser;
    if (existingUser) {
      userInfo = existingUser;
    } else {
      newUser = new User({
        mobile,
      });
      await newUser.save();
      userInfo = newUser;
    }
    const token = jwt.sign({ userInfo }, process.env.JWT_SECRET);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 100),
      })
      .status(200)
      .json(userInfo);
  } catch (err) {
    next(err);
  }
};

//google auth
// export const googleAuth = async (req, res, next) => {
//   const { username, email } = req.body;
//   try {
//     const existingUser = await User.findOne({ email });
//     let userId;
//     if (existingUser) {
//       userId = existingUser._id;
//     } else {
//       const password = username + Math.round(Math.random() * 100000);
//       const newUser = new User({ name: username, email, password });
//       newUser.save();
//       id = newUser._id;
//     }
//     const userinfo = {username,_id:userId,email}
//     const token = jwt.sign({ userinfo }, process.env.JWT_SECRET);
//     res
//       .cookie("access_token", token, {
//         httpOnly: true,
//         secure: true,
//         expires: new Date(Date.now() + 24 * 60 * 60 * 10),
//       })
//       .status(200)
//       .json({ username, email, id });
//   } catch (err) {
//     next(err);
//   }
// };
