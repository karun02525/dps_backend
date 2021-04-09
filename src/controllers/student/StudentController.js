import User from "../../models/StudentModel.js";
import TeacherModel from "../../models/TeacherModel.js";
import AssignTeacherModel from "../../models/AssignTeacherModel.js";
import AssignRollnoModel from "../../models/AssignRollnoModel.js";
import mongoose from "mongoose";

// -------------------------------------------------------
export const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    res.json({
      message: "geting data successfully",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

//----------Get Profile students or teacher-----------------------------------
export const getProfile = async (req, res) => {
  const student_id = req.query.student_id;
  let output = null;
  let assignRoll=null;
  let teacher=null;
  try {
    if (student_id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist
    const user = await User.findOne({ _id: student_id },{class_id:0});
    if (!user)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    try {
       assignRoll = await AssignRollnoModel.findOne({
        student_id: student_id},{student_id:0,_id:0
      });
    } catch (error) {}

    try {
      const assignTeacher = await AssignTeacherModel.findOne({
        class_id: assignRoll.class_id,
      });
      teacher = await TeacherModel.findOne({
        _id: assignTeacher.teacher_id},{fname:1,lname:1,qualification:1,surname:1,phone:1,teacher_picture:1});
    } catch (error) {}


    output = {
      student: user,
      class_info: assignRoll,
      teacher: teacher,
    };

    res.json({
      message: "geting data successfully",
      status: "success",
      data: output,
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
