const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const {registerSchema} = require("../middleware/joi_auth");
const { signAccessToken, signRefreshToken, verifyAccessToken } = require("../middleware/jwt_authentication");
const bcrypt = require("bcrypt");

//User login
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if (!user) return res.status(400).json({ message: "User not found" });

    //Checking the password with bcrypt compare method
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Create access token and send it to client
    const accessToken = await signAccessToken(
        user._id,
        user.name
      );
      const refreshToken = await signRefreshToken(
        user._id,
        user.name
      );

    res.status(200).json({accessToken, refreshToken, message: "Login successful"});
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// User registration
router.post("/register", async (req, res) => {
  try {
    const result = await registerSchema.validateAsync(req.body);

    const existingUser = await User.findOne({ name: result.name });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = new User({ name: result.name, email:  result.email, password: result.password });

    const savedUser = await newUser.save();

    // Create access token and send it to client
    const accessToken = await signAccessToken(
        savedUser._id,
        savedUser.name
      );
      const refreshToken = await signRefreshToken(
        savedUser._id,
        savedUser.name
      );
      res.status(200).json({accessToken, refreshToken, message: "User created"});
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all users
router.get("/",verifyAccessToken, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get a user by id
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Update a user by id
router.patch("/users/:id",verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Delete a user by id
router.delete("/users/:id",verifyAccessToken, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
