const express = require("express");
const path = require("path");
const { appName } = require("./config/app.config");
const indexRoutes = require("./routes/index");
const apiRoutes = require("./routes/apiRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use((req, res, next) => {
  req.appName = appName;
  next();
});

app.use("/", indexRoutes);
app.use("/api", apiRoutes);

app.use(errorHandler);

module.exports = app;
