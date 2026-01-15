import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({
  admin_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  user_id: {
    type: String,
    required: [true, 'User ID is required'],
    ref: 'User'
  },
  admin_level: {
    type: Number,
    enum: [1, 2, 3], // 1 = Super Admin, 2 = Admin, 3 = Support Staff
    default: 3
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true
  },
  permissions: [{
    type: String,
    enum: ['manage_travelers', 'manage_tickets', 'view_reports', 'manage_buses', 'manage_bookings']
  }]
}, {
  timestamps: true
});

// Auto-generate admin_id
adminSchema.pre('save', async function(next) {
  if (this.admin_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.admin_id = `ADM${String(count + 1).padStart(6, '0')}`;
  next();
});

export default mongoose.model('Admin', adminSchema);