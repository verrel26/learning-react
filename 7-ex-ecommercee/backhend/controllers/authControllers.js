const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "password";

// @desc Register new user
// @route POST /api/auth/register
// @access Public
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validasi input
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Username, email, dan password harus diisi!",
      });
    }

    // Validasi user sudah ada (berdasarkan email)
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    // Validasi username sudah ada
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      return res.status(400).json({
        success: false,
        message: "Username sudah terpakai",
      });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(201).json({
      success: true,
      message: "Registrasi berhasil",
      data: {
        user: {
          id: newUser.id,
          username: newUser.username,
          email: newUser.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Gagal Registrasi",
      error: error.message,
    });
  }
};

// @desc Login user
// @route POST /api/auth/login
// @access Public
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username dan password wajib di isi!",
      });
    }

    // Cari user berdasarkan username
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Cek password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Username atau password salah",
      });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      message: "Login berhasil",
      data: {
        user: {
          id: user.id,
          username: user.username,
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
// @route GET /api/auth/me
// @access Private (butuh token)
exports.getMe = async (req, res) => {
  try {
    // req.user sudah di-set oleh middleware
    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          username: user.username,
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
