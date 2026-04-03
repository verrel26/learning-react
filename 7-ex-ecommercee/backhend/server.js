require("dotenv").config();
const sequelize = require("./config/database");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");
const cartRoutes = require("./routes/cart");

dotenv.config();

// Connect to database dan sync tabel
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ MySQL Connected!");

    // Sync semua models (buat tabel kalau belum ada)
    await sequelize.sync({ alter: false });
    console.log("✅ Database synchronized!");
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

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
app.use("/api/cart", cartRoutes);

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
