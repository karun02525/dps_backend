import User from "../../models/StudentModel.js";

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

export const getProfile = async (req, res) => {
  try {
    const data = await User.findOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({
        message: "students not found",
        status: "faild",
      });
    }
    res.json({
      message: "geting data successfully",
      data: data,
      status: "success",
    });
  } catch (error) {
    res.status(500).send({ message: "something went wrong", status: "faild" });
  }
};
