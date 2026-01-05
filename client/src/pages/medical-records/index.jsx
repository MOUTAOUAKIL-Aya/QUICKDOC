import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import RecordCard from './components/RecordCard';
import TimelineView from './components/TimelineView';
import VaccinationTracker from './components/VaccinationTracker';
import LabResultsChart from './components/LabResultsChart';
import ShareRecordModal from './components/ShareRecordModal';
import UploadDocumentModal from './components/UploadDocumentModal';
import RecordDetailModal from './components/RecordDetailModal';

const MedicalRecords = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const medicalRecords = [
    {
      id: 1,
      title: "Annual Physical Examination",
      category: "Consultation Notes",
      type: "consultation",
      date: "15 Dec 2025",
      timestamp: "2025-12-15T10:00:00",
      provider: "Dr. Fatima Zahra - Clinique Internationale",
      description: "Comprehensive annual health checkup including vital signs assessment, physical examination, and preventive health counseling.",
      tags: ["Annual Checkup", "Preventive Care"],
      isNew: true,
      details: {
        blood_pressure: "120/80 mmHg",
        heart_rate: "72 bpm",
        temperature: "36.8°C",
        weight: "75 kg",
        height: "175 cm"
      }
    },
    {
      id: 2,
      title: "Complete Blood Count (CBC)",
      category: "Lab Results",
      type: "lab",
      date: "10 Dec 2025",
      timestamp: "2025-12-10T14:30:00",
      provider: "Laboratoire d\'Analyses Médicales",
      description: "Routine blood work showing all parameters within normal ranges. Hemoglobin, white blood cells, and platelet counts are optimal.",
      tags: ["Blood Test", "Routine"],
      details: {
        hemoglobin: "14.5 g/dL",
        wbc_count: "7,200 cells/μL",
        platelet_count: "250,000 cells/μL",
        rbc_count: "4.8 million cells/μL"
      }
    },
    {
      id: 3,
      title: "COVID-19 Booster Vaccination",
      category: "Vaccination Record",
      type: "vaccination",
      date: "05 Dec 2025",
      timestamp: "2025-12-05T11:00:00",
      provider: "Centre de Vaccination - Rabat",
      description: "COVID-19 booster dose administered. Patient tolerated well with no immediate adverse reactions. Next booster recommended in 6 months.",
      tags: ["COVID-19", "Booster"],
      isNew: true
    },
    {
      id: 4,
      title: "Antibiotic Prescription - Amoxicillin",
      category: "Prescription",
      type: "prescription",
      date: "28 Nov 2025",
      timestamp: "2025-11-28T16:00:00",
      provider: "Dr. Mohammed Alami - Polyclinique",
      description: "Prescribed for bacterial throat infection. Course duration: 7 days, three times daily after meals.",
      tags: ["Antibiotic", "Throat Infection"],
      details: {
        medication: "Amoxicillin 500mg",
        dosage: "3 times daily",
        duration: "7 days",
        instructions: "Take after meals with water"
      }
    },
    {
      id: 5,
      title: "Chest X-Ray",
      category: "Medical Imaging",
      type: "imaging",
      date: "20 Nov 2025",
      timestamp: "2025-11-20T09:00:00",
      provider: "Centre de Radiologie Avancée",
      description: "Chest radiograph performed for routine health screening. No abnormalities detected. Lung fields clear, heart size normal.",
      tags: ["X-Ray", "Chest", "Screening"],
      attachments: [
        { name: "chest-xray-frontal.pdf", size: "2.4 MB" },
        { name: "radiology-report.pdf", size: "156 KB" }
      ]
    },
    {
      id: 6,
      title: "Lipid Profile Test",
      category: "Lab Results",
      type: "lab",
      date: "15 Nov 2025",
      timestamp: "2025-11-15T10:30:00",
      provider: "Laboratoire Central",
      description: "Comprehensive cholesterol and triglyceride analysis. Total cholesterol slightly elevated, HDL within optimal range.",
      tags: ["Cholesterol", "Lipid Panel"],
      details: {
        total_cholesterol: "210 mg/dL",
        ldl_cholesterol: "130 mg/dL",
        hdl_cholesterol: "55 mg/dL",
        triglycerides: "140 mg/dL"
      }
    },
    {
      id: 7,
      title: "Dental Checkup Report",
      category: "Consultation Notes",
      type: "consultation",
      date: "08 Nov 2025",
      timestamp: "2025-11-08T14:00:00",
      provider: "Dr. Laila Bennani - Cabinet Dentaire",
      description: "Routine dental examination and cleaning. No cavities detected. Gum health excellent. Recommended fluoride treatment.",
      tags: ["Dental", "Preventive"]
    },
    {
      id: 8,
      title: "Influenza Vaccination",
      category: "Vaccination Record",
      type: "vaccination",
      date: "01 Nov 2025",
      timestamp: "2025-11-01T10:00:00",
      provider: "Pharmacie Centrale",
      description: "Seasonal flu vaccine administered for 2025-2026 season. No adverse reactions reported.",
      tags: ["Flu", "Seasonal"]
    }
  ];

  const vaccinations = [
    {
      id: 1,
      name: "COVID-19 Booster",
      type: "Viral Disease Prevention",
      status: "completed",
      lastDose: "05 Dec 2025",
      nextDose: "05 Jun 2026",
      notes: "Next booster recommended in 6 months"
    },
    {
      id: 2,
      name: "Influenza (Flu)",
      type: "Seasonal Vaccination",
      status: "completed",
      lastDose: "01 Nov 2025",
      nextDose: "01 Nov 2026",
      notes: "Annual vaccination recommended"
    },
    {
      id: 3,
      name: "Tetanus Booster",
      type: "Bacterial Disease Prevention",
      status: "upcoming",
      lastDose: "15 Jan 2020",
      nextDose: "15 Jan 2026",
      notes: "Due in 1 month - booster required every 10 years"
    },
    {
      id: 4,
      name: "Hepatitis B",
      type: "Viral Disease Prevention",
      status: "completed",
      lastDose: "20 Mar 2018",
      notes: "Full series completed - lifetime protection"
    }
  ];

  const cholesterolData = [
    { date: "Jan 2025", value: 195 },
    { date: "Mar 2025", value: 202 },
    { date: "Jun 2025", value: 198 },
    { date: "Sep 2025", value: 205 },
    { date: "Nov 2025", value: 210 }
  ];

  const bloodSugarData = [
    { date: "Jan 2025", value: 92 },
    { date: "Mar 2025", value: 88 },
    { date: "Jun 2025", value: 95 },
    { date: "Sep 2025", value: 90 },
    { date: "Nov 2025", value: 93 }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'prescription', label: 'Prescriptions' },
    { value: 'lab', label: 'Lab Results' },
    { value: 'vaccination', label: 'Vaccinations' },
    { value: 'consultation', label: 'Consultations' },
    { value: 'imaging', label: 'Medical Imaging' },
    { value: 'document', label: 'Other Documents' }
  ];

  const tabs = [
    { id: 'all', label: 'All Records', icon: 'FileText' },
    { id: 'vaccinations', label: 'Vaccinations', icon: 'Syringe' },
    { id: 'lab-trends', label: 'Lab Trends', icon: 'TrendingUp' }
  ];

  const filteredRecords = medicalRecords?.filter(record => {
    const matchesSearch = record?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         record?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || record?.type === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewRecord = (record) => {
    setSelectedRecord(record);
    setShowDetailModal(true);
  };

  const handleShareRecord = (record) => {
    setSelectedRecord(record);
    setShowShareModal(true);
  };

  const handleDownloadRecord = (record) => {
    console.log('Downloading record:', record?.title);
  };

  const handleShare = (shareData) => {
    console.log('Sharing record with data:', shareData);
  };

  const handleUpload = (uploadData) => {
    console.log('Uploading document:', uploadData);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Medical Records</h1>
                <p className="text-muted-foreground">Your complete health history in one secure place</p>
              </div>
              <Button variant="default" onClick={() => setShowUploadModal(true)} iconName="Upload" iconPosition="left">
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="FileText" size={20} color="var(--color-primary)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{medicalRecords?.length}</p>
                    <p className="text-sm text-muted-foreground">Total Records</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                    <Icon name="Syringe" size={20} color="var(--color-success)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{vaccinations?.filter(v => v?.status === 'completed')?.length}</p>
                    <p className="text-sm text-muted-foreground">Vaccinations</p>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Icon name="Activity" size={20} color="var(--color-secondary)" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">98%</p>
                    <p className="text-sm text-muted-foreground">Health Score</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1">
                <Input
                  type="search"
                  placeholder="Search records by title or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                />
              </div>
              <div className="w-full lg:w-64">
                <Select
                  options={categoryOptions}
                  value={selectedCategory}
                  onChange={setSelectedCategory}
                  placeholder="Filter by category"
                />
              </div>
              <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  aria-label="Grid view"
                >
                  <Icon name="LayoutGrid" size={20} />
                </button>
                <button
                  onClick={() => setViewMode('timeline')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'timeline' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                  aria-label="Timeline view"
                >
                  <Icon name="List" size={20} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 border-b border-border mb-6 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'text-primary border-b-2 border-primary' :'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'all' && (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredRecords?.map((record) => (
                    <RecordCard
                      key={record?.id}
                      record={record}
                      onView={handleViewRecord}
                      onShare={handleShareRecord}
                      onDownload={handleDownloadRecord}
                    />
                  ))}
                </div>
              ) : (
                <TimelineView records={filteredRecords} />
              )}

              {filteredRecords?.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} color="var(--color-muted-foreground)" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No records found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                  <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </>
          )}

          {activeTab === 'vaccinations' && (
            <VaccinationTracker vaccinations={vaccinations} />
          )}

          {activeTab === 'lab-trends' && (
            <div className="space-y-6">
              <LabResultsChart
                data={cholesterolData}
                title="Total Cholesterol Trend"
                unit="mg/dL"
                normalRange={{ min: 125, max: 200 }}
              />
              <LabResultsChart
                data={bloodSugarData}
                title="Fasting Blood Sugar Trend"
                unit="mg/dL"
                normalRange={{ min: 70, max: 100 }}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
      {showShareModal && selectedRecord && (
        <ShareRecordModal
          record={selectedRecord}
          onClose={() => setShowShareModal(false)}
          onShare={handleShare}
        />
      )}
      {showUploadModal && (
        <UploadDocumentModal
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
        />
      )}
      {showDetailModal && selectedRecord && (
        <RecordDetailModal
          record={selectedRecord}
          onClose={() => setShowDetailModal(false)}
          onShare={handleShareRecord}
          onDownload={handleDownloadRecord}
        />
      )}
    </div>
  );
};

export default MedicalRecords;