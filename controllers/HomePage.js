const router = require("express").Router();

const withAuth = require("../config/authorize");

const Channel = require("../models/Channel");
const User = require("../models/User");
const jwtDecode = require("jwt-decode");

router.get("/", withAuth, async (req, res) => {
  let token = req.cookies.token;
  let { email, x, time } = jwtDecode(token);
  await User.findOne({
    where: {
      email: email,
    },
    include: [{ model: Channel }],
  }).then((curUser) => {
    // console.log(JSON.stringify(curUser, null, 2));
    res.render("homePage", { curUser });
  });
});

module.exports = router;
