const express = require("express");
const router = express.Router();
const { registerUser , loginUser } = require("../controllers/user");

router.post("/users/signup", async (req, res) => {
  try {
    const user = req.body;
    const dbUser = await registerUser(user);
    console.log(dbUser);
    return res.status(200).json({
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

router.post("/users/login", async (req, res) => {
    try {
        const user = req.body;
        const result = await loginUser(user);
        return res.status(200).json(result);
    } catch (err) {
        console.error(err);
        if (err.message === "User not found" || err.message === "Invalid Password") {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        return res.status(500).json({ message: `Internal server error. Please try again later. ${err}` });
    }
});

module.exports = router;
