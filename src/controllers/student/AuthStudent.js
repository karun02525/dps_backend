import User from "../../models/StudentModel.js";
import ParentModel from "../../models/ParentModel.js";
import AssignRollnoModel from "../../models/AssignRollnoModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  studentRegisterValidation,
  parentLoginValidation,
  parentRegValidation,
} from "../../utils/AuthValidation.js";
import dotevn from "dotenv";
import { makeid } from "../../utils/utils.js";
dotevn.config();

export const createUser = async (req, res) => {
  //validation the data
  const { error } = studentRegisterValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //checking if the user first name is already  in the databae
  const fnameExist = await User.findOne({ fname: req.body.fname });
  if (fnameExist)
    return res.status(400).json({ message: "Please change student name" });

  //checking if the user dob is already  in the databae
  const dobExist = await User.findOne({ dob: req.body.dob });
  if (dobExist)
    return res.status(400).json({ message: "student already exists" });

  //create a new user
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json({
      status: "success",
      message: "student created successfully",
      data: { _id: savedUser._id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Registration parent
export const createParent = async (req, res) => {
  //validation the data
  const { error } = parentRegValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //checking if the user dob is already  in the databae
  const dobExist = await ParentModel.findOne({ dob: req.body.dob });
  if (dobExist)
    return res.status(400).json({ message: "Parent already exists" });

  //hash passwords
  const parent_id = makeid();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(parent_id, salt);

  //create a new user
  const parent = new ParentModel(req.body);
  parent.password = hashedPassword;
  parent.parent_id = parent_id;
  try {
    const savedUser = await parent.save();
    res.status(201).json({
      status: "success",
      message: "parent created successfully",
      data: { parent_id: parent_id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

//Login----Parent--------------------------------------------------------------------------------
export const loginParent = async (req, res) => {
  //validation the data
  const { error } = parentLoginValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  //checking if the email exist
  const user = await ParentModel.findOne({ parent_id: req.body.parent_id });
  if (!user) return res.status(400).json({ message: "parent id is not found" });

  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  const userData = await User.aggregate([
    { $match: { parent_id: req.body.parent_id } },
    { "$addFields": { "userId": { "$toString": "$_id" }}},
    {
      $lookup: {
        from: "rollno-assigns",
        localField: "userId",
        foreignField: "student_id",
        as: "classes",
      },
    },
   { $unwind: "$classes" },
    {
      $project: {
        fname: 1,
        lname: 1,
        surname: 1,
        class_id: 1,
        student_picture: 1,
        class_name: "$classes.class_name",
        section: "$classes.section",
        roll_no: "$classes.roll_no",
      },
    },
  ]);

  //const classData = await AssignRollnoModel.find({});

  const response = {
    data: userData,
    parent_id: req.body.parent_id,
    token: token,
  };
  res.json({ message: "login is successfully", data: response });
};
