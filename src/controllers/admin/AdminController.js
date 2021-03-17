import ClassesModel from "../../models/ClassesModel.js";
import { classValidation } from "../../utils/AdminValidation.js";

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
      data: { _id: savedClass._id, classname: savedClass.classname },
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

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
