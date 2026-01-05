import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

function CompleteProfile() {
  const navigate = useNavigate();
  const { updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState(null); // ← Ajoute cette ligne

  const [formData, setFormData] = useState({
    // Informations personnelles
    dateOfBirth: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    country: 'Morocco',
    
    // Informations médicales
    bloodType: '',
    height: '',
    weight: '',
    allergies: '',
    chronicDiseases: '',
    
    // Médicaments
    currentMedications: [],
    medicationName: '',
    medicationDosage: '',
    medicationFrequency: '',
    
    // Vaccins
    vaccines: [],
    vaccineName: '',
    vaccineDate: '',
    
    // Informations familiales et sociales
    maritalStatus: '',
    numberOfChildren: '',
    occupation: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Informations spécifiques femmes
    isPregnant: false,
    pregnancyWeeks: '',
    lastMenstrualPeriod: '',
    contraceptionMethod: '',
    
    // Style de vie
    smokingStatus: '',
    alcoholConsumption: '',
    exerciseFrequency: '',
    dietType: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Gérer l'upload de photo
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Ajouter un médicament
  const addMedication = () => {
    if (formData.medicationName) {
      setFormData({
        ...formData,
        currentMedications: [
          ...formData.currentMedications,
          {
            id: Date.now(),
            name: formData.medicationName,
            dosage: formData.medicationDosage,
            frequency: formData.medicationFrequency
          }
        ],
        medicationName: '',
        medicationDosage: '',
        medicationFrequency: ''
      });
    }
  };

  // Supprimer un médicament
  const removeMedication = (id) => {
    setFormData({
      ...formData,
      currentMedications: formData.currentMedications.filter(med => med.id !== id)
    });
  };

  // Ajouter un vaccin
  const addVaccine = () => {
    if (formData.vaccineName && formData.vaccineDate) {
      setFormData({
        ...formData,
        vaccines: [
          ...formData.vaccines,
          {
            id: Date.now(),
            name: formData.vaccineName,
            date: formData.vaccineDate
          }
        ],
        vaccineName: '',
        vaccineDate: ''
      });
    }
  };

  // Supprimer un vaccin
  const removeVaccine = (id) => {
    setFormData({
      ...formData,
      vaccines: formData.vaccines.filter(vac => vac.id !== id)
    });
  };

  // ❌ ENLÈVE le premier handleSubmit (lignes 11-22)
  // ✅ GARDE SEULEMENT CELUI-CI :
  const handleSubmit = (e) => {
    e.preventDefault();

    // Sauvegarder le profil
    const profileData = {
      ...formData,
      profileImage: imagePreview
    };

    updateProfile(profileData);
    navigate('/');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
            <span className="text-sm text-muted-foreground">Step {step} of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
            
            {/* STEP 1: Personal Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Personal Information</h2>

                {/* Photo de profil */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-primary"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center border-4 border-border">
                        <Icon name="User" size={48} className="text-muted-foreground" />
                      </div>
                    )}
                    <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors">
                      <Icon name="Camera" size={20} />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Upload profile picture</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Date de naissance */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Genre */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Téléphone */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+212 6XX XXX XXX"
                      required
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Ville */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Casablanca, Rabat..."
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Adresse */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Street address"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-8">
                  <Button type="button" variant="default" onClick={nextStep}>
                    Next Step
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 2: Medical Information */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Medical Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Groupe sanguin */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Blood Type
                    </label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select blood type</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="unknown">I don't know</option>
                    </select>
                  </div>

                  {/* Taille */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="170"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Poids */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="70"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Allergies */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Allergies
                    </label>
                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      placeholder="Peanuts, penicillin, etc."
                      rows="3"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>

                  {/* Maladies chroniques */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Chronic Diseases
                    </label>
                    <textarea
                      name="chronicDiseases"
                      value={formData.chronicDiseases}
                      onChange={handleChange}
                      placeholder="Diabetes, hypertension, etc."
                      rows="3"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                </div>

                {/* Médicaments actuels */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Current Medications</h3>
                  
                  {/* Liste des médicaments */}
                  {formData.currentMedications.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {formData.currentMedications.map((med) => (
                        <div key={med.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{med.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {med.dosage} • {med.frequency}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMedication(med.id)}
                            className="text-error hover:text-error/80"
                          >
                            <Icon name="Trash2" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulaire d'ajout */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="medicationName"
                      value={formData.medicationName}
                      onChange={handleChange}
                      placeholder="Medication name"
                      className="h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="medicationDosage"
                      value={formData.medicationDosage}
                      onChange={handleChange}
                      placeholder="Dosage (e.g., 500mg)"
                      className="h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="medicationFrequency"
                        value={formData.medicationFrequency}
                        onChange={handleChange}
                        placeholder="Frequency"
                        className="flex-1 h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={addMedication}
                        className="h-12 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="Plus" size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Vaccins */}
                <div className="border-t border-border pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Vaccines</h3>
                  
                  {/* Liste des vaccins */}
                  {formData.vaccines.length > 0 && (
                    <div className="space-y-2 mb-4">
                      {formData.vaccines.map((vac) => (
                        <div key={vac.id} className="flex items-center justify-between bg-muted p-3 rounded-lg">
                          <div>
                            <p className="font-medium text-foreground">{vac.name}</p>
                            <p className="text-sm text-muted-foreground">{vac.date}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeVaccine(vac.id)}
                            className="text-error hover:text-error/80"
                          >
                            <Icon name="Trash2" size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Formulaire d'ajout */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="vaccineName"
                      value={formData.vaccineName}
                      onChange={handleChange}
                      placeholder="Vaccine name (e.g., COVID-19, Flu)"
                      className="h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                      <input
                        type="date"
                        name="vaccineDate"
                        value={formData.vaccineDate}
                        onChange={handleChange}
                        className="flex-1 h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={addVaccine}
                        className="h-12 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Icon name="Plus" size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="button" variant="default" onClick={nextStep}>
                    Next Step
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 3: Family & Social Information */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Family & Social Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Statut marital */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Marital Status
                    </label>
                    <select
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>

                  {/* Nombre d'enfants */}
                  {(formData.maritalStatus === 'married' || formData.maritalStatus === 'divorced' || formData.maritalStatus === 'widowed') && (
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Number of Children
                      </label>
                      <input
                        type="number"
                        name="numberOfChildren"
                        value={formData.numberOfChildren}
                        onChange={handleChange}
                        placeholder="0"
                        min="0"
                        className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  )}

                  {/* Profession */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Occupation
                    </label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleChange}
                      placeholder="Your profession"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Contact d'urgence */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Emergency Contact Name
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      placeholder="Full name"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  {/* Téléphone d'urgence */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Emergency Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Section spécifique femmes */}
                {formData.gender === 'female' && (
                  <div className="border-t border-border pt-6 space-y-6">
                    <h3 className="text-lg font-semibold text-foreground">Women's Health</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Enceinte */}
                      <div className="md:col-span-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name="isPregnant"
                            checked={formData.isPregnant}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary"
                          />
                          <span className="text-sm font-semibold text-foreground">
                            Currently pregnant
                          </span>
                        </label>
                      </div>

                      {/* Si enceinte */}
                      {formData.isPregnant && (
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Pregnancy Weeks
                          </label>
                          <input
                            type="number"
                            name="pregnancyWeeks"
                            value={formData.pregnancyWeeks}
                            onChange={handleChange}
                            placeholder="Number of weeks"
                            min="1"
                            max="42"
                            className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      )}

                      {/* Dernières règles */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Last Menstrual Period
                        </label>
                        <input
                          type="date"
                          name="lastMenstrualPeriod"
                          value={formData.lastMenstrualPeriod}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      {/* Contraception */}
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Contraception Method
                        </label>
                        <select
                          name="contraceptionMethod"
                          value={formData.contraceptionMethod}
                          onChange={handleChange}
                          className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="">Select method</option>
                          <option value="none">None</option>
                          <option value="pill">Birth control pill</option>
                          <option value="iud">IUD</option>
                          <option value="implant">Implant</option>
                          <option value="injection">Injection</option>
                          <option value="condom">Condom</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between gap-3 mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="button" variant="default" onClick={nextStep}>
                    Next Step
                    <Icon name="ArrowRight" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* STEP 4: Lifestyle */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-foreground mb-6">Lifestyle & Habits</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Fumeur */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Smoking Status
                    </label>
                    <select
                      name="smokingStatus"
                      value={formData.smokingStatus}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select status</option>
                      <option value="never">Never smoked</option>
                      <option value="former">Former smoker</option>
                      <option value="current">Current smoker</option>
                    </select>
                  </div>

                  {/* Alcool */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Alcohol Consumption
                    </label>
                    <select
                      name="alcoholConsumption"
                      value={formData.alcoholConsumption}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select frequency</option>
                      <option value="never">Never</option>
                      <option value="occasionally">Occasionally</option>
                      <option value="weekly">Weekly</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>

                  {/* Exercice */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Exercise Frequency
                    </label>
                    <select
                      name="exerciseFrequency"
                      value={formData.exerciseFrequency}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select frequency</option>
                      <option value="never">Never</option>
                      <option value="1-2">1-2 times per week</option>
                      <option value="3-4">3-4 times per week</option>
                      <option value="5+">5+ times per week</option>
                      <option value="daily">Daily</option>
                    </select>
                  </div>

                  {/* Régime alimentaire */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Diet Type
                    </label>
                    <select
                      name="dietType"
                      value={formData.dietType}
                      onChange={handleChange}
                      className="w-full h-12 px-4 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select diet type</option>
                      <option value="regular">Regular/Omnivore</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="pescatarian">Pescatarian</option>
                      <option value="keto">Keto</option>
                      <option value="halal">Halal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary rounded-lg p-4 mt-8">
                  <div className="flex items-start gap-3">
                    <Icon name="Info" size={20} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground mb-1">
                        Your data is secure
                      </p>
                      <p className="text-sm text-muted-foreground">
                        All your medical information is encrypted and stored securely. You can update or delete it anytime from your profile.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between gap-3 mt-8">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <Icon name="ArrowLeft" size={16} className="mr-2" />
                    Previous
                  </Button>
                  <Button type="submit" variant="default" size="lg">
                    Complete Profile
                    <Icon name="Check" size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            )}

          </div>
        </form>

        {/* Skip button */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip for now (you can complete this later)
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;