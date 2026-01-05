import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e?.target?.name]: e?.target?.value
    });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    console.log('Compliance inquiry submitted:', formData);
  };

  const contactMethods = [
    {
      icon: 'Mail',
      title: 'Email Support',
      value: 'compliance@quickdoc.ma',
      description: 'Response within 24 hours'
    },
    {
      icon: 'Phone',
      title: 'Phone Support',
      value: '+212 5XX-XXXXXX',
      description: 'Mon-Fri, 9AM-6PM GMT+1'
    },
    {
      icon: 'MapPin',
      title: 'Office Address',
      value: 'Casablanca, Morocco',
      description: 'By appointment only'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-4">Contact Compliance Team</h3>
          <p className="text-muted-foreground mb-6">
            Have questions about our compliance, privacy, or security practices? Our dedicated team is here to help.
          </p>
          
          <div className="space-y-4 mb-6">
            {contactMethods?.map((method, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name={method?.icon} size={20} color="var(--color-primary)" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">{method?.title}</h4>
                  <p className="text-sm text-primary font-medium mb-1">{method?.value}</p>
                  <p className="text-xs text-muted-foreground">{method?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData?.name}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={handleChange}
              required
            />
            
            <Input
              label="Subject"
              type="text"
              name="subject"
              placeholder="What is your inquiry about?"
              value={formData?.subject}
              onChange={handleChange}
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
                placeholder="Describe your compliance inquiry or concern..."
                value={formData?.message}
                onChange={handleChange}
                required
              />
            </div>
            
            <Button 
              type="submit" 
              variant="default" 
              fullWidth
              iconName="Send"
              iconPosition="right"
            >
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;