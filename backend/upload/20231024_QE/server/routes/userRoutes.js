const express = require("express");
const controller = require("../controllers/userController");
const router = express.Router();

// const verifyJWT = require("../middleware/verifyJWT");
const {isAuthenticatedUser} = require('../middleware/authentication')
router.use(isAuthenticatedUser); //to apply verification to all the routes

router.get("/get", controller.getAllUsers);
router.get("/getWithPopulation", controller.getAllUsersWithPopulate);
router.get(
  "/getWithPopulationWithId/:id",
  controller.getAllUsersWithPopulateWithId
);
router.get(
  "/getVerifiedUser/:usernameparams/:password",
  controller.getVerifiedUser
);
router.get("/getOneUserByUserName/:id", controller.getOneUserWithUserName);
router.post("/post", controller.createNewUser);
router.put("/put/:id", controller.updateUser);
router.get('/me', controller.getUserDetails)
router.get('/refreshToken', controller.refreshToken)
router.put(
  "/updateUserPassword/:usernameparams",
  controller.updateUserPassword
);
router.put(
  "/updatePrinterId/:id",
  controller.updateUserPrinterById
);
router.put("/updateTableRowId/:id", controller.updateUserTableRowById);
router.put(
  "/updateUserPassword/:usernameparams",
  controller.updateUserPassword
);
router.delete("/delete/:id", controller.deleteUser);
router.get("/activeUsers", controller.getTotalAndActiveUsers);

module.exports = router;
