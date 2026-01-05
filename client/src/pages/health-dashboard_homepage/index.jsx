import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import HealthScoreCard from './components/HealthScoreCard';
import QuickActionCard from './components/QuickActionCard';
import UpcomingAppointmentCard from './components/UpcomingAppointmentCard';
import HealthMetricCard from './components/HealthMetricCard';
import RecentActivityItem from './components/RecentActivityItem';
import FamilyMemberCard from './components/FamilyMemberCard';
import HealthTipCard from './components/HealthTipCard';
import MedicationReminderCard from './components/MedicationReminderCard';

const HealthDashboardHomepage = () => {
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

  const upcomingAppointment = {
    doctorName: "Dr. Fatima Zahra Bennani",
    doctorImage: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    doctorImageAlt: "Professional female doctor",
    specialty: "Cardiologist",
    date: "Today, Dec 19",
    time: "2:30 PM"
  };

  const healthMetrics = [
    {
      id: 1,
      title: "Heart Rate",
      value: "72",
      unit: "bpm",
      icon: "Heart",
      iconColor: "var(--color-destructive)",
      bgColor: "bg-destructive/10",
      trend: "up",
      trendValue: "2%"
    },
    {
      id: 2,
      title: "Blood Pressure",
      value: "120/80",
      unit: "mmHg",
      icon: "Activity",
      iconColor: "var(--color-success)",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Weight",
      value: "68.5",
      unit: "kg",
      icon: "Scale",
      iconColor: "var(--color-primary)",
      bgColor: "bg-primary/10",
      trend: "down",
      trendValue: "1.2kg"
    },
    {
      id: 4,
      title: "Sleep",
      value: "7.5",
      unit: "hours",
      icon: "Moon",
      iconColor: "var(--color-secondary)",
      bgColor: "bg-secondary/10",
      trend: "up",
      trendValue: "30min"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: "consultation",
      title: "Video Consultation Completed",
      description: "Dr. Ahmed Mansouri - General Checkup",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "prescription",
      title: "New Prescription Received",
      description: "Amoxicillin 500mg - 3 times daily",
      time: "3 hours ago"
    },
    {
      id: 3,
      type: "lab",
      title: "Lab Results Available",
      description: "Complete Blood Count - All normal",
      time: "Yesterday"
    },
    {
      id: 4,
      type: "medication",
      title: "Medication Delivered",
      description: "Order #12345 - 3 items",
      time: "2 days ago"
    }
  ];

  const familyMembers = [
    {
      id: 1,
      name: "Sarah Ahmed",
      relation: "Daughter",
      avatar: "https://images.unsplash.com/photo-1642650508708-425b7f523779",
      avatarAlt: "Young girl"
    },
    {
      id: 2,
      name: "Mohammed Hassan",
      relation: "Son",
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

  const todayMedications = [
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
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="w-full pt-20">
        {/* Container principal avec espacement optimisé */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* En-tête avec actions */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Welcome back 👋
              </h1>
              <p className="text-muted-foreground text-base">
                Here's your health overview for today
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" iconName="Bell" iconPosition="left" size="md">
                Notifications
              </Button>
              <Button variant="default" iconName="Plus" iconPosition="left" size="md">
                Quick Action
              </Button>
            </div>
          </div>

          {/* Health Score + Appointment */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <HealthScoreCard
                score={78}
                trend="up"
                lastUpdated="Dec 19, 2025"
              />
            </div>
            <div className="lg:col-span-2">
              <UpcomingAppointmentCard appointment={upcomingAppointment} />
            </div>
          </div>

          {/* Quick Actions */}
          <section>
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

          {/* Health Metrics + Recent Activity + Medications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Health Metrics */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-6">Health Metrics</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {healthMetrics.map((metric) => (
                    <HealthMetricCard key={metric.id} {...metric} />
                  ))}
                </div>
              </section>

              {/* Recent Activity */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
                  <Link
                    to="/medical-records"
                    className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <span>View All</span>
                    <Icon name="ArrowRight" size={16} />
                  </Link>
                </div>
                <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <RecentActivityItem key={activity.id} activity={activity} />
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Right column - Medications */}
            <div className="lg:col-span-1">
              <MedicationReminderCard medications={todayMedications} />
            </div>
          </div>

          {/* Family Health */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Family Health</h2>
              <button className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors">
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

          {/* Health Tips */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Health Tips & Articles</h2>
              <Link
                to="/blog"
                className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1.5 transition-colors"
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

          {/* Premium CTA */}
          <section className="bg-gradient-to-br from-primary via-primary to-secondary rounded-2xl p-10 text-center shadow-lg">
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
                >
                  Explore Premium
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white/10 font-semibold"
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