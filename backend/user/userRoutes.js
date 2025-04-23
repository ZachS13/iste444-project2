const express = require('express');
const router = express.Router();
const business = require("../business.js");

// Gets all users
router.get("/", async (req, res) => {
  const users = await business.getAllUsers();
  if (!users) {
    return res
      .status(404)
      .json({ error: "There was an error getting all of the users!" });
  } else if (users.length === 0) {
    return res.status(404).json({ error: "There are no users!" });
  }
  return res.json({ message: users });
});

// Gets a user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await business.getUserById(id);
  if (!user) {
    return res
      .status(404)
      .json({ error: `There was an error getting the user!` });
  }
  return res.json({ message: user });
});

// Creates a new user
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const newUser = await business.createUser(username, password);
  if (!newUser) {
    return res
      .status(404)
      .json({ error: "There was an error creating the user!" });
  }
  return res.json({ message: newUser });
});

module.exports = router;