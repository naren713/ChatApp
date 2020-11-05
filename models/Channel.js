const sequelize = require("sequelize");

const db = require("../config/dbConfig");

const User = require("./User");

const Channel = db.define("channel", {
  cname: {
    type: sequelize.STRING,
    required: true,
  },
});

db.sync({})
  .then(() => {
    console.log("Channels Synced");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = Channel;
