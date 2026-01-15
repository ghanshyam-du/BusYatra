import mongoose from "mongoose"


const supportTicketSchema = new mongoose.Schema({
  ticket_id: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  ticket_number: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  traveler_id: {
    type: String,
    required: [true, 'Traveler ID is required'],
    ref: 'Traveler'
  },
  admin_id: {
    type: String,
    ref: 'Admin'
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  ticket_type: {
    type: String,
    enum: ['TECHNICAL', 'BILLING', 'GENERAL', 'COMPLAINT'],
    required: [true, 'Ticket type is required']
  },
  priority: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    default: 'MEDIUM'
  },
  ticket_status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'],
    default: 'OPEN'
  },
  resolution_notes: {
    type: String,
    trim: true
  },
  resolved_at: {
    type: Date
  }
}, {
  timestamps: true
});

// Auto-generate ticket_id and ticket_number
supportTicketSchema.pre('save', async function(next) {
  if (this.ticket_id) return next();
  
  const count = await this.constructor.countDocuments();
  this.ticket_id = `TKT${String(count + 1).padStart(6, '0')}`;
  
  // Generate ticket number: SUP + YYYYMMDD + counter
  const date = new Date();
  const dateStr = date.getFullYear() + 
                  String(date.getMonth() + 1).padStart(2, '0') + 
                  String(date.getDate()).padStart(2, '0');
  this.ticket_number = `SUP${dateStr}${String(count + 1).padStart(4, '0')}`;
  
  next();
});

// Auto-set resolved_at when status changes to RESOLVED
supportTicketSchema.pre('save', function(next) {
  if (this.isModified('ticket_status') && this.ticket_status === 'RESOLVED' && !this.resolved_at) {
    this.resolved_at = new Date();
  }
  next();
});

export default mongoose.model('SupportTicket', supportTicketSchema);
