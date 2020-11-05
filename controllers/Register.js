const router = require("express").Router();

const { registerValidation } = require("../config/validate");

const sequelize = require("sequelize");

const bcrypt = require("bcrypt");

const User = require("../models/User");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  // Validate the data the user has entered
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if email is already registered
  const emailExists = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (emailExists) return res.status(400).send("Email already registered");

  //   Encrypt the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  console.log(hashedPassword);

  //   Create a new User record in the DB
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  }).then(() => {
    res.redirect("/login");
  });
});

module.exports = router;
