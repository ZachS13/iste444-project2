const express = require("express");
const router = express.Router();
const business = require("../business.js");
const { logRequest } = require("../logger.js");

// Gets all users
router.get("/", async (req, res) => {
  logRequest({
    endpoint: "/api/v1/user [GET]",
    userId: id 
  });

  const users = await business.getAllUsers();
  if (!users) {
    return res.status(404).json({ error: "There was an error getting all of the users!" });
  } else if (users.length === 0) {
    return res.status(404).json({ error: "There are no users!" });
  }
  return res.json({ message: users });
});

// Gets a user by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  logRequest({
    endpoint: `/api/v1/user/${id} [GET]`,
    userId: id
  });

  const user = await business.getUserById(id);
  if (!user) {
    return res.status(404).json({ error: `There was an error getting the user!` });
  }
  return res.json({ message: user });
});

// Creates a new user
router.post("/", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  logRequest({
    endpoint: "/api/v1/user [POST]",
    userId: id
  });

  const newUser = await business.createUser(username, password);
  if (!newUser) {
    return res.status(404).json({ error: "There was an error creating the user!" });
  }
  return res.json({ message: newUser });
});

// Logs in a user
router.post("/login", async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;

  logRequest({
    endpoint: "/api/v1/user/login [POST]",
    userId: id
  });

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await business.login(username, password);

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.json({ message: "Login successful", user });
  } catch (err) {
    console.error("Login failed:", err);
    return res.status(500).json({ error: "There was an error during login" });
  }
});

module.exports = router;
