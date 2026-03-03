'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Upload, Check } from 'lucide-react';

export default function PublierPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    transaction: '',
    city: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    squareMeter: '',
    amenities: [] as string[],
  });

  const amenities = [
    'Eau courante',
    'Électricité',
    'Gardien',
    'Cuisine',
    'Parking',
    'Climatisation',
    'Meublé',
    'Piscine',
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAmenityChange = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Handle final submission
      console.log('Form submitted:', formData);
      alert('Annonce publiée avec succès ! ');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <main className="min-h-screen bg-background dark:bg-slate-950">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4">Publier une annonce</h1>
          <p className="text-muted-foreground text-lg">
            Remplissez le formulaire ci-dessous pour publier votre annonce gratuitement
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex justify-between items-center mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                    s <= step
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {s < step ? <Check size={20} /> : s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-24 mx-2 transition-colors ${
                      s < step ? 'bg-primary' : 'bg-secondary'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Infos de base</span>
            <span>Détails & Prix</span>
            <span>Photos & Vérification</span>
          </div>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <motion.div
            key={step}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="p-8 bg-white dark:bg-slate-800 border-border">
              {/* Step 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Informations de base
                  </h2>

                  <div>
                    <Label htmlFor="title" className="font-semibold mb-2 block">
                      Titre de l'annonce *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ex: Magnifique appartement T3 à Douala"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-semibold mb-2 block">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Décrivez votre propriété..."
                      rows={5}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="type" className="font-semibold mb-2 block">
                        Type de bien *
                      </Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value) => handleSelectChange('type', value)}
                      >
                        <SelectTrigger id="type" required>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Appartement">Appartement</SelectItem>
                          <SelectItem value="Maison">Maison</SelectItem>
                          <SelectItem value="Terrain">Terrain</SelectItem>
                          <SelectItem value="Studio">Studio</SelectItem>
                          <SelectItem value="Villa">Villa</SelectItem>
                          <SelectItem value="Commerce">Commerce</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="transaction" className="font-semibold mb-2 block">
                        Type de transaction *
                      </Label>
                      <Select
                        value={formData.transaction}
                        onValueChange={(value) =>
                          handleSelectChange('transaction', value)
                        }
                      >
                        <SelectTrigger id="transaction" required>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="À louer">À louer</SelectItem>
                          <SelectItem value="À vendre">À vendre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Détails et prix
                  </h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="font-semibold mb-2 block">
                        Ville *
                      </Label>
                      <Select
                        value={formData.city}
                        onValueChange={(value) => handleSelectChange('city', value)}
                      >
                        <SelectTrigger id="city" required>
                          <SelectValue placeholder="Sélectionnez..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Douala">Douala</SelectItem>
                          <SelectItem value="Yaoundé">Yaoundé</SelectItem>
                          <SelectItem value="Buea">Buea</SelectItem>
                          <SelectItem value="Bamenda">Bamenda</SelectItem>
                          <SelectItem value="Garoua">Garoua</SelectItem>
                          <SelectItem value="Limbe">Limbe</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location" className="font-semibold mb-2 block">
                        Quartier/Localité *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        placeholder="Ex: Akwa, Bastos..."
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="price" className="font-semibold mb-2 block">
                      Prix (FCFA) *
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={formData.price}
                      onChange={handleInputChange}
                      placeholder="Ex: 450000"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="bedrooms" className="font-semibold mb-2 block">
                        Chambres
                      </Label>
                      <Input
                        id="bedrooms"
                        name="bedrooms"
                        type="number"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bathrooms" className="font-semibold mb-2 block">
                        Salles de bain
                      </Label>
                      <Input
                        id="bathrooms"
                        name="bathrooms"
                        type="number"
                        value={formData.bathrooms}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>

                    <div>
                      <Label htmlFor="squareMeter" className="font-semibold mb-2 block">
                        Superficie (m²)
                      </Label>
                      <Input
                        id="squareMeter"
                        name="squareMeter"
                        type="number"
                        value={formData.squareMeter}
                        onChange={handleInputChange}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="font-semibold mb-4 block">Équipements</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityChange(amenity)}
                          />
                          <label htmlFor={amenity} className="cursor-pointer">
                            {amenity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground mb-6">
                    Photos et vérification
                  </h2>

                  <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center cursor-pointer hover:bg-primary/5 transition-colors">
                    <Upload size={40} className="mx-auto mb-4 text-primary" />
                    <p className="text-foreground font-semibold mb-2">
                      Cliquez pour télécharger des photos
                    </p>
                    <p className="text-sm text-muted-foreground">
                      ou glissez-déposez (Max. 5 photos, 10MB chacune)
                    </p>
                  </div>

                  <div className="bg-accent/10 border border-accent rounded-lg p-6">
                    <h3 className="font-semibold text-foreground mb-3">
                      ✓ Avant de publier, vérifiez que :
                    </h3>
                    <ul className="space-y-2 text-sm text-foreground">
                      <li>✓ Les informations sont exactes et à jour</li>
                      <li>✓ Le prix est compétitif</li>
                      <li>✓ Au moins une photo est téléchargée</li>
                      <li>✓ Vous respectez notre politique de contenu</li>
                    </ul>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" required />
                    <label htmlFor="terms" className="text-sm cursor-pointer">
                      J'accepte les conditions générales d'utilisation
                    </label>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-between gap-4 mt-8"
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              Précédent
            </Button>

            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 min-w-32"
            >
              {step === 3 ? 'Publier gratuitement' : 'Suivant'}
            </Button>
          </motion.div>
        </form>
      </div>

      <Footer />
    </main>
  );
}
