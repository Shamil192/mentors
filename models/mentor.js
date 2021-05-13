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
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  competencies: {
    type: Array,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  payPerHour: {
    type: Number,
    required: true,
  },
  img: String,
  role: String,
  createdAt: Date,
  updatedAt: Date
},
  { timestamps: true }
);

const Mentor = model('Mentor', mentorSchema);
module.exports = Mentor
