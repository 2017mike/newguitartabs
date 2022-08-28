const pls = require("passport-local-sequelize");
const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const User = pls.defineUser(sequelize, {
  // your columns here...
  bio: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
});

module.exports = User;
