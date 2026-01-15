import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  booking_reference: {
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
  schedule_id: {
    type: String,
    required: [true, 'Schedule ID is required'],
    ref: 'BusSchedule'
  },
  traveler_id: {
    type: String,
    required: [true, 'Traveler ID is required'],
    ref: 'Traveler'
  },
  number_of_seats: {
    type: Number,
    required: [true, 'Number of seats is required'],
    min: [1, 'At least 1 seat must be booked'],
    max: [6, 'Cannot book more than 6 seats at once']
  },
  seat_numbers: [{
    type: String,
    required: true
  }],
  total_amount: {
    type: Number,
    required: [true, 'Total amount is required'],
    min: [0, 'Amount cannot be negative']
  },
  booking_status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
    default: 'PENDING'
  },
  payment_status: {
    type: String,
    enum: ['UNPAID', 'PAID', 'REFUNDED'],
    default: 'UNPAID'
  },
  payment_method: {
    type: String,
    enum: ['UPI', 'Card', 'Net Banking', 'Cash', 'Wallet'],
    required: function() {
      return this.payment_status === 'PAID';
    }
  },
  payment_id: {
    type: String
  },
  booking_date: {
    type: Date,
    default: Date.now
  },
  cancellation_date: {
    type: Date
  },
  refund_amount: {
    type: Number,
    default: 0,
    min: [0, 'Refund amount cannot be negative']
  }
}, {
  timestamps: true
});

// Auto-generate booking_id and booking_reference
bookingSchema.pre('save', async function(next) {
  if (this.booking_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.booking_id = `BKG${String(count + 1).padStart(6, '0')}`;
  
  // Generate booking reference: BUS + YYYYMMDD + counter
  const date = new Date();
  const dateStr = date.getFullYear() + 
                  String(date.getMonth() + 1).padStart(2, '0') + 
                  String(date.getDate()).padStart(2, '0');
  this.booking_reference = `BUS${dateStr}${String(count + 1).padStart(4, '0')}`;
  
  next();
});

// Validate seat_numbers length matches number_of_seats
bookingSchema.pre('save', function(next) {
  if (this.seat_numbers.length !== this.number_of_seats) {
    next(new Error('Number of seats must match seat numbers array length'));
  }
  next();
});

export default mongoose.model('Booking', bookingSchema);


