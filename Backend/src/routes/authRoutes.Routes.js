import express from "express"
import {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  logout
} from "../controllers/authController.Controller.js"
import {protect} from "../middlewares/auth.middlewares.js"

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

export default router;
