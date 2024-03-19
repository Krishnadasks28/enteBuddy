import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...userinfo } = validUser._doc;
    res
      .cookie("access token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 24 * 60 * 60 * 10),
      })
      .status(200)
      .json(userinfo);
  } catch (err) {
    next(err);
  }
};

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(401, "Existing User"));
    }
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      name: username,
      email,
      password: hashedPassword,
    });
    newUser.save();
    res.status(200).json("User created successfully");
  } catch (err) {
    next(err);
  }
};
