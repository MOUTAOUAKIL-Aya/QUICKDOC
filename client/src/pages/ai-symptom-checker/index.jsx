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

// Base de connaissances médicales (règles simples)
const MEDICAL_RULES = [
  {
    id: 1,
    name: 'Infection Respiratoire',
    symptoms: ['fever', 'cough', 'fatigue', 'sore_throat'],
    areas: ['head', 'throat', 'chest'],
    description: 'Infection virale commune affectant le nez, la gorge et les voies respiratoires.',
    specialist: 'General Practitioner',
    urgency: 'medium',
    confidence: 75
  },
  {
    id: 2,
    name: 'Allergies Saisonnières',
    symptoms: ['sneezing', 'runny_nose', 'itchy_eyes', 'congestion'],
    areas: ['head', 'eyes', 'nose'],
    description: 'Réaction allergique aux allergènes environnementaux.',
    specialist: 'Allergist',
    urgency: 'low',
    confidence: 70
  },
  {
    id: 3,
    name: 'Gastro-entérite',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach_pain'],
    areas: ['stomach'],
    description: 'Inflammation de l\'estomac et des intestins.',
    specialist: 'Gastroenterologist',
    urgency: severity => severity >= 2 ? 'medium' : 'low',
    confidence: 80
  },
  {
    id: 4,
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'light_sensitivity'],
    areas: ['head'],
    description: 'Maux de tête sévères souvent accompagnés de nausées.',
    specialist: 'Neurologist',
    urgency: severity => severity === 3 ? 'high' : 'medium',
    confidence: 85
  },
  {
    id: 5,
    name: 'Infection Urinaire',
    symptoms: ['frequent_urination', 'burning_urination', 'pelvic_pain'],
    areas: ['pelvis'],
    description: 'Infection du système urinaire.',
    specialist: 'Urologist',
    urgency: 'medium',
    confidence: 90
  },
  {
    id: 6,
    name: 'Douleur Musculaire',
    symptoms: ['muscle_pain', 'stiffness'],
    areas: ['arms', 'legs', 'back'],
    description: 'Douleur ou tension dans les muscles.',
    specialist: 'Orthopedist',
    urgency: 'low',
    confidence: 65
  }
];

