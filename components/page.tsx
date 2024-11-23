'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Phone, Clock, Menu, X, ChevronRight, Car, ArrowRight, Facebook, Instagram, Wrench, Star, Share, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

// First, let's define an interface for the car type
interface Car {
  name: string;
  type: string;
  image: string;
  price: string;
  details: string[];
}

const cars: Car[] = [
  { 
    name: 'Renault Clio', 
    type: 'Citadine', 
    image: '/clio5.jpeg',
    price: '300dh/jour',
    details: [
      'Moteur: 1.5L dCi',
      'Puissance: 85 ch',
      'Transmission: Manuelle',
      'Climatisation',
      'Bluetooth',
      'Économique et confortable'
    ]
  },
  { 
    name: 'Dacia Logan', 
    type: 'Berline', 
    image: '/logan.webp',
    price: '250dh/jour',
    details: [
      'Moteur: 1.5L dCi',
      'Puissance: 75 ch',
      'Transmission: Manuelle',
      'Grand coffre',
      'Climatisation',
      'Excellent rapport qualité-prix'
    ]
  },
  { 
    name: 'Dacia Sandero', 
    type: 'Citadine', 
    image: '/sandero.jpeg',
    price: '400dh/jour',
    details: [
      'Moteur: 1.5L dCi',
      'Puissance: 110 ch',
      'Transmission: Manuelle',
      'Mode 4x4 disponible',
      'Climatisation',
      'Parfait pour tous terrains'
    ]
  },
  { 
    name: 'Dacia Stepway', 
    type: 'Crossover', 
    image: '/dacia-step.jpg',
    price: '350dh/jour',
    details: [
      'Moteur: 1.0L TCe',
      'Puissance: 90 ch',
      'Transmission: Manuelle',
      'Garde au sol surélevée',
      'Système multimédia',
      'Style baroudeur'
    ]
  },
  { 
    name: 'Peugeot 208', 
    type: 'Citadine', 
    image: '/208.jpeg',
    price: '400dh/jour',
    details: [
      'Moteur: 1.2L PureTech',
      'Puissance: 100 ch',
      'Transmission: Automatique',
      'i-Cockpit',
      'Écran tactile',
      'Design moderne'
    ]
  },
  { 
    name: 'Kia Picanto', 
    type: 'Citadine', 
    image: '/kia.jpg',
    price: '300dh/jour',
    details: [
      'Moteur: 1.0L',
      'Puissance: 67 ch',
      'Transmission: Manuelle',
      'Climatisation',
      'Connexion Bluetooth',
      'Parfaite pour la ville'
    ]
  },
]

