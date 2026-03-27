const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../controllers/authControllers");
const { protect } = require("../middleware/authMiddleware");

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protect routes (butuh token)
router.get("/me", protect, getMe);

module.exports = router;
