import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const BookingModal = ({ doctor, onClose, onConfirmBooking }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('video');
  const [reason, setReason] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dateOptions = [
    { value: '2025-12-19', label: 'Today - December 19, 2025' },
    { value: '2025-12-20', label: 'Tomorrow - December 20, 2025' },
    { value: '2025-12-21', label: 'Saturday - December 21, 2025' },
    { value: '2025-12-22', label: 'Sunday - December 22, 2025' },
    { value: '2025-12-23', label: 'Monday - December 23, 2025' }
  ];

  const timeOptions = [
    { value: '09:00', label: '09:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '02:00 PM' },
    { value: '15:00', label: '03:00 PM' },
    { value: '16:00', label: '04:00 PM' },
    { value: '17:00', label: '05:00 PM' }
  ];

  const consultationTypeOptions = [
    { value: 'video', label: 'Video Consultation' },
    { value: 'chat', label: 'Chat Consultation' },
    { value: 'in-person', label: 'In-Person Visit' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !agreedToTerms) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        alert('Please log in first');
        setIsSubmitting(false);
        return;
      }
      
      const appointmentData = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        doctorSpecialization: doctor.specialization,
        date: selectedDate,
        time: selectedTime,
        type: consultationType,
        reason: reason,
        symptoms: '',
        isUrgent: isUrgent
      };
      
      console.log('📤 Envoi des données:', appointmentData);
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de la réservation');
      }
      
      if (onConfirmBooking) {
    onConfirmBooking({
    success: true,
    message: 'Appointment created successfully',
    appointment: data.appointment,
    doctor: doctor
  });
}
      
      alert('✅ Rendez-vous créé avec succès !');
      onClose();
      
    } catch (error) {
      console.error('💥 Erreur:', error);
      alert(error.message || 'Erreur lors de la réservation');
    } finally {
      setIsSubmitting(false);
    }
  }; 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Book Consultation</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
            disabled={isSubmitting}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-start gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
              <Image
                src={doctor?.image}
                alt={doctor?.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">{doctor?.name}</h3>
              <p className="text-sm text-primary font-medium mb-2">{doctor?.specialization}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
                  <span>{doctor?.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="Briefcase" size={14} />
                  <span>{doctor?.experience}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">Consultation Fee</span>
              <p className="text-xl font-semibold text-foreground">{doctor?.consultationFee} MAD</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              label="Select Date"
              options={dateOptions}
              value={selectedDate}
              onChange={setSelectedDate}
              required
              disabled={isSubmitting}
            />

            <Select
              label="Select Time"
              options={timeOptions}
              value={selectedTime}
              onChange={setSelectedTime}
              required
              description="Prayer times will be automatically avoided"
              disabled={isSubmitting}
            />

            <Select
              label="Consultation Type"
              options={consultationTypeOptions}
              value={consultationType}
              onChange={setConsultationType}
              required
              disabled={isSubmitting}
            />

            <Input
              label="Reason for Consultation"
              type="text"
              placeholder="Brief description of your health concern..."
              value={reason}
              onChange={(e) => setReason(e?.target?.value)}
              description="This helps the doctor prepare for your consultation"
              disabled={isSubmitting}
            />

            <Checkbox
              label="Mark as Urgent"
              description="Urgent consultations may incur additional fees"
              checked={isUrgent}
              onChange={(e) => setIsUrgent(e?.target?.checked)}
              disabled={isSubmitting}
            />

            <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
              <div className="flex gap-3">
                <Icon name="Info" size={20} color="var(--color-info)" className="flex-shrink-0 mt-0.5" />
                <div className="text-sm text-info-foreground">
                  <p className="font-medium mb-1">Before Your Consultation:</p>
                  <ul className="list-disc list-inside space-y-1 text-xs opacity-90">
                    <li>Ensure stable internet connection for video calls</li>
                    <li>Have your medical history and current medications ready</li>
                    <li>Join 5 minutes before scheduled time</li>
                    <li>Prescriptions will be sent electronically after consultation</li>
                  </ul>
                </div>
              </div>
            </div>

            <Checkbox
              label="I agree to the terms and conditions"
              description="By booking, you agree to QuickDoc's consultation policies and payment terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e?.target?.checked)}
              required
              disabled={isSubmitting}
            />

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                fullWidth
                iconName="Calendar"
                iconPosition="left"
                disabled={!selectedDate || !selectedTime || !agreedToTerms || isSubmitting}
              >
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;