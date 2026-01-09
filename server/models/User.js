// server/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileComplete: { type: Boolean, default: false },
  
  // Champs du profil
  dateOfBirth: String,
  age: String,
  gender: String,
  phone: String,
  address: String,
  city: String,
  country: { type: String, default: 'Morocco' },
  bloodType: String,
  height: String,
  weight: String,
  allergies: String,
  chronicDiseases: String,
  currentMedications: Array,
  medicationName: String,
  medicationDosage: String,
  medicationFrequency: String,
  vaccines: Array,
  vaccineName: String,
  vaccineDate: String,
  maritalStatus: String,
  numberOfChildren: String,
  occupation: String,
  emergencyContact: String,
  emergencyPhone: String,
  isPregnant: Boolean,
  pregnancyWeeks: String,
  lastMenstrualPeriod: String,
  contraceptionMethod: String,
  smokingStatus: String,
  alcoholConsumption: String,
  exerciseFrequency: String,
  dietType: String,
  profileImage: String,
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }],
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);