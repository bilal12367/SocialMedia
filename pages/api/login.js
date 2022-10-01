import connectDB from "../../utils/mongoConnect";
import authMiddleware from "./middleware/authMiddleware";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { setCookie } from "cookies-next";
const handler = async (req, res) => {
  const { email, password } = req.body;
  if (mongoose.connection.readyState == 0) {
    await connectDB();
  }
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        await user.generateTokens();
        const user1 = await user.save();
        setCookie("c_user", user.token, {
          req,
          res,
          maxAge: 60 * 60 * 24 * 70,
        });
        res.status(200).json({ message: "User Logged In Successfully..." });
      } else {
        res
          .status(401)
          .json({ error: "Unauthorized", message: "Wrong Password." });
      }
    } else {
      res
        .status(401)
        .json({ error: "Unauthorized", message: "User Not Found!!" });
    }
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export default handler;
