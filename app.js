var createError = require("http-errors");
var express = require("express");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var orderRouter = require("./routes/order");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/order", orderRouter);

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

module.exports = app;