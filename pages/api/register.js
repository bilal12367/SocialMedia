import connectDB from "../../utils/mongoConnect";
import authMiddleware from "./middleware/authMiddleware";
import User from "../../models/User";
import mongoose from "mongoose";

const handler = async (req, res, data) => {
  if (mongoose.connection.readyState == 0) {
    await connectDB();
  }
  const { name, email, password } = req.body;
  const user = await User.findOne({ email: email });
  // const user = null;
  console.log("user :>> ", user);
  if (user == null) {
    try {
      const user = await User.create({ name, email, password });
      setCookie("c_user", user.token, {
        req,
        res,
        maxAge: 60 * 60 * 24 * 70,
      });
      res.status(200).json({ message: "User Registered Successfully..." });
    } catch (error) {
      res.status(500).json({
        error: error,
      });
    }
  } else {
    res.status(401).json({
      error: "Unauthorized",
      message: "User already exists.",
    });
  }
};

export default handler;
