const express = require('express');
const router = express.Router();
const User = require('../models/User');
// Middleware d'authentification (vous devez l'avoir déjà)
const { authenticateToken } = require('./auth'); // À adapter selon votre structure
/**
 * @route GET /api/dashboard
 * @desc Récupère les données du dashboard personnalisées
 * @access Private
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log('📊 Chargement dashboard pour utilisateur:', req.user.userId);
    
    // 1. Récupérer l'utilisateur depuis MongoDB
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'Utilisateur non trouvé' 
      });
    }
    
    console.log('✅ Utilisateur trouvé:', user.email);
    console.log('📦 Données disponibles:', {
      hasMedication: !!user.medicationName,
      hasWeight: !!user.weight,
      hasHeight: !!user.height,
      hasVaccine: !!user.vaccineName
    });
    
// 2. FORMAT ONLY EXISTING DATA
const dashboardData = {
  // A. HEALTH METRICS - ONLY what exists
  healthMetrics: {
    // Weight: only if present in MongoDB
    weight: user.weight && user.weight !== "" && user.weight !== "Not specified" 
      ? parseFloat(user.weight) 
      : null,
    
    // Height: only if present in MongoDB  
    height: user.height && user.height !== "" && user.height !== "Not specified"
      ? parseFloat(user.height) 
      : null,
    
    // Heart Rate: FIXED VALUE FOR ALL USERS
    heartRate: {
      value: "60-100",
      unit: "bpm",
      label: "Resting heart rate (normal range)",
      isFixed: true
    },
    
    // Blood Pressure: FIXED VALUE FOR ALL USERS
    bloodPressure: {
      value: "120/80",
      unit: "mmHg",
      label: "Ideal blood pressure",
      isFixed: true
    },
    // Body Temperature: NEW FIXED VALUE
    bodyTemperature: {
      value: "36.1-37.2",
      unit: "°C",
      label: "Normal body temperature",
      isFixed: true
    },
    // Sleep hours: null (not in your model)
    sleepHours: null,
    
    // Update date
    updatedAt: user.updatedAt || new Date().toISOString()
  },
        // B. MÉDICAMENTS - seulement si présent
      medications: user.medicationName && user.medicationName !== "" && user.medicationName !== "Non renseigné" 
        ? [{
            name: user.medicationName,
            dosage: user.medicationDosage && user.medicationDosage !== "" ? user.medicationDosage : "Non spécifié",
            time: user.medicationFrequency === "Morning" ? "8:00 AM" : 
                  user.medicationFrequency === "Afternoon" ? "2:00 PM" : 
                  user.medicationFrequency === "Evening" ? "8:00 PM" : "Non spécifié",
            taken: false
          }]
        : [],
      
      // C. VACCINS - seulement si présent
      vaccines: user.vaccineName && user.vaccineName !== "" && user.vaccineName !== "Non renseigné"
        ? [{
            name: user.vaccineName,
            status: user.vaccineDate ? "up-to-date" : "pending"
          }]
        : [],
      
      // D. DERNIÈRE CONSULTATION - null (pas dans votre modèle)
      lastConsultation: null
    };
      
      console.log('🚀 Dashboard data (données réelles uniquement):', {
      weight: dashboardData.healthMetrics.weight,
      height: dashboardData.healthMetrics.height,
      hasWeight: !!dashboardData.healthMetrics.weight,
      hasHeight: !!dashboardData.healthMetrics.height,
      medicationCount: dashboardData.medications.length,
      vaccineCount: dashboardData.vaccines.length
    });
    
     // 3. ENVOYER LA RÉPONSE
    res.json({
      success: true,
      data: dashboardData
    });
    
  } catch (error) {
    console.error('❌ Erreur route dashboard:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur',
      error: error.message 
    });
  }
});
module.exports = router;