import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DoctorProfileModal = ({ doctor, onClose, onBookConsultation }) => {
  const [activeTab, setActiveTab] = useState('about');

  const tabs = [
    { id: 'about', label: 'About', icon: 'User' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'availability', label: 'Availability', icon: 'Calendar' }
  ];

  const reviews = [
    {
      id: 1,
      patientName: "Fatima A.",
      rating: 5,
      date: "December 15, 2025",
      comment: "Excellent doctor! Very professional and took time to explain everything clearly. Highly recommend for anyone seeking quality healthcare.",
      verified: true
    },
    {
      id: 2,
      patientName: "Mohammed K.",
      rating: 5,
      date: "December 10, 2025",
      comment: "Great experience with video consultation. Doctor was very attentive and provided detailed treatment plan. Follow-up care was excellent.",
      verified: true
    },
    {
      id: 3,
      patientName: "Amina B.",
      rating: 4,
      date: "December 5, 2025",
      comment: "Very knowledgeable and caring. Appointment was on time and consultation was thorough. Would definitely consult again.",
      verified: true
    }
  ];

  const availabilitySlots = [
    { day: 'Today', date: 'Dec 19', slots: ['09:00 AM', '11:00 AM', '03:00 PM'] },
    { day: 'Tomorrow', date: 'Dec 20', slots: ['10:00 AM', '02:00 PM', '04:00 PM'] },
    { day: 'Saturday', date: 'Dec 21', slots: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM'] }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
          <h2 className="text-xl font-semibold text-foreground">Doctor Profile</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-md transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
                <Image
                  src={doctor?.image}
                  alt={doctor?.imageAlt}
                  className="w-full h-full object-cover"
                />
                {doctor?.isVerified && (
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-success rounded-full flex items-center justify-center border-4 border-card">
                    <Icon name="BadgeCheck" size={20} color="white" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">{doctor?.name}</h3>
                  <p className="text-lg text-primary font-medium mb-3">{doctor?.specialization}</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={18} color="var(--color-warning)" fill="var(--color-warning)" />
                      <span className="text-base font-medium text-foreground">{doctor?.rating}</span>
                      <span className="text-sm text-muted-foreground">({doctor?.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Icon name="Briefcase" size={16} />
                      <span className="text-sm">{doctor?.experience}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <Icon name="MapPin" size={16} color="var(--color-muted-foreground)" />
                    <span className="text-sm text-muted-foreground">{doctor?.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground">Consultation Fee</span>
                  <p className="text-2xl font-semibold text-foreground">{doctor?.consultationFee} MAD</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {doctor?.languages?.map((lang, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
              </div>

              <Button
                variant="default"
                iconName="Video"
                iconPosition="left"
                onClick={() => onBookConsultation(doctor)}
                className="w-full md:w-auto"
              >
                Book Consultation
              </Button>
            </div>
          </div>

          <div className="border-b border-border mb-6">
            <div className="flex gap-1">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'about' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">About</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {doctor?.about || `Dr. ${doctor?.name} is a highly experienced ${doctor?.specialization?.toLowerCase()} with over ${doctor?.experience} of practice. Specializing in comprehensive patient care, preventive medicine, and advanced treatment protocols. Known for excellent patient communication and evidence-based medical practice.`}
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Education & Qualifications</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Icon name="GraduationCap" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Medical Degree (MD)</p>
                      <p className="text-sm text-muted-foreground">Faculty of Medicine, University of Casablanca</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="Award" size={20} color="var(--color-primary)" className="flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-foreground">Specialization Certificate</p>
                      <p className="text-sm text-muted-foreground">{doctor?.specialization} - Moroccan Medical Board</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-foreground mb-3">Services Offered</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Video" size={18} color="var(--color-primary)" />
                    <span className="text-sm text-foreground">Video Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="MessageSquare" size={18} color="var(--color-primary)" />
                    <span className="text-sm text-foreground">Chat Consultation</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="FileText" size={18} color="var(--color-primary)" />
                    <span className="text-sm text-foreground">E-Prescription</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                    <Icon name="Clock" size={18} color="var(--color-primary)" />
                    <span className="text-sm text-foreground">Follow-up Care</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-semibold text-foreground">Patient Reviews</h4>
                <div className="flex items-center gap-2 px-4 py-2 bg-warning/10 rounded-lg">
                  <Icon name="Star" size={20} color="var(--color-warning)" fill="var(--color-warning)" />
                  <span className="text-lg font-semibold text-foreground">{doctor?.rating}</span>
                  <span className="text-sm text-muted-foreground">({doctor?.reviews} reviews)</span>
                </div>
              </div>

              {reviews?.map((review) => (
                <div key={review?.id} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{review?.patientName}</span>
                        {review?.verified && (
                          <div className="flex items-center gap-1 px-2 py-0.5 bg-success/10 rounded text-xs text-success">
                            <Icon name="BadgeCheck" size={12} />
                            <span>Verified</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{review?.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review?.rating)]?.map((_, i) => (
                        <Icon key={i} name="Star" size={14} color="var(--color-warning)" fill="var(--color-warning)" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{review?.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4">Available Time Slots</h4>
              {availabilitySlots?.map((slot, index) => (
                <div key={index} className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name="Calendar" size={18} color="var(--color-primary)" />
                    <span className="font-medium text-foreground">{slot?.day}</span>
                    <span className="text-sm text-muted-foreground">({slot?.date})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {slot?.slots?.map((time, timeIndex) => (
                      <button
                        key={timeIndex}
                        className="px-4 py-2 bg-card border border-primary/20 hover:bg-primary hover:text-primary-foreground rounded-md text-sm font-medium transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileModal;