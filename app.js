"use strict";

/** Express app for Pick Your Poison */

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

const cocktailDbRoutes = require("./routes/cocktailDb");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
// app.use(authenticateJWT);

app.use("/cocktaildb", cocktailDbRoutes);
app.use("/search", userRoutes);
app.use("/auth", authRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
