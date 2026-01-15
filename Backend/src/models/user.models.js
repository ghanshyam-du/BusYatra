import mongoose from "mongoose"
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
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
    select: false // Don't include password in queries by default
  },
  role: {
    type: String,
    enum: {
      values: ['CUSTOMER', 'TRAVELER', 'ADMIN'],
      message: '{VALUE} is not a valid role'
    },
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
  }
}, {
  timestamps: true 
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Generate user_id automatically
userSchema.pre('save', async function(next) {
  if (this.user_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.user_id = `USR${String(count + 1).padStart(6, '0')}`;
  next();
});

export default mongoose.model('User', userSchema);