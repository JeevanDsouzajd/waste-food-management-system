const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.post("/admin-login", authController.adminLogin);
router.post("/ngo-login", authController.ngoLogin);
router.post("/restaurant-login", authController.restLogin);
router.post("/guest-don", authController.guestReg);
router.post("/admin-dashboard", authController.adminDashboard);
module.exports = router;
