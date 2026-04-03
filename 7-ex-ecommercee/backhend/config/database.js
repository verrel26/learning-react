const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME || "resetshop",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "",
  {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: false, // Set ke true kalau mau lihat query SQL
  }
);

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL Connected! ✅");
  } catch (error) {
    console.error("Error connecting to MySQL:", error.message);
  }
};

testConnection();

module.exports = sequelize;
