import React, { useState } from 'react'; // ← Enlève useEffect
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

function UserProfile() {
  const { user } = useAuth();
  
  // ✅ Initialisation directe avec une fonction
  const [profile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  });


  if (!profile) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <Icon name="User" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Complete Your Profile</h2>
            <p className="text-muted-foreground mb-6">
              Add your medical information to get personalized health insights
            </p>
            <Link to="/complete-profile">
              <Button variant="default">
                Complete Profile Now
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header du profil */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <Link to="/complete-profile">
              <Button variant="outline" iconName="Edit" iconPosition="left">
                Edit Profile
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonne gauche - Info principale */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              {/* Photo de profil */}
              <div className="text-center mb-6">
                {profile.profileImage ? (
                  <img
                    src={profile.profileImage}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-muted flex items-center justify-center border-4 border-border">
                    <Icon name="User" size={48} className="text-muted-foreground" />
                  </div>
                )}
                <h2 className="text-xl font-bold text-foreground mt-4">{user?.name}</h2>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>

              {/* Informations de base */}
              <div className="space-y-4 border-t border-border pt-6">
                <div className="flex items-center gap-3">
                  <Icon name="Calendar" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile.dateOfBirth || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="User" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Gender</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {profile.gender || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile.phone || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Location</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile.city ? `${profile.city}, ${profile.country}` : 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Icon name="Briefcase" size={20} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Occupation</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile.occupation || 'Not provided'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite - Détails médicaux */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Informations médicales */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Heart" size={20} className="text-primary" />
                Medical Information
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Blood Type</p>
                  <p className="text-lg font-bold text-foreground">
                    {profile.bloodType || 'N/A'}
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Height</p>
                  <p className="text-lg font-bold text-foreground">
                    {profile.height ? `${profile.height} cm` : 'N/A'}
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Weight</p>
                  <p className="text-lg font-bold text-foreground">
                    {profile.weight ? `${profile.weight} kg` : 'N/A'}
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">BMI</p>
                  <p className="text-lg font-bold text-foreground">
                    {profile.height && profile.weight
                      ? ((profile.weight / ((profile.height / 100) ** 2))).toFixed(1)
                      : 'N/A'}
                  </p>
                </div>
              </div>

              {/* Allergies */}
              {profile.allergies && (
                <div className="mt-4 p-4 bg-error/10 border border-error rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-1">Allergies</p>
                  <p className="text-sm text-muted-foreground">{profile.allergies}</p>
                </div>
              )}

              {/* Maladies chroniques */}
              {profile.chronicDiseases && (
                <div className="mt-4 p-4 bg-warning/10 border border-warning rounded-lg">
                  <p className="text-sm font-semibold text-foreground mb-1">Chronic Diseases</p>
                  <p className="text-sm text-muted-foreground">{profile.chronicDiseases}</p>
                </div>
              )}
            </div>

            {/* Médicaments actuels */}
            {profile.currentMedications && profile.currentMedications.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Pill" size={20} className="text-primary" />
                  Current Medications
                </h3>
                <div className="space-y-3">
                  {profile.currentMedications.map((med) => (
                    <div key={med.id} className="flex items-center gap-4 p-4 bg-background rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Icon name="Pill" size={20} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{med.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vaccins */}
            {profile.vaccines && profile.vaccines.length > 0 && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  Vaccination History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.vaccines.map((vac) => (
                    <div key={vac.id} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center">
                        <Icon name="Check" size={16} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">{vac.name}</p>
                        <p className="text-xs text-muted-foreground">{vac.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Informations familiales */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Users" size={20} className="text-primary" />
                Family & Emergency Contact
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Marital Status</p>
                  <p className="font-medium text-foreground capitalize">
                    {profile.maritalStatus || 'Not provided'}
                  </p>
                </div>
                
                {profile.numberOfChildren && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Children</p>
                    <p className="font-medium text-foreground">
                      {profile.numberOfChildren}
                    </p>
                  </div>
                )}
                
                {profile.emergencyContact && (
                  <>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Emergency Contact</p>
                      <p className="font-medium text-foreground">
                        {profile.emergencyContact}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Emergency Phone</p>
                      <p className="font-medium text-foreground">
                        {profile.emergencyPhone}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Lifestyle */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Icon name="Activity" size={20} className="text-primary" />
                Lifestyle & Habits
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {profile.smokingStatus && (
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Icon name="Cigarette" size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-1">Smoking</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {profile.smokingStatus.replace('_', ' ')}
                    </p>
                  </div>
                )}
                
                {profile.alcoholConsumption && (
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Icon name="Wine" size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-1">Alcohol</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {profile.alcoholConsumption}
                    </p>
                  </div>
                )}
                
                {profile.exerciseFrequency && (
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Icon name="Dumbbell" size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-1">Exercise</p>
                    <p className="text-sm font-medium text-foreground">
                      {profile.exerciseFrequency}
                    </p>
                  </div>
                )}
                
                {profile.dietType && (
                  <div className="text-center p-4 bg-background rounded-lg">
                    <Icon name="Apple" size={24} className="mx-auto mb-2 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground mb-1">Diet</p>
                    <p className="text-sm font-medium text-foreground capitalize">
                      {profile.dietType}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Informations spécifiques femmes */}
            {profile.gender === 'female' && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Icon name="Heart" size={20} className="text-pink-500" />
                  Women's Health
                </h3>
                
                <div className="space-y-4">
                  {profile.isPregnant && (
                    <div className="p-4 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
                      <p className="font-semibold text-foreground mb-1">Currently Pregnant</p>
                      {profile.pregnancyWeeks && (
                        <p className="text-sm text-muted-foreground">
                          Week {profile.pregnancyWeeks}
                        </p>
                      )}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profile.lastMenstrualPeriod && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Last Period</p>
                        <p className="font-medium text-foreground">
                          {profile.lastMenstrualPeriod}
                        </p>
                      </div>
                    )}
                    
                    {profile.contraceptionMethod && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Contraception</p>
                        <p className="font-medium text-foreground capitalize">
                          {profile.contraceptionMethod}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default UserProfile;