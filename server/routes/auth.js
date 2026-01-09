const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- AJOUTER CETTE LIGNE
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

    // 2. Valider le mot de passe
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
      password: hashedPassword,
      role: 'patient',
      profileComplete: false
    });

    // 5. Sauvegarder
    await user.save();
    
    console.log('✅ Utilisateur créé, ID:', user._id);
    //6. TOKEN
        const token = jwt.sign(
        { 
            id: user._id.toString(), // Convertir en string pour être sûr
            email: user.email,
            name: user.name 
        },
        process.env.JWT_SECRET, // Utilise directement depuis .env
        { expiresIn: '7d' }
        );
   

    // 7. Répondre AVEC LE TOKEN
    res.json({
      success: true,
      message: 'Compte créé avec succès',
      token: token, // ← AJOUTER LE TOKEN
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
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        message: 'Cet email est déjà utilisé' 
      });
    }
    
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

    // 2. Trouver l'utilisateur
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

    // 4. GÉNÉRER UN TOKEN JWT
    const token = jwt.sign(
      { 
        id: user._id, // ← TRÈS IMPORTANT: utiliser 'id'
        email: user.email,
        name: user.name 
      },
      process.env.JWT_SECRET || 'votre-secret-par-defaut-123',
      { expiresIn: '7d' }
    );

    // 5. Répondre AVEC LE TOKEN
    res.json({
      success: true,
      message: 'Connexion réussie',
      token: token, // ← AJOUTER LE TOKEN
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

// Route pour obtenir l'utilisateur courant (optionnel)
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token manquant' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token mal formé' 
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'votre-secret-par-defaut-123');
    const user = await User.findById(decoded.id).select('-password');
    
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
    console.error('❌ Erreur /me:', error);
    res.status(401).json({ 
      success: false, 
      message: 'Token invalide ou expiré' 
    });
  }
});


// ==================== MIDDLEWARE D'AUTHENTIFICATION ====================

/**
 * Middleware pour vérifier les tokens JWT
 */
const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Accès non autorisé. Token manquant.' 
      });
    }

    // Vérifier le token
    jwt.verify(token, process.env.JWT_SECRET || 'votre-secret-par-defaut-123', (err, decoded) => {
      if (err) {
        console.log('❌ Token invalide:', err.message);
        return res.status(403).json({ 
          success: false, 
          message: 'Token invalide ou expiré' 
        });
      }
      
      // Token valide, ajouter les infos utilisateur à la requête
      req.user = {
        userId: decoded.id,  // ← TRÈS IMPORTANT: utilisez 'id' comme dans signin
        email: decoded.email,
        name: decoded.name
      };
      
      console.log('✅ Token valide pour:', req.user.email);
      next();
    });
  } catch (error) {
    console.error('❌ Erreur middleware auth:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur d\'authentification' 
    });
  }
};

// ==================== EXPORTS ====================

// Exportez le router ET le middleware
module.exports = {
  router: router,
  authenticateToken: authenticateToken
};