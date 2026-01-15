import mongoose from "mongoose"

const travelerSchema = new mongoose.Schema({
  traveler_id: {
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
  company_name: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [200, 'Company name cannot exceed 200 characters']
  },
  business_contact: {
    type: String,
    required: [true, 'Business contact is required'],
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number']
  },
  address: {
    street: {
      type: String,
      required: [true, 'Street address is required']
    },
    city: {
      type: String,
      required: [true, 'City is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    pincode: {
      type: String,
      required: [true, 'Pincode is required'],
      match: [/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode']
    }
  },
  verification_status: {
    type: String,
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING'
  },
  verification_date: {
    type: Date
  },
  approved_by: {
    type: String,
    ref: 'Admin'
  }
}, {
  timestamps: true
});


travelerSchema.pre('save', async function(next) {
  if (this.traveler_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.traveler_id = `TRV${String(count + 1).padStart(6, '0')}`;
  next();
});

export default mongoose.model('Traveler', travelerSchema);