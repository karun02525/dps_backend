import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerValidation, loginValidation } from "../../utils/validation.js";
import dotevn from "dotenv";
dotevn.config();

export const createUser = async (req, res) => {
  //validation the data
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //checking if the user is already  in the databae
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({ message: "Email already exists" });

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();

    //Create and assign a token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    const sendData = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
      token: token,
    };
    res
      .status(201)
      .json({ message: "user created successfully", data: sendData });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Login
export const loginUser = async (req, res) => {
  //validation the data
  const { error } = loginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ [error.details[0].context.key]: error.details[0].message });

  //checking if the email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Email is not found" });

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const sendData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    token: token,
  };
  res.json({ message: "login is successfully", data: sendData });
};
