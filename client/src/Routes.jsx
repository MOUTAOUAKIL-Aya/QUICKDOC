import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute"; 
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import MedicalRecords from './pages/medical-records';
import HealthDashboardHomepage from './pages/health-dashboard_homepage';
import AISymptomChecker from './pages/ai-symptom-checker';
import TrustComplianceCenter from './pages/trust-compliance-center';
import PharmacyServices from './pages/pharmacy-services';
import DoctorConsultation from './pages/doctor-consultation';
import UserProfile from './pages/profile/UserProfile';

import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import CompleteProfile from "pages/auth/CompleteProfile";

import AppointmentsPage from './pages/appointments/index.jsx';
import ArticleDetailPage from './pages/health-dashboard_homepage/components/ArticleDetailPage';


const Routes = () => {
  return (
    <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Routes publiques */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Routes semi-protégées (utilisateur connecté mais profil incomplet) */}
            <Route 
              path="/complete-profile" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={false}>
                  <CompleteProfile />
                </ProtectedRoute>
              } 
            />

            {/* Routes protégées (nécessitent connexion ET profil complet) */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <HealthDashboardHomepage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <UserProfile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/medical-records" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <MedicalRecords />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/health-dashboard-homepage" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <HealthDashboardHomepage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/ai-symptom-checker" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <AISymptomChecker />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/trust-compliance-center" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <TrustComplianceCenter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/pharmacy-services" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <PharmacyServices />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/doctor-consultation" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <DoctorConsultation />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/appointments" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <AppointmentsPage />
                </ProtectedRoute>
              } 
            />

              {/* ✅ NOUVELLE ROUTE POUR LES ARTICLES DÉTAILLÉS */}
            <Route 
              path="/article/:id" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <ArticleDetailPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Optionnel : Route pour la liste de tous les articles */}
            <Route 
              path="/health-tips" 
              element={
                <ProtectedRoute requireAuth={true} requireCompleteProfile={true}>
                  <div>Page de tous les articles (à créer)</div>
                </ProtectedRoute>
              } 
            />
            
            {/* 404 - TOUJOURS DERNIÈRE ROUTE */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;