import User from "../../models/TeacherModel.js";
import Students from "../../models/StudentModel.js";
import AssignClassModel from "../../models/AssignClassModel.js";

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

export const getuser = async (req, res) => {
  try {
    const data = await User.findOne({
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

// Get Students vai teacher id and section show list ------------------------------------------------------------------------
export const getStudents = async (req, res) => {
  const teacher_id = req.query.teacher_id;
  try {
    const data = await AssignClassModel.findOne({
      teacher_id: teacher_id,
    });
    if (!data)
      return res
        .status(400)
        .json({ message: "assign teacher is not found", status: "faild" });

    console.log("########## " + data.class_id);

    const studentData = await Students.find({
      class_id: data.class_id,
    });
    if (!studentData)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    res.json({
      message: "students list",
      data: studentData,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
