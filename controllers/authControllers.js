import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import ErrorResponse from "../utils/ErrorResponse.js";

const createToken = (userId) => {
  return jwt.sign({ _id: userId }, process.env.SECRET, { expiresIn: "1h" }); // 1 час
};

const setAuthCookie = (res, token) => {
  const secure = !["development", "test"].includes(process.env.NODE_ENV);
  res.cookie("token", token, {
    httpOnly: true,
    secure,
    sameSite: "none",
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  });
};

const userSignup = async (req, res) => {
  const { email, password } = req.body;

  const emailInUse = await User.exists({ email });
  if (emailInUse) throw new ErrorResponse("Email already in use", 409);

  // passw0rd hashing
  const salt = await bcrypt.genSalt(15);
  const hashedPW = await bcrypt.hash(password, salt);

  const user = await User.create({ ...req.body, password: hashedPW });
  const userObject = user.toObject();
  delete userObject.password;

  // console.log(process.env.SECRET);
  const token = createToken(user._id);
  setAuthCookie(res, token);
  res
    .status(201)
    .json({ message: "User created successfully", token, userObject });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password").lean();
  if (!user) throw new ErrorResponse("Incorrect credentials", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new ErrorResponse("Incorrect credentials", 401);

  const token = createToken(user._id);

  delete user.password;

  setAuthCookie(res, token);
  res.json({ message: "Logged in", token, data: user });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

const getMe = async (req, res) => {
  const { _id } = req.user;

  const data = await User.findById(_id);
  res.json({ message: "Logged in", data });
};

export { userSignup, login, logout, getMe };
