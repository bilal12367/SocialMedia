import connectDB from "../../utils/mongoConnect";
import authMiddleware from "./middleware/authMiddleware";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
const handler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const isMatch = await user.comparePassword(password);
      if (isMatch) {
        await user.refreshToken();
        res.status(200).json({ token: user.token });
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
