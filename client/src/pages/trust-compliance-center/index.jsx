import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CertificationCard from './components/CertificationCard';
import ComplianceTimeline from './components/ComplianceTimeline';
import SecurityFeatureCard from './components/SecurityFeatureCard';
import AdvisoryBoardMember from './components/AdvisoryBoardMember';
import StatisticsCard from './components/StatisticsCard';
import DocumentDownloadCard from './components/DocumentDownloadCard';
import ContactSection from './components/ContactSection';

const TrustComplianceCenter = () => {
  const [activeTab, setActiveTab] = useState('certifications');

  const certifications = [
  {
    id: 1,
    name: "Moroccan Ministry of Health Certification",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_142c0c310-1765028257067.png",
    logoAlt: "Official seal of Moroccan Ministry of Health with green and red national colors and medical caduceus symbol",
    description: "Official authorization to provide telemedicine services across Morocco, ensuring compliance with national healthcare standards and regulations.",
    issueDate: "January 2024",
    expiryDate: "January 2027",
    verified: true
  },
  {
    id: 2,
    name: "HIPAA Equivalent Compliance",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_187c32f31-1764673548953.png",
    logoAlt: "Blue shield emblem with white lock symbol representing healthcare data protection and privacy standards",
    description: "Adherence to international healthcare data protection standards equivalent to HIPAA, ensuring patient privacy and data security.",
    issueDate: "March 2024",
    expiryDate: null,
    verified: true
  },
  {
    id: 3,
    name: "ISO 27001 Information Security",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_16de233b7-1764661555596.png",
    logoAlt: "International Organization for Standardization logo with blue circular design and ISO 27001 certification badge",
    description: "International standard for information security management systems, demonstrating our commitment to protecting sensitive health data.",
    issueDate: "February 2024",
    expiryDate: "February 2027",
    verified: true
  },
  {
    id: 4,
    name: "Moroccan Medical Board Approval",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1f9c44f82-1766133615243.png",
    logoAlt: "Moroccan medical association emblem with traditional medical staff symbol and Arabic calligraphy elements",
    description: "Recognition and approval from the Moroccan Medical Board for digital healthcare delivery and telemedicine practices.",
    issueDate: "December 2023",
    expiryDate: "December 2026",
    verified: true
  },
  {
    id: 5,
    name: "SOC 2 Type II Compliance",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee89a7e5-1764672209990.png",
    logoAlt: "Service Organization Control certification badge with security shield and compliance checkmark in corporate blue",
    description: "Rigorous third-party audit confirming our security, availability, processing integrity, confidentiality, and privacy controls.",
    issueDate: "April 2024",
    expiryDate: "April 2025",
    verified: true
  },
  {
    id: 6,
    name: "GDPR Compliance Certification",
    logo: "https://img.rocket.new/generatedImages/rocket_gen_img_1ac71e81a-1764661555606.png",
    logoAlt: "European Union flag with twelve gold stars on blue background representing GDPR data protection regulation",
    description: "Full compliance with European General Data Protection Regulation for handling patient data of EU citizens.",
    issueDate: "May 2024",
    expiryDate: null,
    verified: true
  }];


  const complianceMilestones = [
  {
    id: 1,
    title: "Platform Launch & Initial Certification",
    date: "December 2023",
    description: "QuickDoc officially launched with Moroccan Medical Board approval and initial security certifications in place.",
    status: "completed",
    documents: ["Launch Certificate", "Medical Board Approval"]
  },
  {
    id: 2,
    title: "Ministry of Health Authorization",
    date: "January 2024",
    description: "Received official authorization from Moroccan Ministry of Health to provide nationwide telemedicine services.",
    status: "completed",
    documents: ["Ministry Authorization", "Service Agreement"]
  },
  {
    id: 3,
    title: "International Security Standards",
    date: "February-April 2024",
    description: "Achieved ISO 27001 and SOC 2 Type II certifications, establishing world-class security and compliance standards.",
    status: "completed",
    documents: ["ISO 27001 Certificate", "SOC 2 Report"]
  },
  {
    id: 4,
    title: "GDPR & Privacy Enhancement",
    date: "May 2024",
    description: "Implemented comprehensive GDPR compliance measures and enhanced privacy controls for international patients.",
    status: "completed",
    documents: ["GDPR Compliance Report", "Privacy Policy v2.0"]
  },
  {
    id: 5,
    title: "AI Ethics Framework Implementation",
    date: "June-August 2024",
    description: "Established medical AI ethics committee and implemented transparent AI decision-making protocols.",
    status: "in-progress",
    documents: ["Ethics Framework", "AI Transparency Report"]
  },
  {
    id: 6,
    title: "Blockchain Audit Trail Deployment",
    date: "September-December 2024",
    description: "Deploying blockchain-based audit trails for all medical records and prescription transactions.",
    status: "in-progress",
    documents: ["Technical Specification"]
  },
  {
    id: 7,
    title: "Advanced Telemedicine Standards",
    date: "Q1 2025",
    description: "Pursuing advanced telemedicine certifications and expanding compliance to include mental health services.",
    status: "planned",
    documents: []
  }];


  const securityFeatures = [
  {
    id: 1,
    icon: "Lock",
    title: "End-to-End Encryption",
    description: "All patient data and communications are protected with AES-256 encryption, ensuring complete privacy during transmission and storage.",
    standard: "AES-256",
    level: "critical",
    certified: true
  },
  {
    id: 2,
    icon: "Shield",
    title: "Multi-Factor Authentication",
    description: "Advanced authentication system requiring multiple verification steps to prevent unauthorized access to patient accounts.",
    standard: "FIDO2",
    level: "critical",
    certified: true
  },
  {
    id: 3,
    icon: "Database",
    title: "Secure Data Storage",
    description: "Patient records stored in geographically distributed, encrypted databases with automated backup and disaster recovery.",
    standard: "ISO 27001",
    level: "critical",
    certified: true
  },
  {
    id: 4,
    icon: "Eye",
    title: "Access Control & Monitoring",
    description: "Role-based access controls with comprehensive audit logging of all data access and modifications.",
    standard: "RBAC",
    level: "high",
    certified: true
  },
  {
    id: 5,
    icon: "FileCheck",
    title: "Blockchain Audit Trails",
    description: "Immutable blockchain-based records of all medical transactions, prescriptions, and data modifications.",
    standard: "Blockchain",
    level: "high",
    certified: false
  },
  {
    id: 6,
    icon: "AlertTriangle",
    title: "Threat Detection System",
    description: "Real-time monitoring and automated threat detection to identify and respond to security incidents immediately.",
    standard: "SIEM",
    level: "high",
    certified: true
  }];


  const advisoryBoard = [
  {
    id: 1,
    name: "Dr. Fatima El Mansouri",
    title: "Chief Medical Officer",
    specialization: "Internal Medicine & Digital Health",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_155748a5d-1763296653785.png",
    photoAlt: "Professional headshot of Moroccan female doctor with hijab in white medical coat smiling warmly in modern clinic setting",
    experience: "20+ years",
    location: "Casablanca",
    bio: "Leading digital health transformation in Morocco with focus on accessible, quality healthcare delivery."
  },
  {
    id: 2,
    name: "Dr. Ahmed Benali",
    title: "Head of Clinical Standards",
    specialization: "Emergency Medicine & Telemedicine",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_10f32ae74-1764872614047.png",
    photoAlt: "Professional portrait of male Moroccan physician in navy blue suit with stethoscope in modern hospital environment",
    experience: "15+ years",
    location: "Rabat",
    bio: "Establishing clinical protocols and quality standards for remote healthcare delivery across Morocco."
  },
  {
    id: 3,
    name: "Dr. Samira Alaoui",
    title: "AI Ethics Advisor",
    specialization: "Medical AI & Ethics",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_126294db3-1763298827402.png",
    photoAlt: "Professional photograph of female doctor with glasses in white coat standing in technology-equipped medical facility",
    experience: "12+ years",
    location: "Marrakech",
    bio: "Ensuring ethical AI implementation in healthcare with focus on patient safety and algorithmic transparency."
  },
  {
    id: 4,
    name: "Dr. Youssef Tazi",
    title: "Regulatory Compliance Director",
    specialization: "Healthcare Law & Compliance",
    photo: "https://img.rocket.new/generatedImages/rocket_gen_img_1efc8e583-1763299782879.png",
    photoAlt: "Professional headshot of male healthcare administrator in formal dark suit with medical facility background",
    experience: "18+ years",
    location: "Casablanca",
    bio: "Navigating complex healthcare regulations to ensure full compliance with Moroccan and international standards."
  }];


  const trustStatistics = [
  {
    id: 1,
    icon: "Users",
    value: "50,000+",
    label: "Verified Patients",
    description: "Active users trusting our platform",
    trend: "up",
    change: "+25%"
  },
  {
    id: 2,
    icon: "Shield",
    value: "99.99%",
    label: "Platform Uptime",
    description: "Reliable healthcare access",
    trend: "stable",
    change: "Stable"
  },
  {
    id: 3,
    icon: "Award",
    value: "98.5%",
    label: "AI Accuracy Rate",
    description: "Symptom assessment precision",
    trend: "up",
    change: "+2.3%"
  },
  {
    id: 4,
    icon: "Lock",
    value: "Zero",
    label: "Data Breaches",
    description: "Perfect security record",
    trend: "stable",
    change: "Maintained"
  }];


  const documents = [
  {
    id: 1,
    title: "Privacy Policy",
    description: "Comprehensive privacy practices and data protection measures",
    lastUpdated: "December 2024",
    format: "PDF",
    size: "2.5 MB"
  },
  {
    id: 2,
    title: "Terms of Service",
    description: "User agreement and platform usage guidelines",
    lastUpdated: "December 2024",
    format: "PDF",
    size: "1.8 MB"
  },
  {
    id: 3,
    title: "Security Audit Report",
    description: "Latest third-party security assessment summary",
    lastUpdated: "November 2024",
    format: "PDF",
    size: "4.2 MB"
  },
  {
    id: 4,
    title: "HIPAA Compliance Documentation",
    description: "Healthcare data protection compliance details",
    lastUpdated: "October 2024",
    format: "PDF",
    size: "3.1 MB"
  },
  {
    id: 5,
    title: "AI Transparency Report",
    description: "Detailed explanation of AI algorithms and decision-making",
    lastUpdated: "December 2024",
    format: "PDF",
    size: "5.6 MB"
  },
  {
    id: 6,
    title: "Patient Rights Guide",
    description: "Your rights and protections when using QuickDoc",
    lastUpdated: "December 2024",
    format: "PDF",
    size: "1.2 MB"
  }];


  const tabs = [
  { id: 'certifications', label: 'Certifications', icon: 'Award' },
  { id: 'timeline', label: 'Compliance Timeline', icon: 'Clock' },
  { id: 'security', label: 'Security Features', icon: 'Shield' },
  { id: 'advisory', label: 'Advisory Board', icon: 'Users' },
  { id: 'documents', label: 'Documents', icon: 'FileText' }];


  return (
    <>
      <Helmet>
        <title>Trust & Compliance Center - QuickDoc</title>
        <meta name="description" content="Explore QuickDoc's commitment to healthcare compliance, security, and transparency. View our certifications, regulatory approvals, and meet our medical advisory board." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-background py-12 lg:py-16 border-b border-border">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Shield" size={24} color="var(--color-primary)" />
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10">
                  <Icon name="CheckCircle2" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-success">Fully Certified</span>
                </div>
              </div>
              <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                Trust & Compliance Center
              </h1>
              <p className="text-lg text-muted-foreground max-w-3xl">
                Your health data deserves the highest level of protection. Explore our comprehensive compliance framework, security measures, and regulatory certifications that make QuickDoc Morocco's most trusted digital health platform.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {trustStatistics?.map((stat) =>
              <StatisticsCard key={stat?.id} stat={stat} />
              )}
            </div>

            <div className="mb-8">
              <div className="flex flex-wrap gap-2 border-b border-border">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                  activeTab === tab?.id ?
                  'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`
                  }>

                    <Icon name={tab?.icon} size={18} />
                    <span className="hidden sm:inline">{tab?.label}</span>
                  </button>
                )}
              </div>
            </div>

            {activeTab === 'certifications' &&
            <div className="space-y-6">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} color="var(--color-primary)" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">Official Certifications & Approvals</h2>
                      <p className="text-muted-foreground">
                        QuickDoc maintains the highest standards of healthcare compliance with certifications from Moroccan and international regulatory bodies. All certifications are regularly audited and renewed to ensure continuous compliance.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {certifications?.map((cert) =>
                <CertificationCard key={cert?.id} certification={cert} />
                )}
                </div>
              </div>
            }

            {activeTab === 'timeline' &&
            <div className="space-y-6">
                <div className="bg-secondary/5 border border-secondary/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Clock" size={24} color="var(--color-secondary)" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">Compliance Journey</h2>
                      <p className="text-muted-foreground">
                        Track our continuous commitment to regulatory excellence and security enhancement. Each milestone represents significant achievements in protecting patient data and ensuring quality healthcare delivery.
                      </p>
                    </div>
                  </div>
                </div>

                <ComplianceTimeline milestones={complianceMilestones} />
              </div>
            }

            {activeTab === 'security' &&
            <div className="space-y-6">
                <div className="bg-success/5 border border-success/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Shield" size={24} color="var(--color-success)" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">Advanced Security Infrastructure</h2>
                      <p className="text-muted-foreground">
                        Our multi-layered security approach combines industry-leading encryption, access controls, and monitoring systems to protect your sensitive health information at every touchpoint.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {securityFeatures?.map((feature) =>
                <SecurityFeatureCard key={feature?.id} feature={feature} />
                )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Data Protection Principles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Data Minimization</h4>
                        <p className="text-sm text-muted-foreground">We collect only essential health information required for quality care delivery.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Purpose Limitation</h4>
                        <p className="text-sm text-muted-foreground">Your data is used exclusively for healthcare purposes you've authorized.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">Storage Limitation</h4>
                        <p className="text-sm text-muted-foreground">Health records retained only as long as medically and legally necessary.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Icon name="Check" size={20} color="var(--color-success)" className="flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-semibold text-foreground mb-1">User Control</h4>
                        <p className="text-sm text-muted-foreground">Complete transparency and control over your health data sharing and access.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }

            {activeTab === 'advisory' &&
            <div className="space-y-6">
                <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="Users" size={24} color="var(--color-accent)" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">Medical Advisory Board</h2>
                      <p className="text-muted-foreground">
                        Our distinguished advisory board comprises leading Moroccan healthcare professionals who oversee clinical standards, AI ethics, and regulatory compliance to ensure the highest quality of care.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {advisoryBoard?.map((member) =>
                <AdvisoryBoardMember key={member?.id} member={member} />
                )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Board Responsibilities</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Stethoscope" size={20} color="var(--color-primary)" />
                        <h4 className="text-sm font-semibold text-foreground">Clinical Oversight</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Reviewing and approving clinical protocols, treatment guidelines, and quality standards for telemedicine services.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Brain" size={20} color="var(--color-primary)" />
                        <h4 className="text-sm font-semibold text-foreground">AI Validation</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ensuring AI symptom checker accuracy, validating algorithms, and maintaining ethical AI implementation standards.
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Icon name="Scale" size={20} color="var(--color-primary)" />
                        <h4 className="text-sm font-semibold text-foreground">Regulatory Guidance</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Advising on compliance with Moroccan healthcare regulations and international medical standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }

            {activeTab === 'documents' &&
            <div className="space-y-6">
                <div className="bg-info/5 border border-info/20 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={24} color="var(--color-info)" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-foreground mb-2">Compliance Documentation</h2>
                      <p className="text-muted-foreground">
                        Access our comprehensive library of compliance documents, policies, and reports. All documents are regularly updated to reflect current regulations and best practices.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {documents?.map((doc) =>
                <DocumentDownloadCard key={doc?.id} document={doc} />
                )}
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Icon name="Info" size={24} color="var(--color-primary)" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Document Access Notice</h3>
                      <p className="text-sm text-muted-foreground">
                        All compliance documents are available for public review. Some technical reports may contain redacted information to protect proprietary security measures. For detailed inquiries about specific compliance aspects, please contact our compliance team directly.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            }

            <div className="mt-12">
              <ContactSection />
            </div>

            <div className="mt-12 bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-lg p-8 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon name="Heart" size={32} color="var(--color-primary)" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Your Trust is Our Priority</h2>
                <p className="text-muted-foreground mb-6">
                  At QuickDoc, we believe that trust is earned through transparency, security, and unwavering commitment to patient care. Every certification, every security measure, and every compliance milestone represents our dedication to protecting your health and privacy.
                </p>
                <Button variant="default" iconName="ArrowRight" iconPosition="right">
                  Start Your Health Journey
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>);

};

export default TrustComplianceCenter;