const products = require("../data/products");

// @desc Get all products
// @route GET /api/products
// @access Public

exports.getAllProducts = (req, res) => {
  try {
    // Logic filter/search (nanti)
    const { search } = req.query;

    let filteredProducts = products;

    if (search) {
      filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: "error jon" });
  }
};

// @desc Get single prouduct / (detail product)
// @route GET /api/products/:id
// @access Public
exports.getProductById = (req, res) => {
  try {
    const product = products.find((p) => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
