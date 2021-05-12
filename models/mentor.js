const { Schema, model, pluralize } = require('mongoose');
pluralize(null);

const mentorSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tel: {
    type: Number,
  },
  password: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
  },
  competencies: {
    type: Array,
    default: ["React"],
  },
  experience: {
    type: Number,
    required: true,
  },
  payPerHour: {
    type: Number,
    default: 1000
    // required: true,
  },
  role: String,
  createdAt: Date,
  updatedAt: Date
},
  { timestamps: true }
);

const Mentor = model('Mentor', mentorSchema);
module.exports = Mentor
