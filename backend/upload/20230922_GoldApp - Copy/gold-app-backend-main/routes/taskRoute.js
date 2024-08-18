const express = require("express");
const router = express.Router();
const controller = require("../controllers/taskController");

router.post("/post", controller.addTasks);
router.get("/get", controller.getAllTasks);

module.exports = router;
