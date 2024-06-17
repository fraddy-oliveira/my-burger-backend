var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");
var cors = require("cors");
var serverless = require("serverless-http");

var indexRouter = require("../routes/index");
var orderRouter = require("../routes/order");

var app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/.netlify/functions/server", indexRouter);
app.use("/.netlify/functions/server/order", orderRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const error = {
    message: err.message || "Oops! some error occurred.",
  };

  res.status(err.status || 500);
  res.json({ error });
});

module.exports.handler = serverless(app);
