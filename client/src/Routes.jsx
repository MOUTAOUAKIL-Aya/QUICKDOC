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
            
            {/* 404 - TOUJOURS DERNIÈRE ROUTE */}
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;