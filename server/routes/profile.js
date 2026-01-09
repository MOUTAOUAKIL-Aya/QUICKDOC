// server/routes/profiles.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// ========== MIDDLEWARE COMPLET ==========
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    console.log('🔑 Header Authorization:', authHeader ? 'Present' : 'Missing');
    
    if (!authHeader) {
      console.log('❌ Pas de header Authorization');
      return res.status(401).json({ 
        success: false, 
        message: 'Accès non autorisé - Token manquant' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    console.log('🔐 Token reçu:', token ? `${token.substring(0, 20)}...` : 'NULL');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token mal formé' 
      });
    }
    
    // Vérification du token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log('❌ Token invalide:', err.message);
        return res.status(403).json({ 
          success: false, 
          message: 'Token invalide ou expiré' 
        });
      }
      
      console.log('✅ Token valide pour user ID:', decoded.id);
      req.userId = decoded.id; // Stocke l'ID dans req
      next();
    });
    
  } catch (error) {
    console.error('❌ Erreur auth middleware:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur d\'authentification' 
    });
  }
};
// ========================================

// PUT /api/profile - Mettre à jour le profil DANS User
router.put('/', authenticateToken, async (req, res) => {
  try {
    console.log('📝 Mise à jour profil pour userId:', req.userId);
    console.log('📦 Données reçues:', Object.keys(req.body));
    
    const userId = req.userId;
    const profileData = req.body;
    
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'ID utilisateur manquant dans le token'
      });
    }
    
    // Vérifier si l'utilisateur existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Mettre à jour tous les champs
    Object.keys(profileData).forEach(key => {
      if (profileData[key] !== undefined && 
          key !== 'userId' && 
          key !== '_id' && 
          key !== 'id') {
        user[key] = profileData[key];
      }
    });
    
    // ⚠️ CORRECTION: Utilisez profileComplete (sans "d") comme dans User.js
    user.profileComplete = true; // ← SANS "d"
    user.updatedAt = new Date();
    
    await user.save();
    
    console.log('✅ Profil User mis à jour avec succès');
    
    // Retourner l'utilisateur sans le mot de passe
    const userResponse = user.toObject();
    delete userResponse.password;
    
    res.json({
      success: true,
      message: 'Profil mis à jour avec succès',
      user: userResponse
    });
    
  } catch (error) {
    console.error('❌ Erreur mise à jour profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur: ' + error.message
    });
  }
});

// GET /api/profile - Obtenir le profil DEPUIS User
router.get('/', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    res.json({
      success: true,
      user
    });
    
  } catch (error) {
    console.error('❌ Erreur récupération profil:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});
// Route pour uploader l'image
router.post('/image', authenticateToken, async (req, res) => {
  try {
    // Gérer l'upload avec multer ou stocker en base64 réduite
    // Pour l'instant, stocker en base64 dans l'utilisateur
    const user = await User.findById(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Utilisateur non trouvé'
      });
    }
    
    // Limiter à 100KB max
    const maxSize = 100 * 1024; // 100KB
    if (req.body.image && req.body.image.length > maxSize) {
      return res.status(400).json({
        success: false,
        message: 'Image trop grande. Maximum 100KB.'
      });
    }
    
    user.profileImage = req.body.image;
    await user.save();
    
    res.json({
      success: true,
      message: 'Image sauvegardée'
    });
    
  } catch (error) {
    console.error('❌ Erreur sauvegarde image:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur'
    });
  }
});

module.exports = router;