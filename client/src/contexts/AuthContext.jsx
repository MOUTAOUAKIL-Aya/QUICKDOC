/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Charger l'utilisateur depuis localStorage au démarrage
    useEffect(() => {
        const timer = setTimeout(() => {
            const savedUser = localStorage.getItem('user');
            if (savedUser) {
                try {
                    setUser(JSON.parse(savedUser));
                } catch (err) {
                    console.error('Error parsing user data:', err);
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const fetchUser = async (user) => {
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
    };

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
            // ✅ Sauvegarde le token et l'utilisateur séparément
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true, data: data.user };
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
            // ✅ Sauvegarde le token et l'utilisateur séparément
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true, data: data.user };
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
    const profileCompleted = user?.profileCompleted || false;

    // Mettre à jour le profil
    const updateProfile = async (profileData) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/profile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(profileData)
            });

            const data = await response.json();

            if (data.success) {
                setUser({ ...user, profileComplete: true });
                localStorage.setItem('userProfile', JSON.stringify(profileData));
            }
        } catch (error) {
            console.error('Error updating profile:', error);
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
        profileCompleted,
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