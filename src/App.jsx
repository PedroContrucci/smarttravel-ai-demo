import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, 
  Wallet, TrendingDown, TrendingUp, Sparkles, ChevronRight,
  Check, AlertTriangle, Lightbulb, Globe, Star, Clock, 
  CreditCard, Shield, Zap, X, Plus, RefreshCw, Play, 
  ArrowRight, Edit3, Send, MessageCircle, Bot, Download, 
  FileText, Navigation, Heart, User, LogOut, Settings,
  ThumbsUp, Share2, Bookmark, Filter, Search, Award,
  Baby, UserCheck, Compass, Mountain, Building, Palmtree,
  ChevronDown, Eye, Crown, Flame, TrendingUp as Trending,
  Mail, Lock, UserPlus, Home, Map, BookOpen, Bell
} from 'lucide-react';

// ============================================
// MEGA DATABASE - Multiple Continents & Cities
// ============================================

const DESTINATIONS_DATABASE = {
  // EUROPA
  'Paris, França': {
    continent: 'Europa',
    country: 'França',
    currency: '€',
    currencyRate: 6.2,
    image: '🗼',
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    description: 'A cidade luz, capital mundial da moda, gastronomia e arte.',
    timezone: 'CET (UTC+1)',
    language: 'Francês',
    bestSeason: 'Abril - Junho',
    avgTemp: '15°C',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4850, duration: '11h 30m', class: 'Econômica', rating: 4.5, departure: '23:45', arrival: '14:15+1', stops: 0 },
      { id: 'pf2', name: 'LATAM - 1 Conexão', price: 3680, duration: '16h 45m', class: 'Econômica', rating: 4.2, departure: '22:00', arrival: '18:45+1', stops: 1 },
      { id: 'pf3', name: 'TAP Portugal - 1 Conexão', price: 3250, duration: '14h 20m', class: 'Econômica', rating: 4.0, departure: '21:30', arrival: '15:50+1', stops: 1 },
      { id: 'pf4', name: 'Air France - Business', price: 14200, duration: '11h 30m', class: 'Executiva', rating: 4.9, departure: '23:45', arrival: '14:15+1', stops: 0 },
      { id: 'pf5', name: 'KLM - 1 Conexão', price: 3420, duration: '15h 10m', class: 'Econômica', rating: 4.3, departure: '20:15', arrival: '14:25+1', stops: 1 },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, perNight: true, location: 'Tuileries', rating: 4.9, amenities: ['Spa', 'Michelin', 'Concierge'] },
      { id: 'ph2', name: 'Plaza Athénée', stars: 5, price: 3500, perNight: true, location: 'Champs-Élysées', rating: 4.8, amenities: ['Spa', 'Piscina', 'Vista Eiffel'] },
      { id: 'ph3', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1850, perNight: true, location: 'Arc de Triomphe', rating: 4.6, amenities: ['Spa', 'Rooftop'] },
      { id: 'ph4', name: 'Mercure Tour Eiffel', stars: 4, price: 920, perNight: true, location: 'Tour Eiffel', rating: 4.4, amenities: ['Wi-Fi', 'Café da manhã'] },
      { id: 'ph5', name: 'Ibis Montmartre', stars: 3, price: 520, perNight: true, location: 'Montmartre', rating: 4.1, amenities: ['Wi-Fi', 'Central'] },
      { id: 'ph6', name: 'Generator Paris', stars: 2, price: 210, perNight: true, location: 'Canal Saint-Martin', rating: 4.0, amenities: ['Social', 'Bar'] },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq ★★★', price: 980, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.9 },
      { id: 'pr2', name: 'Septime', price: 320, type: 'Bistrô', cuisine: 'Contemporânea', rating: 4.7 },
      { id: 'pr3', name: 'Bouillon Chartier', price: 95, type: 'Tradicional', cuisine: 'Francesa', rating: 4.5 },
      { id: 'pr4', name: 'Café de Flore', price: 140, type: 'Café', cuisine: 'Bistro', rating: 4.4 },
      { id: 'pr5', name: 'Pink Mamma', price: 110, type: 'Casual', cuisine: 'Italiana', rating: 4.6 },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 195, duration: '2h', type: 'Landmark', rating: 4.8, childFriendly: true },
      { id: 'pa2', name: 'Museu do Louvre', price: 115, duration: '4h', type: 'Museu', rating: 4.9, childFriendly: true },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 145, duration: '1h30', type: 'Experiência', rating: 4.6, childFriendly: true },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 265, duration: '6h', type: 'Day Trip', rating: 4.8, childFriendly: true },
      { id: 'pa5', name: 'Tour Montmartre', price: 55, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'pa6', name: 'Catacumbas de Paris', price: 98, duration: '1h30', type: 'Atração', rating: 4.4, childFriendly: false },
      { id: 'pa7', name: 'Disneyland Paris', price: 420, duration: '10h', type: 'Parque', rating: 4.7, childFriendly: true },
      { id: 'pa8', name: 'Museu d\'Orsay', price: 98, duration: '3h', type: 'Museu', rating: 4.8, childFriendly: true },
      { id: 'pa9', name: 'Show Moulin Rouge', price: 320, duration: '2h30', type: 'Show', rating: 4.6, childFriendly: false },
      { id: 'pa10', name: 'Degustação Vinhos', price: 165, duration: '2h', type: 'Experiência', rating: 4.7, childFriendly: false },
    ]
  },
  'Roma, Itália': {
    continent: 'Europa',
    country: 'Itália',
    currency: '€',
    currencyRate: 6.2,
    image: '🏛️',
    coverUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
    description: 'A cidade eterna, berço do Império Romano e do Renascimento.',
    timezone: 'CET (UTC+1)',
    language: 'Italiano',
    bestSeason: 'Abril - Junho',
    avgTemp: '18°C',
    flights: [
      { id: 'rf1', name: 'Alitalia - Direto', price: 4200, duration: '12h', class: 'Econômica', rating: 4.3, departure: '22:00', arrival: '13:00+1', stops: 0 },
      { id: 'rf2', name: 'TAP - 1 Conexão', price: 3100, duration: '15h', class: 'Econômica', rating: 4.1, departure: '21:00', arrival: '15:00+1', stops: 1 },
      { id: 'rf3', name: 'Iberia - 1 Conexão', price: 2950, duration: '16h', class: 'Econômica', rating: 4.0, departure: '20:30', arrival: '15:30+1', stops: 1 },
    ],
    hotels: [
      { id: 'rh1', name: 'Hotel de Russie', stars: 5, price: 3800, perNight: true, location: 'Piazza del Popolo', rating: 4.9, amenities: ['Spa', 'Jardim', 'Concierge'] },
      { id: 'rh2', name: 'Hotel Artemide', stars: 4, price: 850, perNight: true, location: 'Via Nazionale', rating: 4.5, amenities: ['Rooftop', 'Wi-Fi'] },
      { id: 'rh3', name: 'Hotel Quirinale', stars: 4, price: 620, perNight: true, location: 'Termini', rating: 4.3, amenities: ['Piscina', 'Restaurante'] },
      { id: 'rh4', name: 'Generator Rome', stars: 2, price: 180, perNight: true, location: 'Termini', rating: 4.0, amenities: ['Social', 'Bar'] },
    ],
    restaurants: [
      { id: 'rr1', name: 'La Pergola ★★★', price: 850, type: 'Fine Dining', cuisine: 'Italiana', rating: 4.9 },
      { id: 'rr2', name: 'Roscioli', price: 180, type: 'Trattoria', cuisine: 'Romana', rating: 4.7 },
      { id: 'rr3', name: 'Tonnarello', price: 85, type: 'Casual', cuisine: 'Pasta', rating: 4.5 },
      { id: 'rr4', name: 'Pizzeria Da Baffetto', price: 55, type: 'Pizza', cuisine: 'Pizza Romana', rating: 4.6 },
    ],
    activities: [
      { id: 'ra1', name: 'Coliseu + Fórum Romano', price: 180, duration: '4h', type: 'Histórico', rating: 4.9, childFriendly: true },
      { id: 'ra2', name: 'Vaticano + Capela Sistina', price: 220, duration: '5h', type: 'Museu', rating: 4.9, childFriendly: true },
      { id: 'ra3', name: 'Fontana di Trevi Tour', price: 45, duration: '2h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'ra4', name: 'Aula de Pasta', price: 120, duration: '3h', type: 'Experiência', rating: 4.8, childFriendly: true },
      { id: 'ra5', name: 'Villa Borghese', price: 85, duration: '3h', type: 'Museu', rating: 4.7, childFriendly: true },
      { id: 'ra6', name: 'Trastevere Food Tour', price: 95, duration: '3h', type: 'Gastronomia', rating: 4.6, childFriendly: true },
    ]
  },
  'Barcelona, Espanha': {
    continent: 'Europa',
    country: 'Espanha',
    currency: '€',
    currencyRate: 6.2,
    image: '🏖️',
    coverUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
    description: 'Arte de Gaudí, praias mediterrâneas e vida noturna vibrante.',
    timezone: 'CET (UTC+1)',
    language: 'Espanhol/Catalão',
    bestSeason: 'Maio - Setembro',
    avgTemp: '20°C',
    flights: [
      { id: 'bf1', name: 'Iberia - 1 Conexão', price: 2800, duration: '14h', class: 'Econômica', rating: 4.2, departure: '21:00', arrival: '14:00+1', stops: 1 },
      { id: 'bf2', name: 'TAP - 1 Conexão', price: 2650, duration: '13h', class: 'Econômica', rating: 4.1, departure: '22:00', arrival: '14:00+1', stops: 1 },
      { id: 'bf3', name: 'LATAM - 1 Conexão', price: 3200, duration: '15h', class: 'Econômica', rating: 4.3, departure: '20:00', arrival: '14:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'bh1', name: 'Hotel Arts Barcelona', stars: 5, price: 2800, perNight: true, location: 'Port Olímpic', rating: 4.8, amenities: ['Praia', 'Spa', 'Piscina'] },
      { id: 'bh2', name: 'Mandarin Oriental', stars: 5, price: 3200, perNight: true, location: 'Passeig de Gràcia', rating: 4.9, amenities: ['Spa', 'Rooftop', 'Michelin'] },
      { id: 'bh3', name: 'Hotel 1898', stars: 4, price: 680, perNight: true, location: 'Las Ramblas', rating: 4.4, amenities: ['Piscina', 'Central'] },
      { id: 'bh4', name: 'Generator Barcelona', stars: 2, price: 150, perNight: true, location: 'Gràcia', rating: 4.1, amenities: ['Social', 'Terraço'] },
    ],
    restaurants: [
      { id: 'br1', name: 'Tickets', price: 280, type: 'Tapas Modernas', cuisine: 'Espanhola', rating: 4.8 },
      { id: 'br2', name: 'Cal Pep', price: 150, type: 'Tapas', cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'br3', name: 'La Boqueria', price: 60, type: 'Mercado', cuisine: 'Variada', rating: 4.6 },
      { id: 'br4', name: 'Can Culleretes', price: 75, type: 'Tradicional', cuisine: 'Catalã', rating: 4.5 },
    ],
    activities: [
      { id: 'ba1', name: 'Sagrada Família', price: 145, duration: '2h', type: 'Arquitetura', rating: 4.9, childFriendly: true },
      { id: 'ba2', name: 'Park Güell', price: 85, duration: '2h', type: 'Parque', rating: 4.7, childFriendly: true },
      { id: 'ba3', name: 'Casa Batlló', price: 120, duration: '1h30', type: 'Arquitetura', rating: 4.8, childFriendly: true },
      { id: 'ba4', name: 'Camp Nou Tour', price: 95, duration: '2h', type: 'Esporte', rating: 4.6, childFriendly: true },
      { id: 'ba5', name: 'Flamenco Show', price: 85, duration: '1h30', type: 'Show', rating: 4.5, childFriendly: true },
      { id: 'ba6', name: 'Day Trip Montserrat', price: 180, duration: '6h', type: 'Day Trip', rating: 4.7, childFriendly: true },
    ]
  },
  'Londres, Inglaterra': {
    continent: 'Europa',
    country: 'Reino Unido',
    currency: '£',
    currencyRate: 7.8,
    image: '🎡',
    coverUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200',
    description: 'História milenar, teatros do West End e pubs tradicionais.',
    timezone: 'GMT (UTC+0)',
    language: 'Inglês',
    bestSeason: 'Maio - Setembro',
    avgTemp: '14°C',
    flights: [
      { id: 'lf1', name: 'British Airways - Direto', price: 4500, duration: '11h', class: 'Econômica', rating: 4.5, departure: '22:00', arrival: '12:00+1', stops: 0 },
      { id: 'lf2', name: 'TAP - 1 Conexão', price: 3200, duration: '14h', class: 'Econômica', rating: 4.2, departure: '21:00', arrival: '14:00+1', stops: 1 },
      { id: 'lf3', name: 'Iberia - 1 Conexão', price: 2950, duration: '15h', class: 'Econômica', rating: 4.1, departure: '20:00', arrival: '14:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'lh1', name: 'The Savoy', stars: 5, price: 4500, perNight: true, location: 'Strand', rating: 4.9, amenities: ['Spa', 'Rio Thames', 'Butler'] },
      { id: 'lh2', name: 'The Ned', stars: 5, price: 2800, perNight: true, location: 'City of London', rating: 4.7, amenities: ['Rooftop Pool', '9 Restaurantes'] },
      { id: 'lh3', name: 'Hub by Premier Inn', stars: 3, price: 450, perNight: true, location: 'Westminster', rating: 4.2, amenities: ['Central', 'Compacto'] },
      { id: 'lh4', name: 'Generator London', stars: 2, price: 180, perNight: true, location: 'King\'s Cross', rating: 4.0, amenities: ['Social', 'Bar'] },
    ],
    restaurants: [
      { id: 'lr1', name: 'Sketch', price: 350, type: 'Fine Dining', cuisine: 'Europeia', rating: 4.8 },
      { id: 'lr2', name: 'Dishoom', price: 95, type: 'Casual', cuisine: 'Indiana', rating: 4.7 },
      { id: 'lr3', name: 'Borough Market', price: 50, type: 'Mercado', cuisine: 'Variada', rating: 4.6 },
      { id: 'lr4', name: 'The Ivy', price: 180, type: 'Brasserie', cuisine: 'Britânica', rating: 4.5 },
    ],
    activities: [
      { id: 'la1', name: 'Tower of London', price: 180, duration: '3h', type: 'Histórico', rating: 4.8, childFriendly: true },
      { id: 'la2', name: 'London Eye', price: 150, duration: '1h', type: 'Landmark', rating: 4.6, childFriendly: true },
      { id: 'la3', name: 'British Museum', price: 0, duration: '4h', type: 'Museu', rating: 4.9, childFriendly: true },
      { id: 'la4', name: 'West End Musical', price: 380, duration: '3h', type: 'Teatro', rating: 4.9, childFriendly: true },
      { id: 'la5', name: 'Harry Potter Studios', price: 320, duration: '5h', type: 'Experiência', rating: 4.9, childFriendly: true },
      { id: 'la6', name: 'Stonehenge Day Trip', price: 250, duration: '8h', type: 'Day Trip', rating: 4.5, childFriendly: true },
    ]
  },
  'Amsterdã, Holanda': {
    continent: 'Europa',
    country: 'Holanda',
    currency: '€',
    currencyRate: 6.2,
    image: '🌷',
    coverUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200',
    description: 'Canais pitorescos, museus de Van Gogh e tulipas coloridas.',
    timezone: 'CET (UTC+1)',
    language: 'Holandês',
    bestSeason: 'Abril - Maio',
    avgTemp: '12°C',
    flights: [
      { id: 'af1', name: 'KLM - Direto', price: 4100, duration: '12h', class: 'Econômica', rating: 4.6, departure: '22:30', arrival: '13:30+1', stops: 0 },
      { id: 'af2', name: 'TAP - 1 Conexão', price: 3000, duration: '14h', class: 'Econômica', rating: 4.2, departure: '21:00', arrival: '14:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'ah1', name: 'Waldorf Astoria', stars: 5, price: 3200, perNight: true, location: 'Canais', rating: 4.9, amenities: ['Spa', 'Canal View'] },
      { id: 'ah2', name: 'Hotel V Nesplein', stars: 4, price: 580, perNight: true, location: 'Centro', rating: 4.5, amenities: ['Design', 'Central'] },
      { id: 'ah3', name: 'ClinkNOORD', stars: 2, price: 120, perNight: true, location: 'Noord', rating: 4.1, amenities: ['Social', 'Ferry Grátis'] },
    ],
    restaurants: [
      { id: 'ar1', name: 'Ciel Bleu ★★', price: 450, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.9 },
      { id: 'ar2', name: 'Rijsel', price: 85, type: 'Bistro', cuisine: 'Belga', rating: 4.6 },
      { id: 'ar3', name: 'Foodhallen', price: 45, type: 'Food Hall', cuisine: 'Variada', rating: 4.5 },
    ],
    activities: [
      { id: 'aa1', name: 'Museu Van Gogh', price: 120, duration: '3h', type: 'Museu', rating: 4.9, childFriendly: true },
      { id: 'aa2', name: 'Casa Anne Frank', price: 85, duration: '2h', type: 'Histórico', rating: 4.8, childFriendly: true },
      { id: 'aa3', name: 'Cruzeiro nos Canais', price: 65, duration: '1h30', type: 'Experiência', rating: 4.6, childFriendly: true },
      { id: 'aa4', name: 'Keukenhof (Tulipas)', price: 150, duration: '5h', type: 'Natureza', rating: 4.8, childFriendly: true },
      { id: 'aa5', name: 'Heineken Experience', price: 95, duration: '2h', type: 'Experiência', rating: 4.4, childFriendly: false },
    ]
  },

  // AMÉRICAS
  'Nova York, EUA': {
    continent: 'América do Norte',
    country: 'Estados Unidos',
    currency: '$',
    currencyRate: 6.0,
    image: '🗽',
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    description: 'A cidade que nunca dorme. Broadway, Central Park e arranha-céus icônicos.',
    timezone: 'EST (UTC-5)',
    language: 'Inglês',
    bestSeason: 'Setembro - Novembro',
    avgTemp: '15°C',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 4200, duration: '10h', class: 'Econômica', rating: 4.3, departure: '22:30', arrival: '06:30+1', stops: 0 },
      { id: 'nf2', name: 'Delta - Direto', price: 4580, duration: '10h', class: 'Econômica', rating: 4.5, departure: '23:00', arrival: '07:00+1', stops: 0 },
      { id: 'nf3', name: 'LATAM - 1 Conexão', price: 3150, duration: '14h', class: 'Econômica', rating: 4.2, departure: '19:30', arrival: '09:30+1', stops: 1 },
      { id: 'nf4', name: 'JetBlue - Direto', price: 3680, duration: '10h', class: 'Econômica', rating: 4.4, departure: '21:00', arrival: '05:00+1', stops: 0 },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza', stars: 5, price: 4800, perNight: true, location: 'Central Park', rating: 4.9, amenities: ['Icônico', 'Butler', 'Spa'] },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2650, perNight: true, location: 'Meatpacking', rating: 4.7, amenities: ['Rooftop', 'Design'] },
      { id: 'nh3', name: '1 Hotel Brooklyn Bridge', stars: 5, price: 1950, perNight: true, location: 'Brooklyn', rating: 4.6, amenities: ['Vista Skyline', 'Eco'] },
      { id: 'nh4', name: 'citizenM Times Square', stars: 4, price: 850, perNight: true, location: 'Times Square', rating: 4.5, amenities: ['Tech', 'Rooftop'] },
      { id: 'nh5', name: 'Pod 51', stars: 3, price: 480, perNight: true, location: 'Midtown', rating: 4.2, amenities: ['Compacto', 'Central'] },
      { id: 'nh6', name: 'HI NYC Hostel', stars: 2, price: 175, perNight: true, location: 'Upper West', rating: 4.0, amenities: ['Social', 'Tours'] },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1400, type: 'Fine Dining', cuisine: 'Americana', rating: 4.9 },
      { id: 'nr2', name: 'Katz\'s Deli', price: 105, type: 'Deli', cuisine: 'Tradicional', rating: 4.7 },
      { id: 'nr3', name: 'Joe\'s Pizza', price: 48, type: 'Pizza', cuisine: 'NY Style', rating: 4.6 },
      { id: 'nr4', name: 'Shake Shack', price: 72, type: 'Fast Casual', cuisine: 'Burgers', rating: 4.5 },
      { id: 'nr5', name: 'The Smith', price: 165, type: 'Brunch', cuisine: 'Americana', rating: 4.4 },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 220, duration: '2h', type: 'Landmark', rating: 4.7, childFriendly: true },
      { id: 'na2', name: 'Estátua da Liberdade', price: 175, duration: '4h', type: 'Landmark', rating: 4.8, childFriendly: true },
      { id: 'na3', name: 'Broadway Show', price: 520, duration: '3h', type: 'Teatro', rating: 4.9, childFriendly: true },
      { id: 'na4', name: 'MoMA', price: 145, duration: '3h', type: 'Museu', rating: 4.8, childFriendly: true },
      { id: 'na5', name: 'Central Park Bike', price: 95, duration: '2h', type: 'Natureza', rating: 4.6, childFriendly: true },
      { id: 'na6', name: 'Top of the Rock', price: 198, duration: '1h30', type: 'Landmark', rating: 4.7, childFriendly: true },
      { id: 'na7', name: '9/11 Memorial', price: 115, duration: '2h30', type: 'Memorial', rating: 4.9, childFriendly: true },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: '2h', type: 'Gratuito', rating: 4.5, childFriendly: true },
      { id: 'na9', name: 'NBA Game MSG', price: 380, duration: '3h', type: 'Esporte', rating: 4.7, childFriendly: true },
      { id: 'na10', name: 'Helicopter Tour', price: 450, duration: '20min', type: 'Aventura', rating: 4.8, childFriendly: true },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte',
    country: 'Estados Unidos',
    currency: '$',
    currencyRate: 6.0,
    image: '🌴',
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    description: 'Praias de South Beach, Art Deco, vida noturna latina e sol o ano todo.',
    timezone: 'EST (UTC-5)',
    language: 'Inglês/Espanhol',
    bestSeason: 'Novembro - Abril',
    avgTemp: '26°C',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 3200, duration: '8h', class: 'Econômica', rating: 4.3, departure: '23:00', arrival: '05:00+1', stops: 0 },
      { id: 'mf2', name: 'LATAM - Direto', price: 2800, duration: '8h', class: 'Econômica', rating: 4.4, departure: '22:00', arrival: '04:00+1', stops: 0 },
      { id: 'mf3', name: 'Azul - 1 Conexão', price: 2400, duration: '11h', class: 'Econômica', rating: 4.2, departure: '20:00', arrival: '05:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 3500, perNight: true, location: 'Mid-Beach', rating: 4.9, amenities: ['Praia', 'Spa', 'Shows'] },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2800, perNight: true, location: 'South Beach', rating: 4.8, amenities: ['3 Piscinas', 'Spa'] },
      { id: 'mh3', name: 'Freehand Miami', stars: 3, price: 420, perNight: true, location: 'Miami Beach', rating: 4.4, amenities: ['Piscina', 'Bar', 'Social'] },
      { id: 'mh4', name: 'Generator Miami', stars: 2, price: 180, perNight: true, location: 'South Beach', rating: 4.1, amenities: ['Social', 'Rooftop'] },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 380, type: 'Japanese', cuisine: 'Japonesa', rating: 4.8 },
      { id: 'mr2', name: 'Joe\'s Stone Crab', price: 250, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'mr3', name: 'Versailles', price: 65, type: 'Cubana', cuisine: 'Cubana', rating: 4.6 },
      { id: 'mr4', name: 'KYU', price: 150, type: 'Asian BBQ', cuisine: 'Asiática', rating: 4.7 },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: '4h', type: 'Praia', rating: 4.7, childFriendly: true },
      { id: 'ma2', name: 'Art Deco Walking Tour', price: 65, duration: '2h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'ma3', name: 'Everglades Tour', price: 145, duration: '5h', type: 'Natureza', rating: 4.6, childFriendly: true },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: '2h', type: 'Arte', rating: 4.7, childFriendly: true },
      { id: 'ma5', name: 'Key West Day Trip', price: 280, duration: '12h', type: 'Day Trip', rating: 4.5, childFriendly: true },
      { id: 'ma6', name: 'Jet Ski Tour', price: 180, duration: '2h', type: 'Aventura', rating: 4.6, childFriendly: false },
    ]
  },
  'Cancún, México': {
    continent: 'América do Norte',
    country: 'México',
    currency: 'MXN',
    currencyRate: 0.35,
    image: '🏝️',
    coverUrl: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1200',
    description: 'Praias caribenhas, ruínas maias, cenotes e resorts all-inclusive.',
    timezone: 'CST (UTC-6)',
    language: 'Espanhol',
    bestSeason: 'Dezembro - Abril',
    avgTemp: '28°C',
    flights: [
      { id: 'cf1', name: 'Aeroméxico - Direto', price: 2800, duration: '7h', class: 'Econômica', rating: 4.3, departure: '06:00', arrival: '11:00', stops: 0 },
      { id: 'cf2', name: 'LATAM - 1 Conexão', price: 2400, duration: '10h', class: 'Econômica', rating: 4.2, departure: '08:00', arrival: '16:00', stops: 1 },
      { id: 'cf3', name: 'Copa - 1 Conexão', price: 2200, duration: '9h', class: 'Econômica', rating: 4.1, departure: '07:00', arrival: '14:00', stops: 1 },
    ],
    hotels: [
      { id: 'ch1', name: 'Le Blanc Spa Resort', stars: 5, price: 2800, perNight: true, location: 'Zona Hoteleira', rating: 4.9, amenities: ['All-Inclusive', 'Spa', 'Adults Only'] },
      { id: 'ch2', name: 'Hyatt Ziva Cancun', stars: 5, price: 1800, perNight: true, location: 'Punta Cancun', rating: 4.7, amenities: ['All-Inclusive', 'Kids Club'] },
      { id: 'ch3', name: 'Fiesta Americana', stars: 4, price: 850, perNight: true, location: 'Zona Hoteleira', rating: 4.4, amenities: ['Praia', 'Piscina'] },
      { id: 'ch4', name: 'Selina Cancun', stars: 3, price: 280, perNight: true, location: 'Centro', rating: 4.2, amenities: ['Social', 'Coworking'] },
    ],
    restaurants: [
      { id: 'cr1', name: 'Lorenzillo\'s', price: 280, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'cr2', name: 'Puerto Madero', price: 220, type: 'Steakhouse', cuisine: 'Carnes', rating: 4.6 },
      { id: 'cr3', name: 'La Habichuela', price: 180, type: 'Mexicana', cuisine: 'Yucateca', rating: 4.7 },
      { id: 'cr4', name: 'Tacos Rigo', price: 35, type: 'Street Food', cuisine: 'Tacos', rating: 4.5 },
    ],
    activities: [
      { id: 'ca1', name: 'Chichén Itzá', price: 320, duration: '10h', type: 'Histórico', rating: 4.9, childFriendly: true },
      { id: 'ca2', name: 'Xcaret Park', price: 450, duration: '10h', type: 'Parque', rating: 4.8, childFriendly: true },
      { id: 'ca3', name: 'Isla Mujeres', price: 180, duration: '6h', type: 'Praia', rating: 4.7, childFriendly: true },
      { id: 'ca4', name: 'Cenote Ik Kil', price: 95, duration: '4h', type: 'Natureza', rating: 4.8, childFriendly: true },
      { id: 'ca5', name: 'Snorkel em Cozumel', price: 220, duration: '6h', type: 'Aventura', rating: 4.7, childFriendly: true },
      { id: 'ca6', name: 'Ruínas de Tulum', price: 180, duration: '6h', type: 'Histórico', rating: 4.6, childFriendly: true },
    ]
  },
  'Buenos Aires, Argentina': {
    continent: 'América do Sul',
    country: 'Argentina',
    currency: 'ARS',
    currencyRate: 0.007,
    image: '💃',
    coverUrl: 'https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=1200',
    description: 'Tango, churrasco, arquitetura europeia e vida cultural intensa.',
    timezone: 'ART (UTC-3)',
    language: 'Espanhol',
    bestSeason: 'Março - Maio',
    avgTemp: '18°C',
    flights: [
      { id: 'baf1', name: 'Aerolíneas Argentinas - Direto', price: 1800, duration: '3h', class: 'Econômica', rating: 4.2, departure: '08:00', arrival: '11:00', stops: 0 },
      { id: 'baf2', name: 'LATAM - Direto', price: 1650, duration: '3h', class: 'Econômica', rating: 4.3, departure: '07:00', arrival: '10:00', stops: 0 },
      { id: 'baf3', name: 'GOL - Direto', price: 1400, duration: '3h', class: 'Econômica', rating: 4.0, departure: '09:00', arrival: '12:00', stops: 0 },
    ],
    hotels: [
      { id: 'bah1', name: 'Alvear Palace', stars: 5, price: 1800, perNight: true, location: 'Recoleta', rating: 4.9, amenities: ['Spa', 'Rooftop', 'Butler'] },
      { id: 'bah2', name: 'Palacio Duhau', stars: 5, price: 1500, perNight: true, location: 'Recoleta', rating: 4.8, amenities: ['Jardins', 'Spa'] },
      { id: 'bah3', name: 'Mine Hotel', stars: 4, price: 450, perNight: true, location: 'Palermo', rating: 4.5, amenities: ['Design', 'Piscina'] },
      { id: 'bah4', name: 'Milhouse Hostel', stars: 2, price: 80, perNight: true, location: 'San Telmo', rating: 4.2, amenities: ['Social', 'Tango'] },
    ],
    restaurants: [
      { id: 'bar1', name: 'Don Julio', price: 250, type: 'Parrilla', cuisine: 'Argentina', rating: 4.9 },
      { id: 'bar2', name: 'Café Tortoni', price: 65, type: 'Café', cuisine: 'Tradicional', rating: 4.5 },
      { id: 'bar3', name: 'El Cuartito', price: 45, type: 'Pizza', cuisine: 'Argentina', rating: 4.6 },
      { id: 'bar4', name: 'La Cabrera', price: 180, type: 'Parrilla', cuisine: 'Carnes', rating: 4.7 },
    ],
    activities: [
      { id: 'baa1', name: 'Show de Tango', price: 180, duration: '3h', type: 'Show', rating: 4.8, childFriendly: true },
      { id: 'baa2', name: 'La Boca + Caminito', price: 45, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'baa3', name: 'Teatro Colón', price: 85, duration: '2h', type: 'Cultura', rating: 4.9, childFriendly: true },
      { id: 'baa4', name: 'Cemitério Recoleta', price: 0, duration: '2h', type: 'Histórico', rating: 4.6, childFriendly: true },
      { id: 'baa5', name: 'Palermo Soho Tour', price: 55, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'baa6', name: 'Day Trip Tigre', price: 120, duration: '6h', type: 'Day Trip', rating: 4.4, childFriendly: true },
    ]
  },

  // ÁSIA
  'Tóquio, Japão': {
    continent: 'Ásia',
    country: 'Japão',
    currency: '¥',
    currencyRate: 0.04,
    image: '🗾',
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    description: 'Tradição milenar encontra tecnologia futurista. Templos, anime e gastronomia única.',
    timezone: 'JST (UTC+9)',
    language: 'Japonês',
    bestSeason: 'Março - Maio',
    avgTemp: '16°C',
    flights: [
      { id: 'tf1', name: 'ANA - 1 Conexão', price: 7200, duration: '24h', class: 'Econômica', rating: 4.8, departure: '23:55', arrival: '05:55+2', stops: 1 },
      { id: 'tf2', name: 'JAL - 1 Conexão', price: 6450, duration: '26h', class: 'Econômica', rating: 4.7, departure: '22:00', arrival: '08:00+2', stops: 1 },
      { id: 'tf3', name: 'Emirates - 1 Conexão', price: 5680, duration: '28h', class: 'Econômica', rating: 4.6, departure: '01:30', arrival: '11:30+2', stops: 1 },
      { id: 'tf4', name: 'Qatar - 1 Conexão', price: 5250, duration: '30h', class: 'Econômica', rating: 4.5, departure: '02:00', arrival: '14:00+2', stops: 1 },
    ],
    hotels: [
      { id: 'th1', name: 'Aman Tokyo', stars: 5, price: 6200, perNight: true, location: 'Otemachi', rating: 4.9, amenities: ['Spa', 'Vista Imperial', 'Zen'] },
      { id: 'th2', name: 'Park Hyatt Tokyo', stars: 5, price: 3800, perNight: true, location: 'Shinjuku', rating: 4.8, amenities: ['Piscina', 'New York Bar'] },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 720, perNight: true, location: 'Shinjuku', rating: 4.4, amenities: ['Design', 'Rooftop'] },
      { id: 'th4', name: 'Tokyu Stay Shibuya', stars: 3, price: 420, perNight: true, location: 'Shibuya', rating: 4.3, amenities: ['Lavanderia', 'Wi-Fi'] },
      { id: 'th5', name: 'Khaosan Tokyo', stars: 2, price: 145, perNight: true, location: 'Asakusa', rating: 4.1, amenities: ['Social', 'Tradicional'] },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 2100, type: 'Sushi', cuisine: 'Omakase', rating: 4.9 },
      { id: 'tr2', name: 'Ichiran Ramen', price: 72, type: 'Ramen', cuisine: 'Tonkotsu', rating: 4.7 },
      { id: 'tr3', name: 'Gonpachi', price: 195, type: 'Izakaya', cuisine: 'Japonesa', rating: 4.6 },
      { id: 'tr4', name: 'Tsukiji Market', price: 135, type: 'Mercado', cuisine: 'Frutos do Mar', rating: 4.8 },
      { id: 'tr5', name: 'Afuri Ramen', price: 78, type: 'Ramen', cuisine: 'Yuzu Shio', rating: 4.6 },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 135, duration: '2h', type: 'Landmark', rating: 4.7, childFriendly: true },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: '2h', type: 'Templo', rating: 4.8, childFriendly: true },
      { id: 'ta3', name: 'teamLab Planets', price: 198, duration: '2h30', type: 'Arte Digital', rating: 4.9, childFriendly: true },
      { id: 'ta4', name: 'Monte Fuji Day Trip', price: 420, duration: '11h', type: 'Day Trip', rating: 4.8, childFriendly: true },
      { id: 'ta5', name: 'Shibuya + Harajuku', price: 65, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true },
      { id: 'ta6', name: 'Cerimônia do Chá', price: 115, duration: '1h30', type: 'Experiência', rating: 4.7, childFriendly: true },
      { id: 'ta7', name: 'Akihabara Anime Tour', price: 85, duration: '3h', type: 'Tour', rating: 4.6, childFriendly: true },
      { id: 'ta8', name: 'DisneySea Tokyo', price: 380, duration: '10h', type: 'Parque', rating: 4.9, childFriendly: true },
      { id: 'ta9', name: 'Robot Restaurant', price: 285, duration: '2h', type: 'Show', rating: 4.4, childFriendly: true },
      { id: 'ta10', name: 'Sumo Tournament', price: 250, duration: '4h', type: 'Esporte', rating: 4.7, childFriendly: true },
    ]
  },
  'Bangkok, Tailândia': {
    continent: 'Ásia',
    country: 'Tailândia',
    currency: 'THB',
    currencyRate: 0.17,
    image: '🛕',
    coverUrl: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=1200',
    description: 'Templos dourados, street food incrível, mercados flutuantes e massagens thai.',
    timezone: 'ICT (UTC+7)',
    language: 'Tailandês',
    bestSeason: 'Novembro - Fevereiro',
    avgTemp: '30°C',
    flights: [
      { id: 'bkf1', name: 'Thai Airways - 1 Conexão', price: 5200, duration: '22h', class: 'Econômica', rating: 4.5, departure: '23:00', arrival: '04:00+2', stops: 1 },
      { id: 'bkf2', name: 'Emirates - 1 Conexão', price: 4800, duration: '24h', class: 'Econômica', rating: 4.6, departure: '01:00', arrival: '08:00+2', stops: 1 },
      { id: 'bkf3', name: 'Qatar - 1 Conexão', price: 4500, duration: '26h', class: 'Econômica', rating: 4.5, departure: '02:00', arrival: '11:00+2', stops: 1 },
    ],
    hotels: [
      { id: 'bkh1', name: 'Mandarin Oriental', stars: 5, price: 2800, perNight: true, location: 'Riverside', rating: 4.9, amenities: ['Spa Lendário', 'Rio', 'Butler'] },
      { id: 'bkh2', name: 'The Siam', stars: 5, price: 2200, perNight: true, location: 'Dusit', rating: 4.8, amenities: ['Piscina', 'Arte', 'Muay Thai'] },
      { id: 'bkh3', name: 'Hotel Indigo', stars: 4, price: 520, perNight: true, location: 'Wireless Road', rating: 4.5, amenities: ['Rooftop', 'Design'] },
      { id: 'bkh4', name: 'Lub d Silom', stars: 2, price: 85, perNight: true, location: 'Silom', rating: 4.2, amenities: ['Social', 'Central'] },
    ],
    restaurants: [
      { id: 'bkr1', name: 'Gaggan Anand', price: 850, type: 'Fine Dining', cuisine: 'Indiana Progressiva', rating: 4.9 },
      { id: 'bkr2', name: 'Jay Fai', price: 180, type: 'Street Food', cuisine: 'Tailandesa', rating: 4.8 },
      { id: 'bkr3', name: 'Pad Thai Thip Samai', price: 25, type: 'Street Food', cuisine: 'Pad Thai', rating: 4.7 },
      { id: 'bkr4', name: 'Sirocco', price: 350, type: 'Rooftop', cuisine: 'Mediterrânea', rating: 4.6 },
    ],
    activities: [
      { id: 'bka1', name: 'Grand Palace', price: 85, duration: '3h', type: 'Templo', rating: 4.9, childFriendly: true },
      { id: 'bka2', name: 'Wat Pho', price: 45, duration: '2h', type: 'Templo', rating: 4.8, childFriendly: true },
      { id: 'bka3', name: 'Mercado Flutuante', price: 120, duration: '5h', type: 'Experiência', rating: 4.6, childFriendly: true },
      { id: 'bka4', name: 'Ayutthaya Day Trip', price: 180, duration: '8h', type: 'Day Trip', rating: 4.7, childFriendly: true },
      { id: 'bka5', name: 'Thai Cooking Class', price: 95, duration: '4h', type: 'Experiência', rating: 4.8, childFriendly: true },
      { id: 'bka6', name: 'Massagem Thai', price: 45, duration: '2h', type: 'Relaxamento', rating: 4.7, childFriendly: false },
    ]
  },
  'Dubai, Emirados Árabes': {
    continent: 'Ásia',
    country: 'Emirados Árabes',
    currency: 'AED',
    currencyRate: 1.65,
    image: '🏙️',
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    description: 'Luxo extremo, arranha-céus futuristas, deserto e compras de outro mundo.',
    timezone: 'GST (UTC+4)',
    language: 'Árabe/Inglês',
    bestSeason: 'Novembro - Março',
    avgTemp: '28°C',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 5800, duration: '14h', class: 'Econômica', rating: 4.8, departure: '03:00', arrival: '22:00', stops: 0 },
      { id: 'df2', name: 'Etihad - 1 Conexão', price: 4500, duration: '17h', class: 'Econômica', rating: 4.6, departure: '02:00', arrival: '22:00', stops: 1 },
      { id: 'df3', name: 'Qatar - 1 Conexão', price: 4200, duration: '18h', class: 'Econômica', rating: 4.5, departure: '01:00', arrival: '22:00', stops: 1 },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 8500, perNight: true, location: 'Jumeirah', rating: 4.9, amenities: ['Icônico', 'Butler', 'Helipad'] },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 3200, perNight: true, location: 'Palm Jumeirah', rating: 4.7, amenities: ['Aquaventure', 'Aquário'] },
      { id: 'dh3', name: 'Rove Downtown', stars: 4, price: 650, perNight: true, location: 'Downtown', rating: 4.4, amenities: ['Burj Khalifa View', 'Moderno'] },
      { id: 'dh4', name: 'Zabeel House', stars: 3, price: 380, perNight: true, location: 'Al Seef', rating: 4.3, amenities: ['Design', 'Dubai Creek'] },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 650, type: 'Fine Dining', cuisine: 'Internacional', rating: 4.8 },
      { id: 'dr2', name: 'Pierchic', price: 450, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'dr3', name: 'Ravi Restaurant', price: 35, type: 'Casual', cuisine: 'Paquistanesa', rating: 4.6 },
      { id: 'dr4', name: 'Arabian Tea House', price: 85, type: 'Café', cuisine: 'Árabe', rating: 4.5 },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa - At The Top', price: 280, duration: '2h', type: 'Landmark', rating: 4.9, childFriendly: true },
      { id: 'da2', name: 'Desert Safari', price: 220, duration: '6h', type: 'Aventura', rating: 4.7, childFriendly: true },
      { id: 'da3', name: 'Dubai Mall + Fountain', price: 0, duration: '4h', type: 'Compras', rating: 4.6, childFriendly: true },
      { id: 'da4', name: 'Aquaventure Park', price: 350, duration: '6h', type: 'Parque', rating: 4.8, childFriendly: true },
      { id: 'da5', name: 'Dubai Frame', price: 120, duration: '2h', type: 'Landmark', rating: 4.5, childFriendly: true },
      { id: 'da6', name: 'Abu Dhabi Day Trip', price: 280, duration: '10h', type: 'Day Trip', rating: 4.6, childFriendly: true },
    ]
  },

  // OCEANIA
  'Sydney, Austrália': {
    continent: 'Oceania',
    country: 'Austrália',
    currency: 'AUD',
    currencyRate: 4.0,
    image: '🦘',
    coverUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200',
    description: 'Opera House icônica, praias de surf, koalas e uma cena gastronômica vibrante.',
    timezone: 'AEST (UTC+10)',
    language: 'Inglês',
    bestSeason: 'Setembro - Novembro',
    avgTemp: '18°C',
    flights: [
      { id: 'sf1', name: 'Qantas - 1 Conexão', price: 8500, duration: '26h', class: 'Econômica', rating: 4.6, departure: '22:00', arrival: '06:00+2', stops: 1 },
      { id: 'sf2', name: 'Emirates - 1 Conexão', price: 7200, duration: '28h', class: 'Econômica', rating: 4.5, departure: '01:00', arrival: '10:00+2', stops: 1 },
      { id: 'sf3', name: 'LATAM - 1 Conexão', price: 6800, duration: '22h', class: 'Econômica', rating: 4.3, departure: '19:00', arrival: '20:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'sh1', name: 'Park Hyatt Sydney', stars: 5, price: 4200, perNight: true, location: 'The Rocks', rating: 4.9, amenities: ['Opera View', 'Spa', 'Rooftop'] },
      { id: 'sh2', name: 'QT Sydney', stars: 5, price: 1800, perNight: true, location: 'CBD', rating: 4.6, amenities: ['Design', 'Rooftop Bar'] },
      { id: 'sh3', name: 'Ovolo Woolloomooloo', stars: 4, price: 850, perNight: true, location: 'Woolloomooloo', rating: 4.5, amenities: ['Harbour View', 'Mini Bar Free'] },
      { id: 'sh4', name: 'Wake Up! Sydney', stars: 2, price: 120, perNight: true, location: 'CBD', rating: 4.1, amenities: ['Social', 'Rooftop'] },
    ],
    restaurants: [
      { id: 'sr1', name: 'Quay', price: 580, type: 'Fine Dining', cuisine: 'Australiana', rating: 4.9 },
      { id: 'sr2', name: 'Bennelong', price: 380, type: 'Fine Dining', cuisine: 'Australiana', rating: 4.8 },
      { id: 'sr3', name: 'Bourke Street Bakery', price: 45, type: 'Café', cuisine: 'Brunch', rating: 4.6 },
      { id: 'sr4', name: 'The Grounds', price: 85, type: 'Café', cuisine: 'Brunch', rating: 4.7 },
    ],
    activities: [
      { id: 'sa1', name: 'Sydney Opera House Tour', price: 180, duration: '2h', type: 'Landmark', rating: 4.9, childFriendly: true },
      { id: 'sa2', name: 'Harbour Bridge Climb', price: 380, duration: '3h', type: 'Aventura', rating: 4.8, childFriendly: false },
      { id: 'sa3', name: 'Bondi Beach', price: 0, duration: '4h', type: 'Praia', rating: 4.7, childFriendly: true },
      { id: 'sa4', name: 'Taronga Zoo', price: 145, duration: '5h', type: 'Zoo', rating: 4.6, childFriendly: true },
      { id: 'sa5', name: 'Blue Mountains', price: 220, duration: '9h', type: 'Day Trip', rating: 4.7, childFriendly: true },
      { id: 'sa6', name: 'Manly Beach Ferry', price: 35, duration: '4h', type: 'Experiência', rating: 4.5, childFriendly: true },
    ]
  },

  // ÁFRICA
  'Cape Town, África do Sul': {
    continent: 'África',
    country: 'África do Sul',
    currency: 'ZAR',
    currencyRate: 0.32,
    image: '🦁',
    coverUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
    description: 'Table Mountain, vinícolas, praias e safáris próximos.',
    timezone: 'SAST (UTC+2)',
    language: 'Inglês/Afrikaans',
    bestSeason: 'Novembro - Março',
    avgTemp: '22°C',
    flights: [
      { id: 'ctf1', name: 'South African - 1 Conexão', price: 5800, duration: '16h', class: 'Econômica', rating: 4.3, departure: '22:00', arrival: '17:00+1', stops: 1 },
      { id: 'ctf2', name: 'Emirates - 1 Conexão', price: 5200, duration: '20h', class: 'Econômica', rating: 4.5, departure: '01:00', arrival: '00:00+2', stops: 1 },
      { id: 'ctf3', name: 'LATAM - 1 Conexão', price: 4800, duration: '14h', class: 'Econômica', rating: 4.2, departure: '20:00', arrival: '13:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'cth1', name: 'One&Only Cape Town', stars: 5, price: 3500, perNight: true, location: 'V&A Waterfront', rating: 4.9, amenities: ['Spa', 'Vista Table Mountain'] },
      { id: 'cth2', name: 'Ellerman House', stars: 5, price: 4200, perNight: true, location: 'Bantry Bay', rating: 4.9, amenities: ['Arte', 'Vista Mar', 'Wine Cellar'] },
      { id: 'cth3', name: 'The Silo Hotel', stars: 5, price: 2800, perNight: true, location: 'V&A Waterfront', rating: 4.8, amenities: ['Rooftop Pool', 'Design'] },
      { id: 'cth4', name: 'POD Camps Bay', stars: 4, price: 650, perNight: true, location: 'Camps Bay', rating: 4.5, amenities: ['Praia', 'Moderno'] },
    ],
    restaurants: [
      { id: 'ctr1', name: 'The Test Kitchen', price: 450, type: 'Fine Dining', cuisine: 'Sul-Africana', rating: 4.9 },
      { id: 'ctr2', name: 'La Colombe', price: 380, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.8 },
      { id: 'ctr3', name: 'Kloof Street House', price: 150, type: 'Bistro', cuisine: 'Fusion', rating: 4.6 },
      { id: 'ctr4', name: 'Old Biscuit Mill', price: 65, type: 'Food Market', cuisine: 'Variada', rating: 4.7 },
    ],
    activities: [
      { id: 'cta1', name: 'Table Mountain Cable Car', price: 180, duration: '3h', type: 'Natureza', rating: 4.9, childFriendly: true },
      { id: 'cta2', name: 'Cape Point', price: 220, duration: '8h', type: 'Day Trip', rating: 4.8, childFriendly: true },
      { id: 'cta3', name: 'Wine Tasting Stellenbosch', price: 280, duration: '6h', type: 'Gastronomia', rating: 4.8, childFriendly: false },
      { id: 'cta4', name: 'Robben Island', price: 150, duration: '4h', type: 'Histórico', rating: 4.7, childFriendly: true },
      { id: 'cta5', name: 'Shark Cage Diving', price: 350, duration: '8h', type: 'Aventura', rating: 4.6, childFriendly: false },
      { id: 'cta6', name: 'Safari Aquila', price: 420, duration: '10h', type: 'Safari', rating: 4.7, childFriendly: true },
    ]
  },
};

// Community itineraries mock data
const COMMUNITY_ITINERARIES = [
  {
    id: 'ci1',
    title: 'Paris Romântica - Lua de Mel Perfeita',
    destination: 'Paris, França',
    author: { name: 'Marina Silva', avatar: '👩', verified: true },
    duration: 7,
    budget: 35000,
    travelers: 2,
    likes: 2847,
    saves: 1203,
    rating: 4.9,
    reviews: 234,
    tags: ['Romântico', 'Lua de Mel', 'Gastronomia'],
    highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro Privado no Sena', 'Jantar no Le Jules Verne'],
    createdAt: '2025-12-15',
    featured: true
  },
  {
    id: 'ci2',
    title: 'Tóquio com Crianças - Aventura em Família',
    destination: 'Tóquio, Japão',
    author: { name: 'Pedro Santos', avatar: '👨', verified: true },
    duration: 10,
    budget: 55000,
    travelers: 4,
    likes: 1956,
    saves: 892,
    rating: 4.8,
    reviews: 167,
    tags: ['Família', 'Crianças', 'Aventura'],
    highlights: ['DisneySea Tokyo', 'teamLab Planets', 'Aula de Sushi'],
    createdAt: '2025-11-20',
    featured: true
  },
  {
    id: 'ci3',
    title: 'NYC em 5 Dias - Primeiro Impacto',
    destination: 'Nova York, EUA',
    author: { name: 'Juliana Costa', avatar: '👩', verified: false },
    duration: 5,
    budget: 22000,
    travelers: 2,
    likes: 3421,
    saves: 1567,
    rating: 4.7,
    reviews: 312,
    tags: ['Primeiro Visita', 'Clássico', 'Compras'],
    highlights: ['Top of the Rock', 'Broadway - Hamilton', 'Central Park Bike'],
    createdAt: '2025-10-05',
    featured: true
  },
  {
    id: 'ci4',
    title: 'Barcelona Gastronômica',
    destination: 'Barcelona, Espanha',
    author: { name: 'Ricardo Oliveira', avatar: '👨', verified: true },
    duration: 6,
    budget: 28000,
    travelers: 2,
    likes: 1234,
    saves: 567,
    rating: 4.8,
    reviews: 98,
    tags: ['Gastronomia', 'Tapas', 'Vinhos'],
    highlights: ['Tickets by Adrià', 'La Boqueria Tour', 'Aula de Paella'],
    createdAt: '2025-09-18',
    featured: false
  },
  {
    id: 'ci5',
    title: 'Safari e Praias - Cape Town Completo',
    destination: 'Cape Town, África do Sul',
    author: { name: 'Ana Beatriz', avatar: '👩', verified: true },
    duration: 12,
    budget: 48000,
    travelers: 2,
    likes: 987,
    saves: 432,
    rating: 4.9,
    reviews: 76,
    tags: ['Aventura', 'Safari', 'Vinhos'],
    highlights: ['Safari Big 5', 'Table Mountain', 'Rota dos Vinhos'],
    createdAt: '2025-08-22',
    featured: false
  },
  {
    id: 'ci6',
    title: 'Roma Histórica - 7 Dias de Império',
    destination: 'Roma, Itália',
    author: { name: 'Carlos Mendes', avatar: '👨', verified: false },
    duration: 7,
    budget: 32000,
    travelers: 3,
    likes: 1567,
    saves: 723,
    rating: 4.6,
    reviews: 145,
    tags: ['História', 'Arte', 'Cultura'],
    highlights: ['Vaticano VIP', 'Coliseu Subterrâneo', 'Aula de Pasta'],
    createdAt: '2025-07-30',
    featured: false
  },
];

// Traveler profile types
const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain, description: 'Trilhas, esportes radicais e natureza' },
  { id: 'culture', name: 'Cultural', icon: Building, description: 'Museus, história e arquitetura' },
  { id: 'relax', name: 'Relaxamento', icon: Palmtree, description: 'Praias, spas e tranquilidade' },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils, description: 'Culinária local e experiências' },
  { id: 'family', name: 'Família', icon: Users, description: 'Atividades para todas as idades' },
  { id: 'budget', name: 'Econômico', icon: Wallet, description: 'Máximo valor, menor custo' },
];

