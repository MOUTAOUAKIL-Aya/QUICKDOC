const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  profileImage: String,
  
  // Informations personnelles
  dateOfBirth: Date,
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  phone: String,
  address: String,
  city: String,
  country: {
    type: String,
    default: 'Morocco'
  },
  
  // Informations médicales
  bloodType: String,
  height: Number, // en cm
  weight: Number, // en kg
  allergies: String,
  chronicDiseases: String,
  
  // Médicaments actuels
  currentMedications: [{
    name: String,
    dosage: String,
    frequency: String,
    startDate: Date
  }],
  
  // Vaccins
  vaccines: [{
    name: String,
    date: Date,
    nextDose: Date
  }],
  
  // Informations familiales
  maritalStatus: {
    type: String,
    enum: ['single', 'married', 'divorced', 'widowed']
  },
  numberOfChildren: Number,
  occupation: String,
  emergencyContact: {
    name: String,
    phone: String,
    relationship: String
  },
  
  // Spécifique femmes
  womenHealth: {
    isPregnant: Boolean,
    pregnancyWeeks: Number,
    lastMenstrualPeriod: Date,
    contraceptionMethod: String
  },
  
  // Style de vie
  lifestyle: {
    smokingStatus: String,
    alcoholConsumption: String,
    exerciseFrequency: String,
    dietType: String
  },
  
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Profile', profileSchema);