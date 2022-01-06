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

exports.adminLogin = (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const name = req.body.adminusername;
  console.log(name);
  res.send("Admin");
};
exports.ngoLogin = (req, res) => {
  console.log(req.body);
  res.send("Ngo");
};
exports.restLogin = (req, res) => {
  console.log(req.body);
  res.send("Restaurent");
};
exports.guestReg = (req, res) => {
  const guestName = req.body.donorName;
  const guestNumber = req.body.donorNumber;
  const guestAddr = req.body.donorAddress;
  const quantity = req.body.foodQuantity;
  const desc = req.body.discription;

  // const { name, number, address, quantity, desc } = req.body; //destructuring
  db.query(
    "INSERT INTO guestlogin SET ?",
    {
      name: guestName,
      number: guestNumber,
      address: guestAddr,
      quantity: quantity,
      description: desc,
    },
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        return res.render("guest-don", {
          sendMsg: "Guest",
        });
      }
    }
  );
};
