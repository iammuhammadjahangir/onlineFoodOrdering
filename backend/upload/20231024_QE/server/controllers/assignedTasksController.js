const assignRole = require("../models/taskAssignedModel");
const taskModel = require("../models/taskModel");
exports.assignRole = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { role, task, status } = req.body;

    const assignedRole = await assignRole.findOne({ role: role, task: task });
    const statusBool = status === "true" || status === true ? true : false;
    console.log(statusBool);
    console.log(typeof statusBool);
    console.log(assignedRole);

    if (!assignedRole) {
      console.log("No role assigned");
      await assignRole.create({
        role: role,
        task: task,
        status: statusBool,
      });
      res.status(201).json("Permission Added");
    } else {
      console.log("role Assignment failed");
      assignedRole.status = status;
      await assignedRole.save();

      res.status(201).json("Permission Updated");
    }

    console.log("helo");
  } catch (e) {
    res.status(500).json({
      message: "Something went ",
      e,
    });
  }
};

exports.getAllAssignedRoles = async (req, res, next) => {
  try {
    const data = await assignRole.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};
exports.getOneAssignedRoleById = async (req, res, next) => {
  try {
    const { role, task } = req.params;
    console.log(role, task);
    const data = await assignRole.find({ role: role, task: task });
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};
exports.getOneAssignedRoleByIdAndName = async (req, res, next) => {
  try {
    const { role } = req.params;
    const { taskName } = req.body;
    console.log(role);
    console.log(req.body.taskName);
    console.log(req.query);
    console.log("taskName");

    // Assuming taskModel.findOne() returns a promise
    const taskId = await taskModel.findOne({ taskName: req.query.taskName });

    console.log(taskId);

    if (!taskId) {
      return res.status(200).json({ message: "Invalid Task" });
    }

    const data = await assignRole.find({ role: role, task: taskId._id });

    if (!data || data.length === 0) {
      console.log("enetred");
      return res.status(200).json({ status: false });
    }

    const status = data[0].status;
    console.log(data);
    res.status(200).json({ status });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
exports.getOnlyAllowedTasks = async (req, res, next) => {
  try {
    const { role } = req.params;
    console.log(role);
    const taskId = await assignRole
      .find({ role: req.params.role, status: true })
      .populate("task");
    if (!taskId) {
      return res.status(200).json({ message: "No Task Added" });
    }
    // console.log(taskId);
    // console.log(taskId.task[0].taskName);
    console.log("hh", taskId);

    // Extract task names to a separate array
    const taskNamesArray = taskId.map(
      (taskObject) => taskObject.task?.taskName
    );
    console.log(taskNamesArray);
    if (!taskNamesArray) {
      return res.status(200).json({ message: "No Task Assigned" });
    }
    res.status(200).json({ taskNamesArray });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
