const bcrypt = require("bcrypt");
require('dotenv').config();
const rounds = 5;
const userModel = require("../models/User");
const { updateOrCreatePreferences } = require("./preferenceController");
const jwt = require("jsonwebtoken");

const registerUser = async (userData) => {
  const { preferences, ...userFields } = userData;
  
  userFields.password = await bcrypt.hash(userFields.password, rounds);
  const dbUser = await userModel.create(userFields);
  
  if (preferences && Array.isArray(preferences)) {
    await updateOrCreatePreferences(dbUser._id, { preferences });
  }
  
  return dbUser;
};

const loginUser = async (user) => {
  const dbUser = await userModel.findOne({ email: user.email });
  if (!dbUser) throw new Error("User not found");

  const isSamePassword = await bcrypt.compare(user.password, dbUser.password);
  if (!isSamePassword) {
    throw new Error("Invalid Password");
  }

  const payload = {
    id: dbUser.id,
    email: dbUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });

  return { status: "ok", token: token, user: { id: dbUser.id } };
};

module.exports = {
  registerUser,
  loginUser,
};