import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerSections = [
    {
      title: 'Services',
      links: [
        { label: 'AI Symptom Checker', path: '/ai-symptom-checker' },
        { label: 'Doctor Consultation', path: '/doctor-consultation' },
        { label: 'Pharmacy Services', path: '/pharmacy-services' },
        { label: 'Medical Records', path: '/medical-records' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Careers', path: '/careers' },
        { label: 'Press', path: '/press' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Health Blog', path: '/blog' },
        { label: 'Help Center', path: '/help' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
      ],
    },
    {
      title: 'Trust & Safety',
      links: [
        { label: 'Trust Center', path: '/trust-compliance-center' },
        { label: 'Security', path: '/security' },
        { label: 'Compliance', path: '/compliance' },
        { label: 'Certifications', path: '/certifications' },
      ],
    },
  ];

  const socialLinks = [
    { icon: 'Facebook', url: 'https://facebook.com', label: 'Facebook' },
    { icon: 'Twitter', url: 'https://twitter.com', label: 'Twitter' },
    { icon: 'Instagram', url: 'https://instagram.com', label: 'Instagram' },
    { icon: 'Linkedin', url: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Link to="/health-dashboard-homepage" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Activity" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-foreground font-headline">QuickDoc</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted healthcare companion in Morocco. Quality medical care, accessible anytime, anywhere.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          {footerSections?.map((section) => (
            <div key={section?.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">{section?.title}</h3>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      to={link?.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} QuickDoc. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 trust-glow px-3 py-1.5 rounded-md bg-success/10">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span className="text-xs font-medium text-success">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 trust-glow px-3 py-1.5 rounded-md bg-primary/10">
                <Icon name="Lock" size={16} color="var(--color-primary)" />
                <span className="text-xs font-medium text-primary">SSL Secured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;