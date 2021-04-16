var express = require("express");
const logger = require("morgan");
const dotenv = require("dotenv");
var todoRouter = require("./routes/index");
var userRouter = require("./routes/user");

const db = require("./db/db");
var app = express();
dotenv.config();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//alls routes
app.use("/", todoRouter);
app.use("/user", userRouter);

//default error handler
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
}
module.exports = app;
