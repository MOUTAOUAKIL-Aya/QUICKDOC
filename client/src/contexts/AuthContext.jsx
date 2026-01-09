/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

//const API_URL = 'http://localhost:5000/api';  // JUSTE ÇA, rien d'autre
const API_URL = '/api';
//const API_URL = ''; 
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Charger l'utilisateur depuis localStorage au démarrage
// Charger l'utilisateur au démarrage
    useEffect(() => {
    const loadUserOnStartup = async () => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        // Si on a un token, on vérifie avec le serveur
        if (token) {
            console.log('🔍 Vérification du token avec le serveur...');
            
            try {
                const response = await fetch(`${API_URL}/profile`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.ok) {
                    const freshUserData = await response.json();
                    console.log('✅ Utilisateur chargé depuis serveur:', freshUserData);
                    setUser(freshUserData);
                    localStorage.setItem('user', JSON.stringify(freshUserData));
                } else {
                    // Token invalide ou expiré
                    console.warn('❌ Token invalide, déconnexion');
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setUser(null);
                }
            } catch (error) {
                console.error('Erreur réseau, utilisation des données locales:', error);
                // En cas d'erreur réseau, utilise les données sauvegardées
                if (savedUser) {
                    try {
                        setUser(JSON.parse(savedUser));
                    } catch (parseError) {
                        console.error('Erreur parsing user:', parseError);
                        localStorage.removeItem('user');
                    }
                }
            }
        } else if (savedUser) {
            // Pas de token mais données utilisateur (mode déconnecté)
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Erreur parsing user:', error);
                localStorage.removeItem('user');
            }
        }
        
        setLoading(false);
    };
    
    loadUserOnStartup();
}, []);

   /* const fetchUser = async (user) => {
        try {
            const response = await fetch(`${API_URL}/auth/me`, {
                headers: {
                    'Authorization': `Bearer ${user}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    };*/

// CONNEXION
const signIn = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        console.log('SignIn response status:', response.status);
        const data = await response.json();
        console.log('SignIn response data:', data);

        if (response.ok && data.success) {
            // 1. Sauvegarde le token
            localStorage.setItem('token', data.token);
            
            // 2. IMMÉDIATEMENT récupérer le profil COMPLET
            try {
                const profileResponse = await fetch(`${API_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    console.log('📦 Profil complet récupéré:', profileData);
                    
                    // 3. Sauvegarde l'utilisateur COMPLET
                    localStorage.setItem('user', JSON.stringify(profileData));
                    setUser(profileData);
                    
                    return { success: true, data: profileData };
                } else {
                    console.warn('⚠️ Impossible de récupérer le profil complet');
                    // Sauvegarde quand même les données de base
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setUser(data.user);
                    return { success: true, data: data.user };
                }
            } catch (profileError) {
                console.error('Erreur récupération profil:', profileError);
                // En cas d'erreur, utilisez les données de base
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true, data: data.user };
            }
        } else {
            return { success: false, error: data.message || 'Échec de connexion' };
        }
    } catch (err) {
        console.error('SignIn catch error:', err);
        return { success: false, error: 'Erreur de connexion au serveur' };
    }
};

// INSCRIPTION
const signUp = async (email, password, name) => {
    try {
        const response = await fetch(`${API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        console.log('SignUp response status:', response.status);
        const data = await response.json();
        console.log('SignUp response data:', data);

        if (response.ok && data.success) {
            // 1. Sauvegarde le token
            localStorage.setItem('token', data.token);
            
            // 2. IMMÉDIATEMENT récupérer le profil COMPLET (même si vide)
            try {
                const profileResponse = await fetch(`${API_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${data.token}`,
                        'Content-Type': 'application/json'
                    }
                });
                
                if (profileResponse.ok) {
                    const profileData = await profileResponse.json();
                    console.log('📦 Profil récupéré après inscription:', profileData);
                    
                    // 3. Sauvegarde l'utilisateur
                    localStorage.setItem('user', JSON.stringify(profileData));
                    setUser(profileData);
                    
                    return { success: true, data: profileData };
                } else {
                    console.warn('⚠️ Impossible de récupérer le profil');
                    // Sauvegarde les données de base
                    localStorage.setItem('user', JSON.stringify(data.user));
                    setUser(data.user);
                    return { success: true, data: data.user };
                }
            } catch (profileError) {
                console.error('Erreur récupération profil:', profileError);
                localStorage.setItem('user', JSON.stringify(data.user));
                setUser(data.user);
                return { success: true, data: data.user };
            }
        } else {
            return { success: false, error: data.message || 'Échec d\'inscription' };
        }
    } catch (err) {
        console.error('SignUp catch error:', err);
        return { success: false, error: 'Erreur de connexion au serveur' };
    }
};
    // Déconnexion
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    // Alias pour logout
    const signOut = logout;

    // Vérifie si le profil est complet
    const profileComplete = user?.profileComplete || false;

    // Mettre à jour le profil
const updateProfile = async (profileData) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      return { success: false, error: 'Non authentifié' };
    }
    
    console.log('📤 Envoi des données au backend...');
    
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(profileData)
    });

    console.log('📡 Réponse status:', response.status);
    
    const data = await response.json();
    console.log('📊 Données reçues:', data);

    if (response.ok && data.success) {
      // ✅ CRITIQUE: Mettre à jour l'utilisateur avec les données du SERVEUR
      const updatedUser = { 
        ...user, 
        ...data.user,  // ← Utilisez data.user du serveur
        profileComplete: true 
      };
      
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return { 
        success: true, 
        message: data.message,
        user: data.user 
      };
    } else {
      return { 
        success: false, 
        error: data.message || 'Erreur lors de la mise à jour' 
      };
    }
  } catch (error) {
    console.error('❌ Erreur updateProfile:', error);
    return { 
      success: false, 
      error: 'Erreur de connexion au serveur' 
    };
  }
};

    const value = {
        user,
        loading,
        signIn,        // ← CHANGÉ: était 'login'
        signUp,        // ← DÉJÀ CORRECT
        logout,
        signOut,
        isAuthenticated: !!user,
        updateProfile,
        profileComplete,
        // Ajoutez aussi l'ancien 'login' pour compatibilité si besoin
        login: signIn, // Alias pour compatibilité
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};