const users = require("../data/users");
// package yg telah diinstal sebelumnya (npm install bcryptjs jsonwebtoken)
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "password";

// @desc Register new user
// $route POST /api/auth/register
// @access Public

// Register
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   Validasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password harus diisi!",
      });
    }

    //   Validasi user sudah ada
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    //   Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //   Buat user baru
    const newUser = {
      id: users.length + 1,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    users.push(newUser);

    //   Generate new token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "24h" }, // durasi token hanya berlaku 24 jam
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        user: {
          id: newUser.id,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      //   message: error.message,
      message: "Gagal Registrasi",
    });
  }
};

// @desc Login user
// $route POST /api/auth/login
// @access Public

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //   Valiasi input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib di isi!",
      });
    }

    //   Cari user berdasarkan email
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    //   Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    //   Generate token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "24h",
    });

    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc Get current user
// $route GET /api/auth/me
// @access Private (buuth token)

exports.getMe = (req, res) => {
  try {
    // req user sudah di-set oleh middlware
    const user = users.find((u) => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak di temukan",
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
