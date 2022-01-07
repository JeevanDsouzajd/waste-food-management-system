const express = require("express");

const router = express.Router();

const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

// admin login
exports.adminLogin = (req, res) => {
  // const obj = JSON.parse(JSON.stringify(req.body));
  const adminUser = req.body.adminusername;
  const adminpass = req.body.adminpassword;
  db.query(
    "SELECT username , password FROM admin where username = ?",
    [adminUser],
    async (error, results) => {
      if (error) {
        console.log({ error });
      }
      const result = JSON.parse(JSON.stringify(results));
      if (result.length > 0) {
        if (result[0].password === adminpass) {
          return res.render("admin-login", {
            successMsg: "Login Successfull",
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
};

// ngo login
exports.ngoLogin = (req, res) => {
  const ngoEmail = req.body.ngoEmail;
  const ngoPass = req.body.ngoPassword;
  db.query(
    "SELECT ngo_email , ngo_password FROM ngo where ngo_email = ?",
    [ngoEmail],
    async (error, results) => {
      if (error) {
        console.log({ error });
      }
      const result = JSON.parse(JSON.stringify(results));
      if (result.length > 0) {
        if (result[0].ngo_password === ngoPass) {
          return res.render("ngo-login", {
            successMsg: "Login Successfull",
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
  // console.log(req.body);
  // res.send("Ngo");
};

// restaurent login
exports.restLogin = (req, res) => {
  const restEmail = req.body.restEmail;
  const restPass = req.body.restPassword;
  db.query(
    "SELECT rest_email , rest_password FROM restaurant where rest_email = ?",
    [restEmail],
    async (error, results) => {
      if (error) {
        console.log({ error });
      }
      const result = JSON.parse(JSON.stringify(results));
      if (result.length > 0) {
        if (result[0].rest_password === restPass) {
          return res.render("restaurant-login", {
            successMsg: "Login Successfull",
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
