const express = require("express");
const controller = require("../controllers/shopController");
const { isAuthenticatedUser } = require("../middleware/authentication");
const router = express.Router();
// const verifyJWT = require("../middleware/verifyJWT");
//  router.use(isAuthenticatedUser); //to apply verification to all the routes


router.post('/shopPost', controller.postShop)
router.get('/shopGet', controller.getShop)
router.get('/shopGetbyId/:id', controller.getShopById)
router.put("/putShop/:id", controller.updateShopById);
router.delete("/deleteShop/:id", controller.deleteShopById);

module.exports = router