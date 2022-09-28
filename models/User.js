import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Please Provide Valid Email.",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: validator.isStrongPassword,
      message:
        "Please Provide Password with atleast One Capital Letter, one small letter , one special character and one Number",
    },
  },
  token: {
    type: String,
    trim: true,
  },
  image: {
    type: mongoose.Types.ObjectId,
    ref: "files",
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: 1200,
  });
});

UserSchema.methods.refreshToken = function () {
  this.token = jwt.sign({ id: this._id }, process.env.SECRET_KEY, {
    expiresIn: 1200,
  });
  return this.token;
};

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};
module.exports = mongoose.models.users || mongoose.model("users", UserSchema);
