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

app.get("/login", function (req, res) {
  res.render("./main", { pageCurrent: "./layouts/login.ejs" });
});

app.use(cors());

app.get("/spending/:name", urlencoded, async function (req, res) {
  res.render("./main", {
    pageCurrent: "./pag_initial.ejs",
  });
});

app.get("/createUser", urlencoded, async function (req, res) {
  res.render("./main", {
    pageCurrent: "./createAccount.ejs",
  });
});

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}/login`);
});

module.exports = { PORT };
