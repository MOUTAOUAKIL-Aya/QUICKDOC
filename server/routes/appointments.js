const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const { authenticateToken } = require('./auth');

/**
 * @route GET /api/appointments
 * @desc Récupère tous les rendez-vous de l'utilisateur
 * @access Private
 */
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    console.log('🔍 Recherche TOUS les rendez-vous pour userId:', userId);
    
    // 1. D'abord, récupérer les IDs de rendez-vous de l'utilisateur
    const user = await User.findById(userId).select('appointments');
    
    if (!user || !user.appointments || user.appointments.length === 0) {
      console.log('📭 Utilisateur sans rendez-vous');
      return res.json({
        success: true,
        appointments: []
      });
    }
    
    console.log(`📋 IDs de rendez-vous trouvés: ${user.appointments.length}`);
    
    // 2. Ensuite, trouver les rendez-vous complets avec ces IDs
    const appointments = await Appointment.find({
      _id: { $in: user.appointments } // Chercher par les IDs
    })
    .sort({ date: 1, time: 1 });
    
    // 3. Formater pour le frontend
    const formattedAppointments = appointments.map(appointment => formatAppointmentForFrontend(appointment));
    
    res.json({
      success: true,
      appointments: formattedAppointments
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération rendez-vous:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

/**
 * @route GET /api/appointments/upcoming
 * @desc Récupère les rendez-vous à venir (POPULÉS depuis user.appointments)
 * @access Private
 */
router.get('/upcoming', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    console.log('🔍 Recherche rendez-vous à venir pour userId:', userId);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // ⭐⭐ CHANGEMENT CRITIQUE : Chercher DIRECTEMENT par patient ID ⭐⭐
    const appointments = await Appointment.find({
      patient: userId, // <-- CHANGÉ: patient au lieu de _id dans user.appointments
      date: { $gte: today },
      status: { $ne: 'cancelled' }
    })
    .sort({ date: 1, time: 1 })
    .limit(2);
    
    console.log('📅 Rendez-vous trouvés (recherche directe):', appointments.length);
    
    if (appointments.length === 0) {
      console.log('📭 Aucun rendez-vous trouvé pour cet utilisateur');
    }
    
    // Formater pour le frontend
    const formattedAppointments = appointments.map(appointment => {
      const appointmentObj = appointment.toObject();
      
      // Déterminer l'image du docteur
      const doctorImages = {
        1: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
        2: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9c787bd-1763293571066.png",
        3: "https://img.rocket.new/generatedImages/rocket_gen_img_1a29b7a76-1763295028142.png"
      };
      
      let doctorImage = "https://via.placeholder.com/150";
      if (appointmentObj.doctorInfo && appointmentObj.doctorInfo.isMock) {
        const originalId = appointmentObj.doctorInfo.originalId || 1;
        doctorImage = doctorImages[originalId] || doctorImages[1];
      }
      
      // Formater la date pour l'affichage
      const formatDate = (dateString) => {
        if (!dateString) return 'Date non définie';
        try {
          const date = new Date(dateString);
          const today = new Date();
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          
          if (date.toDateString() === today.toDateString()) {
            return `Today, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
          } else if (date.toDateString() === tomorrow.toDateString()) {
            return `Tomorrow, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
          } else {
            return date.toLocaleDateString('en-US', { 
              weekday: 'short', 
              month: 'short', 
              day: 'numeric' 
            });
          }
        } catch (e) {
          return dateString;
        }
      };
      
      return {
        _id: appointmentObj._id,
        appointmentId: appointmentObj._id,
        doctorName: appointmentObj.doctorInfo?.name || 'Dr. Non spécifié',
        specialty: appointmentObj.doctorInfo?.specialization || 'Généraliste',
        date: formatDate(appointmentObj.date), // ⭐ Date déjà formatée pour le frontend
        rawDate: appointmentObj.date, // Garder la date originale pour référence
        time: appointmentObj.time || 'Non spécifié',
        type: appointmentObj.type || 'consultation',
        status: appointmentObj.status || 'pending',
        doctorImage: doctorImage,
        doctorInfo: appointmentObj.doctorInfo || {}
      };
    });
    
    console.log('✅ Rendez-vous formatés:', formattedAppointments.length);
    
    res.json({
      success: true,
      appointments: formattedAppointments
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération rendez-vous à venir:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur: ' + error.message 
    });
  }
});

/**
 * @route POST /api/appointments
 * @desc Créer un nouveau rendez-vous
 * @access Private
 */
