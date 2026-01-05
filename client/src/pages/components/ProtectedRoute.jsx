import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, requireAuth = true, requireCompleteProfile = false }) {
  const { user, loading, profileCompleted } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Si requireAuth est true et pas d'utilisateur connecté
  if (requireAuth && !user) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Si requireCompleteProfile est true et profil non complété
  if (requireCompleteProfile && !profileCompleted) {
    return <Navigate to="/auth/complete-profile" replace />;
  }

  return children;
}

export default ProtectedRoute;