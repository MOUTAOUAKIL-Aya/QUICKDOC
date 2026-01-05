const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');

// ==================== CONFIGURATION ====================
console.log('=== DÉMARRAGE DU SERVEUR ===');

// Charger les variables d'environnement
dotenv.config();

// ==================== CRÉATION DE L'APP ====================
const app = express();

// ==================== MIDDLEWARE ====================
app.use(cors());
app.use(express.json());

// ==================== ROUTES ====================
// Route de test
app.get('/api/test', (req, res) => {
  res.json({ message: '✅ Le serveur fonctionne!' });
});



// Route racine
app.get('/', (req, res) => {
  res.json({ 
    message: 'QuickDoc API is running 🚀',
    status: 'online'
  });
});

// Routes d'authentification
app.use('/api/auth', authRoutes);

// ==================== CONNEXION MONGODB ====================
const startServer = async () => {
  try {
    console.log('🔗 Connexion à MongoDB...');
    
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ MongoDB connecté');
    
    // Démarrer le serveur UNE SEULE FOIS
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n🚀 SERVEUR DÉMARRÉ 🚀`);
      console.log(`📡 Port: ${PORT}`);
      console.log(`🗄️  MongoDB: Connecté`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log('\n📋 Routes disponibles:');
      console.log(`   • GET  /              - Accueil API`);
      console.log(`   • GET  /api/test      - Test serveur`);
      console.log(`   • POST /api/auth/signup - Inscription`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
    
    // Démarrer le serveur sans MongoDB
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`\n⚠️  Serveur démarré sur le port ${PORT} (sans MongoDB)`);
    });
  }
};

// ==================== DÉMARRAGE ====================
startServer();