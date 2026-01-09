const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes - AJOUTE appointmentRoutes
const { router: authRoutes } = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const dashboardRoutes = require('./routes/dashboard');
const appointmentRoutes = require('./routes/appointments'); // ← AJOUTE CETTE LIGNE
const doctorRoutes = require('./routes/doctor');


// ==================== CONFIGURATION ====================
console.log('=== DÉMARRAGE DU SERVEUR ===');

// Charger les variables d'environnement
dotenv.config();

// ==================== CRÉATION DE L'APP ====================
const app = express();

// ==================== MIDDLEWARE ====================
// 🔧 CORS CONFIGURÉ POUR PRODUCTION
const allowedOrigins = [
  'http://localhost:5174',  // ← AJOUTEZ CETTE LIGNE (votre frontend actuel)
  'http://localhost:5173',  // Vite Dev Server
  'http://localhost:3000',  // Create React App
  'https://quickdoc.vercel.app',
  'https://*.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // Autoriser les requêtes sans origine (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`🔒 CORS bloqué: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// ==================== ROUTES ====================
// Route de test
app.get('/api/test', (req, res) => {
  res.json({ 
    message: '✅ Le serveur fonctionne!',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Route de santé pour les services cloud
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'quickdoc-backend',
    environment: process.env.NODE_ENV || 'development',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString()
  });
});

// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'QuickDoc API is running 🚀',
    status: 'online',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    endpoints: {
      auth: '/api/auth',
      profile: '/api/profile',
      appointments: '/api/appointments', // ← AJOUTE CETTE LIGNE
      test: '/api/test',
      health: '/api/health'
    }
  });
});

// ==================== IMPORTANT: Routes principales ====================
// Routes d'authentification (doivent venir en premier)
app.use('/api/auth', authRoutes);

// Routes de profil
app.use('/api/profile', profileRoutes);

// Routes dashboard
app.use('/api/dashboard', dashboardRoutes);

// ⭐⭐ ROUTES DES RENDEZ-VOUS - AJOUTE CETTE LIGNE APRÈS app est défini ⭐⭐
app.use('/api/appointments', appointmentRoutes);

app.use('/api/doctors', doctorRoutes);

// ==================== CONNEXION MONGODB ====================
const startServer = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    
    // 🔧 UTILISATION DES VARIABLES D'ENVIRONNEMENT POUR PRODUCTION
    const mongoURI = process.env.MONGODB_URI || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/quickdoc';
    
    console.log(`🔍 Tentative de connexion à: ${mongoURI.includes('@') ? 'MongoDB Atlas' : 'MongoDB Local'}`);
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,  // Augmenté pour la production
      socketTimeoutMS: 45000,
      maxPoolSize: 10,  // Optimisé pour la production
      retryWrites: true,
      w: 'majority'
    });
    
    console.log('✅ MongoDB connecté');
    
    // Événements de connexion MongoDB
    mongoose.connection.on('error', (err) => {
      console.error('❌ Erreur MongoDB:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB déconnecté');
    });
    
    // Démarrer le serveur UNE SEULE FOIS
    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, () => {
      console.log(`\n🚀 SERVEUR DÉMARRÉ 🚀`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌍 Environnement: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🗄️  MongoDB: ${mongoose.connection.readyState === 1 ? '✅ Connecté' : '❌ Déconnecté'}`);
      console.log(`🔗 URI: ${mongoURI.includes('@') ? 'MongoDB Atlas' : 'Localhost'}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      
      // Afficher l'URL de production si déployé
      if (process.env.RENDER_EXTERNAL_URL) {
        console.log(`🌍 Production URL: ${process.env.RENDER_EXTERNAL_URL}`);
      }
      
      console.log('\n📋 Routes disponibles:');
      console.log(`   • GET  /              - Accueil API`);
      console.log(`   • GET  /api/test      - Test serveur`);
      console.log(`   • GET  /api/health    - Santé de l'API`);
      console.log(`   • POST /api/auth/signup - Inscription`);
      console.log(`   • POST /api/auth/signin - Connexion`);
      console.log(`   • PUT  /api/profile   - Mettre à jour le profil`);
      console.log(`   • GET  /api/profile   - Obtenir le profil`);
      console.log(`   • POST /api/appointments - Créer un rendez-vous`); // ← AJOUTE CETTE LIGNE
      
    });
    
    // Gestion propre de l'arrêt
    process.on('SIGTERM', () => {
      console.log('🛑 SIGTERM reçu. Arrêt propre...');
      server.close(() => {
        console.log('✅ Serveur arrêté');
        mongoose.connection.close(false, () => {
          console.log('✅ Connexion MongoDB fermée');
          process.exit(0);
        });
      });
    });
    
  } catch (error) {
    console.error('❌ Erreur de démarrage:', error.message);
    console.log('🔍 Détails:', {
      mongoURI: process.env.MONGODB_URI || process.env.MONGODB_URL || 'non défini',
      nodeEnv: process.env.NODE_ENV || 'non défini'
    });
    
    // Démarrer le serveur sans MongoDB (mode dégradé)
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n⚠️  Serveur démarré sur le port ${PORT} (sans MongoDB)`);
      console.log('📌 Mode: API-only (base de données non disponible)');
    });
  }
};

// ==================== DÉMARRAGE ====================
startServer();