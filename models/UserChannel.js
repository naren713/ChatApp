const sequelize = require("sequelize");

const db = require("../config/dbConfig");

const User = require("./User");

const Channel = require("./Channel");

const UserChannel = db.define("userchannel", {});

User.belongsToMany(Channel, {
  through: UserChannel,
});

Channel.belongsToMany(User, {
  through: UserChannel,
});

module.exports = UserChannel;
