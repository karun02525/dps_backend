import User from "../../models/StudentModel.js";
import Teacher from "../../models/TeacherModel.js";
import AssignClassModel from "../../models/AssignClassModel.js";

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
    if (id.length != 24)
      return res.status(400).json({ message: "Please valid id" });

    //checking if the user exist
    const user = await User.findOne({ _id: student_id });
    if (!user)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    const assignData = await AssignClassModel.findOne({
      class_id: user.class_id,
    });
    if (assignData) {
      teacherData = await Teacher.findOne({ _id: assignData.teacher_id });
    }

    res.json({
      message: "geting data successfully",
      status: "success",
      data: { student: user, teacher: teacherData },
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
