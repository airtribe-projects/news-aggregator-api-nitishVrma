const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { registerUser } = require("../controllers/user");

router.post("/register", async (req, res) => {
  try {
    const user = req.body;
    const dbUser = await registerUser(user);
    console.log(dbUser);
    return res.status(201).json({
      message: "User registered successfully!",
      user: {
        id: dbUser._id,
        email: dbUser.email,
      },
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ error: "User already exists" });
    }
    console.error(err);
    return res.status(500).send({ error: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = req.body;
    const loggedIn = await loginUser(user);
    console.log(loggedIn);
    return res.send(loggedIn);
  } catch (err) {
    console.error(err);
    if(err.status === 401) return res.status(401).send({ error: "Invalid credentials" });
    return res.status(500).send({ error: "Something went wrong" });
  }
});

module.exports = router;
