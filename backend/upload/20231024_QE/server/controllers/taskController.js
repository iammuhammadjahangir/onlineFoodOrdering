const task = require("../models/taskModel");

exports.addTasks = async (req, res, next) => {
  try {
    console.log(req.body);
    const { taskName, taskDescription } = req.body;

    const data = await task.create({
      taskName,
      taskDescription,
    });

    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};

exports.getAllTasks = async (req, res, next) => {
  try {
    const data = await task.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};