// Interest tags
const INTEREST_TAGS = [
  'Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia',
  'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia',
  'Arquitetura', 'Esportes', 'Música', 'Festivais', 'Vinhos', 'Religioso'
];

// ============================================
// COMPONENTS
// ============================================

// Auth Modal
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ name: formData.name || 'Viajante', email: formData.email, avatar: '👤' });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center">
          <Globe size={48} className="mx-auto mb-3" />
          <h2 className="text-2xl font-bold">SmartTravel AI</h2>
          <p className="opacity-80 text-sm">{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta grátis'}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-1">Nome completo</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Seu nome"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">E-mail</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seu@email.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Senha</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all">
            {mode === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>

          <div className="text-center text-sm text-slate-500">
            {mode === 'login' ? (
              <p>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-blue-600 font-medium hover:underline">Cadastre-se</button></p>
            ) : (
              <p>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-blue-600 font-medium hover:underline">Entrar</button></p>
            )}
          </div>
        </form>

        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white">
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// Profile Setup Modal
const ProfileSetupModal = ({ isOpen, onClose, onSave, user }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    type: '',
    interests: [],
    preferredBudget: 'medium',
    travelFrequency: 'occasional'
  });

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 bg-gradient-to-r from-violet-600 to-purple-700 text-white">
          <h2 className="text-2xl font-bold">Configure seu Perfil de Viajante</h2>
          <p className="opacity-80">Isso nos ajuda a personalizar suas recomendações</p>
          <div className="flex gap-2 mt-4">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-2 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Qual é o seu estilo de viagem?</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {TRAVELER_TYPES.map(type => (
                  <button
                    key={type.id}
                    onClick={() => setProfile({...profile, type: type.id})}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      profile.type === type.id
                        ? 'border-violet-500 bg-violet-50'
                        : 'border-slate-200 hover:border-violet-300'
                    }`}
                  >
                    <type.icon size={24} className={profile.type === type.id ? 'text-violet-600' : 'text-slate-400'} />
                    <h4 className="font-semibold text-slate-800 mt-2">{type.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Quais são seus interesses?</h3>
              <p className="text-sm text-slate-500 mb-4">Selecione pelo menos 3</p>
              <div className="flex flex-wrap gap-2">
                {INTEREST_TAGS.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (profile.interests.includes(tag)) {
                        setProfile({...profile, interests: profile.interests.filter(i => i !== tag)});
                      } else {
                        setProfile({...profile, interests: [...profile.interests, tag]});
                      }
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      profile.interests.includes(tag)
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Preferências de viagem</h3>
              
              <div className="mb-6">
                <label className="text-sm font-medium text-slate-600 block mb-2">Orçamento preferido</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'budget', label: 'Econômico', desc: 'Até R$ 15k' },
                    { id: 'medium', label: 'Médio', desc: 'R$ 15k - 40k' },
                    { id: 'luxury', label: 'Luxo', desc: 'Acima de R$ 40k' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setProfile({...profile, preferredBudget: opt.id})}
                      className={`p-4 rounded-xl border-2 text-center transition-all ${
                        profile.preferredBudget === opt.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <h4 className="font-semibold text-slate-800">{opt.label}</h4>
                      <p className="text-xs text-slate-500">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-600 block mb-2">Com que frequência você viaja?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'rare', label: '1x/ano' },
                    { id: 'occasional', label: '2-3x/ano' },
                    { id: 'frequent', label: '4+/ano' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setProfile({...profile, travelFrequency: opt.id})}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        profile.travelFrequency === opt.id
                          ? 'border-violet-500 bg-violet-50'
                          : 'border-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <h4 className="font-medium text-slate-800">{opt.label}</h4>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-between">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">
              Voltar
            </button>
          ) : (
            <button onClick={onClose} className="px-6 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg">
              Pular
            </button>
          )}
          
          {step < 3 ? (
            <button 
              onClick={() => setStep(step + 1)}
              disabled={step === 1 && !profile.type}
              className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700 disabled:opacity-50"
            >
              Continuar
            </button>
          ) : (
            <button onClick={handleSave} className="px-6 py-2 bg-violet-600 text-white font-medium rounded-lg hover:bg-violet-700">
              Salvar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Children Ages Input
const ChildrenAgesInput = ({ count, ages, onChange }) => {
  if (count === 0) return null;

  return (
    <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
      <p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1">
        <Baby size={14} />
        Idade das crianças (0-2 anos: gratuito)
      </p>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="flex items-center gap-1">
            <span className="text-xs text-slate-500">Cr {i + 1}:</span>
            <select
              value={ages[i] || 0}
              onChange={(e) => {
                const newAges = [...ages];
                newAges[i] = parseInt(e.target.value);
                onChange(newAges);
              }}
              className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              {Array.from({ length: 18 }, (_, age) => (
                <option key={age} value={age}>
                  {age} {age <= 2 && '(grátis)'}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

// Community Itinerary Card
const CommunityItineraryCard = ({ itinerary, onView, onLike, onSave }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-40 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
          style={{ backgroundImage: `url(${destData?.coverUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {itinerary.featured && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
            <Crown size={12} /> DESTAQUE
          </div>
        )}
        
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg leading-tight">{itinerary.title}</h3>
          <p className="text-white/80 text-sm flex items-center gap-1 mt-1">
            <MapPin size={12} /> {itinerary.destination}
          </p>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{itinerary.author.avatar}</span>
          <div>
            <p className="text-sm font-medium text-slate-800 flex items-center gap-1">
              {itinerary.author.name}
              {itinerary.author.verified && <UserCheck size={14} className="text-blue-500" />}
            </p>
            <p className="text-xs text-slate-400">{itinerary.duration} dias • {itinerary.travelers} viajantes</p>
          </div>
          <div className="ml-auto text-right">
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={14} className="fill-amber-500" />
              <span className="font-bold text-sm">{itinerary.rating}</span>
            </div>
            <p className="text-xs text-slate-400">{itinerary.reviews} reviews</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {itinerary.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{tag}</span>
          ))}
        </div>

        <div className="text-sm text-slate-600 mb-3">
          <p className="font-medium text-slate-700 mb-1">Destaques:</p>
          <ul className="space-y-1">
            {itinerary.highlights.slice(0, 2).map((h, i) => (
              <li key={i} className="flex items-center gap-1 text-xs">
                <Check size={12} className="text-emerald-500" /> {h}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button onClick={() => onLike(itinerary.id)} className="flex items-center gap-1 text-slate-500 hover:text-red-500 transition-colors">
              <Heart size={16} /> <span className="text-xs">{itinerary.likes}</span>
            </button>
            <button onClick={() => onSave(itinerary.id)} className="flex items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors">
              <Bookmark size={16} /> <span className="text-xs">{itinerary.saves}</span>
            </button>
          </div>
          <button 
            onClick={() => onView(itinerary)}
            className="px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Ver Roteiro
          </button>
        </div>
      </div>
    </div>
  );
};

// Destination Card
const DestinationCard = ({ name, data, onSelect, isSelected }) => (
  <button
    onClick={() => onSelect(name)}
    className={`relative overflow-hidden rounded-xl h-32 group transition-all ${
      isSelected ? 'ring-4 ring-blue-500 ring-offset-2' : ''
    }`}
  >
    <div 
      className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
      style={{ backgroundImage: `url(${data.coverUrl})` }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-3">
      <div className="flex items-center gap-2">
        <span className="text-2xl">{data.image}</span>
        <div className="text-left">
          <h4 className="text-white font-bold text-sm">{name.split(',')[0]}</h4>
          <p className="text-white/70 text-xs">{data.country}</p>
        </div>
      </div>
    </div>
    {isSelected && (
      <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
        <Check size={14} className="text-white" />
      </div>
    )}
  </button>
);

// Progress Bar
const ProgressBar = ({ label, current, max, color, icon: Icon }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isOver = current > max;
  const colors = {
    blue: '#1e40af',
    emerald: '#059669',
    amber: '#d97706',
    violet: '#7c3aed'
  };

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <Icon size={14} className={`text-${color}-600`} />
          <span className="text-xs font-medium text-slate-600">{label}</span>
        </div>
        <span className={`text-xs font-bold ${isOver ? 'text-red-500' : 'text-slate-600'}`}>
          R$ {current.toLocaleString('pt-BR')}
        </span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${percentage}%`, backgroundColor: isOver ? '#ef4444' : colors[color] }}
        />
      </div>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================

export default function App() {
  // Auth & User State
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Navigation State
  const [currentView, setCurrentView] = useState('landing'); // landing, explore, plan, community, profile

  // Planning State
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-15');
  const [endDate, setEndDate] = useState('2026-04-22');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(35000);

  // Itinerary State
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // UI State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [showSwapModal, setShowSwapModal] = useState({ open: false, category: null, item: null });

  // Community State
  const [communityItineraries, setCommunityItineraries] = useState(COMMUNITY_ITINERARIES);

  // Get current destination data
  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;

  // Calculate trip days
  const tripDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }, [startDate, endDate]);

  // Calculate paying children (over 2 years)
  const payingChildren = useMemo(() => {
    return childrenAges.filter(age => age > 2).length;
  }, [childrenAges]);

  const freeChildren = children - payingChildren;
  const totalPayingTravelers = adults + payingChildren;

  // Calculate costs
  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, food: 0, activities: 0, total: 0 };
    
    const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    const foodCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0) * tripDays * (adults + payingChildren * 0.7);
    const activitiesCost = selectedActivities.reduce((sum, a) => sum + a.price, 0) * (adults + payingChildren * 0.5);
    
    return {
      flights: flightCost,
      hotels: hotelCost,
      food: Math.round(foodCost),
      activities: Math.round(activitiesCost),
      total: flightCost + hotelCost + Math.round(foodCost) + Math.round(activitiesCost)
    };
  }, [selectedFlight, selectedHotel, selectedRestaurants, selectedActivities, tripDays, totalPayingTravelers, adults, payingChildren, itineraryGenerated]);

  // Budget allocation
  const budgetAlloc = useMemo(() => ({
    flights: totalBudget * 0.25,
    hotels: totalBudget * 0.35,
    food: totalBudget * 0.20,
    activities: totalBudget * 0.20
  }), [totalBudget]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return Object.entries(DESTINATIONS_DATABASE).filter(([name, data]) => {
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           data.country.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesContinent = selectedContinent === 'all' || data.continent === selectedContinent;
      return matchesSearch && matchesContinent;
    });
  }, [searchQuery, selectedContinent]);

  // Continents
  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  // Generate itinerary
  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);

    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.25, hotels: totalBudget * 0.35, food: totalBudget * 0.20, activities: totalBudget * 0.20 };

      // Select best flight within budget
      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];

      // Select best hotel within budget
      const hotelBudgetPerNight = budget.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudgetPerNight);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];

      // Select restaurants
      const selectedRests = data.restaurants.slice(1, 4);

      // Select activities (prioritize child-friendly if traveling with kids)
      let selectedActs = [];
      let actBudget = 0;
      const sortedActivities = children > 0 
        ? data.activities.sort((a, b) => (b.childFriendly ? 1 : 0) - (a.childFriendly ? 1 : 0) || b.rating - a.rating)
        : data.activities.sort((a, b) => b.rating - a.rating);

      for (const act of sortedActivities) {
        const cost = act.price * (adults + payingChildren * 0.5);
        if (actBudget + cost <= budget.activities && selectedActs.length < 6) {
          selectedActs.push(act);
          actBudget += cost;
        }
      }

      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setSelectedRestaurants(selectedRests);
      setSelectedActivities(selectedActs);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  // Reset on destination change
  useEffect(() => {
    setItineraryGenerated(false);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedRestaurants([]);
    setSelectedActivities([]);
  }, [destination]);

  // Update children ages array
  useEffect(() => {
    if (children > childrenAges.length) {
      setChildrenAges([...childrenAges, ...Array(children - childrenAges.length).fill(5)]);
    } else if (children < childrenAges.length) {
      setChildrenAges(childrenAges.slice(0, children));
    }
  }, [children]);

  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  // ============================================
  // RENDER VIEWS
  // ============================================

  // Landing Page
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Header */}
        <header className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                <Globe size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">SmartTravel AI</span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-white/80">{user.name}</span>
                  <button 
                    onClick={() => setCurrentView('profile')}
                    className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl"
                  >
                    {user.avatar}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6">
            <Sparkles size={16} />
            Plataforma Colaborativa de Viagens • Powered by AI
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Viaje <span className="text-blue-400">Inteligente</span>,<br />
            Viaje <span className="text-emerald-400">Conectado</span>
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            Crie roteiros personalizados com IA, descubra viagens da comunidade,
            e planeje experiências inesquecíveis com controle total do orçamento.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => setCurrentView('plan')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Sparkles size={20} />
              Criar Roteiro com IA
            </button>
            <button
              onClick={() => setCurrentView('community')}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Users size={20} />
              Explorar Comunidade
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {[
              { icon: Globe, value: '20+', label: 'Destinos' },
              { icon: Users, value: '50k+', label: 'Viajantes' },
              { icon: BookOpen, value: '5k+', label: 'Roteiros' },
              { icon: Star, value: '4.9', label: 'Avaliação' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <stat.icon size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Featured Itineraries */}
          <h2 className="text-2xl font-bold text-white mb-6">🔥 Roteiros em Destaque</h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {communityItineraries.filter(i => i.featured).map(itinerary => (
              <div key={itinerary.id} className="bg-white/10 backdrop-blur rounded-2xl overflow-hidden border border-white/10 hover:border-blue-400/50 transition-all group">
                <div 
                  className="h-32 bg-cover bg-center"
                  style={{ backgroundImage: `url(${DESTINATIONS_DATABASE[itinerary.destination]?.coverUrl})` }}
                />
                <div className="p-4 text-left">
                  <h3 className="text-white font-bold">{itinerary.title}</h3>
                  <p className="text-slate-400 text-sm">{itinerary.destination} • {itinerary.duration} dias</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={14} className="fill-amber-400" />
                      <span className="text-sm">{itinerary.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Heart size={14} /> {itinerary.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 border-t border-white/10">
          <p className="text-center text-slate-500 text-sm">
            © 2026 SmartTravel AI • Plataforma Colaborativa de Viagens • Demo para Investidores
          </p>
        </footer>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setShowProfileModal(true); }} />
        <ProfileSetupModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} onSave={setUserProfile} user={user} />
      </div>
    );
  }

  // Community View
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
                <Globe size={22} className="text-white" />
              </div>
              <span className="text-xl font-bold text-blue-800">SmartTravel AI</span>
            </div>
            <nav className="flex items-center gap-6">
              <button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-blue-600 font-medium">Planejar</button>
              <button className="text-blue-600 font-medium">Comunidade</button>
              {user ? (
                <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Entrar</button>
              )}
            </nav>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Roteiros da Comunidade</h1>
              <p className="text-slate-500">Descubra viagens criadas por outros viajantes</p>
            </div>
            <button 
              onClick={() => setCurrentView('plan')}
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus size={20} /> Criar Roteiro
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar destino, tema..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Todos os destinos</option>
              {Object.keys(DESTINATIONS_DATABASE).map(d => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <select className="px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Mais populares</option>
              <option>Mais recentes</option>
              <option>Melhor avaliados</option>
            </select>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityItineraries.map(itinerary => (
              <CommunityItineraryCard
                key={itinerary.id}
                itinerary={itinerary}
                onView={(i) => console.log('View', i)}
                onLike={(id) => console.log('Like', id)}
                onSave={(id) => console.log('Save', id)}
              />
            ))}
          </div>
        </div>

        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      </div>
    );
  }

  // Plan View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center">
              <Globe size={22} className="text-white" />
            </div>
            <span className="text-xl font-bold text-blue-800">SmartTravel AI</span>
          </div>
          <nav className="flex items-center gap-6">
            <button className="text-blue-600 font-medium">Planejar</button>
            <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-blue-600 font-medium">Comunidade</button>
            {user ? (
              <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button>
            ) : (
              <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">Entrar</button>
            )}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Compass size={20} className="text-blue-600" />
                Escolha seu Destino
              </h2>

              {/* Search & Filter */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="relative flex-1">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar cidade ou país..."
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {continents.map(c => (
                    <button
                      key={c}
                      onClick={() => setSelectedContinent(c)}
                      className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                        selectedContinent === c
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {c === 'all' ? 'Todos' : c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Destination Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                {filteredDestinations.map(([name, data]) => (
                  <DestinationCard
                    key={name}
                    name={name}
                    data={data}
                    onSelect={setDestination}
                    isSelected={destination === name}
                  />
                ))}
              </div>
            </div>

            {/* Trip Configuration */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Settings size={20} className="text-blue-600" />
                  Configure sua Viagem para {destination.split(',')[0]}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Data Início</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block">Data Fim</label>
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block flex items-center gap-1">
                      <User size={12} /> Adultos
                    </label>
                    <input
                      type="number"
                      value={adults}
                      onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                      min="1"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-500 mb-1 block flex items-center gap-1">
                      <Baby size={12} /> Crianças
                    </label>
                    <input
                      type="number"
                      value={children}
                      onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                      min="0"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Children Ages */}
                <ChildrenAgesInput
                  count={children}
                  ages={childrenAges}
                  onChange={setChildrenAges}
                />

                {/* Budget Slider */}
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento Total (R$)</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10000"
                      max="200000"
                      step="1000"
                      value={totalBudget}
                      onChange={(e) => setTotalBudget(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="w-36 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center">
                      <span className="text-white font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={generateItinerary}
                    disabled={isGenerating}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isGenerating ? (
                      <><RefreshCw size={20} className="animate-spin" /> Gerando roteiro...</>
                    ) : (
                      <><Sparkles size={20} /> Gerar Roteiro Inteligente</>
                    )}
                  </button>
                  <button
                    onClick={() => setCurrentView('community')}
                    className="px-6 py-4 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 flex items-center gap-2"
                  >
                    <Users size={20} /> Ver Top Roteiros
                  </button>
                </div>
              </div>
            )}

            {/* Generated Itinerary */}
            {itineraryGenerated && currentData && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Map size={20} className="text-blue-600" />
                    Seu Roteiro - {tripDays} dias em {destination.split(',')[0]}
                  </h2>
                  <button onClick={() => setItineraryGenerated(false)} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                    <RefreshCw size={14} /> Regenerar
                  </button>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button onClick={() => setShowSwapModal({ open: true, category: 'flight', item: selectedFlight })} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 text-sm font-medium">
                    <Plane size={16} /> Trocar Voo
                  </button>
                  <button onClick={() => setShowSwapModal({ open: true, category: 'hotel', item: selectedHotel })} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 text-sm font-medium">
                    <Hotel size={16} /> Trocar Hotel
                  </button>
                  <button onClick={() => setShowSwapModal({ open: true, category: 'activity', item: null })} className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 text-sm font-medium">
                    <Plus size={16} /> Adicionar Passeio
                  </button>
                </div>

                {/* Summary Cards */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  {/* Flight */}
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Plane size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{selectedFlight?.name}</h4>
                        <p className="text-xs text-slate-500">{selectedFlight?.duration} • {selectedFlight?.class}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{totalPayingTravelers} passageiro(s) {freeChildren > 0 && `+ ${freeChildren} grátis`}</span>
                      <span className="font-bold text-blue-600">R$ {(selectedFlight?.price * totalPayingTravelers).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Hotel */}
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <Hotel size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{selectedHotel?.name}</h4>
                        <p className="text-xs text-slate-500">{'★'.repeat(selectedHotel?.stars || 0)} • {selectedHotel?.location}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500">{tripDays} noites</span>
                      <span className="font-bold text-emerald-600">R$ {(selectedHotel?.price * tripDays).toLocaleString('pt-BR')}</span>
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <h4 className="font-semibold text-slate-700 mb-2">Passeios Incluídos ({selectedActivities.length})</h4>
                <div className="grid gap-2 mb-4">
                  {selectedActivities.map((act, i) => (
                    <div key={act.id} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer" onClick={() => setShowSwapModal({ open: true, category: 'activity', item: act })}>
                      <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
                        <Camera size={16} className="text-violet-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-700">{act.name}</p>
                        <p className="text-xs text-slate-400">{act.duration} • {act.type} {act.childFriendly && <span className="text-emerald-500">• Kids OK</span>}</p>
                      </div>
                      <span className="text-sm font-semibold text-slate-600">R$ {act.price}</span>
                    </div>
                  ))}
                </div>

                {/* Restaurants */}
                <h4 className="font-semibold text-slate-700 mb-2">Restaurantes Sugeridos</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRestaurants.map(rest => (
                    <div key={rest.id} className="px-3 py-2 bg-amber-50 rounded-lg border border-amber-100">
                      <p className="text-sm font-medium text-slate-700">{rest.name}</p>
                      <p className="text-xs text-slate-500">{rest.cuisine} • ~R$ {rest.price}/pessoa</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Globe size={48} className="text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino para começar</h3>
                <p className="text-slate-500">Selecione uma cidade acima para criar seu roteiro personalizado</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl transition-transform ${itineraryGenerated ? '' : 'opacity-50'}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold opacity-90">Orçamento</h3>
                <Wallet size={20} className="opacity-80" />
              </div>
              <div className="text-3xl font-bold mb-2">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              
              {itineraryGenerated && (
                <>
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>
                    {isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="opacity-80">Gasto Total</span>
                      <span className="font-bold">R$ {costs.total.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${isOverBudget ? 'bg-red-400' : 'bg-white'}`} style={{ width: `${Math.min((costs.total / totalBudget) * 100, 100)}%` }} />
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Category Breakdown */}
            {itineraryGenerated && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CreditCard size={18} className="text-blue-600" />
                  Por Categoria
                </h3>
                <ProgressBar label="Voos" current={costs.flights} max={budgetAlloc.flights} color="blue" icon={Plane} />
                <ProgressBar label="Hotel" current={costs.hotels} max={budgetAlloc.hotels} color="emerald" icon={Hotel} />
                <ProgressBar label="Alimentação" current={costs.food} max={budgetAlloc.food} color="amber" icon={Utensils} />
                <ProgressBar label="Passeios" current={costs.activities} max={budgetAlloc.activities} color="violet" icon={Camera} />
              </div>
            )}

            {/* Trip Summary */}
            {itineraryGenerated && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield size={18} className="text-blue-600" />
                  Resumo
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{tripDays}</div>
                    <div className="text-xs text-slate-500">Dias</div>
                  </div>
                  <div className="text-center p-3 bg-emerald-50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{adults + children}</div>
                    <div className="text-xs text-slate-500">Viajantes</div>
                  </div>
                  <div className="text-center p-3 bg-amber-50 rounded-xl">
                    <div className="text-lg font-bold text-amber-600">R$ {Math.round(costs.total / tripDays).toLocaleString('pt-BR')}</div>
                    <div className="text-xs text-slate-500">Por dia</div>
                  </div>
                  <div className="text-center p-3 bg-violet-50 rounded-xl">
                    <div className="text-lg font-bold text-violet-600">{selectedActivities.length}</div>
                    <div className="text-xs text-slate-500">Passeios</div>
                  </div>
                </div>

                {freeChildren > 0 && (
                  <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <p className="text-sm text-emerald-700 flex items-center gap-2">
                      <Baby size={16} />
                      <strong>{freeChildren} criança(s) até 2 anos:</strong> Gratuito nos voos!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* CTA */}
            {itineraryGenerated && (
              <button
                disabled={isOverBudget}
                className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${
                  isOverBudget
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg'
                }`}
              >
                {isOverBudget ? (
                  <><AlertTriangle size={20} /> Ajuste o orçamento</>
                ) : (
                  <><Download size={20} /> Baixar Roteiro PDF</>
                )}
              </button>
            )}

            {/* Share to Community */}
            {itineraryGenerated && user && !isOverBudget && (
              <button className="w-full py-3 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 flex items-center justify-center gap-2">
                <Share2 size={18} /> Compartilhar na Comunidade
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Swap Modal */}
      {showSwapModal.open && currentData && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">
                {showSwapModal.category === 'flight' ? 'Escolher Voo' : 
                 showSwapModal.category === 'hotel' ? 'Escolher Hotel' : 
                 showSwapModal.category === 'activity' ? 'Escolher Passeio' : 'Escolher Restaurante'}
              </h3>
              <button onClick={() => setShowSwapModal({ open: false, category: null, item: null })} className="p-2 hover:bg-slate-100 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="space-y-3">
                {(showSwapModal.category === 'flight' ? currentData.flights :
                  showSwapModal.category === 'hotel' ? currentData.hotels :
                  showSwapModal.category === 'activity' ? currentData.activities : currentData.restaurants
                ).map(item => {
                  const isCurrent = showSwapModal.item?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (showSwapModal.category === 'flight') setSelectedFlight(item);
                        else if (showSwapModal.category === 'hotel') setSelectedHotel(item);
                        else if (showSwapModal.category === 'activity') {
                          if (!selectedActivities.find(a => a.id === item.id)) {
                            setSelectedActivities([...selectedActivities, item]);
                          }
                        }
                        setShowSwapModal({ open: false, category: null, item: null });
                      }}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        isCurrent ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-slate-800 flex items-center gap-2">
                            {item.name}
                            {isCurrent && <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Atual</span>}
                          </h4>
                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            {item.rating && <span className="flex items-center gap-1"><Star size={12} className="text-amber-400 fill-amber-400" />{item.rating}</span>}
                            {item.duration && <span>{item.duration}</span>}
                            {item.location && <span>{item.location}</span>}
                            {item.stars && <span>{'★'.repeat(item.stars)}</span>}
                            {item.childFriendly && <span className="text-emerald-500">Kids OK</span>}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg text-slate-800">R$ {item.price.toLocaleString('pt-BR')}</p>
                          {item.perNight && <p className="text-xs text-slate-400">/noite</p>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setShowProfileModal(true); }} />
      <ProfileSetupModal isOpen={showProfileModal} onClose={() => setShowProfileModal(false)} onSave={setUserProfile} user={user} />
    </div>
  );
}
