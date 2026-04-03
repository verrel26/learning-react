const sequelize = require("../config/database");
const Product = require("../models/Product");

const products = [
  {
    name: "Kaos Polos",
    price: 100000,
    image: "https://example.com/kaos-polos.jpg",
    description:
      "Kaos polos berkualitas tinggi, nyaman dipakai, dan cocok untuk berbagai gaya.",
  },
  {
    name: "Hoodie",
    price: 200000,
    image: "https://example.com/hoodie.jpg",
    description:
      "Hoodie hangat dengan desain stylish, cocok untuk musim dingin.",
  },
  {
    name: "Sneakers",
    price: 500000,
    image: "https://example.com/sneakers.jpg",
    description:
      "Sneakers trendy dengan kenyamanan maksimal untuk aktivitas sehari-hari.",
  },
  {
    name: "Wireless Mouse",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description: "Ergonomic wireless mouse with precision tracking",
  },
  {
    name: "Monitor Stand",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    description: "Dual monitor stand with adjustable height and tilt",
  },
  {
    name: "Webcam HD",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    description: "1080p HD webcam with auto-focus and built-in microphone",
  },
  {
    name: "Wireless Headphones",
    price: 350000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium nich",
  },
  {
    name: "Smart Watch",
    price: 400000,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description: "Feature-rich smartwatch with fitness tracking",
  },
  {
    name: "Wireless Headphones Pro",
    price: 500000,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description: "Premium wireless headphones with noise cancellation",
  },
  {
    name: "Laptop Stand",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description: "Ergonomic aluminum laptop stand that improves posture",
  },
  {
    name: "Mechanical Keyboard",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description: "RGB backlit mechanical keyboard with Cherry MX switches",
  },
  {
    name: "USB-C Hub",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader",
  },
];

const seedProducts = async () => {
  try {
    // Sync database (buat tabel kalau belum ada)
    await sequelize.sync({ force: false });

    // Delete semua products yang ada
    await Product.destroy({ where: {} });

    // Insert products baru ke database
    await Product.bulkCreate(products);

    console.log("✅ Products seeded successfully!");
    console.log(`📦 Total products: ${products.length}`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding products:", error.message);
    process.exit(1);
  }
};

seedProducts();
