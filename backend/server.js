// Service layer
const express = require("express"),
  cors = require("cors"),
  app = express(),
  business = require(`./business.js`),
  port = 3000,
  userRoutes = require("./user/userRoutes.js"),
  bookRoutes = require("./book/bookRoutes.js"),
  checkoutRoutes = require("./checkout/checkoutRoutes.js"); 

const pool = require("./db.js");

app.use(cors());
app.use(express.json());

// DEFAULT ENDPOINT
app.get("/api/v1/", (req, res) => {
  res.status(200).send("OK");
});

// LOGIN ENDPOINT
app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required!" });
  }
  const user = await business.login(username, password);
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password!" });
  }
  return res.json({ message: user });
});

// USER ROUTES
app.use("/api/v1/user/", userRoutes);

// BOOK ROUTES
app.use("/api/v1/book/", bookRoutes);

// CHECKOUT ROUTES
app.use("/api/v1/checkout/", checkoutRoutes);


(async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Database connected");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Could not connect to database:", err);
  }
})();
