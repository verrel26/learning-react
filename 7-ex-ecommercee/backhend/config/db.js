// Koneksi ke database MongoDB menggunakan Mongoose

const mongose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/resetshop",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
