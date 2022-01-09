const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const loginController = require("./login");
const path = require("path");

const mysql = require("mysql");
const dotenv = require("dotenv");
const async = require("hbs/lib/async");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// global varialbles
// var profUser;
// admin login

exports.adminLogin = async (req, res) => {
  const adminUser = req.body.adminusername;
  const adminpass = req.body.adminpassword;
  try {
    db.query(
      "SELECT * FROM admin where username = ?",
      [adminUser],
      async (error, results) => {
        if (error) {
          console.log({ error });
        }
        const result = JSON.parse(JSON.stringify(results));
        if (result.length > 0) {
          if (result[0].password === adminpass) {
            res.render("admin-dashboard", {
              passUsername: result[0].username,
              passName: result[0].name,
              passEmail: result[0].email,
              passPhone: result[0].pho_no,
              passPassword: result[0].password,
              passAddress: result[0].address,
              successMsg: "Logout Successful",
            });
          } else {
            return res.render("admin-login", {
              errorMsg: "Invalid password",
            });
          }
        } else {
          return res.render("admin-login", {
            errorMsg: "Invalid",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

// ngo login
exports.ngoLogin = (req, res) => {
  const ngoEmail = req.body.ngoEmail;
  const ngoPass = req.body.ngoPassword;
  try {
    db.query(
      "SELECT * FROM ngo where ngo_email = ?",
      [ngoEmail],
      async (error, results) => {
        if (error) {
          console.log({ error });
        }
        const result = JSON.parse(JSON.stringify(results));
        if (result.length > 0) {
          if (result[0].ngo_password === ngoPass) {
            res.render("ngo-dashboard", {
              passPin: result[0].ngo_pincode,
              passId: result[0].ngo_unique_id,
              passName: result[0].ngo_name,
              passEmail: result[0].ngo_email,
              passPhone: result[0].ngo_phone,
              passPassword: result[0].ngo_password,
              passAddress: result[0].ngo_address,
              successMsg: "Logout Successful",
            });
          } else {
            return res.render("ngo-login", {
              errorMsg: "Invalid password",
            });
          }
        } else {
          return res.render("ngo-login", {
            errorMsg: "Invalid",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body);
  // res.send("Ngo");
};

// restaurent login
exports.restLogin = (req, res) => {
  const restEmail = req.body.restEmail;
  const restPass = req.body.restPassword;
  try {
    db.query(
      "SELECT * FROM restaurant where rest_email = ?",
      [restEmail],
      async (error, results) => {
        if (error) {
          console.log({ error });
        }
        const result = JSON.parse(JSON.stringify(results));

        // console.log(passUsername);
        if (result.length > 0) {
          if (result[0].rest_password === restPass) {
            res.render("rest-dashboard", {
              passPin: result[0].rest_pin,
              passName: result[0].rest_name,
              passEmail: result[0].rest_email,
              passPhone: result[0].rest_phone,
              passPassword: result[0].rest_password,
              passAddress: result[0].rest_loc,
              successMsg: "Logout Successful",
            });
          } else {
            return res.render("restaurant-login", {
              errorMsg: "Invalid password",
            });
          }
        } else {
          return res.render("restaurant-login", {
            errorMsg: "Invalid",
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
  // console.log(req.body);
  // res.send("Restaurent");
};
exports.guestReg = (req, res) => {
  const guestName = req.body.donorName;
  const guestNumber = req.body.donorNumber;
  const guestAddr = req.body.donorAddress;
  const donPin = req.body.donorPin;
  const quantity = req.body.foodQuantity;
  const desc = req.body.discription;

  db.query(
    "INSERT INTO guestlogin SET ?",
    {
      name: guestName,
      number: guestNumber,
      address: guestAddr,
      pincode: donPin,
      quantity: quantity,
      description: desc,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        return res.render("guest-don", {
          sendMsg: "Sent",
        });
      }
    }
  );
};

// Admin Dashboard
