import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DoctorCard from './components/DoctorCard';
import FilterPanel from './components/FilterPanel';
import BookingModal from './components/BookingModal';
import DoctorProfileModal from './components/DoctorProfileModal';
import SpecializationFilter from './components/SpecializationFilter';
import EmergencyConsultation from './components/EmergencyConsultation';

const DoctorConsultation = () => {
  const [filters, setFilters] = useState({
    search: '',
    specialization: 'all',
    language: 'all',
    city: 'all',
    sortBy: 'recommended',
    availableNow: false,
    availableToday: false,
    verifiedOnly: false,
    videoConsultation: false,
    chatConsultation: false,
    inPerson: false
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const doctors = [
  {
    id: 1,
    name: "Dr. Amina Benali",
    specialization: "General Practitioner",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    imageAlt: "Professional female doctor with warm smile wearing white medical coat and stethoscope in modern clinic setting",
    rating: 4.9,
    reviews: 234,
    experience: "15 years",
    location: "Casablanca, Morocco",
    languages: ["Arabic", "French", "English"],
    consultationFee: 250,
    isVerified: true,
    isOnline: true,
    isAvailable: true,
    nextAvailable: "Today at 2:00 PM",
    about: "Dr. Amina Benali is a highly experienced general practitioner with over 15 years of practice in Morocco. She specializes in preventive medicine, chronic disease management, and family healthcare. Known for her compassionate approach and excellent patient communication skills."
  },
  {
    id: 2,
    name: "Dr. Youssef El Amrani",
    specialization: "Cardiologist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b9c787bd-1763293571066.png",
    imageAlt: "Professional male cardiologist with confident expression wearing navy blue medical scrubs and stethoscope in hospital environment",
    rating: 4.8,
    reviews: 189,
    experience: "12 years",
    location: "Rabat, Morocco",
    languages: ["Arabic", "French"],
    consultationFee: 400,
    isVerified: true,
    isOnline: false,
    isAvailable: true,
    nextAvailable: "Tomorrow at 10:00 AM"
  },
  {
    id: 3,
    name: "Dr. Fatima Zahra Idrissi",
    specialization: "Dermatologist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a29b7a76-1763295028142.png",
    imageAlt: "Professional female dermatologist with friendly demeanor wearing white medical coat with medical equipment in background",
    rating: 4.9,
    reviews: 312,
    experience: "10 years",
    location: "Marrakech, Morocco",
    languages: ["Arabic", "French", "English"],
    consultationFee: 350,
    isVerified: true,
    isOnline: true,
    isAvailable: true,
    nextAvailable: "Today at 4:00 PM"
  },
  {
    id: 4,
    name: "Dr. Mohammed Tazi",
    specialization: "Pediatrician",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_13d4f42bc-1764998744336.png",
    imageAlt: "Professional male pediatrician with gentle smile wearing light blue medical scrubs in child-friendly clinic setting",
    rating: 4.7,
    reviews: 267,
    experience: "18 years",
    location: "Fes, Morocco",
    languages: ["Arabic", "French"],
    consultationFee: 300,
    isVerified: true,
    isOnline: true,
    isAvailable: true,
    nextAvailable: "Today at 11:00 AM"
  },
  {
    id: 5,
    name: "Dr. Samira Bennani",
    specialization: "Gynecologist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_113dbdb97-1763298762709.png",
    imageAlt: "Professional female gynecologist with compassionate expression wearing white medical coat in modern medical facility",
    rating: 4.9,
    reviews: 198,
    experience: "14 years",
    location: "Tangier, Morocco",
    languages: ["Arabic", "French", "Spanish"],
    consultationFee: 380,
    isVerified: true,
    isOnline: false,
    isAvailable: true,
    nextAvailable: "Tomorrow at 9:00 AM"
  },
  {
    id: 6,
    name: "Dr. Karim Alaoui",
    specialization: "Orthopedic Surgeon",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b523b869-1763295530479.png",
    imageAlt: "Professional male orthopedic surgeon with confident posture wearing surgical scrubs in hospital operating room",
    rating: 4.8,
    reviews: 156,
    experience: "16 years",
    location: "Casablanca, Morocco",
    languages: ["Arabic", "French", "English"],
    consultationFee: 450,
    isVerified: true,
    isOnline: true,
    isAvailable: false,
    nextAvailable: "December 21 at 3:00 PM"
  },
  {
    id: 7,
    name: "Dr. Nadia Chraibi",
    specialization: "Psychiatrist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bfd4c667-1763301075421.png",
    imageAlt: "Professional female psychiatrist with empathetic expression wearing professional attire in comfortable therapy office setting",
    rating: 4.9,
    reviews: 223,
    experience: "11 years",
    location: "Rabat, Morocco",
    languages: ["Arabic", "French", "English"],
    consultationFee: 400,
    isVerified: true,
    isOnline: true,
    isAvailable: true,
    nextAvailable: "Today at 5:00 PM"
  },
  {
    id: 8,
    name: "Dr. Hassan Benjelloun",
    specialization: "Neurologist",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1507c9e23-1763296301909.png",
    imageAlt: "Professional male neurologist with serious expression wearing white medical coat with neurological examination tools visible",
    rating: 4.7,
    reviews: 142,
    experience: "13 years",
    location: "Agadir, Morocco",
    languages: ["Arabic", "French"],
    consultationFee: 420,
    isVerified: true,
    isOnline: false,
    isAvailable: true,
    nextAvailable: "Tomorrow at 2:00 PM"
  }];


  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      specialization: 'all',
      language: 'all',
      city: 'all',
      sortBy: 'recommended',
      availableNow: false,
      availableToday: false,
      verifiedOnly: false,
      videoConsultation: false,
      chatConsultation: false,
      inPerson: false
    });
  };

  const handleBookConsultation = (doctor) => {
    setSelectedDoctor(doctor);
    setShowProfileModal(false);
    setShowBookingModal(true);
  };

  const handleViewProfile = (doctor) => {
    setSelectedDoctor(doctor);
    setShowProfileModal(true);
  };

  const handleConfirmBooking = (bookingData) => {
    setShowBookingModal(false);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 5000);
  };

  const handleRequestEmergency = () => {
    alert('Emergency consultation request initiated. A doctor will contact you within 5 minutes.');
  };

  const filteredDoctors = doctors?.filter((doctor) => {
    if (filters?.search && !doctor?.name?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
      return false;
    }
    if (filters?.specialization !== 'all' && doctor?.specialization?.toLowerCase() !== filters?.specialization?.toLowerCase()) {
      return false;
    }
    if (filters?.verifiedOnly && !doctor?.isVerified) {
      return false;
    }
    if (filters?.availableNow && !doctor?.isOnline) {
      return false;
    }
    return true;
  });

  return (
    <>
      <Helmet>
        <title>Doctor Consultation - QuickDoc | Book Online Medical Consultations in Morocco</title>
        <meta name="description" content="Connect with verified doctors across Morocco for video consultations, chat support, and in-person visits. Book appointments with specialists in cardiology, dermatology, pediatrics, and more." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 py-12 px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                    Find Your Doctor
                  </h1>
                  <p className="text-muted-foreground text-lg">
                    Connect with verified healthcare professionals across Morocco
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-lg">
                    <Icon name="Users" size={20} color="var(--color-success)" />
                    <div>
                      <p className="text-xs text-muted-foreground">Available Doctors</p>
                      <p className="text-lg font-semibold text-foreground">{filteredDoctors?.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                    <Icon name="Clock" size={20} color="var(--color-primary)" />
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Response</p>
                      <p className="text-lg font-semibold text-foreground">&lt;5 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            {bookingSuccess &&
            <div className="mb-6 p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3 animate-slide-up">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-success mb-1">Booking Confirmed!</h3>
                  <p className="text-sm text-success/80">
                    Your consultation has been scheduled successfully. You will receive a confirmation email with meeting details shortly.
                  </p>
                </div>
                <button
                onClick={() => setBookingSuccess(false)}
                className="p-1 hover:bg-success/20 rounded transition-colors">

                  <Icon name="X" size={18} color="var(--color-success)" />
                </button>
              </div>
            }

            <EmergencyConsultation onRequestEmergency={handleRequestEmergency} />

            <div className="mt-8">
              <SpecializationFilter
                selectedSpecialization={filters?.specialization}
                onSpecializationChange={(value) => handleFilterChange('specialization', value)} />

            </div>

            <div className="mt-8 flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                {filteredDoctors?.length} Doctors Available
              </h2>
              <Button
                variant="outline"
                iconName="SlidersHorizontal"
                iconPosition="left"
                onClick={() => setShowMobileFilters(true)}
                className="lg:hidden">

                Filters
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="hidden lg:block">
                <FilterPanel
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onResetFilters={handleResetFilters}
                  isMobile={false}
                  onClose={() => {}} />

              </div>

              <div className="lg:col-span-3">
                {filteredDoctors?.length > 0 ?
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredDoctors?.map((doctor) =>
                  <DoctorCard
                    key={doctor?.id}
                    doctor={doctor}
                    onBookConsultation={handleBookConsultation}
                    onViewProfile={handleViewProfile} />

                  )}
                  </div> :

                <div className="text-center py-16">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No Doctors Found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your filters to see more results
                    </p>
                    <Button variant="outline" onClick={handleResetFilters}>
                      Reset Filters
                    </Button>
                  </div>
                }
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
      {showMobileFilters &&
      <>
          <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setShowMobileFilters(false)} />

          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card z-50 lg:hidden animate-slide-in-right">
            <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            isMobile={true}
            onClose={() => setShowMobileFilters(false)} />

          </div>
        </>
      }
      {showBookingModal && selectedDoctor &&
      <BookingModal
        doctor={selectedDoctor}
        onClose={() => setShowBookingModal(false)}
        onConfirmBooking={handleConfirmBooking} />

      }
      {showProfileModal && selectedDoctor &&
      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setShowProfileModal(false)}
        onBookConsultation={handleBookConsultation} />

      }
    </>);

};

export default DoctorConsultation;