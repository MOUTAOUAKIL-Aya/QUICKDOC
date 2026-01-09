const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken } = require('./auth');

// Créer un docteur (pour le développement)
router.post('/seed', async (req, res) => {
  try {
    const doctors = [
      {
        name: "Dr. Amina Benali",
        email: "amina@quickdoc.com",
        password: "password123",
        role: "doctor",
        specialization: "General Practitioner",
        experience: "15 years",
        location: "Casablanca, Morocco",
        languages: ["Arabic", "French", "English"],
        consultationFee: 250,
        isVerified: true
      },
      // ... ajoute les autres docteurs
    ];

    for (const doctorData of doctors) {
      const existingDoctor = await User.findOne({ email: doctorData.email });
      if (!existingDoctor) {
        const doctor = new User({
          ...doctorData,
          profileComplete: true
        });
        await doctor.save();
        console.log(`✅ Docteur créé: ${doctorData.name}`);
      }
    }

    res.json({ success: true, message: 'Docteurs créés' });
  } catch (error) {
    console.error('❌ Erreur création docteurs:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// Récupérer tous les docteurs
router.get('/', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' })
      .select('name email specialization experience location consultationFee isVerified');
    
    res.json({ success: true, doctors });
  } catch (error) {
    console.error('❌ Erreur récupération docteurs:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

module.exports = router;