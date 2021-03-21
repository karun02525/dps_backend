import ClassesModel from "../../models/ClassesModel.js";
import AssignClassModel from "../../models/AssignClassModel.js";

import {
  classValidation,
  assignClassValidation,
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
  if (error)
    return res
      .status(400)
      .json({ [error.details[0].context.key]: error.details[0].message });

  const teacherExist = await AssignClassModel.findOne({
    teacher_id: req.body.teacher_id,
  });

  if (teacherExist)
    return res.status(400).json({ message: "teacher already assign" });

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
