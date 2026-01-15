// ================================================================
// BUSYATRA - COMPLETE AUTHENTICATION SYSTEM
// ================================================================

// ----------------------------------------------------------------
// FILE 1: server.js (Main Entry Point)
// ----------------------------------------------------------------


// ----------------------------------------------------------------
// FILE 2: .env (Environment Variables)
// ----------------------------------------------------------------

/*
Create a file named .env in the root directory:



// ----------------------------------------------------------------
// FILE 3: config/database.js (Already created, but here for reference)
// ----------------------------------------------------------------




// ----------------------------------------------------------------
// FILE 4: middleware/errorHandler.js (Global Error Handler)
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// FILE 5: middleware/auth.js (Authentication Middleware)
// ----------------------------------------------------------------



// ----------------------------------------------------------------
// FILE 6: utils/asyncHandler.js (Async Error Handler Wrapper)
// ----------------------------------------------------------------




// ----------------------------------------------------------------
// FILE 7: utils/errorResponse.js (Custom Error Class)
// ----------------------------------------------------------------




// ----------------------------------------------------------------
// FILE 8: utils/sendTokenResponse.js (Send JWT Token in Response)
// ----------------------------------------------------------------




// ----------------------------------------------------------------
// FILE 9: models/User.js (Updated with JWT Method)
// ----------------------------------------------------------------

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true,
    trim: true
  },
  full_name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  mobile_number: {
    type: String,
    required: [true, 'Mobile number is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit mobile number']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  role: {
    type: String,
    enum: ['CUSTOMER', 'TRAVELER', 'ADMIN'],
    default: 'CUSTOMER'
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required']
  },
  date_of_birth: {
    type: Date,
    required: [true, 'Date of birth is required']
  },
  is_active: {
    type: Boolean,
    default: true
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate user_id
userSchema.pre('save', async function(next) {
  if (this.user_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.user_id = `USR${String(count + 1).padStart(6, '0')}`;
  next();
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate JWT Token
userSchema.methods.getSignedJwtToken = function() {
  return jwt.sign(
    { 
      user_id: this.user_id,
      email: this.email,
      role: this.role 
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function() {
  const crypto = require('crypto');
  
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire (10 minutes)
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model('User', userSchema);


// ----------------------------------------------------------------
// FILE 10: controllers/authController.js (Authentication Logic)
// ----------------------------------------------------------------

const User = require('../models/User');
const asyncHandler = require('../utils/asyncHandler');
const ErrorResponse = require('../utils/errorResponse');
const sendTokenResponse = require('../utils/sendTokenResponse');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { full_name, email, mobile_number, password, gender, date_of_birth } = req.body;

  // Validate input
  if (!full_name || !email || !mobile_number || !password || !gender || !date_of_birth) {
    return next(new ErrorResponse('Please provide all required fields', 400));
  }

  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [{ email }, { mobile_number }] 
  });

  if (existingUser) {
    if (existingUser.email === email) {
      return next(new ErrorResponse('Email already registered', 400));
    }
    if (existingUser.mobile_number === mobile_number) {
      return next(new ErrorResponse('Mobile number already registered', 400));
    }
  }

  // Create user
  const user = await User.create({
    full_name,
    email,
    mobile_number,
    password,
    gender,
    date_of_birth,
    role: 'CUSTOMER' // Default role
  });

  // Send token response
  sendTokenResponse(user, 201, res, 'Registration successful');
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return next(new ErrorResponse('Please provide email and password', 400));
  }

  // Check for user (include password field)
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if account is active
  if (!user.is_active) {
    return next(new ErrorResponse('Account is deactivated. Contact support.', 403));
  }

  // Check if password matches
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Send token response
  sendTokenResponse(user, 200, res, 'Login successful');
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    data: user
  });
});

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
exports.updateProfile = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    full_name: req.body.full_name,
    mobile_number: req.body.mobile_number,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth
  };

  // Remove undefined fields
  Object.keys(fieldsToUpdate).forEach(key => 
    fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
  );

  const user = await User.findOneAndUpdate(
    { user_id: req.user.user_id },
    fieldsToUpdate,
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: user
  });
});

// @desc    Change password
// @route   PUT /api/auth/changepassword
// @access  Private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new ErrorResponse('Please provide current and new password', 400));
  }

  // Get user with password
  const user = await User.findOne({ user_id: req.user.user_id }).select('+password');

  // Check current password
  const isMatch = await user.comparePassword(currentPassword);

  if (!isMatch) {
    return next(new ErrorResponse('Current password is incorrect', 401));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  // Send token response
  sendTokenResponse(user, 200, res, 'Password changed successfully');
});

// @desc    Forgot password
// @route   POST /api/auth/forgotpassword
// @access  Public
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorResponse('User not found with this email', 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset url
  const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/resetpassword/${resetToken}`;

  // For now, just return the token (in production, send email)
  res.status(200).json({
    success: true,
    message: 'Password reset token generated',
    resetToken, // Remove this in production
    resetUrl,   // Remove this in production
    note: 'In production, this will be sent via email'
  });
});

// @desc    Reset password
// @route   PUT /api/auth/resetpassword/:resettoken
// @access  Public
exports.resetPassword = asyncHandler(async (req, res, next) => {
  const crypto = require('crypto');

  // Get hashed token
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.resettoken)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    return next(new ErrorResponse('Invalid or expired token', 400));
  }

  // Set new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  // Send token response
  sendTokenResponse(user, 200, res, 'Password reset successful');
});

// @desc    Logout user
// @route   GET /api/auth/logout
// @access  Private
exports.logout = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    data: {}
  });
});


// ----------------------------------------------------------------
// FILE 11: routes/authRoutes.js (Authentication Routes)
// ----------------------------------------------------------------

const express = require('express');
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/authController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes (must be logged in)
router.get('/me', protect, getMe);
router.put('/updateprofile', protect, updateProfile);
router.put('/changepassword', protect, changePassword);
router.get('/logout', protect, logout);

module.exports = router;


// ----------------------------------------------------------------
// FILE 12: package.json (Updated Dependencies)
// ----------------------------------------------------------------

/*
{
  "name": "busyatra-backend",
  "version": "1.0.0",
  "description": "BusYatra Bus Booking System Backend",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^8.0.0",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}

Installation:
npm install express mongoose bcryptjs jsonwebtoken dotenv cors
npm install -D nodemon
*/