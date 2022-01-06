const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/admin-login", (req, res) => {
  res.render("admin-login");
});
router.get("/ngo-login", (req, res) => {
  res.render("ngo-login");
});

router.get("/restaurant-login", (req, res) => {
  res.render("restaurant-login");
});

router.get("/guest-don", (req, res) => {
  res.render("guest-don");
});

module.exports = router;
