const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Agar react bisa akses
app.use(express.json()); // Parsing JSON
app.use(express.urlencoded({ extended: true })); // Parsing form data

// Routes
app.get("/", (req, res) => {
  console.log("GET / hit");
  res.json({
    message: "Welcome to Reset Shop API",
    version: "1.0.0",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Import routes (nanti)
// app.use("/api/products", require("./routes/products"));
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/cart", require("./routes/cart"));

// Error handler (nanti)
// app.use(require("./middleware/errorMiddleware"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
