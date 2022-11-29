const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  const userList = await User.find();
  res.send(userList);
});

router.post("/", async (req, res, next) => {
  const user = new User({
    name: req.body.name,
    mail: req.body.mail,
    phone: req.body.phone,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
  });
  user
    .save()
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

//LOgin
router.post("/login", async (req, res) => {
  const mail = req.body.mail;
  const user = await User.findOne({ mail });
  if (!user) {
    res.status(400).json({
      msg: "Not a valid User",
    });
  }
  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const secret = process.env.SECRET;
    const token = jwt.sign({ userID: user.id }, secret, {
      expiresIn: "1d",
    });
    res.status(200).send({ user: user.email, token });
  } else {
    res.status(400).json({
      msg: "Incorrect Password",
    });
  }
});
module.exports = router;
