const Product = require("../models/Product");

// @desc Get all products
// @route GET /api/products
// @access Public
exports.getAllProducts = async (req, res) => {
  try {
    // Logic filter/search
    const { search } = req.query;

    let whereClause = {};

    if (search) {
      whereClause = {
        name: {
          [require("sequelize").Op.like]: `%${search}%`,
        },
      };
    }

    const products = await Product.findAll({
      where: whereClause,
      order: [["createdAt", "DESC"]],
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get single product (detail product)
// @route GET /api/products/:id
// @access Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
