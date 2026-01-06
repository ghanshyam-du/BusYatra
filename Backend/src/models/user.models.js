import mongoose from "mongoose";


const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    user_id: {
      type: Number,
      unique: true,
      index: true,
    },

    first_name: {
      type: String,
      required: true,
      maxlength: 22,
      trim: true,
    },

    last_name: {
      type: String,
      required: true,
      maxlength: 22,
      trim: true,
    },

    email_id: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      lowercase: true,
      trim: true,
    },

    phone_number: {
      type: String,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },

    password: {
      type: String,
      required: true,
      maxlength: 25,
    },

    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
    },

    dob: {
      type: Date,
    },

    role: {
      type: String,
      enum: ['CUSTOMER', 'TRAVELER', 'ADMIN'],
      default: 'CUSTOMER',
    },

    is_active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
