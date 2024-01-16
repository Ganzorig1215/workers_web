const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../config/database"); // Adjust the path accordingly
const db = require("../controller/dbconnect");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "user",
    validate: {
      isIn: [["user", "admin", "operator"]],
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [4, Infinity],
    },
    select: false,
  },
  resetPasswordToken: DataTypes.STRING,
  resetPasswordExpire: DataTypes.DATE,
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

User.prototype.getJsonWebToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
  return token;
};
UserSchema.methods.getJsonWebToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET);
  expiresIn = process.env.JWT_EXPIRESIN;
};
module.exports = User;