export function HomePage() {
  const [currentSection, setCurrentSection] = useState('accueil')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [selectedCar, setSelectedCar] = useState<Car | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    setCurrentSection(sectionId)
    setIsMenuOpen(false)
  }

  const handleReservation = (car: Car) => {
    // Create WhatsApp message with car details
    const message = `Bonjour, je souhaite réserver la voiture ${car.name} à ${car.price}`;
    const whatsappUrl = `https://wa.me/212661559222?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-gray-800 shadow-md py-1' : 'bg-transparent py-2'}`}>
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/terlogo.png"
              alt="Terrada Rental Car Logo"
              width={180}
              height={180}
              className="h-auto"
            />
          </div>
          <div className="hidden md:flex space-x-4">
            {['accueil', 'catalogue', 'apropos', 'contact'].map((section) => (
              <Button
                key={section}
                variant="ghost"
                onClick={() => scrollToSection(section)}
                className={`transition-colors duration-300 ${currentSection === section ? 'text-[#FFC300]' : scrollY > 50 ? 'text-white' : 'text-white'} hover:text-[#FFC300] py-1`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </div>
          <Button variant="ghost" className="md:hidden p-1" onClick={toggleMenu}>
            {isMenuOpen ? <X className={scrollY > 50 ? 'text-white' : 'text-white'} /> : <Menu className={scrollY > 50 ? 'text-white' : 'text-white'} />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center"
          >
            {['accueil', 'catalogue', 'apropos', 'contact'].map((section) => (
              <Button
                key={section}
                variant="ghost"
                onClick={() => scrollToSection(section)}
                className="text-2xl mb-4 hover:text-[#FFC300]"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Section */}
      <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Tuning Cars Hero"
          layout="fill"
          objectFit="cover"
          quality={100}
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-white max-w-3xl mx-auto px-4 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Terrada Rental Car
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Votre partenaire de confiance pour la location de voitures à Kénitra
          </p>
          <Button
            onClick={() => scrollToSection('catalogue')}
            className="bg-[#FFC300] text-gray-900 hover:bg-[#FFD60A] transition-colors duration-300"
          >
            Explorez Notre Flotte <ArrowRight className="ml-2" />
          </Button>
        </motion.div>
      </section>

      {/* Catalog Section */}
      <section id="catalogue" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFC300]">Notre Flotte de Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl group bg-white">
                  <div className="relative h-64">
                    <Image
                      src={car.image}
                      alt={car.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-4">
                      <h3 className="text-xl font-semibold text-white mb-2">{car.name}</h3>
                      <p className="text-white mb-4">{car.price}</p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="secondary" 
                          className="bg-[#FFC300] text-gray-900 hover:bg-[#FFD60A]"
                          onClick={() => handleReservation(car)}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Réserver
                        </Button>
                        <Button 
                          variant="secondary" 
                          className="bg-white text-gray-900 hover:bg-gray-200" 
                          onClick={() => setSelectedCar(car)}
                        >
                          <ChevronRight className="w-4 h-4" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 bg-[#FFC300] text-gray-900">
                    <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
                    <p>{car.type}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="apropos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFC300]">À Propos de Terrada Rental Car</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-full md:w-1/2">
              <Image
                src="/about.jpg"
                alt="Tuning Cars Workshop"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-[#FFC300] p-3 rounded-full">
                  <Car className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Notre Passion</h3>
                  <p>Fondée par des passionnés d&apos;automobiles, Tuning Cars offre une expérience de conduite inégalée depuis 2015.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#FFC300] p-3 rounded-full">
                  <Wrench className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Notre Expertise</h3>
                  <p>Nos experts en tuning personnalisent chaque véhicule pour offrir des performances optimales et un style unique.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-[#FFC300] p-3 rounded-full">
                  <Star className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Notre Promesse</h3>
                  <p>Nous nous engageons à fournir une expérience de location haut de gamme, alliant performance et sécurité.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#FFC300]">Contactez-nous</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info Cards */}
            <div className="space-y-6">
              {/* Phone Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC300] p-3 rounded-full">
                    <Phone className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                    <p className="text-gray-600">Disponible 7j/7</p>
                    <a 
                      href="tel:0661559222" 
                      className="text-[#FFC300] hover:text-[#FFD60A] font-semibold block mt-1"
                    >
                      0661559222
                    </a>
                  </div>
                </div>
              </div>

              {/* Address Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC300] p-3 rounded-full">
                    <MapPin className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                    <p className="text-gray-600">Notre agence</p>
                    <p className="text-gray-800 mt-1">
                      7C57+J9C, Résidence tour Hassan, Av. Mohamed V, Kénitra
                    </p>
                  </div>
                </div>
              </div>

              {/* Hours Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC300] p-3 rounded-full">
                    <Clock className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Horaires dl&aposouverture</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lundi - Samedi</span>
                        <span className="text-gray-800">9h00 - 19h00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dimanche</span>
                        <span className="text-gray-800">Sur rendez-vous</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC300] p-3 rounded-full">
                    <Share className="text-white h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Réseaux sociaux</h3>
                    <div className="flex space-x-4 mt-2">
                      <a 
                        href="#" 
                        className="bg-gray-100 p-2 rounded-full hover:bg-[#FFC300] transition-colors"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a 
                        href="#" 
                        className="bg-gray-100 p-2 rounded-full hover:bg-[#FFC300] transition-colors"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a 
                        href={`https://wa.me/212661559222`}
                        className="bg-gray-100 p-2 rounded-full hover:bg-[#FFC300] transition-colors"
                      >
                        <MessageCircle className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section - Now spans 2 columns */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-[16/9] w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1648.7936085464983!2d-6.589664656319468!3d34.25907515371411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda759e5d27ace2f%3A0xe1b3a919c7091faa!2sTerrada%20Rental%20Car%20(Location%20De%20Voiture)!5e0!3m2!1sfr!2sma!4v1732380245182!5m2!1sfr!2sma"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Notre emplacement</h3>
                <p className="text-gray-600">
                  Idéalement situé au cœur de Kénitra, notre agence est facilement accessible depuis l&apos;Avenue Mohamed V.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFC300] text-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2024 Terrada Rental Car. Tous droits réservés.</p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-300">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Car Details Modal */}
      <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          <div className="relative h-64">
            <Image
              src={selectedCar?.image || '/placeholder.svg'}
              alt={selectedCar?.name || 'Car'}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl font-bold mb-1">{selectedCar?.name}</h2>
              <p className="text-lg opacity-90">{selectedCar?.type}</p>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-2xl font-bold text-[#FFC300]">{selectedCar?.price}</span>
              <Button 
                className="bg-[#FFC300] text-gray-900 hover:bg-[#FFD60A]"
                onClick={() => {
                  handleReservation(selectedCar!);
                  setSelectedCar(null);
                }}
              >
                <Phone className="w-4 h-4 mr-2" />
                Réserver maintenant
              </Button>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Caractéristiques</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedCar?.details.map((detail: string, index: number) => (
                  <div 
                    key={index}
                    className="flex items-center space-x-2 text-gray-600"
                  >
                    <div className="w-2 h-2 rounded-full bg-[#FFC300]" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}