const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const employeeController = require("../controllers/employeeController");

router.put("/", adminController.updateAdminControl);
router.get("/getdata", adminController.getAdminControl);
router.get("/getavailablemodules", adminController.fetchAvailableModules);
router.get("/updateavailablemodules", adminController.updateAvailableModules);
router.get("/showAuthDataToUser/:userId", adminController.showAuthDataToUser);
router.post("/showAuthDataToUser", adminController.addValuesToUsersArray);

//employee Routes
router.get("/allemployees", employeeController.getAllEmployees);

module.exports = router;
