import ClassesModel from "../../models/ClassesModel.js";
import AssignClassModel from "../../models/AssignClassModel.js";
import AssignSectionModel from "../../models/AssignSectionModel.js";
import Student from "../../models/StudentModel.js";
import TeacherModel from "../../models/TeacherModel.js";

import {
  classValidation,
  assignClassValidation,
  assignSectionValidation,
} from "../../utils/AdminValidation.js";

//Create class -----------------------------------------------------------------------
export const createClasses = async (req, res) => {
  const { error } = classValidation(req.body);
  if (error)
    return res
      .status(400)
      .json({ [error.details[0].context.key]: error.details[0].message });

  const classnameExist = await ClassesModel.findOne({
    classname: req.body.classname,
  });
  if (classnameExist)
    return res.status(400).json({ message: "class name already exists" });

  try {
    const savedClass = await new ClassesModel(req.body).save();
    res.status(201).json({
      status: "success",
      message: "classes created successfully",
      data: {
        _id: savedClass._id,
        classname: savedClass.classname,
        section: savedClass.section,
      },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get classes list ------------------------------------------------------------------------
export const getClasses = async (req, res) => {
  try {
    const data = await ClassesModel.find();
    if (Object.entries(data).length === 0) {
      return res.status(400).json({
        message: "classes list not found",
        status: "faild",
      });
    }
    res.json({
      message: "classes list",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// Assign class to Teacher-----------------------------------------------------------------
export const assignClasses = async (req, res) => {
  const { error } = assignClassValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const teacherExist = await AssignClassModel.findOne({
    teacher_id: req.body.teacher_id,
  });

  if (teacherExist)
    return res.status(400).json({ message: "teacher already assign" });

  const user = await TeacherModel.findOneAndUpdate(
    { _id: req.body.teacher_id },
    {
      $set: {
        section: req.body.section,
        class_id: req.body.class_id,
        class_name: req.body.class_name,
      },
    },
    { upsert: true }
  );

  try {
    const savedData = await new AssignClassModel(req.body).save();
    res.status(201).json({
      status: "success",
      message: "teacher assigned successfully",
      data: { _id: savedData._id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Assign class Section to student-----------------------------------------------------------------
export const assignSection = async (req, res) => {
  const { error } = assignSectionValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const studentExist = await AssignSectionModel.findOne({
    student_id: req.body.student_id,
  });

  if (studentExist)
    return res
      .status(400)
      .json({ message: "this student already assign section" });

  const user = await Student.findOneAndUpdate(
    { _id: req.body.student_id },
    { $set: { section: req.body.section, class_name: req.body.class_name } },
    { upsert: true }
  );

  try {
    const savedData = await new AssignSectionModel(req.body).save();
    res.status(201).json({
      status: "success",
      message: "student section assigned successfully",
      data: { _id: savedData._id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Assign Teacher list ------------------------------------------------------------------------
export const getAssignTeacher = async (req, res) => {
  try {
    const data = await AssignClassModel.find();
    if (Object.entries(data).length === 0) {
      return res.status(400).json({
        message: "assign list not found",
        status: "faild",
      });
    }
    res.json({
      message: "assign teacher a classes list",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// Get Assign Section list ------------------------------------------------------------------------
// export const getAssignTeacher = async (req, res) => {
//   try {
//     const data = await AssignClassModel.find();
//     if (Object.entries(data).length === 0) {
//       return res.status(400).json({
//         message: "assign list not found",
//         status: "faild",
//       });
//     }
//     res.json({
//       message: "assign teacher a classes list",
//       data: data,
//       status: "success",
//     });
//   } catch (error) {
//     res.status(500).send({ message: "something went wrong", status: "faild" });
//   }
// };

// Get Students vai class id and section show list ------------------------------------------------------------------------
export const getStudents = async (req, res) => {
  const class_id = req.query.class_id;
  try {
    const data = await Student.find({
      class_id: class_id,
    });
    if (!data)
      return res
        .status(400)
        .json({ message: "students is not found", status: "faild" });

    res.json({
      message: "students list",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
