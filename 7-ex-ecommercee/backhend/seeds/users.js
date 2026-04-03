const sequelize = require("../config/database");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const users = [
  {
    username: "samsudin",
    email: "samsudin@gmail.com",
    password: "password",
  },
  {
    username: "panjul",
    email: "panjul@gmail.com",
    password: "password",
  },
  {
    username: "amaik",
    email: "amaik@gmail.com",
    password: "password",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync({ force: false });

    await User.destroy({ where: {} });

    // Hash password untuk setiap user
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        return {
          username: user.username,
          email: user.email,
          password: hashedPassword, // Password sudah di-hash
        };
      }),
    );

    // Insert users ke database
    await User.bulkCreate(hashedUsers);

    console.log("✅ Users seeded successfully!");
    console.log(`👥 Total users: ${users.length}`);
    console.log("\n📋 Test Accounts:");
    users.forEach((u) => {
      console.log(
        `   - Username: ${u.username} | Email: ${u.email} | Password: ${u.password}`,
      );
    });
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding users:", error.message);
    process.exit(1);
  }
};

seedUsers();
