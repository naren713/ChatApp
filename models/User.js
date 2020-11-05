const sequelize = require("sequelize");

const db = require("../config/dbConfig");

const User = db.define("user", {
  name: {
    type: sequelize.STRING,
    required: true,
  },
  email: {
    type: sequelize.STRING,
    required: true,
  },
  password: {
    type: sequelize.STRING,
    required: true,
  },
});

db.sync({})
  .then(() => {
    console.log("Users Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = User;
