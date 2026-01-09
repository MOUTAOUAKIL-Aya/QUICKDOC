import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HealthScoreCard from './components/HealthScoreCard';
import QuickActionCard from './components/QuickActionCard';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import HealthMetricCard from './components/HealthMetricCard';
import HealthPracticeItem from './components/RecentActivityItem';
import FamilyMemberCard from './components/FamilyMemberCard';
import HealthTipCard from './components/HealthTipCard';
import MedicationReminderCard from './components/MedicationReminderCard';
import Notification from '../../components/ui/Notification'; 

const HealthDashboardHomepage = () => {
  // ========== 1. DONNÉES STATIQUES ==========
  const quickActions = [
    {
      id: 1,
      title: "AI Symptom Checker",
      description: "Describe your symptoms and get instant health insights",
      icon: "Stethoscope",
      iconColor: "var(--color-primary)",
      bgColor: "bg-primary/10",
      link: "/ai-symptom-checker"
    },
    {
      id: 2,
      title: "Book Consultation",
      description: "Connect with verified doctors in minutes",
      icon: "Video",
      iconColor: "var(--color-secondary)",
      bgColor: "bg-secondary/10",
      link: "/doctor-consultation"
    },
    {
      id: 3,
      title: "Find Pharmacy",
      description: "Locate nearby pharmacies and order medications",
      icon: "Pill",
      iconColor: "var(--color-accent)",
      bgColor: "bg-accent/10",
      link: "/pharmacy-services"
    },
    {
      id: 4,
      title: "Medical Records",
      description: "Access your complete health history securely",
      icon: "FileText",
      iconColor: "var(--color-success)",
      bgColor: "bg-success/10",
      link: "/medical-records"
    }
  ];

  const universalHealthPractices = [
    {
      id: 1,
      type: "hydration",
      title: "Stay Hydrated",
      description: "Drink at least 8 glasses of water daily for optimal health",
      time: "Daily"
    },
    {
      id: 2,
      type: "sleep",
      title: "Quality Sleep",
      description: "7-9 hours of sleep recommended for adults",
      time: "Nightly"
    },
    {
      id: 3,
      type: "nutrition",
      title: "Balanced Nutrition",
      description: "Consume fruits, vegetables, and whole foods daily",
      time: "Daily"
    },
    {
      id: 4,
      type: "movement",
      title: "Physical Activity",
      description: "30 minutes of moderate exercise recommended",
      time: "Daily"
    },
    {
      id: 5,
      type: "mindfulness",
      title: "Mental Wellness",
      description: "Practice stress management and mindfulness",
      time: "Daily"
    }
  ];

  const familyMembers = [
    {
      id: 1,
      name: "Sarah Ahmed",
      relation: "Sister",
      avatar: "https://images.unsplash.com/photo-1642650508708-425b7f523779",
      avatarAlt: "Young girl"
    },
    {
      id: 2,
      name: "Mohammed Hassan",
      relation: "Brother",
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1b2773e1b-1765465118545.png",
      avatarAlt: "Young boy"
    },
    {
      id: 3,
      name: "Amina Khalil",
      relation: "Mother",
      avatar: "https://images.unsplash.com/photo-1720873708731-596ff0523d4f",
      avatarAlt: "Elderly woman"
    }
  ];

  const healthTips = [
    {
      id: 1,
      title: "5 Ways to Boost Your Immune System This Winter",
      description: "Discover natural methods to strengthen your body's defenses",
      category: "Wellness",
      readTime: "5 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_16d76a857-1764755886682.png",
      imageAlt: "Fresh fruits"
    },
    {
      id: 2,
      title: "Understanding Blood Pressure: What Your Numbers Mean",
      description: "Learn how to interpret your blood pressure readings",
      category: "Heart Health",
      readTime: "7 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_18fdc3d89-1765186858638.png",
      imageAlt: "Blood pressure monitor"
    },
    {
      id: 3,
      title: "Ramadan Health Guide: Fasting Safely and Healthily",
      description: "Expert tips for maintaining wellness during the holy month",
      category: "Seasonal",
      readTime: "6 min read",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b170332b-1764819939835.png",
      imageAlt: "Iftar meal"
    }
  ];

  // ========== 2. ÉTATS ==========
  const [dashboardData, setDashboardData] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);
  const [notification, setNotification] = useState(null); // UN SEUL ÉTAT POUR LES NOTIFICATIONS

  // ========== 3. FONCTIONS UTILITAIRES ==========
  // Fonction pour afficher les notifications
  const showNotification = (type, message) => {
    setNotification({ type, message });
    
    // Auto-fermeture après 3 secondes
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const closeNotification = () => {
    setNotification(null);
  };

  // Formate les données d'un rendez-vous pour l'affichage
const formatAppointmentData = (appointment) => {
  console.log('🛠️ Formatage de:', appointment);
  
  // Si l'appointment vient déjà formaté de l'API
  if (appointment.doctorName && appointment.specialty) {
    return appointment;
  }
  
  // Sinon, formater
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      
      if (date.toDateString() === today.toDateString()) {
        return `Today, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      } else if (date.toDateString() === tomorrow.toDateString()) {
        return `Tomorrow, ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
      } else {
        return date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        });
      }
    } catch (e) {
      return dateString;
    }
  };

  const formatted = {
    appointmentId: appointment._id || appointment.appointmentId || 'unknown',
    doctorName: appointment.doctorInfo?.name || appointment.doctorName || 'Dr. Unknown',
    specialty: appointment.doctorInfo?.specialization || appointment.specialty || 'General Practitioner',
    date: formatDate(appointment.date),
    time: appointment.time || 'Time not set',
    type: appointment.type || 'Consultation',
    doctorImage: appointment.doctorImage || (appointment.doctorInfo?.isMock 
      ? `https://img.rocket.new/generatedImages/rocket_gen_img_${appointment.doctorInfo.originalId || 1}.png`
      : "https://via.placeholder.com/150"),
    status: appointment.status || 'scheduled'
  };

  console.log('✅ Formaté en:', formatted);
  return formatted;
};

  // ========== 4. EFFETS ET APPELS API ==========
