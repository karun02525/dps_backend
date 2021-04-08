import ClassesModel from "../../models/ClassesModel.js";
import StudentModel from "../../models/StudentModel.js";
import ParentModel from "../../models/ParentModel.js";
import AssignTeacherModel from "../../models/AssignTeacherModel.js";
import AssignRollnoModel from "../../models/AssignRollnoModel.js";
import TeacherModel from "../../models/TeacherModel.js";

import {
  classValidation,
  assignTeacherValidation,
  assignRollnoValidation,
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

// Get parent list ------------------------------------------------------------------------
export const getParents = async (req, res) => {
  try {
    const data = await ParentModel.find();
    if (Object.entries(data).length === 0) {
      return res.status(400).json({
        message: "parent list not found",
        status: "faild",
      });
    }
    res.json({
      message: "parent list",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};

// Get Students search vai class id show list ------------------------------------------------------------------------
export const getStudents = async (req, res) => {
  const class_id = req.query.class_id;
  try {
    const data = await StudentModel.find({ class_id: class_id});
    if (Array.isArray(data) && data.length===0)
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

// Assign class to Teacher-----------------------------------------------------------------
export const assignTeacher = async (req, res) => {
  const { error } = assignTeacherValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const teacherExist = await AssignTeacherModel.findOne({
    teacher_id: req.body.teacher_id,
  });

  if (teacherExist)
    return res.status(400).json({ message: "teacher already assign" });

  try {
    const savedData = await new AssignTeacherModel(req.body).save();
    res.status(201).json({
      status: "success",
      message: "teacher assigned successfully",
      data: { _id: savedData._id },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Assign Class,Section,Roll No to student-----------------------------------------------------------------
export const assignRollno = async (req, res) => {
  const { error } = assignRollnoValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const studentExist = await AssignRollnoModel.findOne({
    student_id: req.body.student_id,
  });

  if (studentExist)
    return res
      .status(400)
      .json({ message: "the student roll no already exits" });

  // const user = await Student.findOneAndUpdate(
  //   { _id: req.body.student_id },
  //   { $set: { section: req.body.section, class_name: req.body.class_name } },
  //   { upsert: true }
  // );

  try {
    const savedData = await new AssignRollnoModel(req.body).save();
    res.status(201).json({
      status: "success",
      message: "student roll no assigned successfully",
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

