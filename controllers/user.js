const bcrypt = require("bcrypt");
require('dotenv').config();
const rounds = 5;
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");

const registerUser = async (user) => {
  user.password = await bcrypt.hash(user.password, rounds);
  return await userModel.create(user);
};

const loginUser = async (user) => {
  const body = {
    email: user.email,
  };

  const dbUser = await userModel.findOne(body);
  if (!dbUser) throw new Error("User not found");

  const isSamePassword = await bcrypt.compare(user.password, dbUser.password);
  console.log(isSamePassword);
  if (!isSamePassword) {
    throw new Error("Invalid Password");
  }

  const payload = {
    id: dbUser.id,
    email: dbUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "2h"});

  return { status: "ok", token : token, user: { id: dbUser.id } };
};

module.exports = {
  registerUser,
  loginUser,
};
