import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BodyMap from './components/BodyMap';
import SymptomSelector from './components/SymptomSelector';
import SeveritySlider from './components/SeveritySlider';
import DurationSelector from './components/DurationSelector';
import AnalysisResults from './components/AnalysisResults';
import ProgressSteps from './components/ProgressSteps';

const AISymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [severity, setSeverity] = useState(1);
  const [duration, setDuration] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState(null);

  const totalSteps = 4;

  const handleAreaSelect = (areaId) => {
    setSelectedAreas(prev =>
      prev?.includes(areaId)
        ? prev?.filter(id => id !== areaId)
        : [...prev, areaId]
    );
  };

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev =>
      prev?.includes(symptomId)
        ? prev?.filter(id => id !== symptomId)
        : [...prev, symptomId]
    );
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const mockResults = {
        urgency: severity === 3 ? 'high' : severity === 2 ? 'medium' : 'low',
        confidence: 87,
        possibleConditions: [
          {
            name: 'Upper Respiratory Infection',
            description: 'Common viral infection affecting the nose, throat, and airways. Usually resolves within 7-10 days with rest and hydration.'
          },
          {
            name: 'Seasonal Allergies',
            description: 'Allergic reaction to environmental triggers causing inflammation of nasal passages and airways.'
          },
          {
            name: 'Acute Bronchitis',
            description: 'Inflammation of the bronchial tubes, often following a cold or respiratory infection.'
          }
        ],
        recommendedSpecialists: [
          'General Practitioner',
          'Internal Medicine',
          'Pulmonologist'
        ]
      };
      
      setAnalysisResults(mockResults);
      setIsAnalyzing(false);
      setCurrentStep(4);
    }, 2500);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setSelectedAreas([]);
    setSelectedSymptoms([]);
    setSeverity(1);
    setDuration('');
    setAnalysisResults(null);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedAreas?.length > 0;
      case 2:
        return selectedSymptoms?.length > 0;
      case 3:
        return duration !== '';
      default:
        return false;
    }
  };

  return (
    <>
      <Helmet>
        <title>AI Symptom Checker - QuickDoc</title>
        <meta name="description" content="Get instant AI-powered health assessment. Analyze your symptoms and receive personalized medical recommendations from QuickDoc's intelligent symptom checker." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Icon name="Sparkles" size={16} />
                <span>AI-Powered Analysis</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Symptom Checker
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Describe your symptoms and get instant AI-powered health insights with specialist recommendations
              </p>
            </div>

            {!analysisResults && (
              <div className="mb-8">
                <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
              </div>
            )}

            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              {isAnalyzing ? (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-pulse">
                    <Icon name="Brain" size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Analyzing Your Symptoms</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our AI is processing your information using advanced medical knowledge...
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-progress" />
                    </div>
                  </div>
                </div>
              ) : analysisResults ? (
                <div className="p-6 lg:p-8">
                  <AnalysisResults results={analysisResults} onReset={handleReset} />
                </div>
              ) : (
                <>
                  <div className="p-6 lg:p-8">
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            Where are you experiencing symptoms?
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Select one or more body areas where you feel discomfort
                          </p>
                        </div>
                        <BodyMap
                          selectedAreas={selectedAreas}
                          onAreaSelect={handleAreaSelect}
                        />
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            What symptoms are you experiencing?
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Select all symptoms that apply to your current condition
                          </p>
                        </div>
                        <SymptomSelector
                          selectedSymptoms={selectedSymptoms}
                          onSymptomToggle={handleSymptomToggle}
                        />
                      </div>
                    )}

                    {currentStep === 3 && (
                      <div className="space-y-8">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            Tell us more about your symptoms
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            This information helps us provide more accurate recommendations
                          </p>
                        </div>
                        
                        <SeveritySlider
                          severity={severity}
                          onSeverityChange={setSeverity}
                        />
                        
                        <DurationSelector
                          duration={duration}
                          onDurationChange={setDuration}
                        />
                      </div>
                    )}
                  </div>

                  <div className="border-t border-border p-6 bg-muted/30">
                    <div className="flex items-center justify-between gap-4">
                      <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        iconName="ChevronLeft"
                        iconPosition="left"
                      >
                        Back
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          variant="default"
                          onClick={handleNext}
                          disabled={!canProceed()}
                          iconName="ChevronRight"
                          iconPosition="right"
                        >
                          Continue
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          onClick={handleAnalyze}
                          disabled={!canProceed()}
                          iconName="Sparkles"
                          iconPosition="left"
                        >
                          Analyze Symptoms
                        </Button>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Private & Secure</h4>
                  <p className="text-xs text-muted-foreground">
                    Your health data is encrypted and never shared without consent
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Brain" size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">AI-Powered</h4>
                  <p className="text-xs text-muted-foreground">
                    Advanced machine learning trained on medical knowledge
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="UserRound" size={20} className="text-warning" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Doctor Verified</h4>
                  <p className="text-xs text-muted-foreground">
                    Recommendations reviewed by licensed medical professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 2.5s ease-in-out;
        }
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 3px solid var(--color-background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
        .slider-thumb::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 3px solid var(--color-background);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default AISymptomChecker;