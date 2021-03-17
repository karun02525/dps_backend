import User from "../../models/TeacherModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  teacherRegisterValidation,
  teacherLoginValidation,
} from "../../utils/AuthValidation.js";
import dotevn from "dotenv";
dotevn.config();

export const createUser = async (req, res) => {
  //validation the data
  const { error } = teacherRegisterValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ [error.details[0].context.key]: error.details[0].message });

  //checking if the user is already  in the databae
  const regNoExist = await User.findOne({
    registration_no: req.body.registration_no,
  });
  if (regNoExist)
    return res.status(400).json({ message: "registration no already exists" });

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.registration_no, salt);

  //create a new user
  const user = new User(req.body);
  user.password = hashedPassword;
  try {
    const savedUser = await user.save();
    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: { _id: savedUser._id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Login-------------------------------------------------------------------------------------------
export const loginUser = async (req, res) => {
  //validation the data
  const { error } = teacherLoginValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ [error.details[0].context.key]: error.details[0].message });

  //checking if the email exist
  const user = await User.findOne({
    registration_no: req.body.registration_no,
  });
  if (!user)
    return res.status(400).json({ message: "registration no is not found" });

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  user.token = token;

  res.json({ message: "login is successfully", data: user });
};
