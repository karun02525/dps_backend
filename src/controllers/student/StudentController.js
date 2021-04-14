import User from "../../models/StudentModel.js";
import TeacherModel from "../../models/TeacherModel.js";
import AssignTeacherModel from "../../models/AssignTeacherModel.js";
import AssignRollnoModel from "../../models/AssignRollnoModel.js";
import mongoose from "mongoose";
import StudentAttenModel from "../../models/StudentAttenModel.js";

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
  let assignRoll = null;
  let teacher = null;
  try {
    if (student_id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist
    const user = await User.findOne({ _id: student_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    try {
      assignRoll = await AssignRollnoModel.findOne(
        {
          student_id: student_id,
        },
        { student_id: 0, _id: 0, class_id: 0 }
      );
    } catch (error) {}

    try {
      const assignTeacher = await AssignTeacherModel.findOne({
        class_id: user.class_id,
      });
      teacher = await TeacherModel.findOne(
        {
          _id: assignTeacher.teacher_id,
        },
        {
          fname: 1,
          lname: 1,
          qualification: 1,
          surname: 1,
          phone: 1,
          teacher_picture: 1,
          dob: 1,
          email: 1,
        }
      );
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

//----------Get Profile students or teacher-----------------------------------
export const getAttendance = async (req, res) => {
  const student_id = req.query.student_id;
  let output = null;
  try {
    if (student_id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist

    const data = await StudentAttenModel.find({ student_id: student_id });

    output = {
      teacher_id: "T3453",
      class_id: "C43553",
      section: "B",
      analytics: {
        present: 13,
        absent: 2,
        holiday: 6,
        leave: 1,
      },
      attlist: data,
    };

    res.json({
      message: "attendance data successfully",
      status: "success",
      data: output,
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// getDashboard vai parent id  show list ------------------------------------------------------------------------
export const getDashboard = async (req, res) => {
  const parent_id = req.query.parent_id;
  let output = null;
  let userData = null;
  try {
    //checking if the user exist
    const user = await User.findOne({ parent_id: parent_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "parent_id is not found", status: "faild" });

    try {
      userData = await User.aggregate([
        { $match: { parent_id: parent_id } },
        { $addFields: { userId: { $toString: "$_id" } } },
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
    } catch (error) {}
    output = {
      students: userData,
      banner: null,
    };

    res.json({
      message: "dashboard list",
      data: output,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
