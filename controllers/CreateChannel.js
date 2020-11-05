const router = require("express").Router();

const sequelize = require("sequelize");

const User = require("../models/User");

const Channel = require("../models/Channel");

const UserChannel = require("../models/UserChannel");

const jwtDecode = require("jwt-decode");

router.get("/create", async (req, res) => {
  await User.findAll().then((users) => {
    // console.log(JSON.stringify(curUser, null, 2));
    res.render("createChannel", { users });
  });
});

router.post("/create", async (req, res) => {
  let token = req.cookies.token;
  let { email, x, time } = jwtDecode(token);
  let users = await User.findAll();
  let channelName = req.body.cname;
  await Channel.create({
    cname: channelName,
  }).then((newChannel) => {
    newChannel.addUser(users);
    res.redirect("/");
  });
});

module.exports = router;