const AISymptomChecker = () => {
  const [currentStep, setCurrentStep] = useState(1);       // Étape actuelle (1 à 4)
  const [selectedAreas, setSelectedAreas] = useState([]);  // Ex: ['head', 'stomach']
  const [selectedSymptoms, setSelectedSymptoms] = useState([]); // Ex: ['fever', 'cough']
  const [severity, setSeverity] = useState(1);             // 1=Léger, 2=Modéré, 3=Sévère
  const [duration, setDuration] = useState('');            // 'hours', '1-3_days', etc.
  const [isAnalyzing, setIsAnalyzing] = useState(false);   // Animation "analyse en cours"
  const [analysisResults, setAnalysisResults] = useState(null); // Résultats finaux
  
  const totalSteps = 4; // Étapes totales du processus
  

  // Fonction d'analyse médicale basique
  const analyzeSymptoms = () => {
    let possibleConditions = [];      // Liste des conditions détectées
    let recommendedSpecialists = new Set(); // Liste des spécialistes (Set évite doublons)
    let totalConfidence = 0;          // Somme des confiances pour moyenne
    let matchCount = 0;               // Nombre de conditions détectées
    
    // 1️⃣ ÉTAPE 1 : PARCOURIR TOUTES LES RÈGLES MÉDICALES
    // ---------------------------------------------------
    // On compare les saisies utilisateur avec chaque règle
    MEDICAL_RULES.forEach(rule => {
      let matchScore = 0;     // Nombre d'éléments correspondants
      let totalPossible = 0;  // Nombre total d'éléments dans la règle
      
      // A. COMPARER LES SYMPTÔMES
      // Pour chaque symptôme de la règle, vérifier si l'utilisateur l'a sélectionné
      rule.symptoms.forEach(symptom => {
        totalPossible++;  // +1 au total possible
        if (selectedSymptoms.includes(symptom)) {
          matchScore++;   // +1 si correspondance
        }
      });
      
      // B. COMPARER LES ZONES DU CORPS
      rule.areas.forEach(area => {
        totalPossible++;  // +1 au total possible
        if (selectedAreas.includes(area)) {
          matchScore++;   // +1 si correspondance
        }
      });
      
      // Calculer pourcentage de correspondance
      const matchPercentage = totalPossible > 0 ? (matchScore / totalPossible) * 100 : 0;
      
      // Si correspondance significative (> 40%)
      if (matchPercentage >= 40) {
        const adjustedConfidence = Math.min(95, Math.floor(rule.confidence * (matchPercentage / 100)));
        
        // Déterminer l'urgence (peut être fixe ou une fonction)
        const urgencyLevel = typeof rule.urgency === 'function' 
          ? rule.urgency(severity)  // Si fonction, calculer avec la sévérité
          : rule.urgency;           // Sinon, prendre la valeur fixe
        
        // Ajouter la condition à la liste
        possibleConditions.push({
          id: rule.id,
          name: rule.name,
          description: rule.description,
          matchPercentage: Math.floor(matchPercentage),  // Ex: 75%
          confidence: adjustedConfidence,                // Ex: 60%
          urgency: urgencyLevel                         // 'low', 'medium', 'high'
        });
        
        recommendedSpecialists.add(rule.specialist);
        totalConfidence += adjustedConfidence;
        matchCount++;
      }
    });
    
    // 2. Trier par meilleure correspondance
    possibleConditions.sort((a, b) => b.matchPercentage - a.matchPercentage);
    
    // 3. Calculer urgence globale
    let overallUrgency = 'low'; //par defaut
    if (severity === 3) {
      overallUrgency = 'high';
    } else if (severity === 2) {
      overallUrgency = 'medium';
    } else if (possibleConditions.some(cond => cond.urgency === 'high')) {
      overallUrgency = 'medium';
    }
    
    // 4. Calculer confiance moyenne
    const averageConfidence = matchCount > 0 
      ? Math.floor(totalConfidence / matchCount) 
      : 0;
    
    // 5. Ajouter recommandation généraliste si aucune spécialité
    if (recommendedSpecialists.size === 0) {
      recommendedSpecialists.add('General Practitioner');
    }
    
    // 6. Gérer cas "non trouvé"
    if (possibleConditions.length === 0) {
      possibleConditions = [{
        id: 0,
        name: 'Consultation Générale Recommandée',
        description: 'Vos symptômes nécessitent une évaluation médicale personnalisée. Veuillez consulter un médecin pour un diagnostic précis.',
        matchPercentage: 0,
        confidence: 60,
        urgency: severity === 3 ? 'medium' : 'low'
      }];
      recommendedSpecialists = new Set(['General Practitioner']);
    }
    
    return {
      urgency: overallUrgency,
      confidence: averageConfidence,
      possibleConditions: possibleConditions.slice(0, 3), // Top 3 seulement
      recommendedSpecialists: Array.from(recommendedSpecialists),
      note: "Basé sur une analyse de règles médicales basiques. Consultez un médecin pour diagnostic."
    };
  };

  const handleAreaSelect = (areaId) => {
    setSelectedAreas(prev =>
      prev?.includes(areaId)
        ? prev?.filter(id => id !== areaId)  // Si déjà sélectionné, on enlève
        : [...prev, areaId]                  // Sinon, on ajoute
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
    
    // Simulation délai traitement
    setTimeout(() => {
      // Appel à la fonction d'analyse
      const results = analyzeSymptoms();
      
      // Ajouter durée aux résultats
      results.duration = duration;
      results.severity = severity;
      results.symptomCount = selectedSymptoms.length;
      results.areaCount = selectedAreas.length;
      
      setAnalysisResults(results);
      setIsAnalyzing(false);
      setCurrentStep(4);
    }, 1500); // Temps réduit car pas de vraie IA
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

  // Calculer la progression pour l'affichage
  const getProgressInfo = () => {
    const steps = [
      { done: selectedAreas.length > 0, label: 'Zones sélectionnées' },
      { done: selectedSymptoms.length > 0, label: 'Symptômes identifiés' },
      { done: duration !== '', label: 'Informations complétées' }
    ];
    return steps.filter(step => step.done).length;
  };

  return (
    <>
      <Helmet>
        <title>Symptom Checker - QuickDoc</title>
        <meta name="description" content="Analysez vos symptômes et recevez des recommandations médicales basées sur une base de connaissances médicale." />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1 pt-20 pb-12">
          <div className="max-w-5xl mx-auto px-4 lg:px-6">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Icon name="Stethoscope" size={16} />
                <span>Analyse Médicale Basée sur Règles</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-3">
                Symptom Checker
              </h1>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto">
                Décrivez vos symptômes pour obtenir des recommandations basées sur des règles médicales établies
              </p>
              
              {/* Info progression */}
              {!analysisResults && currentStep < 4 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  <div className="inline-flex items-center gap-2 bg-muted/50 px-3 py-1 rounded-full">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span>{getProgressInfo()} / 3 informations complétées</span>
                  </div>
                </div>
              )}
            </div>

            {!analysisResults && (
              <div className="mb-8">
                <ProgressSteps currentStep={currentStep} totalSteps={totalSteps} />
              </div>
            )}

            <div className="bg-card rounded-xl border border-border shadow-lg overflow-hidden">
              {isAnalyzing ? (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
                    <Icon name="Search" size={40} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Analyse en cours
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Comparaison de vos symptômes avec notre base de connaissances médicales...
                    <br />
                    <span className="text-xs mt-2 block">
                      {selectedSymptoms.length} symptômes × {MEDICAL_RULES.length} règles
                    </span>
                  </p>
                  <div className="max-w-md mx-auto">
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary animate-progress" />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>Collecte</span>
                      <span>Analyse</span>
                      <span>Résultats</span>
                    </div>
                  </div>
                </div>
              ) : analysisResults ? (
                <div className="p-6 lg:p-8">
                  <AnalysisResults results={analysisResults} onReset={handleReset} />
                  <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border">
                    <div className="flex items-start gap-3">
                      <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-foreground">Important</p>
                        <p className="text-muted-foreground mt-1">
                          Cette analyse est basée sur des règles médicales générales et ne remplace pas 
                          une consultation médicale. Les résultats ont une confiance de {analysisResults.confidence}% 
                          et sont fournis à titre informatif seulement.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-6 lg:p-8">
                    {currentStep === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-xl font-semibold text-foreground mb-2">
                            Où ressentez-vous des symptômes ?
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Sélectionnez une ou plusieurs zones du corps ({selectedAreas.length} sélectionnée(s))
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
                            Quels symptômes ressentez-vous ?
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Sélectionnez tous les symptômes applicables ({selectedSymptoms.length} sélectionné(s))
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
                            Détails supplémentaires
                          </h2>
                          <p className="text-sm text-muted-foreground">
                            Ces informations améliorent la précision de l'analyse
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
                        
                        {/* Aperçu des données */}
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <p className="text-sm font-medium text-foreground mb-2">Résumé de votre analyse :</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">Zones</div>
                              <div className="font-semibold">{selectedAreas.length}</div>
                            </div>
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">Symptômes</div>
                              <div className="font-semibold">{selectedSymptoms.length}</div>
                            </div>
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">Sévérité</div>
                              <div className="font-semibold">{severity}/3</div>
                            </div>
                            <div className="bg-background p-2 rounded">
                              <div className="text-xs text-muted-foreground">Durée</div>
                              <div className="font-semibold">{duration || 'Non spécifié'}</div>
                            </div>
                          </div>
                        </div>
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
                        Retour
                      </Button>

                      {currentStep < 3 ? (
                        <Button
                          variant="default"
                          onClick={handleNext}
                          disabled={!canProceed()}
                          iconName="ChevronRight"
                          iconPosition="right"
                        >
                          Continuer
                        </Button>
                      ) : (
                        <Button
                          variant="default"
                          onClick={handleAnalyze}
                          disabled={!canProceed()}
                          iconName="Search"
                          iconPosition="left"
                        >
                          Analyser les Symptômes
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
                  <Icon name="Database" size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Base de Connaissances</h4>
                  <p className="text-xs text-muted-foreground">
                    {MEDICAL_RULES.length} règles médicales validées
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Calculator" size={20} className="text-success" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Analyse Algorithmique</h4>
                  <p className="text-xs text-muted-foreground">
                    Correspondance symptômes → conditions médicales
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="UserRound" size={20} className="text-warning" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground mb-1">Transparent</h4>
                  <p className="text-xs text-muted-foreground">
                    Chaque recommandation explique son calcul
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
          animation: progress 1.5s ease-in-out;
        }
      `}</style>
    </>
  );
};

export default AISymptomChecker;