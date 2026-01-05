import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MedicationSearchBar from './components/MedicationSearchBar';
import MedicationCard from './components/MedicationCard';
import PharmacyLocator from './components/PharmacyLocator';
import PrescriptionUpload from './components/PrescriptionUpload';
import EmergencyPharmacyFinder from './components/EmergencyPharmacyFinder';
import MedicationInteractionWarning from './components/MedicationInteractionWarning';
import PriceComparisonModal from './components/PriceComparisonModal';
import ShoppingCart from './components/ShoppingCart';

const PharmacyServices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('medications');
  const [cartItems, setCartItems] = useState([]);
  const [selectedMedicationForComparison, setSelectedMedicationForComparison] = useState(null);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [medicationInteractions, setMedicationInteractions] = useState([]);

  const medications = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    activeIngredient: "Acetaminophen",
    dosage: "500mg tablets",
    price: 15.50,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1616526629857-7edcc54bec96",
    imageAlt: "White round paracetamol tablets in blister pack on light blue medical background",
    pharmacyCount: 24,
    requiresPrescription: false
  },
  {
    id: 2,
    name: "Amoxicillin 500mg",
    activeIngredient: "Amoxicillin",
    dosage: "500mg capsules",
    price: 45.00,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1630094539416-5e17c6191be5",
    imageAlt: "Red and white antibiotic capsules arranged in rows on white medical surface",
    pharmacyCount: 18,
    requiresPrescription: true
  },
  {
    id: 3,
    name: "Ibuprofen 400mg",
    activeIngredient: "Ibuprofen",
    dosage: "400mg tablets",
    price: 22.00,
    availability: "In Stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f82ab8bc-1764710346045.png",
    imageAlt: "Orange coated ibuprofen tablets in transparent blister packaging on white background",
    pharmacyCount: 31,
    requiresPrescription: false
  },
  {
    id: 4,
    name: "Omeprazole 20mg",
    activeIngredient: "Omeprazole",
    dosage: "20mg capsules",
    price: 38.50,
    availability: "Limited Stock",
    image: "https://images.unsplash.com/photo-1630094539416-5e17c6191be5",
    imageAlt: "Purple and white omeprazole capsules in medical blister pack on light surface",
    pharmacyCount: 12,
    requiresPrescription: true
  },
  {
    id: 5,
    name: "Metformin 850mg",
    activeIngredient: "Metformin HCl",
    dosage: "850mg tablets",
    price: 52.00,
    availability: "In Stock",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bd577d62-1764656014822.png",
    imageAlt: "White oval metformin tablets in silver blister pack on medical blue background",
    pharmacyCount: 15,
    requiresPrescription: true
  },
  {
    id: 6,
    name: "Cetirizine 10mg",
    activeIngredient: "Cetirizine",
    dosage: "10mg tablets",
    price: 18.00,
    availability: "In Stock",
    image: "https://images.unsplash.com/photo-1550572017-54b7f54d1f75",
    imageAlt: "Small white cetirizine antihistamine tablets in clear blister packaging on white surface",
    pharmacyCount: 28,
    requiresPrescription: false
  }];


  const nearbyPharmacies = [
  {
    id: 1,
    name: "Pharmacie Centrale",
    address: "123 Avenue Mohammed V, Casablanca",
    distance: "0.5 km",
    phone: "+212 522-123456",
    isOpen: true,
    isGarde: false,
    lat: 33.5731,
    lng: -7.5898
  },
  {
    id: 2,
    name: "Pharmacie Al Amal",
    address: "45 Rue Hassan II, Casablanca",
    distance: "1.2 km",
    phone: "+212 522-234567",
    isOpen: true,
    isGarde: true,
    lat: 33.5892,
    lng: -7.6031
  },
  {
    id: 3,
    name: "Pharmacie Essalam",
    address: "78 Boulevard Zerktouni, Casablanca",
    distance: "2.1 km",
    phone: "+212 522-345678",
    isOpen: false,
    isGarde: false,
    lat: 33.5650,
    lng: -7.6114
  }];


  const gardePharmacies = [
  {
    id: 1,
    name: "Pharmacie de Garde Al Amal",
    address: "45 Rue Hassan II, Casablanca",
    distance: "1.2 km",
    phone: "+212 522-234567",
    lat: 33.5892,
    lng: -7.6031
  },
  {
    id: 2,
    name: "Pharmacie de Garde Nour",
    address: "89 Avenue des FAR, Casablanca",
    distance: "3.5 km",
    phone: "+212 522-456789",
    lat: 33.5950,
    lng: -7.6200
  }];


  const pharmacyPrices = [
  {
    name: "Pharmacie Centrale",
    address: "123 Avenue Mohammed V",
    distance: "0.5 km",
    price: 15.50,
    savings: null,
    inStock: true,
    deliveryAvailable: true
  },
  {
    name: "Pharmacie Al Amal",
    address: "45 Rue Hassan II",
    distance: "1.2 km",
    price: 14.00,
    savings: 1.50,
    inStock: true,
    deliveryAvailable: true
  },
  {
    name: "Pharmacie Essalam",
    address: "78 Boulevard Zerktouni",
    distance: "2.1 km",
    price: 16.50,
    savings: null,
    inStock: false,
    deliveryAvailable: false
  }];


  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const handleAddToCart = (medication) => {
    const existingItem = cartItems?.find((item) => item?.id === medication?.id);
    if (existingItem) {
      setCartItems(cartItems?.map((item) =>
      item?.id === medication?.id ?
      { ...item, quantity: item?.quantity + 1 } :
      item
      ));
    } else {
      setCartItems([...cartItems, { ...medication, quantity: 1 }]);
    }

    if (cartItems?.length > 0) {
      setMedicationInteractions([
      {
        medications: `${medication?.name} + ${cartItems?.[0]?.name}`,
        warning: "These medications may interact. Consult your pharmacist before combining."
      }]
      );
    }
  };

  const handleCompare = (medication) => {
    setSelectedMedicationForComparison(medication);
    setShowComparisonModal(true);
  };

  const handleUpdateQuantity = (id, quantity) => {
    setCartItems(cartItems?.map((item) =>
    item?.id === id ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems?.filter((item) => item?.id !== id));
    if (cartItems?.length <= 1) {
      setMedicationInteractions([]);
    }
  };

  const handleCheckout = () => {
    alert('Proceeding to checkout with ' + cartItems?.length + ' items');
  };

  const handleSelectPharmacy = (pharmacy) => {
    console.log('Selected pharmacy:', pharmacy);
  };

  const handlePrescriptionUpload = (data) => {
    console.log('Prescription uploaded:', data);
  };

  const tabs = [
  { id: 'medications', label: 'Medications', icon: 'Pill' },
  { id: 'pharmacies', label: 'Pharmacies', icon: 'MapPin' },
  { id: 'prescription', label: 'Upload Prescription', icon: 'Upload' },
  { id: 'emergency', label: 'Emergency', icon: 'AlertCircle' }];


  return (
    <>
      <Helmet>
        <title>Pharmacy Services - QuickDoc</title>
        <meta name="description" content="Order medications online with real-time pharmacy availability, price comparison, and home delivery across Morocco" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Header />

        <main className="flex-1 pt-16">
          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
              <div className="max-w-3xl">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Pill" size={24} color="var(--color-primary)" />
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-foreground font-headline">
                    Pharmacy Services
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  Order medications online with real-time availability, price comparison, and home delivery across Morocco
                </p>
                <MedicationSearchBar
                  onSearch={handleSearch}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery} />

              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
            <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-thin pb-2">
              {tabs?.map((tab) =>
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab?.id ?
                'bg-primary text-primary-foreground' :
                'bg-card text-muted-foreground hover:text-foreground hover:bg-muted'}`
                }>

                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {activeTab === 'medications' &&
                <>
                    {medicationInteractions?.length > 0 &&
                  <MedicationInteractionWarning interactions={medicationInteractions} />
                  }

                    <div className="space-y-4">
                      {medications?.map((medication) =>
                    <MedicationCard
                      key={medication?.id}
                      medication={medication}
                      onAddToCart={handleAddToCart}
                      onCompare={handleCompare} />

                    )}
                    </div>
                  </>
                }

                {activeTab === 'pharmacies' &&
                <PharmacyLocator
                  pharmacies={nearbyPharmacies}
                  onSelectPharmacy={handleSelectPharmacy} />

                }

                {activeTab === 'prescription' &&
                <PrescriptionUpload onUpload={handlePrescriptionUpload} />
                }

                {activeTab === 'emergency' &&
                <EmergencyPharmacyFinder gardePharmacies={gardePharmacies} />
                }
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-20 space-y-6">
                  <ShoppingCart
                    cartItems={cartItems}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onCheckout={handleCheckout} />


                  <div className="bg-card border border-border rounded-lg p-4">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="Info" size={20} color="var(--color-info)" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">Need Help?</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          Our pharmacists are available 24/7 to answer your questions
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          fullWidth
                          iconName="MessageCircle"
                          iconPosition="left">

                          Chat with Pharmacist
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                        <Icon name="Truck" size={20} color="var(--color-success)" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-foreground mb-1">Free Delivery</h3>
                        <p className="text-sm text-muted-foreground">
                          On orders over 200 MAD within Casablanca
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />

        {showComparisonModal &&
        <PriceComparisonModal
          medication={selectedMedicationForComparison}
          pharmacyPrices={pharmacyPrices}
          onClose={() => setShowComparisonModal(false)}
          onSelectPharmacy={handleSelectPharmacy} />

        }
      </div>
    </>);

};

export default PharmacyServices;