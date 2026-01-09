import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from "../../components/AppIcon";// Ajustez le chemin selon votre structure
import Button from '../../components/ui/Button';

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/signin');
    return;
  }
  fetchAppointments();
}, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/appointments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };





  // Ajoute cette fonction pour gérer les docteurs mockés
const getDoctorName = (appointment) => {
  // Si c'est un docteur mocké (avec doctorInfo)
  if (appointment.doctorInfo?.name) {
    return appointment.doctorInfo.name;
  }
  // Si c'est un docteur de la base (populated)
  if (appointment.doctor?.name) {
    return appointment.doctor.name;
  }
  // Par défaut
  return 'Doctor';
};

const getDoctorSpecialization = (appointment) => {
  if (appointment.doctorInfo?.specialization) {
    return appointment.doctorInfo.specialization;
  }
  if (appointment.doctor?.specialization) {
    return appointment.doctor.specialization;
  }
  return 'General Practitioner';
};


// Trie les appointments
const sortedAppointments = [...appointments].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  
  switch (sortBy) {
    case 'date-desc':
      return dateB - dateA;
    case 'status':
      return a.status.localeCompare(b.status);
    default: // 'date'
      return dateA - dateB;
  }
});







  const handleCancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        setAppointments(appointments.filter(app => app._id !== id));
        alert('Appointment cancelled successfully');
      }
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Error cancelling appointment');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'pending': { color: 'bg-warning/10 text-warning', icon: 'Clock' },
      'confirmed': { color: 'bg-success/10 text-success', icon: 'CheckCircle' },
      'completed': { color: 'bg-primary/10 text-primary', icon: 'Check' },
      'cancelled': { color: 'bg-destructive/10 text-destructive', icon: 'XCircle' }
    };
    
    const config = statusConfig[status] || { color: 'bg-muted text-muted-foreground', icon: 'HelpCircle' };
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon name={config.icon} size={12} />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTypeIcon = (type) => {
    const icons = {
      'video': { name: 'Video', color: 'var(--color-primary)' },
      'in-person': { name: 'User', color: 'var(--color-secondary)' },
      'phone': { name: 'Phone', color: 'var(--color-accent)' }
    };
    
    const icon = icons[type] || { name: 'Calendar', color: 'var(--color-muted-foreground)' };
    
    return (
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
        <Icon name={icon.name} size={20} color={icon.color} />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
              <p className="text-muted-foreground mt-2">
                View and manage your upcoming and past consultations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => fetchAppointments()}
                iconName="RefreshCw"
                iconPosition="left"
                size="md"
              >
                Refresh
              </Button>
              <Button
                onClick={() => navigate('/doctor-consultation')}
                iconName="Plus"
                iconPosition="left"
                size="md"
              >
                Book New Appointment
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Calendar" size={24} color="var(--color-primary)" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(a => a.status === 'pending' || a.status === 'confirmed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} color="var(--color-success)" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(a => a.status === 'completed').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
                  <Icon name="XCircle" size={24} color="var(--color-destructive)" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-2xl font-bold text-foreground">
                    {appointments.filter(a => a.status === 'cancelled').length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointments List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading appointments...</p>
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-xl border border-border">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={32} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Appointments Scheduled
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                You don't have any upcoming appointments. Book your first consultation to get started with personalized healthcare.
              </p>
              <Button
                onClick={() => navigate('/doctor-consultation')}
                iconName="CalendarPlus"
                iconPosition="left"
                size="lg"
              >
                Book Your First Consultation
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">
                  All Appointments ({appointments.length})
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select 
                className="bg-card border border-border rounded-lg px-3 py-1.5 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                >
                <option value="date">Date (Soonest First)</option>
                <option value="date-desc">Date (Latest First)</option>
                <option value="status">Status</option>
                </select>
                </div>
              </div>
              
              {sortedAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-card rounded-xl border border-border p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      {getTypeIcon(appointment.type)}
                      
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-foreground text-lg">
                            Consultation with {getDoctorName(appointment)}
                            <span className="text-sm text-muted-foreground font-normal block sm:inline sm:ml-2">
                                - {getDoctorSpecialization(appointment)}
                            </span>
                            </h3>
                          {getStatusBadge(appointment.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Icon name="Calendar" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-foreground">{formatDate(appointment.date)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Clock" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-foreground">{appointment.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-foreground capitalize">{appointment.type} Consultation</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
                            <span className="text-sm text-foreground">Fee: 250 MAD</span>
                          </div>
                        </div>
                        
                        {appointment.reason && (
                          <div className="mt-3">
                            <p className="text-sm font-medium text-foreground mb-1">Reason for visit:</p>
                            <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                          </div>
                        )}
                        
                        {appointment.symptoms && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-foreground mb-1">Symptoms:</p>
                            <p className="text-sm text-muted-foreground">{appointment.symptoms}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col items-stretch gap-2 lg:w-48">
                      {(appointment.status === 'pending' || appointment.status === 'confirmed') && (
                        <>
                          <Button
                            variant="outline"
                            onClick={() => handleCancelAppointment(appointment._id)}
                            iconName="X"
                            iconPosition="left"
                            className="justify-center"
                          >
                            Cancel Appointment
                          </Button>
                          
                          {appointment.type === 'video' && (
                            <Button
                              onClick={() => window.open(`/video-call/${appointment._id}`, '_blank')}
                              iconName="Video"
                              iconPosition="left"
                              className="justify-center"
                            >
                              Join Video Call
                            </Button>
                          )}
                          
                          {appointment.type === 'in-person' && (
                            <Button
                              variant="outline"
                              iconName="MapPin"
                              iconPosition="left"
                              className="justify-center"
                            >
                              Get Directions
                            </Button>
                          )}
                        </>
                      )}
                      
                      {appointment.status === 'completed' && (
                        <Button
                          variant="outline"
                          onClick={() => navigate(`/medical-records/${appointment._id}`)}
                          iconName="FileText"
                          iconPosition="left"
                          className="justify-center"
                        >
                          View Medical Report
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentsPage;