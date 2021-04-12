import TeacherModel from "../../models/TeacherModel.js";
import StudentsModel from "../../models/StudentModel.js";
import AssignTeacherModel from "../../models/AssignTeacherModel.js";
import { attendanceValidation } from "../../utils/Validation.js";
import AttendanceModel from "../../models/AttendanceModel.js";
import StudentAttenModel from "../../models/StudentAttenModel.js";

export const getUsers = async (req, res) => {
  try {
    const data = await TeacherModel.find();
    res.json({
      message: "geting data successfully",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

export const getuser = async (req, res) => {
  try {
    const data = await TeacherModel.findOne({
      registration_no: req.params.id,
    });
    res.json({
      message: "geting data successfully",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

//----------Get Profile teacher or students-----------------------------------
export const getProfile = async (req, res) => {
  const teacher_id = req.query.teacher_id;
  try {
    if (teacher_id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist
    const user = await TeacherModel.findOne({ _id: teacher_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "teacher is not found", status: "faild" });

    res.json({
      message: "geting data successfully",
      status: "success",
      data: { student: user, teacher: teacherData },
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// Get Students vai teacher id and section show list ------------------------------------------------------------------------
export const getStudents = async (req, res) => {
  //const teacher_id = req.query.teacher_id;
  const class_id = req.query.class_id;
  const section = req.query.section;
  try {
    const studentData = await StudentsModel.aggregate([
      { $match: { class_id: class_id } },
      { $addFields: { userId: { $toString: "$_id" } } },
      {
        $lookup: {
          from: "rollno-assigns",
          localField: "userId",
          foreignField: "student_id",
          as: "classes",
        },
      },
      { $match: { "classes.section": section } },
      { $unwind: "$classes" },
    ]);

    res.json({
      message: "students list",
      data: studentData,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// getDashboard vai teacher id  show list ------------------------------------------------------------------------
export const getDashboard = async (req, res) => {
  const teacher_id = req.query.teacher_id;
  let output = null;
  let classes = null;
  try {
    //checking if the user exist
    const user = await TeacherModel.findOne({ _id: teacher_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "teacher is not found", status: "faild" });

    try {
      classes = await AssignTeacherModel.findOne(
        { teacher_id: teacher_id },
        { _id: 0, teacher_id: 0 }
      );
    } catch (erro) {}

    output = {
      teacher: user,
      class_info: classes,
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

export const createAttendance = async (req, res) => {
  const nowDate = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  try {
    const { error } = attendanceValidation(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const checkAtten = await AttendanceModel.findOne({ atten_date: nowDate }); //"2021-04-13"
    if (checkAtten)
      return res.status(400).json({ message: "Attendance already submited" });

    const done = await StudentAttenModel.insertMany(req.body.attlist);
    //console.log("Save Student attendance: ", done);

    //submit attendance
    const attenParam = new AttendanceModel(req.body);
    try {
      const savedAtten = await attenParam.save();
      res.status(201).json({
        status: "success",
        message: "Attendance submited successfully",
        data: { _id: savedAtten._id },
      });
    } catch (error) {
      res.status(500).send(error);
    }
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
