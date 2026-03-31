// data dummy sementara
let carts = [];

// @desc Get user cart
// @route GET /api/cart
// @access Private

exports.getCart = (req, res) => {
  try {
    // Cari cart berdasarkan id
    const userCart = carts.find((c) => c.userId === req.user.id);

    if (!userCart) {
      return res.json({
        success: true,
        data: {
          item: [],
        },
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
      messsage: error.message,
    });
  }
};

// @desc Add item to cart
// @route POST /api/cart/add
// @access Private

exports.addToCart = (req, res) => {
  try {
    const { productId, quantity } = req.body;
    // Validasi
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        success: true,
        message: "Product ID and quantity are required",
      });
    }

    //   Cari atau buat cart user
    let userCart = carts.find((c) => c.userId === req.user.id);

    if (!userCart) {
      userCart = {
        userId: req.user.id,
        items: [],
      };
      carts.push(userCart);
    }

    //   Cek apakah produk sudah ada di cart
    const existingItem = userCart.items.find(
      (item) => item.productId === productId,
    );

    if (existingItem) {
      // Update quantity kalau sudah ada
      existingItem.quantity += quantity;
    } else {
      // Tambah item baru
      userCart.items.push({
        productId,
        quantity,
      });
    }

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
// @route PUT /api/cart/:productID
// @access Private

exports.updateCartItem = (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    //   Validasi
    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required",
      });
    }

    //   Cari cart user
    const userCart = carts.find((c) => c.userId === req.user.id);

    if (!userCart) {
      return res.status(400).json({
        success: false,
        message: "Cart not found",
      });
    }

    //   Cari item
    const item = userCart.items.find(
      (i) => i.productId === parseInt(productId),
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    //   Update quantity
    item.quantity = quantity;

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

// @desc remove item from cart
// @route DELETE /api/cart/:productId
// @access Private

exports.removeFromCart = (req, res) => {
  try {
    const { productId } = req.params;

    //   Cari cart user
    const userCart = carts.find((c) => c.userId === req.user.id);
    if (!userCart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    //   Filter out item
    const initialLength = userCart.items.length;
    userCart.items = userCart.items.filter(
      (i) => i.productId !== parseInt(productId),
    );

    if (userCart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

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
