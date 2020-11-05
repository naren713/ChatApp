const jwt = require("jsonwebtoken");

const withAuth = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    res
      .status(401)
      .send(`<h4>Please <a href="/login">Login</a> to view this page</h4>`);
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = withAuth;
