require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const path = require("path");
const urlencoded = express.urlencoded({ extended: true });
const PORT = process.env.PORT || "8080";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./pages"));

app.use(express.static("public"));

app.use(cors());

app.get("/home", urlencoded, async function (req, res) {
  res.render("./main.ejs");
});

app.get("/login", async function (req, res) {
  res.render("./login.ejs" /*, { pageCurrent: "./login.ejs" }*/);
});

app.get("/spending/:id", urlencoded, async function (req, res) {
  res.render("./pag_initial.ejs" /* , {pageCurrent: "./pag_initial.ejs"} */);
});

app.get("/createAccount", urlencoded, async function (req, res) {
  res.render(
    "./createAccount.ejs" /* , {pageCurrent: "./createAccount.ejs"} */
  );
});

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}/home`);
});

module.exports = { PORT };
