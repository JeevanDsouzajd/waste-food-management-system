const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");
const hbs = require("hbs");

dotenv.config({ path: "./.env" });

const app = express();
const db = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
});

app.set("view engine", "hbs");
const publicDirectory = path.join(__dirname, "./public");
hbs.registerPartials(__dirname + "/views/partial/");
app.use(express.static(publicDirectory));
app.use(express.static("images"));

app.use(express.urlencoded({ extended: false })); // to grab the data from from
app.use(express.json()); // in form of json

db.connect((error) => {
  if (error) {
    console.log("Server is Error");
  } else {
    console.log("MYSQL is connected");
  }
});
//  define routes

app.use("/", require("./routes/pages"));
app.use("/auth", require("./routes/auth"));
app.listen("3000", function () {
  console.log("Server listening at the port no 3000");
});
