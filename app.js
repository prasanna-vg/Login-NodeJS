// IMPORT
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
//Models
const User = require("./models/userModel");
const jwt = require("./helpers/jwt");
//Routers
const loginRouter = require("./routers/loginRouter");
// CONFIGURE

app.use(cors());
app.options("*", cors());
dotenv.config({ path: "./config/.env" });
app.use(morgan("tiny"));
app.use(express.json());
//app.use('/public/uploads',express.static(__dirname+'/public/uploads'));
app.use(jwt());
//app.use(errorHandler);

//Database
const uri = process.env.MONGODB_URL;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Found error ", err);
  });

//Routers
//app.use("/category", categoryRouter);
app.use("/auth", loginRouter);

app.get("/", (req, res, next) => {
  res.send("Home Page");
});
// LOGIN IN POSTMAN
// {
//   "mail":"pasa",
//   "password":"asasas"
// }
// LISTEN
app.listen(process.env.PORT, () => {
  console.log(
    `Listening on ${process.env.PORT} in ${process.env.NODE_ENV} mode`
  );
});
