const Cart = require("../models/Cart");

// @desc Get user cart
// @route GET /api/cart
// @access Private
exports.getCart = async (req, res) => {
  try {
    // Cari cart berdasarkan userId
    let userCart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    // Kalau belum ada cart, buat cart kosong
    if (!userCart) {
      userCart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    res.json({
      success: true,
      data: {
        items: userCart.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Add item to cart
// @route POST /api/cart/add
// @access Private
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Validasi
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required",
      });
    }

    // Cari atau buat cart user
    let userCart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!userCart) {
      userCart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    // Clone items array
    let items = [...userCart.items];

    // Cek apakah produk sudah ada di cart
    const existingItemIndex = items.findIndex(
      (item) => item.productId === productId,
    );

    if (existingItemIndex > -1) {
      // Update quantity kalau sudah ada
      items[existingItemIndex].quantity += quantity;
    } else {
      // Tambah item baru
      items.push({
        productId,
        quantity,
      });
    }

    // Update cart
    userCart.items = items;
    await userCart.save();

    res.json({
      success: true,
      message: "Item added to cart",
      data: {
        items: userCart.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Update cart item quantity
// @route PUT /api/cart/:productId
// @access Private
exports.updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    // Validasi
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    // Cari cart user
    let userCart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Cari item
    let items = [...userCart.items];
    const itemIndex = items.findIndex((i) => i.productId === parseInt(productId));

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Update quantity
    items[itemIndex].quantity = quantity;
    userCart.items = items;
    await userCart.save();

    res.json({
      success: true,
      message: "Cart updated",
      data: {
        items: userCart.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Remove item from cart
// @route DELETE /api/cart/:productId
// @access Private
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Cari cart user
    let userCart = await Cart.findOne({
      where: { userId: req.user.id },
    });

    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Filter out item
    const initialLength = userCart.items.length;
    let items = userCart.items.filter(
      (i) => i.productId !== parseInt(productId),
    );

    if (items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    userCart.items = items;
    await userCart.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      data: {
        items: userCart.items,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
