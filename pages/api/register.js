import connectDB from "../../utils/mongoConnect";
import authMiddleware from "./middleware/authMiddleware";
import User from "../../models/User";
import mongoose from "mongoose";

const handler = async (req, res, data) => {
  console.log(
    "mongoose.connection.readyState :>> ",
    mongoose.connection.readyState
  );
  if (mongoose.connection.readyState == 0) {
    await connectDB();
  }
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(200).json({ token: user.token });
  } catch (error) {
    res.status(500).json({
      error: error,
    });
  }
};

export default handler;
