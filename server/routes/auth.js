const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Route d'inscription
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    console.log('📝 Inscription reçue:', { name, email });

    // 1. Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cet email existe déjà' 
      });
    }

    // 2. Valider le mot de passe (au moins 6 caractères)
    if (password.length < 6) {
      return res.status(400).json({ 
        success: false, 
        message: 'Le mot de passe doit contenir au moins 6 caractères' 
      });
    }

    // 3. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Créer l'utilisateur
    const user = new User({
      name,
      email,
      password: hashedPassword, // Déjà hashé
      role: 'patient',
      profileComplete: false
    });

    // 5. Sauvegarder dans MongoDB
    await user.save();
    
    console.log('✅ Utilisateur sauvegardé dans MongoDB, ID:', user._id);

    // 6. Répondre
    res.json({
      success: true,
      message: 'Compte créé avec succès',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete
      }
    });

  } catch (error) {
    console.error('❌ Erreur inscription:', error);
    
    // Erreur MongoDB (email dupliqué)
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cet email est déjà utilisé' 
      });
    }
    
    // Erreur de validation Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({ 
        success: false, 
        message: Object.values(error.errors).map(err => err.message).join(', ')
      });
    }
    
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur: ' + error.message 
    });
  }
});

// Route de connexion
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('🔑 Connexion tentée:', email);

    // 1. Validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email et mot de passe requis' 
      });
    }

    // 2. Trouver l'utilisateur AVEC le password (select: false donc on l'inclut)
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou mot de passe incorrect' 
      });
    }

    // 3. Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou mot de passe incorrect' 
      });
    }

    // 4. Répondre
    res.json({
      success: true,
      message: 'Connexion réussie',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileComplete: user.profileComplete
      }
    });

  } catch (error) {
    console.error('❌ Erreur connexion:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur serveur: ' + error.message 
    });
  }
});

module.exports = router;