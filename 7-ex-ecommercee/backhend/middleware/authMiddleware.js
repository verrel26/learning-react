const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "password";

exports.protect = (req, res, next) => {
  try {
    let token;

    //   Cek token di header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    //   Cek apakah token ada
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token !",
      });
    }

    //   Varifikasi token
    const decoded = jwt.verify(token, JWT_SECRET);

    //   Set user data ke req
    req.user = decoded;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
    });
  }
};
