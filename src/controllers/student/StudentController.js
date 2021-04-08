import User from "../../models/StudentModel.js";
import Teacher from "../../models/TeacherModel.js";
import AssignClassModel from "../../models/AssignTeacherModel.js";
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
  let teacherData = null;
  try {
    if (student_id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist
    const user = await User.findOne({ _id: student_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    const userData = await User.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(student_id) } },
      {
        $lookup: {
          from: "rollno-assigns",
          localField: "class_id",
          foreignField: "class_id",
          as: "classes",
        },
      },
      { $unwind: "$classes" },
      {
        $lookup: {
          from: "teacher-assigns",
          localField: "class_id",
          foreignField: "class_id",
          as: "teacher-assigns",
        },
      },
      { $unwind: "$teacher-assigns" },
      {
        $lookup: {
          from: "reg-teachers",
          localField: "teacher_id",
          foreignField: "teacher_id",
          as: "reg-teachers",
        },
      },
      { $unwind: "$reg-teachers" },
    ]);

    res.json({
      message: "geting data successfully",
      status: "success",
      data: userData,
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
