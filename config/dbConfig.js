const sequelize = require("sequelize"),
  pg = require("pg");

module.exports = new sequelize("slack", "naren713", "naren713", {
  host: "localhost",
  dialect: "postgres",
  define: {
    timestamps: false,
  },
});
