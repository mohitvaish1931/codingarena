const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  longDescription: {
    type: String,
    maxlength: 5000
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'ended'],
    default: 'upcoming'
  },
  category: {
    type: String,
    enum: ['DSA', 'Web Development', 'AI/ML', 'Competitive Programming', 'Hackathon'],
    required: true
  },
  maxParticipants: {
    type: Number,
    default: 500
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    registeredAt: {
      type: Date,
      default: Date.now
    },
    score: {
      type: Number,
      default: 0
    },
    timeCompleted: String,
    rank: Number
  }],
  prizePool: {
    total: String,
    distribution: [{
      position: Number,
      amount: String
    }]
  },
  rules: [{
    type: String,
    trim: true
  }],
  schedule: [{
    time: String,
    event: String
  }],
  registrationUrl: {
    type: String,
    required: true
  },
  problemStatements: [{
    title: String,
    description: String,
    difficulty: String,
    points: Number,
    testCases: [{
      input: String,
      output: String,
      isHidden: {
        type: Boolean,
        default: false
      }
    }]
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Virtual for participant count
eventSchema.virtual('participantCount').get(function() {
  return this.participants.length;
});

// Index for better query performance
eventSchema.index({ date: 1, status: 1 });
eventSchema.index({ category: 1 });
eventSchema.index({ createdBy: 1 });

module.exports = mongoose.model('Event', eventSchema);