useEffect(() => {
  const fetchDashboardData = async () => {
    console.log('🔄 Début du chargement des données dashboard');
    setLoadingAppointments(true);
    
    try {
      const token = localStorage.getItem('token');
      console.log('🔑 Token récupéré:', token ? 'Oui (premiers chars: ' + token.substring(0, 10) + '...)' : 'Non');
      
      if (!token) {
        console.log('⚠️ Pas de token - arrêt du chargement');
        setLoadingAppointments(false);
        return;
      }
      
      // ==================== TEST DIRECT DE L'API ====================
      console.log('🧪 TEST: Appel direct à /api/appointments/upcoming');
      const testResponse = await fetch('/api/appointments/upcoming', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('🧪 Test API - Status:', testResponse.status);
      console.log('🧪 Test API - Status Text:', testResponse.statusText);
      
      if (!testResponse.ok) {
        console.error('❌ Erreur API:', {
          status: testResponse.status,
          statusText: testResponse.statusText
        });
        
        // Si 404, la route n'existe pas
        if (testResponse.status === 404) {
          showNotification('error', 'API route /api/appointments/upcoming not found');
        }
      }
      
      const testData = await testResponse.json();
      console.log('🧪 Test API - Données complètes:', testData);
      console.log('🧪 Test API - Has appointments array?:', testData.appointments && Array.isArray(testData.appointments));
      console.log('🧪 Test API - Appointments count:', testData.appointments?.length || 0);
      // ==================== FIN DU TEST ====================
      
      // 1. Récupérer les données du dashboard
      console.log('🌐 Appel API dashboard...');
      const dashboardResponse = await fetch('/api/dashboard', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📊 Dashboard status:', dashboardResponse.status);
      
      if (dashboardResponse.ok) {
        const result = await dashboardResponse.json();
        console.log('📦 Dashboard data:', result);
        if (result.success) {
          setDashboardData(result.data);
        }
      }
      
      // 2. Récupérer les rendez-vous à venir (utilisation des données du test)
      console.log('📅 Traitement des rendez-vous depuis la réponse testée...');
      
      // CAS 1: L'API retourne un tableau d'appointments
      if (testData.appointments && Array.isArray(testData.appointments)) {
        console.log(`✅ Format détecté: appointments array (${testData.appointments.length} éléments)`);
        
        if (testData.appointments.length > 0) {
          const firstItem = testData.appointments[0];
          console.log('🔍 Premier élément du tableau:', firstItem);
          
          // Vérifier le format
          if (firstItem && typeof firstItem === 'object') {
            // Afficher toutes les propriétés
            console.log('📋 Propriétés du premier rendez-vous:', Object.keys(firstItem));
            console.log('📅 Date du rendez-vous:', firstItem.date);
            console.log('👨‍⚕️ Doctor info:', firstItem.doctorInfo);
            console.log('⚕️ Doctor (référence):', firstItem.doctor);
            console.log('📊 Status:', firstItem.status);
            
            // Formater et afficher les rendez-vous
            const formattedAppointments = testData.appointments
              .filter(app => {
                // Filtrer seulement les rendez-vous futurs et non annulés
                const appointmentDate = new Date(app.date);
                const today = new Date();
                const isFuture = appointmentDate >= today;
                const isNotCancelled = app.status !== 'cancelled';
                
                console.log(`🎯 Filtre - ${app._id}: date=${app.date}, future=${isFuture}, status=${app.status}, notCancelled=${isNotCancelled}`);
                
                return isFuture && isNotCancelled;
              })
              .slice(0, 2) // Prendre max 2 rendez-vous
              .map(app => formatAppointmentData(app));
            
            console.log('🎉 Rendez-vous formatés après filtrage:', formattedAppointments);
            setUpcomingAppointments(formattedAppointments);
          } else {
            console.log('📭 Tableau vide ou premier élément invalide');
            setUpcomingAppointments([]);
          }
        } else {
          console.log('📭 Tableau appointments vide');
          setUpcomingAppointments([]);
        }
      }
      // CAS 2: L'API retourne nextAppointment
      else if (testData.success && testData.nextAppointment) {
        console.log('✅ Format détecté: nextAppointment');
        const formattedAppointment = formatAppointmentData(testData.nextAppointment);
        console.log('🩺 Rendez-vous formaté:', formattedAppointment);
        setUpcomingAppointments([formattedAppointment]);
      }
      // CAS 3: Aucune donnée
      else {
        console.log('📭 Aucun rendez-vous trouvé dans la réponse');
        setUpcomingAppointments([]);
      }
      
    } catch (error) {
      console.error('❌ Erreur lors du chargement:', error);
      console.error('❌ Stack trace:', error.stack);
      setUpcomingAppointments([]);
    } finally {
      setLoadingAppointments(false);
      console.log('✅ Chargement terminé');
    }
  };
  
  fetchDashboardData();
}, []);


  // Annule un rendez-vous
  const handleCancelAppointment = async (appointmentId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`/api/appointments/${appointmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const data = await response.json();
      
      if (data.success) {
        showNotification('success', 'Appointment cancelled successfully!');
        setUpcomingAppointments(prev => prev.filter(app => app.appointmentId !== appointmentId));
      } else {
        showNotification('error', `Failed to cancel appointment: ${data.message}`);
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      showNotification('error', 'Error cancelling appointment. Please try again.');
    }
  };

  // ========== 5. CALCUL DU HEALTH SCORE ==========
  const hasEnoughDataForScore = (data) => {
    if (!data) return false;
    
    const hasWeight = !!data.healthMetrics?.weight && data.healthMetrics.weight !== "Non renseigné";
    const hasHeight = !!data.healthMetrics?.height && data.healthMetrics.height !== "Non renseigné";
    const hasAnyMedicalData = data.medications?.length > 0 || data.vaccines?.length > 0;
    
    return (hasWeight && hasHeight) || hasAnyMedicalData;
  };

  const calculateHealthScore = (data) => {
    if (!data || !hasEnoughDataForScore(data)) {
      return null;
    }
    
    let score = 50;
    
    const weight = parseFloat(data.healthMetrics?.weight);
    const height = parseFloat(data.healthMetrics?.height) / 100;
    
    if (weight && height) {
      const bmi = weight / (height * height);
      
      if (bmi >= 18.5 && bmi <= 24.9) score += 20;
      else if (bmi >= 25 && bmi <= 29.9) score += 10;
      else if (bmi < 18.5 || bmi > 29.9) score -= 10;
    }
    
    if (data.medications?.length > 0) {
      const takenMeds = data.medications.filter(m => m.taken === true).length;
      const totalMeds = data.medications.length;
      const complianceRate = totalMeds > 0 ? (takenMeds / totalMeds) * 100 : 0;
      
      if (complianceRate >= 80) score += 15;
      else if (complianceRate >= 50) score += 5;
    }
    
    if (data.vaccines?.length > 0) {
      const upToDateVaccines = data.vaccines.filter(v => v.status === "up-to-date").length;
      score += Math.min(upToDateVaccines * 5, 15);
    }
    
    if (data.lastConsultation) {
      const lastConsultDate = new Date(data.lastConsultation);
      const today = new Date();
      const monthsSince = (today.getFullYear() - lastConsultDate.getFullYear()) * 12 + 
                        (today.getMonth() - lastConsultDate.getMonth());
      
      if (monthsSince <= 6) score += 10;
      else if (monthsSince <= 12) score += 5;
    }
    
    return Math.min(Math.max(score, 0), 100);
  };

  const lastUpdated = dashboardData?.healthMetrics?.updatedAt 
    ? new Date(dashboardData.healthMetrics.updatedAt).toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      })
    : "N/A";

  // ========== 6. DONNÉES DES MÉTRIQUES DE SANTÉ ==========
  const healthMetrics = [
    {
      id: 1,
      title: "Heart Rate",
      value: dashboardData?.healthMetrics?.heartRate 
        ? typeof dashboardData.healthMetrics.heartRate === 'object' 
          ? dashboardData.healthMetrics.heartRate 
          : { value: "60-100", unit: "bpm", label: "Resting heart rate (normal range)", isFixed: true }
        : { value: "60-100", unit: "bpm", label: "Resting heart rate (normal range)", isFixed: true },
      icon: "Heart",
      iconColor: "var(--color-destructive)",
      bgColor: "bg-destructive/10"
    },
    {
      id: 2,
      title: "Blood Pressure",
      value: dashboardData?.healthMetrics?.bloodPressure 
        ? typeof dashboardData.healthMetrics.bloodPressure === 'object' 
          ? dashboardData.healthMetrics.bloodPressure 
          : { value: "120/80", unit: "mmHg", label: "Ideal blood pressure", isFixed: true }
        : { value: "120/80", unit: "mmHg", label: "Ideal blood pressure", isFixed: true },
      icon: "Activity",
      iconColor: "var(--color-success)",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Body Temperature",
      value: dashboardData?.healthMetrics?.bodyTemperature 
        ? typeof dashboardData.healthMetrics.bodyTemperature === 'object' 
          ? dashboardData.healthMetrics.bodyTemperature 
          : { value: "36.1-37.2", unit: "°C", label: "Normal body temperature", isFixed: true }
        : { value: "36.1-37.2", unit: "°C", label: "Normal body temperature", isFixed: true },
      icon: "Thermometer",
      iconColor: "var(--color-warning)",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Weight",
      value: dashboardData?.healthMetrics?.weight 
        ? `${dashboardData.healthMetrics.weight} kg` 
        : "Please complete profile",
      unit: "",
      icon: "Scale",
      iconColor: "var(--color-primary)",
      bgColor: "bg-primary/10"
    },
    {
      id: 5,
      title: "Height",
      value: dashboardData?.healthMetrics?.height 
        ? `${dashboardData.healthMetrics.height} cm` 
        : "Please complete profile",
      unit: "",
      icon: "Ruler",
      iconColor: "var(--color-secondary)",
      bgColor: "bg-secondary/10"
    }
  ];

  // ========== 7. MÉDICATIONS DU JOUR ==========
  const todayMedications = dashboardData?.medications?.map((med, index) => ({
    id: index + 1,
    name: med.name,
    dosage: med.dosage,
    time: med.time || "8:00 AM",
    taken: med.taken || false
  })) || [
    {
      id: 1,
      name: "Metformin",
      dosage: "500mg",
      time: "8:00 AM",
      taken: true
    },
    {
      id: 2,
      name: "Lisinopril",
      dosage: "10mg",
      time: "2:00 PM",
      taken: false
    },
    {
      id: 3,
      name: "Vitamin D3",
      dosage: "1000 IU",
      time: "8:00 PM",
      taken: false
    },
  ];

  // ========== 8. RENDU ==========
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Notification Component */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={closeNotification}
        />
      )}
      
      <main className="w-full pt-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Section d'en-tête */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Welcome back 👋
              </h1>
              <p className="text-muted-foreground text-base">
                Here's your health overview for today
              </p>
            </div>
          </div>

          {/* Section Health Score + Rendez-vous */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            {/* Carte du score de santé */}
            <div className="lg:col-span-1">
              <HealthScoreCard
                score={calculateHealthScore(dashboardData)}
                trend="up"
                lastUpdated={lastUpdated}
                showCompletionMessage={!hasEnoughDataForScore(dashboardData)}
              />
            </div>
            
            {/* Section des rendez-vous */}
            <div className="lg:col-span-2">
              {loadingAppointments ? (
                // État de chargement
                <div className="bg-card rounded-lg border border-border p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-muted-foreground">Loading appointments...</p>
                </div>
              ) : upcomingAppointments.length > 0 ? (
                // Affichage des rendez-vous réels
                upcomingAppointments.map((appointment) => (
                  <UpcomingAppointmentCard 
                    key={appointment.appointmentId}
                    appointment={appointment}
                    onCancel={() => handleCancelAppointment(appointment.appointmentId)}
                  />
                ))
              ) : (
                // Message quand aucun rendez-vous
                <div className="bg-card rounded-lg border border-border p-8 text-center shadow-sm">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Icon name="Calendar" size={36} color="var(--color-primary)" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">
                     Upcoming Appointments
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    
                    It's a great time to book a consultation and take charge of your health!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button 
                      variant="default" 
                      onClick={() => {
                        showNotification('success', 'Redirecting to doctor consultation...');
                        setTimeout(() => {
                          window.location.href = '/doctor-consultation';
                        }, 500);
                      }}
                      className="flex items-center gap-2"
                    >
                      <Icon name="Video" size={18} />
                      Book Video Consultation
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        showNotification('success', 'Redirecting to schedule appointment...');
                        setTimeout(() => {
                          window.location.href = '/doctor-consultation';
                        }, 500);
                      }}
                    >
                      <Icon name="Calendar" size={18} className="mr-2" />
                      Schedule In-Person Visit
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-6">
                    ⭐ Best choice: Book now to get early access to top specialists
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section Actions Rapides */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Quick Actions</h2>
              <Link
                to="/ai-symptom-checker"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
              >
                <span>View All</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {quickActions.map((action) => (
                <QuickActionCard key={action.id} {...action} />
              ))}
            </div>
          </section>

          {/* Section Métriques de Santé */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Health Metrics</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              {healthMetrics.map((metric) => (
                <HealthMetricCard 
                  key={metric.id} 
                  title={metric.title}
                  value={metric.value}
                  unit={metric.unit}
                  icon={metric.icon}
                  iconColor={metric.iconColor}
                  bgColor={metric.bgColor}
                />
              ))}
            </div>
          </section>

          {/* Section Activité Récente et Médicaments */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10">
            <div className="lg:col-span-2 space-y-8">
              {/* Activité Récente */}
              <section className="mt-10">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Daily Health Essentials</h2>
                  <Link
                    to="/wellness-tips"
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>Learn More</span>
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="space-y-4">
                    {universalHealthPractices.map((practice) => (
                      <HealthPracticeItem key={practice.id} practice={practice} />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Colonne droite - Médicaments */}
            <div className="lg:col-span-1">
              <MedicationReminderCard medications={todayMedications} />
            </div>
          </div>

          {/* Section Santé Familiale */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Family Health</h2>
              <button 
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
                onClick={() => showNotification('info', 'Adding family member feature coming soon!')}
              >
                <Icon name="Plus" size={16} />
                <span>Add Member</span>
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {familyMembers.map((member) => (
                <FamilyMemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* Section Conseils de Santé */}
          <section className="mt-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Health Tips & Articles</h2>
              <Link
                to="/blog"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  showNotification('info', 'Blog page coming soon!');
                }}
              >
                <span>View All</span>
                <Icon name="ArrowRight" size={16} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {healthTips.map((tip) => (
                <HealthTipCard key={tip.id} tip={tip} />
              ))}
            </div>
          </section>

          {/* Section Premium */}
          <section className="mt-10 bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl p-10 text-center shadow-lg">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5">
                <Icon name="Crown" size={40} color="white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Upgrade to Premium
              </h2>
              <p className="text-white/95 text-lg mb-8 leading-relaxed">
                Get unlimited consultations, priority support, and exclusive health insights for your entire family
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 font-semibold shadow-lg"
                  onClick={() => showNotification('info', 'Premium features coming soon!')}
                >
                  Explore Premium
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold"
                  onClick={() => showNotification('info', 'Learn more about premium features')}
                >
                  Learn More
                </Button>
              </div>
            </div>
          </section>

        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthDashboardHomepage;