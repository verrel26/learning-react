const sequelize = require("../config/database");
const Cart = require("../models/Cart");

const carts = [
  {
    userId: 1,
    items: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
  },
  {
    userId: 2,
    items: [{ productId: 2, quantity: 1 }],
  },
  {
    userId: 3,
    items: [
      { productId: 4, quantity: 1 },
      { productId: 5, quantity: 2 },
      { productId: 8, quantity: 1 },
    ],
  },
];

const seedCarts = async () => {
  try {
    await sequelize.sync({ force: false });

    await Cart.destroy({ where: {} });

    await Cart.bulkCreate(carts);

    console.log("✅ Carts seeded successfully!");
    console.log(`🛒 Total carts: ${carts.length}`);
    console.log("\n📋 Cart Details:");
    carts.forEach((c) => {
      console.log(
        `   - User ID: ${c.userId} | Items: ${c.items.length} products`,
      );
      c.items.forEach((item) => {
        console.log(
          `     • Product ID: ${item.productId} | Quantity: ${item.quantity}`,
        );
      });
    });
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding carts:", error.message);
    process.exit(1);
  }
};

seedCarts();
