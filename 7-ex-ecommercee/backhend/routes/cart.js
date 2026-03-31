const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
} = require("../controllers/cartControllers");

const { protect } = require("../middleware/authMiddleware");

// All routes are protected (require login)
router.get("/", protect, getCart);
router.post("/add", protect, addToCart);
router.put("/:productId", protect, updateCartItem);
router.delete("/:productId", protect, removeFromCart);

module.exports = router;