router.post('/', authenticateToken, async (req, res) => {
  try {
    console.log('📦 Body reçu:', req.body);
    
    const { doctorId, date, time, type, reason, symptoms, doctorName, doctorSpecialization } = req.body;
    const patientId = req.user.userId;
    
    if (!doctorId || !date || !time) {
      return res.status(400).json({ 
        success: false, 
        message: 'Informations manquantes' 
      });
    }
    
    console.log('🆔 IDs:', { patientId, doctorId, type: typeof doctorId });
    
    // Gestion des IDs mockés
    let doctorObjectId;
    let isMockDoctor = false;
    
    if (typeof doctorId === 'number' || /^\d+$/.test(doctorId)) {
      isMockDoctor = true;
      const numericId = parseInt(doctorId);
      const paddedId = `mock${numericId.toString().padStart(20, '0')}`;
      doctorObjectId = paddedId;
      
      console.log(`👨‍⚕️ Docteur mocké ID ${numericId} -> ${doctorObjectId}`);
    } else {
      doctorObjectId = doctorId;
    }
    
    // Création du rendez-vous
    const newAppointment = new Appointment({
      patient: patientId,
      doctor: doctorObjectId,
      date: new Date(date),
      time: time,
      type: type || 'video',
      reason: reason || '',
      symptoms: symptoms || '',
      status: 'pending',
      doctorInfo: isMockDoctor ? {
        name: doctorName || `Dr. Mock ${doctorId}`,
        specialization: doctorSpecialization || 'General Practitioner',
        isMock: true,
        originalId: doctorId
      } : undefined
    });
    
    console.log('📅 Appointment à créer:', newAppointment);
    
    const savedAppointment = await newAppointment.save();
    
    // Ajouter l'ID du rendez-vous à l'utilisateur
    await User.findByIdAndUpdate(patientId, {
      $push: { appointments: savedAppointment._id }
    });
    
    console.log('✅ Rendez-vous créé:', savedAppointment._id);
    
    // Formater la réponse
    const responseData = {
      success: true,
      message: 'Rendez-vous créé avec succès',
      appointment: formatAppointmentForFrontend(savedAppointment)
    };
    
    res.json(responseData);
    
  } catch (error) {
    console.error('❌ Erreur création rendez-vous:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur: ' + error.message 
    });
  }
});

/**
 * @route DELETE /api/appointments/:id
 * @desc Supprimer un rendez-vous
 * @access Private
 */
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    
    console.log(`🗑️  Tentative d'annulation du rendez-vous ${id} pour userId: ${userId}`);
    
    // Vérifier que le rendez-vous appartient à l'utilisateur
    const appointment = await Appointment.findOne({
      _id: id,
      patient: userId
    });
    
    if (!appointment) {
      return res.status(404).json({ 
        success: false, 
        message: 'Rendez-vous non trouvé' 
      });
    }
    
    // Marquer comme annulé plutôt que supprimer
    appointment.status = 'cancelled';
    await appointment.save();
    
    // Note: On ne retire pas l'ID de user.appointments pour garder l'historique
    
    res.json({
      success: true,
      message: 'Rendez-vous annulé avec succès'
    });
    
  } catch (error) {
    console.error('❌ Erreur suppression rendez-vous:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur' 
    });
  }
});

/**
 * @route GET /api/appointments/debug
 * @desc Route de debug pour voir l'état des rendez-vous
 * @access Private
 */
router.get('/debug', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    
    // 1. Utilisateur
    const user = await User.findById(userId);
    
    // 2. Tous les rendez-vous de la base
    const allAppointments = await Appointment.find({});
    
    // 3. Rendez-vous de cet utilisateur
    const userAppointments = await Appointment.find({
      _id: { $in: user.appointments || [] }
    });
    
    res.json({
      success: true,
      debug: {
        userId,
        userEmail: user.email,
        userAppointmentsIds: user.appointments || [],
        userAppointmentsCount: userAppointments.length,
        allAppointmentsCount: allAppointments.length,
        userAppointments: userAppointments.map(a => ({
          id: a._id,
          patient: a.patient,
          doctor: a.doctor,
          doctorInfo: a.doctorInfo,
          date: a.date,
          status: a.status,
          type: a.type
        }))
      }
    });
    
  } catch (error) {
    console.error('❌ Debug error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * Fonction utilitaire pour formater un rendez-vous pour le frontend
 */
function formatAppointmentForFrontend(appointment) {
  const appointmentObj = appointment.toObject ? appointment.toObject() : appointment;
  
  // Mapping des IDs mockés aux images
  const doctorImages = {
    1: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    2: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9c787bd-1763293571066.png",
    3: "https://img.rocket.new/generatedImages/rocket_gen_img_1a29b7a76-1763295028142.png",
    4: "https://img.rocket.new/generatedImages/rocket_gen_img_13d4f42bc-1764998744336.png",
    5: "https://img.rocket.new/generatedImages/rocket_gen_img_113dbdb97-1763298762709.png",
    6: "https://img.rocket.new/generatedImages/rocket_gen_img_1b523b869-1763295530479.png"
  };
  
  // Formater la date pour l'affichage
  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Date non définie';
    
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) {
        return `Aujourd'hui, ${date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}`;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Demain, ${date.toLocaleDateString('fr-FR', { month: 'short', day: 'numeric' })}`;
      } else {
        return date.toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (e) {
      return dateString;
    }
  };
  
  // Déterminer l'image du docteur
  let doctorImage = "https://via.placeholder.com/150";
  if (appointmentObj.doctorInfo && appointmentObj.doctorInfo.isMock) {
    const originalId = appointmentObj.doctorInfo.originalId || 1;
    doctorImage = doctorImages[originalId] || doctorImages[1];
  }
  
  return {
    _id: appointmentObj._id,
    appointmentId: appointmentObj._id,
    doctorName: appointmentObj.doctorInfo?.name || 'Dr. Non spécifié',
    specialty: appointmentObj.doctorInfo?.specialization || 'Généraliste',
    date: appointmentObj.date, // Date originale pour le filtrage
    displayDate: formatDisplayDate(appointmentObj.date), // Date formatée pour l'affichage
    time: appointmentObj.time || 'Heure non définie',
    type: appointmentObj.type || 'Consultation',
    status: appointmentObj.status || 'pending',
    doctorImage: doctorImage,
    doctorImageAlt: appointmentObj.doctorInfo?.name || 'Photo du docteur'
  };
}

module.exports = router;