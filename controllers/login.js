const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
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

exports.adminDashboard = async (req, res) => {
  const adminUsername = req.body.adminUsername;
  const adminName = req.body.adminName;
  const adminEmail = req.body.adminEmail;
  const adminPhone = req.body.adminPhone;
  const adminAddr = req.body.adminAddr;
  const adminPass = req.body.adminPass;
  try {
    db.query(
      "SELECT * FROM admin where username = ?",
      [adminUsername],
      async (error, results) => {
        const result = JSON.parse(JSON.stringify(results));
        if (
          adminUsername == result[0].username &&
          adminName == result[0].name &&
          adminEmail == result[0].email &&
          adminPhone == result[0].pho_no &&
          adminAddr == result[0].address &&
          adminPass == result[0].password
        ) {
          res.render("admin-dashboard", {
            passUsername: result[0].username,
            passName: result[0].name,
            passEmail: result[0].email,
            passPhone: result[0].pho_no,
            passPassword: result[0].password,
            passAddress: result[0].address,
          });
        } else {
          db.query(
            "update admin set name=? ,email =?,pho_no=?,password=?,address=? where username=?",
            [
              adminName,
              adminEmail,
              adminPhone,
              adminPass,
              adminAddr,
              adminUsername,
            ],
            async (error, selresults) => {
              if (error) {
                console.log(error);
              }
            }
          );
          db.query(
            "SELECT * FROM admin where username = ?",
            [adminUsername],
            (error, results) => {
              if (error) {
                console.log(error);
              }
              const result = JSON.parse(JSON.stringify(results));
              res.render("admin-dashboard", {
                passUsername: result[0].username,
                passName: result[0].name,
                passEmail: result[0].email,
                passPhone: result[0].pho_no,
                passPassword: result[0].password,
                passAddress: result[0].address,
                updated: "Updated successfully",
              });
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};

exports.restDashboard = (req, res) => {
  res.send("Login");
  console.log(req.body);
};
exports.ngoDashboard = (req, res) => {
  console.log(req.body);
};
