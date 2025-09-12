import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

res.cookie('token', token, {
  httpOnly: true,
  secure: true,         // production: HTTPS only
  sameSite: 'None',     // cross-origin requests
  maxAge: 7*24*60*60*1000,
});


    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token, // for mobile apps
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


// ===============================
// @desc    Login user & issue token
// @route   POST /api/v1/user/login
// @access  Public
// ===============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id},
      process.env.JWT_SECRET,
      { expiresIn: "7d" } // 7 days validity
    );

    // Send cookie (httpOnly for security)


    res.cookie('token', token, {
  httpOnly: true,
  secure: true,         // production: HTTPS only
  sameSite: 'None',     // cross-origin requests
  maxAge: 7*24*60*60*1000,
});




    return res.json({
      success: true,
      message: "Login successful",
      token, // keep in body for mobile apps
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};



// ===============================
// @desc    Logout user (clear cookie)
// @route   POST /api/v1/user/logout
// @access  Private
// ===============================
export const logout = (req, res) => {
  try {
  res.clearCookie('token', {
  httpOnly: true,
  secure: true,
  sameSite: 'None',
});

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while logging out",
    });
  }
};
