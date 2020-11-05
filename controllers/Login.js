const router = require("express").Router();

const { loginValidation } = require("../config/validate");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const bcrypt = require("bcrypt");

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  // Validate the data entered by the user
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //   Check if user is registered or not
  let user = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) return res.status(400).send("Kindly register before Login");

  //   Verify Password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) res.status(400).send("Incorrect Password");

  // Assign token
  let email = req.body.email;
  const payload = { email };
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    maxAge: 1 * 1000 * 60 * 60, // Valid for 1 hour
    httpOnly: true,
  });
  res.redirect("/");
});

router.get("/logout", async (req, res) => {
  await res.clearCookie("token");
  res.redirect("/login");
});

module.exports = router;
