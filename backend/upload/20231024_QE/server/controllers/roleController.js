const roleModel = require("../models/rolesModel");

exports.addRole = async (req, res, next) => {
  try {
    console.log(req.body);
    const { roleName, roleDescription } = req.body;

    const role = await roleModel.findOne({ roleName: roleName });

    if (!role) {
      const data = await roleModel.create({
        roleName,
        roleDescription,
      });

      res.status(200).json({ data });
    }

    res.status(201).json("record already exists");
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};

exports.getAllRoles = async (req, res, next) => {
  try {
    const data = await roleModel.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({
      message: "Something went wrongg",
      e,
    });
  }
};
