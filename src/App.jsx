import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Compass, Mountain, Building, Palmtree, Crown, Mail, Lock, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, ArrowLeftRight, MessageSquare, Car, Copy, Phone, Download, Zap, Target, Award, ThumbsUp, Info, Anchor, Wine, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Edit3, Trash2, Eye, Coffee, Bed, ArrowUpCircle, ArrowDownCircle, ImageIcon, Send, Settings, CreditCard, Bell, Shield } from 'lucide-react';

// ========== CITY UTC OFFSETS ==========
const CITY_OFFSETS = {
  'São Paulo (GRU)': -3, 'Rio de Janeiro (GIG)': -3, 'Brasília (BSB)': -3,
  'Belo Horizonte (CNF)': -3, 'Salvador (SSA)': -3, 'Fortaleza (FOR)': -3,
  'Recife (REC)': -3, 'Porto Alegre (POA)': -3, 'Curitiba (CWB)': -3,
  'Manaus (MAO)': -4, 'Florianópolis (FLN)': -3, 'Natal (NAT)': -3,
  'Paris, França': 1, 'Londres, UK': 0, 'Roma, Itália': 1,
  'Barcelona, Espanha': 1, 'Lisboa, Portugal': 0, 'Amsterdam, Holanda': 1,
  'Santorini, Grécia': 2, 'Nova York, EUA': -5, 'Miami, EUA': -5,
  'Los Angeles, EUA': -8, 'Cancún, México': -5, 'Buenos Aires, Argentina': -3,
  'Tóquio, Japão': 9, 'Dubai, EAU': 4, 'Bangkok, Tailândia': 7,
  'Bali, Indonésia': 8, 'Singapura': 8, 'Sydney, Austrália': 10,
  'Maldivas': 5, 'Cape Town, África do Sul': 2,
};

// ========== ARRIVAL CALCULATION (CRITICAL) ==========
const calculateArrival = (originCity, destCity, departureTime, flightDurationStr) => {
  const originOffset = CITY_OFFSETS[originCity] || -3;
  const destOffset = CITY_OFFSETS[destCity] || 0;
  const [depHour, depMin] = departureTime.split(':').map(Number);
  const departureMinutes = depHour * 60 + (depMin || 0);
  
  let flightMinutes = 0;
  if (flightDurationStr) {
    const match = flightDurationStr.match(/(\d+)h(\d+)?/);
    if (match) flightMinutes = parseInt(match[1]) * 60 + (parseInt(match[2]) || 0);
  }
  
  const timezoneDiff = destOffset - originOffset;
  const arrivalMinutes = departureMinutes + flightMinutes + (timezoneDiff * 60);
  
  let daysAdded = 0;
  let normalizedMinutes = arrivalMinutes;
  while (normalizedMinutes >= 1440) { normalizedMinutes -= 1440; daysAdded++; }
  while (normalizedMinutes < 0) { normalizedMinutes += 1440; daysAdded--; }
  
  const arrivalHour = Math.floor(normalizedMinutes / 60);
  const arrivalMin = Math.round(normalizedMinutes % 60);
  const formattedTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`;
  
  const isLongFlight = flightMinutes > 7 * 60;
  return {
    time: formattedTime, daysAdded, isOvernightFlight: daysAdded > 0,
    isLongFlight, requiresRest: isLongFlight,
    flightHours: (flightMinutes / 60).toFixed(1), timezoneDiff,
    dayLabel: daysAdded === 0 ? '' : daysAdded === 1 ? '+1 dia' : `+${daysAdded} dias`
  };
};

// ========== HELPER FUNCTIONS ==========
const formatDate = (startDate, addDays) => {
  const date = new Date(startDate);
  date.setDate(date.getDate() + addDays);
  const weekdays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
  return { weekday: weekdays[date.getDay()], day: date.getDate().toString().padStart(2, '0'), month: (date.getMonth() + 1).toString().padStart(2, '0') };
};

const getPeriodStyle = (period) => {
  const styles = {
    manhã: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Manhã', icon: Sunrise },
    tarde: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Tarde', icon: Sun },
    noite: { bg: 'bg-indigo-100', text: 'text-indigo-700', label: 'Noite', icon: Moon },
  };
  return styles[period] || styles.manhã;
};

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'];

const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain, desc: 'Trilhas e adrenalina' },
  { id: 'culture', name: 'Cultural', icon: Building, desc: 'Museus e história' },
  { id: 'beach', name: 'Praia', icon: Palmtree, desc: 'Sol e mar' },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils, desc: 'Experiências culinárias' },
  { id: 'family', name: 'Família', icon: Users, desc: 'Para todas idades' },
  { id: 'romantic', name: 'Romântico', icon: Heart, desc: 'Experiências a dois' },
  { id: 'budget', name: 'Econômico', icon: Wallet, desc: 'Máximo com menos' },
  { id: 'luxury', name: 'Luxo', icon: Crown, desc: 'Só o melhor' },
];

const TRIP_PRIORITIES = [
  { id: 'gastronomy', name: 'Gastronomia', icon: Utensils, desc: 'Foco em restaurantes' },
  { id: 'beaches', name: 'Praias', icon: Anchor, desc: 'Atividades de praia' },
  { id: 'culture', name: 'Cultura', icon: Building, desc: 'Museus e arte' },
  { id: 'adventure', name: 'Aventura', icon: Mountain, desc: 'Esportes e trilhas' },
  { id: 'relaxation', name: 'Relaxamento', icon: Sparkles, desc: 'Spas e tranquilidade' },
  { id: 'kids', name: 'Crianças', icon: Baby, desc: 'Family-friendly' },
  { id: 'nightlife', name: 'Vida Noturna', icon: Music, desc: 'Shows e bares' },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag, desc: 'Lojas e outlets' },
  { id: 'comfort', name: 'Conforto', icon: Hotel, desc: 'Hotel e transporte premium' },
];

const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];


// ========== DESTINATIONS DATABASE ==========
const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', image: '🗼', tags: ['culture', 'romantic', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800', 'https://images.unsplash.com/photo-1471623432079-b009d30b6729?w=800', 'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800'],
    tip: 'Compre o Paris Museum Pass para economizar em museus!',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.7, airline: 'Air France' },
      { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3, airline: 'TAP' },
      { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.4, airline: 'LATAM' },
      { id: 'pf4', name: 'KLM via Amsterdam', price: 3150, duration: '15h10', rating: 4.5, airline: 'KLM' },
      { id: 'pf5', name: 'Iberia via Madrid', price: 2850, duration: '15h40', rating: 4.2, airline: 'Iberia' },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9, amenities: ['Spa', 'Michelin Restaurant'] },
      { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.7, amenities: ['Rooftop', 'Spa'] },
      { id: 'ph3', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Tour Eiffel', rating: 4.5, amenities: ['Vista Torre', 'Fitness'] },
      { id: 'ph4', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4, amenities: ['Café da manhã'] },
      { id: 'ph5', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2, amenities: ['Wi-Fi'] },
      { id: 'ph6', name: 'Generator Paris', stars: 2, price: 150, location: 'Canal Saint-Martin', rating: 4.0, amenities: ['Bar', 'Social'] },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Four Seasons' },
      { id: 'pr2', name: 'Septime', price: 280, cuisine: 'Contemporânea', rating: 4.8, period: 'noite', tags: ['gastro'], location: '11º Arrond.' },
      { id: 'pr3', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5, period: 'tarde', tags: ['budget'], location: '9º Arrond.' },
      { id: 'pr4', name: 'Café de Flore', price: 75, cuisine: 'Café', rating: 4.6, period: 'manhã', tags: ['romantic', 'culture'], location: 'Saint-Germain' },
      { id: 'pr5', name: 'Pink Mamma', price: 85, cuisine: 'Italiana', rating: 4.6, period: 'noite', tags: ['family'], location: '10º Arrond.' },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: 2, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars', tags: ['landmark', 'romantic'], startTime: '09:00', intensity: 'light' },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: 4, rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement', tags: ['culture', 'art'], startTime: '09:30', intensity: 'moderate' },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: 1.5, rating: 4.7, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais', tags: ['romantic', 'scenic'], startTime: '19:00', intensity: 'light' },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes', tags: ['culture', 'history'], startTime: '08:30', intensity: 'heavy' },
      { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Montmartre', tags: ['culture', 'scenic'], startTime: '14:00', intensity: 'moderate' },
      { id: 'pa6', name: 'Museu d\'Orsay', price: 85, duration: 3, rating: 4.8, childFriendly: true, period: 'tarde', location: '7º Arrondissement', tags: ['culture', 'art'], startTime: '14:00', intensity: 'moderate' },
      { id: 'pa7', name: 'Disneyland Paris', price: 380, duration: 10, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Marne-la-Vallée', tags: ['family', 'kids'], startTime: '09:00', intensity: 'heavy' },
      { id: 'pa8', name: 'Jardim de Luxemburgo', price: 0, duration: 2, rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement', tags: ['free', 'nature', 'romantic', 'relaxation'], startTime: '15:00', intensity: 'light' },
      { id: 'pa9', name: 'Aula de Culinária', price: 120, duration: 3, rating: 4.8, childFriendly: false, period: 'manhã', location: 'Le Marais', tags: ['gastro'], startTime: '10:00', intensity: 'light' },
      { id: 'pa10', name: 'Show Moulin Rouge', price: 185, duration: 2, rating: 4.6, childFriendly: false, period: 'noite', location: 'Pigalle', tags: ['nightlife', 'entertainment'], startTime: '21:00', intensity: 'light' },
      { id: 'pa11', name: 'Sainte-Chapelle', price: 45, duration: 1, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Île de la Cité', tags: ['culture', 'history'], startTime: '11:00', intensity: 'light' },
      { id: 'pa12', name: 'Galeries Lafayette', price: 0, duration: 3, rating: 4.4, childFriendly: true, period: 'tarde', location: 'Boulevard Haussmann', tags: ['shopping', 'free'], startTime: '15:00', intensity: 'light' },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', image: '🌴', tags: ['beach', 'luxury', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800', 'https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800'],
    tip: 'Alugue carro para explorar as Keys e Everglades!',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.5, airline: 'American' },
      { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4, airline: 'LATAM' },
      { id: 'mf3', name: 'GOL - Direto', price: 2250, duration: '8h30', rating: 4.2, airline: 'GOL' },
      { id: 'mf4', name: 'Azul via Orlando', price: 2050, duration: '11h', rating: 4.1, airline: 'Azul' },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9, amenities: ['Praia privativa', 'Spa', 'Teatro'] },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8, amenities: ['3 piscinas', 'Spa asiático'] },
      { id: 'mh3', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6, amenities: ['11 piscinas', 'LIV Nightclub'] },
      { id: 'mh4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5, amenities: ['Rooftop'] },
      { id: 'mh5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4, amenities: ['Bar premiado'] },
      { id: 'mh6', name: 'Generator Miami', stars: 2, price: 140, location: 'South Beach', rating: 4.1, amenities: ['Piscina'] },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'], location: 'Downtown' },
      { id: 'mr2', name: 'Joe\'s Stone Crab', price: 220, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro'], location: 'South Beach' },
      { id: 'mr3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6, period: 'tarde', tags: ['culture', 'budget'], location: 'Little Havana' },
      { id: 'mr4', name: 'Juvia', price: 180, cuisine: 'Fusion', rating: 4.7, period: 'noite', tags: ['gastro', 'romantic'], location: 'Lincoln Road' },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: 4, rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach', tags: ['beach', 'free', 'relaxation'], startTime: '10:00', intensity: 'light' },
      { id: 'ma2', name: 'Art Deco Tour', price: 45, duration: 2, rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive', tags: ['culture', 'history'], startTime: '09:30', intensity: 'moderate' },
      { id: 'ma3', name: 'Everglades Tour', price: 95, duration: 4, rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades', tags: ['adventure', 'nature', 'family', 'kids'], startTime: '08:00', intensity: 'moderate' },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: 2, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood', tags: ['art', 'free', 'culture'], startTime: '14:00', intensity: 'light' },
      { id: 'ma5', name: 'Vizcaya Museum', price: 65, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove', tags: ['culture', 'history', 'romantic'], startTime: '14:00', intensity: 'moderate' },
      { id: 'ma6', name: 'Little Havana Tour', price: 75, duration: 3, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Little Havana', tags: ['gastro', 'culture'], startTime: '15:00', intensity: 'light' },
      { id: 'ma7', name: 'Jet Ski South Beach', price: 120, duration: 1, rating: 4.5, childFriendly: false, period: 'tarde', location: 'South Beach', tags: ['adventure', 'beach'], startTime: '15:00', intensity: 'moderate' },
      { id: 'ma8', name: 'Key West Day Trip', price: 195, duration: 14, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Key West', tags: ['scenic', 'beach', 'adventure'], startTime: '07:00', intensity: 'heavy' },
      { id: 'ma9', name: 'Sawgrass Mills Outlet', price: 0, duration: 5, rating: 4.4, childFriendly: true, period: 'tarde', location: 'Sunrise', tags: ['shopping', 'free'], startTime: '10:00', intensity: 'moderate' },
      { id: 'ma10', name: 'Miami Seaquarium', price: 85, duration: 4, rating: 4.3, childFriendly: true, period: 'manhã', location: 'Key Biscayne', tags: ['family', 'kids'], startTime: '10:00', intensity: 'moderate' },
    ]
  },
  'Nova York, EUA': {
    continent: 'América do Norte', image: '🗽', tags: ['culture', 'luxury', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800'],
    tip: 'CityPass NYC economiza até 40% nas atrações principais!',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 3800, duration: '10h', rating: 4.5, airline: 'American' },
      { id: 'nf2', name: 'Delta - Direto', price: 4100, duration: '10h', rating: 4.6, airline: 'Delta' },
      { id: 'nf3', name: 'LATAM via Miami', price: 2950, duration: '14h', rating: 4.3, airline: 'LATAM' },
      { id: 'nf4', name: 'Copa via Panamá', price: 2650, duration: '13h', rating: 4.2, airline: 'Copa' },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza', stars: 5, price: 4500, location: 'Central Park', rating: 4.9 },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2200, location: 'Meatpacking', rating: 4.7 },
      { id: 'nh3', name: 'citizenM Times Square', stars: 4, price: 720, location: 'Times Square', rating: 4.5 },
      { id: 'nh4', name: 'Pod 51', stars: 3, price: 350, location: 'Midtown', rating: 4.2 },
      { id: 'nh5', name: 'HI NYC Hostel', stars: 2, price: 140, location: 'Upper West', rating: 4.0 },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1200, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Flatiron' },
      { id: 'nr2', name: 'Katz\'s Deli', price: 65, cuisine: 'Deli', rating: 4.7, period: 'tarde', tags: ['culture', 'budget'], location: 'Lower East Side' },
      { id: 'nr3', name: 'Joe\'s Pizza', price: 25, cuisine: 'Pizza NY', rating: 4.6, period: 'tarde', tags: ['budget', 'family'], location: 'Greenwich' },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 180, duration: 2, rating: 4.7, childFriendly: true, period: 'noite', location: '5th Avenue', tags: ['landmark', 'scenic'], startTime: '20:00', intensity: 'light' },
      { id: 'na2', name: 'Estátua da Liberdade', price: 145, duration: 5, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Liberty Island', tags: ['landmark', 'history'], startTime: '09:00', intensity: 'moderate' },
      { id: 'na3', name: 'Broadway Show', price: 380, duration: 3, rating: 4.9, childFriendly: true, period: 'noite', location: 'Theater District', tags: ['entertainment', 'culture', 'nightlife'], startTime: '19:30', intensity: 'light' },
      { id: 'na4', name: 'MoMA', price: 125, duration: 3, rating: 4.8, childFriendly: true, period: 'tarde', location: 'Midtown', tags: ['culture', 'art'], startTime: '14:00', intensity: 'moderate' },
      { id: 'na5', name: 'Central Park Bike', price: 65, duration: 2, rating: 4.6, childFriendly: true, period: 'manhã', location: 'Central Park', tags: ['adventure', 'nature', 'family'], startTime: '10:00', intensity: 'moderate' },
      { id: 'na6', name: 'Top of the Rock', price: 165, duration: 1.5, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Rockefeller', tags: ['landmark', 'scenic'], startTime: '18:00', intensity: 'light' },
      { id: 'na7', name: '9/11 Memorial', price: 95, duration: 3, rating: 4.9, childFriendly: true, period: 'manhã', location: 'Lower Manhattan', tags: ['history', 'culture'], startTime: '09:00', intensity: 'moderate' },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: 2, rating: 4.5, childFriendly: true, period: 'tarde', location: 'Brooklyn Bridge', tags: ['free', 'scenic', 'romantic'], startTime: '17:00', intensity: 'moderate' },
    ]
  },
  'Dubai, EAU': {
    continent: 'Ásia', image: '🏙️', tags: ['luxury', 'family', 'adventure'],
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'],
    tip: 'Reserve o Burj Khalifa para o pôr do sol (17h-18h)!',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 4850, duration: '14h30', rating: 4.9, airline: 'Emirates' },
      { id: 'df2', name: 'Qatar via Doha', price: 3650, duration: '18h', rating: 4.6, airline: 'Qatar' },
      { id: 'df3', name: 'Turkish via Istambul', price: 3200, duration: '20h', rating: 4.4, airline: 'Turkish' },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 7500, location: 'Jumeirah', rating: 4.9 },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 2600, location: 'Palm Jumeirah', rating: 4.7 },
      { id: 'dh3', name: 'JW Marriott Marquis', stars: 5, price: 950, location: 'Business Bay', rating: 4.6 },
      { id: 'dh4', name: 'Rove Downtown', stars: 4, price: 480, location: 'Downtown', rating: 4.4 },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 550, cuisine: 'Fine Dining', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury', 'romantic'], location: 'Burj Khalifa' },
      { id: 'dr2', name: 'Pierchic', price: 380, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro', 'romantic'], location: 'Jumeirah' },
      { id: 'dr3', name: 'Ravi Restaurant', price: 25, cuisine: 'Paquistanesa', rating: 4.6, period: 'tarde', tags: ['budget', 'culture'], location: 'Satwa' },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa', price: 220, duration: 2, rating: 4.9, childFriendly: true, period: 'tarde', location: 'Downtown', tags: ['landmark', 'scenic'], startTime: '17:00', intensity: 'light' },
      { id: 'da2', name: 'Desert Safari', price: 165, duration: 6, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Deserto', tags: ['adventure', 'culture'], startTime: '14:30', intensity: 'moderate' },
      { id: 'da3', name: 'Dubai Mall + Fountain', price: 0, duration: 4, rating: 4.6, childFriendly: true, period: 'noite', location: 'Downtown', tags: ['free', 'shopping', 'scenic'], startTime: '18:00', intensity: 'light' },
      { id: 'da4', name: 'Aquaventure', price: 280, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Palm Jumeirah', tags: ['family', 'adventure', 'kids'], startTime: '10:00', intensity: 'heavy' },
      { id: 'da5', name: 'Gold & Spice Souk', price: 0, duration: 2, rating: 4.5, childFriendly: true, period: 'manhã', location: 'Deira', tags: ['shopping', 'culture', 'free'], startTime: '10:00', intensity: 'light' },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', image: '🗾', tags: ['culture', 'gastro', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800'],
    tip: 'JR Pass de 7 dias é essencial! Compre antes de embarcar.',
    flights: [
      { id: 'tf1', name: 'ANA via Houston', price: 5800, duration: '24h', rating: 4.8, airline: 'ANA' },
      { id: 'tf2', name: 'Emirates via Dubai', price: 4650, duration: '28h', rating: 4.6, airline: 'Emirates' },
      { id: 'tf3', name: 'Qatar via Doha', price: 4350, duration: '30h', rating: 4.5, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'th1', name: 'Park Hyatt Tokyo', stars: 5, price: 3200, location: 'Shinjuku', rating: 4.8 },
      { id: 'th2', name: 'Hotel Gracery', stars: 4, price: 650, location: 'Shinjuku', rating: 4.5 },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 520, location: 'Shinjuku', rating: 4.4 },
      { id: 'th4', name: 'Khaosan Tokyo', stars: 2, price: 110, location: 'Asakusa', rating: 4.1 },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1800, cuisine: 'Sushi Omakase', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Ginza' },
      { id: 'tr2', name: 'Ichiran Ramen', price: 45, cuisine: 'Ramen', rating: 4.7, period: 'tarde', tags: ['budget', 'gastro'], location: 'Shibuya' },
      { id: 'tr3', name: 'Tsukiji Market', price: 75, cuisine: 'Frutos do Mar', rating: 4.8, period: 'manhã', tags: ['gastro', 'culture'], location: 'Tsukiji' },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 95, duration: 2, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Sumida', tags: ['landmark', 'scenic'], startTime: '17:00', intensity: 'light' },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: 2, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Asakusa', tags: ['culture', 'free', 'history'], startTime: '08:00', intensity: 'light' },
      { id: 'ta3', name: 'teamLab Planets', price: 165, duration: 2, rating: 4.9, childFriendly: true, period: 'tarde', location: 'Toyosu', tags: ['art', 'culture'], startTime: '14:00', intensity: 'light' },
      { id: 'ta4', name: 'Tokyo DisneySea', price: 320, duration: 12, rating: 4.9, childFriendly: true, period: 'manhã', location: 'Urayasu', tags: ['family', 'kids'], startTime: '08:00', intensity: 'heavy' },
      { id: 'ta5', name: 'Shibuya Crossing', price: 0, duration: 1.5, rating: 4.5, childFriendly: true, period: 'noite', location: 'Shibuya', tags: ['culture', 'free'], startTime: '19:00', intensity: 'light' },
      { id: 'ta6', name: 'Meiji Shrine', price: 0, duration: 1.5, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Harajuku', tags: ['culture', 'free', 'relaxation'], startTime: '09:00', intensity: 'light' },
    ]
  },
  'Maldivas': {
    continent: 'Ásia', image: '🏝️', tags: ['beach', 'romantic', 'luxury'],
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800'],
    tip: 'Melhor época: novembro a abril (estação seca).',
    flights: [
      { id: 'mvf1', name: 'Emirates via Dubai', price: 6200, duration: '22h', rating: 4.7, airline: 'Emirates' },
      { id: 'mvf2', name: 'Qatar via Doha', price: 5800, duration: '24h', rating: 4.6, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'mvh1', name: 'Soneva Fushi', stars: 5, price: 8500, location: 'Baa Atoll', rating: 4.9 },
      { id: 'mvh2', name: 'Conrad Maldives', stars: 5, price: 4500, location: 'Rangali Island', rating: 4.8 },
      { id: 'mvh3', name: 'Anantara Veli', stars: 5, price: 2800, location: 'South Malé', rating: 4.7 },
    ],
    restaurants: [
      { id: 'mvr1', name: 'Ithaa Undersea', price: 950, cuisine: 'Fine Dining Subaquático', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury', 'romantic'], location: 'Conrad' },
    ],
    activities: [
      { id: 'mva1', name: 'Snorkel com Mantas', price: 180, duration: 3, rating: 4.9, childFriendly: true, period: 'manhã', location: 'Hanifaru Bay', tags: ['adventure', 'nature', 'beach'], startTime: '09:00', intensity: 'moderate' },
      { id: 'mva2', name: 'Sunset Dolphin Cruise', price: 95, duration: 2, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Oceano Índico', tags: ['romantic', 'scenic', 'relaxation'], startTime: '17:00', intensity: 'light' },
      { id: 'mva3', name: 'Spa Overwater', price: 350, duration: 2, rating: 4.8, childFriendly: false, period: 'tarde', location: 'Resort', tags: ['relaxation', 'luxury', 'romantic'], startTime: '14:00', intensity: 'light' },
    ]
  },
};

// ========== COMMUNITY ITINERARIES ==========
const COMMUNITY_ITINERARIES = [
  { 
    id: 'ci1', title: 'Paris Romântica - Lua de Mel', destination: 'Paris, França', 
    author: { name: 'Marina Silva', avatar: '👩', verified: true }, 
    duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 412, 
    tags: ['romantic', 'luxury'], 
    highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro no Sena', 'Jantar Le Cinq'], 
    featured: true, flightId: 'pf1', hotelId: 'ph3',
    comments: [
      { id: 1, user: 'Ana & Pedro', avatar: '💑', rating: 5, date: '2025-12-15', text: 'Fizemos na nossa lua de mel e foi PERFEITO! O cruzeiro ao pôr do sol foi mágico.' },
      { id: 2, user: 'Bruno Martins', avatar: '👨', rating: 5, date: '2025-11-28', text: 'Minha esposa chorou de emoção na Torre Eiffel. Obrigado pelas dicas!' },
      { id: 3, user: 'Carla Dias', avatar: '👩', rating: 4, date: '2025-11-10', text: 'Muito bom! Só achei Versalhes cansativo no mesmo dia que outras coisas.' },
    ],
    ratings: { cleanliness: 4.9, value: 4.7, location: 5.0 }
  },
  { 
    id: 'ci2', title: 'NYC em 5 Dias', destination: 'Nova York, EUA', 
    author: { name: 'Juliana Costa', avatar: '👩', verified: true }, 
    duration: 5, budget: 22000, travelers: 2, likes: 5234, rating: 4.8, reviews: 523, 
    tags: ['culture'], 
    highlights: ['Top of the Rock', 'Broadway', 'Central Park'], 
    featured: true, flightId: 'nf3', hotelId: 'nh4',
    comments: [
      { id: 1, user: 'Ricardo Lima', avatar: '👨', rating: 5, date: '2025-12-20', text: 'Segui o roteiro e consegui ver TUDO! Dicas de metrô foram essenciais.' },
      { id: 2, user: 'Fernanda Castro', avatar: '👩', rating: 5, date: '2025-11-28', text: 'Broadway foi emocionante! Comprem na TKTS com desconto.' },
    ],
    ratings: { cleanliness: 4.8, value: 4.9, location: 4.7 }
  },
  { 
    id: 'ci3', title: 'Miami Beach Life', destination: 'Miami, EUA', 
    author: { name: 'Camila Andrade', avatar: '👩', verified: true }, 
    duration: 5, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 312, 
    tags: ['beach'], 
    highlights: ['South Beach', 'Wynwood', 'Pool Parties'], 
    featured: true, flightId: 'mf2', hotelId: 'mh5',
    comments: [
      { id: 1, user: 'Lucas Santos', avatar: '👨', rating: 5, date: '2025-12-18', text: 'Miami tem muito mais que praia! Everglades foi sensacional.' },
    ],
    ratings: { cleanliness: 4.7, value: 4.8, location: 4.9 }
  },
  { 
    id: 'ci4', title: 'Maldivas Lua de Mel', destination: 'Maldivas', 
    author: { name: 'Carolina Mendes', avatar: '👩', verified: true }, 
    duration: 6, budget: 65000, travelers: 2, likes: 4567, rating: 4.9, reviews: 423, 
    tags: ['romantic', 'luxury', 'beach'], 
    highlights: ['Villa Overwater', 'Jantar Subaquático', 'Spa Couples'], 
    featured: true, flightId: 'mvf1', hotelId: 'mvh2',
    comments: [
      { id: 1, user: 'Paulo & Julia', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Paraíso na Terra! O jantar no Ithaa foi surreal.' },
    ],
    ratings: { cleanliness: 5.0, value: 4.5, location: 5.0 }
  },
  { 
    id: 'ci5', title: 'Dubai Luxuoso', destination: 'Dubai, EAU', 
    author: { name: 'Helena Borges', avatar: '👸', verified: true }, 
    duration: 6, budget: 55000, travelers: 2, likes: 2890, rating: 4.9, reviews: 198, 
    tags: ['luxury', 'adventure'], 
    highlights: ['Burj Khalifa Sunset', 'Desert Safari VIP', 'Atlantis'], 
    featured: true, flightId: 'df1', hotelId: 'dh2',
    comments: [
      { id: 1, user: 'Ricardo & Paula', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Dubai é outro planeta! Atlantis é espetacular.' },
    ],
    ratings: { cleanliness: 4.9, value: 4.6, location: 4.8 }
  },
  { 
    id: 'ci6', title: 'Tóquio em Família', destination: 'Tóquio, Japão', 
    author: { name: 'Pedro Tanaka', avatar: '👨‍👩‍👧‍👦', verified: true }, 
    duration: 10, budget: 55000, travelers: 4, likes: 2890, rating: 4.8, reviews: 234, 
    tags: ['family', 'culture'], 
    highlights: ['DisneySea', 'teamLab', 'Senso-ji'], 
    featured: true, flightId: 'tf3', hotelId: 'th2',
    comments: [
      { id: 1, user: 'Família Ribeiro', avatar: '👨‍👩‍👧', rating: 5, date: '2025-12-08', text: 'Filhos amaram! DisneySea é melhor que os parques americanos.' },
    ],
    ratings: { cleanliness: 4.9, value: 4.7, location: 4.8 }
  },
];

// ========== PRINT STYLES ==========
const printStyles = `
@media print {
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .no-print { display: none !important; }
  .print-break { page-break-after: always; }
  .day-card { break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; }
  .sidebar { display: none !important; }
  .header { position: relative !important; }
}
`;

// ========== AUTH MODAL ==========
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-8 bg-gradient-to-br from-teal-600 to-emerald-600 text-white text-center">
          <Globe size={56} className="mx-auto mb-4" />
          <h2 className="text-2xl font-bold">SmartTravel AI</h2>
          <p className="text-teal-100 text-sm mt-1">Viaje de forma inteligente</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ name: form.name || 'Viajante', email: form.email, avatar: '👤', joinDate: 'Janeiro 2026', trips: 0 }); onClose(); }} className="p-6 space-y-4">
          {mode === 'register' && <input type="text" placeholder="Seu nome completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent" />}
          <input type="email" placeholder="seu@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent" />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg transition-all">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <span>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium hover:underline">Cadastre-se</button></span> : <span>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium hover:underline">Entrar</button></span>}</p>
        </form>
      </div>
    </div>
  );
};

// ========== COMMUNITY DETAIL MODAL ==========
const CommunityDetailModal = ({ itinerary, isOpen, onClose, onUse }) => {
  const [tab, setTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  
  if (!isOpen || !itinerary) return null;
  const dest = DESTINATIONS_DATABASE[itinerary.destination];
  const flight = dest?.flights.find(f => f.id === itinerary.flightId);
  const hotel = dest?.hotels.find(h => h.id === itinerary.hotelId);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header with Gallery */}
        <div className="relative h-56 flex-shrink-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest?.coverUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/60"><X size={20} /></button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex gap-2 mb-2">
              {itinerary.featured && <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</span>}
              {itinerary.tags.map(t => <span key={t} className="px-2 py-1 bg-white/20 backdrop-blur text-white text-xs rounded-full">{t}</span>)}
            </div>
            <h2 className="text-2xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 flex items-center gap-1 mt-1"><MapPin size={14} /> {itinerary.destination}</p>
          </div>
        </div>
        
        {/* Author & Stats */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{itinerary.author.avatar}</span>
            <div>
              <p className="font-semibold flex items-center gap-1">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={14} className="text-teal-500" />}</p>
              <p className="text-sm text-slate-500">{itinerary.duration} dias • {itinerary.travelers} viajantes</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-center"><p className="text-xl font-bold text-teal-600">R$ {(itinerary.budget/1000).toFixed(0)}k</p><p className="text-xs text-slate-500">orçamento</p></div>
            <div className="text-center"><div className="flex items-center gap-1 text-amber-500"><Star size={18} className="fill-amber-500" /><span className="text-xl font-bold">{itinerary.rating}</span></div><p className="text-xs text-slate-500">{itinerary.reviews} reviews</p></div>
            <div className="text-center"><div className="flex items-center gap-1 text-rose-500"><Heart size={18} className="fill-rose-500" /><span className="text-xl font-bold">{(itinerary.likes/1000).toFixed(1)}k</span></div><p className="text-xs text-slate-500">curtidas</p></div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b flex-shrink-0">
          {[{ id: 'overview', label: 'Visão Geral', icon: Eye }, { id: 'gallery', label: 'Galeria', icon: ImageIcon }, { id: 'reviews', label: `Avaliações (${itinerary.comments?.length || 0})`, icon: MessageSquare }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-all ${tab === t.id ? 'text-teal-600 border-teal-600 bg-teal-50/50' : 'text-slate-500 border-transparent hover:bg-slate-50'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Destaques</h3>
                <div className="grid grid-cols-2 gap-2">{itinerary.highlights.map((h, i) => <div key={i} className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl"><span className="text-amber-500">✨</span><span className="text-sm font-medium text-amber-800">{h}</span></div>)}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2"><Plane size={18} /> Voo Recomendado</div>
                  <p className="font-bold">{flight?.name}</p>
                  <p className="text-sm text-blue-600">{flight?.duration} • ⭐ {flight?.rating}</p>
                  <p className="text-lg font-bold text-blue-700 mt-2">R$ {flight?.price.toLocaleString('pt-BR')}/pessoa</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
                  <div className="flex items-center gap-2 text-violet-700 font-semibold mb-2"><Hotel size={18} /> Hotel Recomendado</div>
                  <p className="font-bold">{hotel?.name} {'⭐'.repeat(hotel?.stars || 0)}</p>
                  <p className="text-sm text-violet-600">{hotel?.location}</p>
                  <p className="text-lg font-bold text-violet-700 mt-2">R$ {hotel?.price.toLocaleString('pt-BR')}/noite</p>
                </div>
              </div>
              {/* Ratings Breakdown */}
              {itinerary.ratings && (
                <div className="p-4 bg-slate-50 rounded-xl border">
                  <h3 className="font-bold text-slate-800 mb-3">Avaliações Detalhadas</h3>
                  <div className="space-y-2">
                    {[{ key: 'cleanliness', label: 'Organização' }, { key: 'value', label: 'Custo-benefício' }, { key: 'location', label: 'Localização' }].map(r => (
                      <div key={r.key} className="flex items-center gap-3">
                        <span className="text-sm text-slate-600 w-32">{r.label}</span>
                        <div className="flex-1 bg-slate-200 rounded-full h-2 overflow-hidden">
                          <div className="bg-teal-500 h-full rounded-full" style={{ width: `${(itinerary.ratings[r.key] / 5) * 100}%` }} />
                        </div>
                        <span className="text-sm font-bold text-slate-700">{itinerary.ratings[r.key]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {tab === 'gallery' && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="col-span-2 row-span-2 rounded-xl overflow-hidden aspect-video">
                <img src={dest?.coverUrl} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              {dest?.galleryUrls?.map((url, i) => (
                <div key={i} className="rounded-xl overflow-hidden aspect-square">
                  <img src={url} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              ))}
            </div>
          )}
          
          {tab === 'reviews' && (
            <div className="space-y-4">
              {/* Add Comment */}
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <p className="font-semibold text-teal-800 mb-3">Deixe sua avaliação</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">Sua nota:</span>
                  {[1,2,3,4,5].map(n => <button key={n} onClick={() => setRating(n)} className="hover:scale-110 transition-transform"><Star size={24} className={n <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'} /></button>)}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Conte sua experiência..." className="flex-1 px-4 py-3 bg-white border rounded-xl" />
                  <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium flex items-center gap-2 hover:bg-teal-700"><Send size={18} /></button>
                </div>
              </div>
              
              {/* Comments */}
              {itinerary.comments?.map(c => (
                <div key={c.id} className="p-4 bg-white rounded-xl border hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3"><span className="text-2xl">{c.avatar}</span><div><p className="font-semibold">{c.user}</p><p className="text-xs text-slate-400">{c.date}</p></div></div>
                    <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < c.rating ? 'fill-amber-500 text-amber-500' : 'text-slate-200'} />)}</div>
                  </div>
                  <p className="text-slate-600">{c.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Action Button */}
        <div className="p-4 border-t bg-slate-50 flex-shrink-0">
          <button onClick={() => { onUse(itinerary); onClose(); }} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg transition-all">
            <Copy size={20} /> Usar Este Roteiro como Base
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== ACTIVITY EDIT MODAL ==========
const ActivityModal = ({ isOpen, onClose, activities, restaurants, current, onSelect, onRemove, mode, dayNum }) => {
  const [tab, setTab] = useState('activities');
  const [search, setSearch] = useState('');
  if (!isOpen) return null;
  
  const items = tab === 'activities' ? activities : restaurants;
  const filtered = items?.filter(i => i.name.toLowerCase().includes(search.toLowerCase()) || i.location?.toLowerCase().includes(search.toLowerCase())) || [];
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">{mode === 'swap' ? <RefreshCw size={22} /> : <Plus size={22} />} {mode === 'swap' ? 'Trocar Atividade' : 'Adicionar Atividade'}</h2>
              {dayNum && <p className="text-teal-100 text-sm">Dia {dayNum} do roteiro</p>}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X size={22} /></button>
          </div>
          {current && mode === 'swap' && <div className="mt-3 p-3 bg-white/10 rounded-xl"><p className="text-xs text-teal-200">Substituindo:</p><p className="font-medium">{current.name}</p></div>}
        </div>
        
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex gap-2 mb-3">
            <button onClick={() => setTab('activities')} className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${tab === 'activities' ? 'bg-teal-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}><Camera size={18} /> Atividades</button>
            <button onClick={() => setTab('restaurants')} className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${tab === 'restaurants' ? 'bg-teal-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}><Utensils size={18} /> Restaurantes</button>
          </div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map(item => (
            <button key={item.id} onClick={() => { onSelect({ ...item, category: tab === 'restaurants' ? 'restaurant' : 'activity' }); onClose(); }} className="w-full p-4 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border hover:border-teal-300 transition-all group">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-bold text-slate-800 group-hover:text-teal-700">{item.name}</p>
                  <p className="text-sm text-slate-500 mt-0.5">📍 {item.location || item.cuisine} {item.duration && `• ${item.duration}h`}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    {item.price === 0 ? <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">✨ Gratuito</span> : <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">R$ {item.price}</span>}
                    {item.childFriendly && <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">👶 Kids</span>}
                    {item.intensity === 'light' && <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">🌿 Leve</span>}
                    {item.intensity === 'heavy' && <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">🔥 Intenso</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500 ml-4"><Star size={16} className="fill-amber-500" /><span className="font-bold">{item.rating}</span></div>
              </div>
            </button>
          ))}
        </div>
        
        {current && mode === 'swap' && (
          <div className="p-4 border-t bg-red-50 flex-shrink-0">
            <button onClick={() => { onRemove(); onClose(); }} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"><Trash2 size={18} /> Remover do Roteiro</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== AI INSIGHT CARD ==========
const AIInsightCard = ({ insight, onAction }) => {
  const colors = { 
    warning: { bg: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600', icon: 'text-amber-600' }, 
    success: { bg: 'bg-emerald-50 border-emerald-200', btn: 'bg-emerald-500 hover:bg-emerald-600', icon: 'text-emerald-600' }, 
    info: { bg: 'bg-blue-50 border-blue-200', btn: 'bg-blue-500 hover:bg-blue-600', icon: 'text-blue-600' }, 
    danger: { bg: 'bg-red-50 border-red-200', btn: 'bg-red-500 hover:bg-red-600', icon: 'text-red-600' }, 
    tip: { bg: 'bg-violet-50 border-violet-200', btn: 'bg-violet-500 hover:bg-violet-600', icon: 'text-violet-600' }, 
    profile: { bg: 'bg-teal-50 border-teal-200', btn: 'bg-teal-500 hover:bg-teal-600', icon: 'text-teal-600' },
    upgrade: { bg: 'bg-emerald-50 border-emerald-200', btn: 'bg-emerald-500 hover:bg-emerald-600', icon: 'text-emerald-600' },
    downgrade: { bg: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600', icon: 'text-amber-600' },
  };
  const style = colors[insight.type] || colors.info;
  const Icon = insight.icon || Lightbulb;
  
  return (
    <div className={`p-4 rounded-xl border-2 ${style.bg} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2.5 rounded-lg bg-white shadow-sm`}><Icon size={20} className={style.icon} /></div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">{insight.title}</p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{insight.message}</p>
          {insight.savings && <p className="text-xs font-bold text-emerald-600 mt-2">💰 Economia: R$ {insight.savings.toLocaleString('pt-BR')}</p>}
          {insight.cost && <p className="text-xs font-bold text-violet-600 mt-2">💎 Investimento: +R$ {insight.cost.toLocaleString('pt-BR')}</p>}
          {insight.action && <button onClick={() => onAction && onAction(insight)} className={`mt-3 px-4 py-2 ${style.btn} text-white text-xs font-bold rounded-lg transition-colors`}>{insight.action}</button>}
        </div>
      </div>
    </div>
  );
};

// ========== ENHANCED DAY CARD WITH TIMELINE ==========
const DayCard = ({ day, startDate, items, isFirst, isLast, origin, destination, flight, hotel, totalPayingTravelers, tripDays, arrivalInfo, departureTime, onEditItem, onAddItem, onRemoveItem }) => {
  const dateInfo = formatDate(startDate, day - 1 + (arrivalInfo?.daysAdded || 0));
  const [expanded, setExpanded] = useState(true);
  
  let dayTotal = 0;
  if (isFirst && flight) dayTotal += flight.price * totalPayingTravelers;
  if (hotel) dayTotal += hotel.price;
  items.forEach(item => { dayTotal += (item.price || 0); });
  if (isLast && flight) dayTotal += flight.price * totalPayingTravelers;
  
  // Sort items by startTime
  const sortedItems = [...items].sort((a, b) => {
    const timeA = a.startTime || '12:00';
    const timeB = b.startTime || '12:00';
    return timeA.localeCompare(timeB);
  });
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 day-card">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-200 text-xs font-medium tracking-wide">{dateInfo.weekday}</p>
            <p className="text-3xl font-bold">{dateInfo.day}/{dateInfo.month}</p>
          </div>
          <div className="flex items-center gap-2">
            {isFirst && arrivalInfo?.isOvernightFlight && <span className="px-2 py-1 bg-orange-400 text-orange-900 text-xs font-bold rounded-full">🌙 Voo Noturno</span>}
            {isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> Chegada</span>}
            {isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneTakeoff size={12} /> Partida</span>}
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between">
          <span className="text-teal-200 text-xs">Custo do dia:</span>
          <span className="font-bold text-lg">R$ {dayTotal.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      
      {/* Content */}
      {expanded && (
        <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
          {/* Flight Arrival */}
          {isFirst && flight && (
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> {arrivalInfo?.time || '??:??'}</span>
                {arrivalInfo?.isLongFlight && <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">⚠️ Voo Longo ({arrivalInfo.flightHours}h)</span>}
              </div>
              <h4 className="font-bold text-slate-800">✈️ Chegada - {flight.name}</h4>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{origin?.split(' ')[0]} → {destination?.split(',')[0]}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span>
                <span className="text-xs text-slate-400">{flight.duration}</span>
              </div>
            </div>
          )}
          
          {/* Rest Card for Long Flights */}
          {isFirst && arrivalInfo?.requiresRest && (
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1"><Bed size={12} /> Recuperação</span>
              </div>
              <h4 className="font-bold text-slate-800">😴 Descanso e Recuperação</h4>
              <p className="text-sm text-slate-500 mt-1">Adaptação ao fuso horário ({arrivalInfo.timezoneDiff > 0 ? '+' : ''}{arrivalInfo.timezoneDiff}h)</p>
              <div className="mt-2 p-2 bg-indigo-50 rounded-lg">
                <p className="text-xs text-indigo-600">💡 IA de Fadiga: Após voos longos ({arrivalInfo.flightHours}h), recomendamos atividades leves na chegada.</p>
              </div>
            </div>
          )}
          
          {/* Hotel */}
          {hotel && (
            <div className="pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between mb-2">
                <span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full flex items-center gap-1"><Hotel size={12} /> Hospedagem</span>
              </div>
              <h4 className="font-bold text-slate-800">🏨 {hotel.name}</h4>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{hotel.location} • {'⭐'.repeat(hotel.stars)}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {hotel.price.toLocaleString('pt-BR')}/noite</span>
              </div>
            </div>
          )}
          
          {/* Activities Timeline */}
          {sortedItems.map((item, idx) => {
            const periodStyle = getPeriodStyle(item.period);
            const PeriodIcon = periodStyle.icon;
            const endTime = item.startTime && item.duration ? 
              `${Math.floor(parseInt(item.startTime.split(':')[0]) + item.duration).toString().padStart(2, '0')}:${item.startTime.split(':')[1]}` : '';
            
            return (
              <div key={idx} className="pb-3 border-b border-slate-100 last:border-0 group relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 ${periodStyle.bg} ${periodStyle.text} text-xs font-semibold rounded-full flex items-center gap-1`}>
                      <PeriodIcon size={12} /> {item.startTime || periodStyle.label}
                      {endTime && <span className="opacity-70">- {endTime}</span>}
                    </span>
                    {item.childFriendly && <span className="text-xs text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">👶 Kids</span>}
                    {item.intensity === 'heavy' && <span className="text-xs text-red-500 bg-red-50 px-2 py-0.5 rounded-full">🔥 Intenso</span>}
                  </div>
                  {/* Edit Actions */}
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                    <button onClick={() => onEditItem && onEditItem(day, idx, item)} className="p-1.5 bg-teal-100 hover:bg-teal-200 rounded-lg transition-colors" title="Trocar"><RefreshCw size={14} className="text-teal-600" /></button>
                    <button onClick={() => onRemoveItem && onRemoveItem(day, idx)} className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg transition-colors" title="Remover"><Trash2 size={14} className="text-red-600" /></button>
                  </div>
                </div>
                <h4 className="font-bold text-slate-800">{item.category === 'restaurant' ? '🍽️' : item.type === 'lunch_suggestion' ? '🥗' : '🎯'} {item.name}</h4>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{item.location || item.cuisine}</p>
                <div className="flex items-center gap-3 mt-2">
                  {item.price === 0 ? <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded flex items-center gap-1"><Sparkles size={10} /> Gratuito</span> : <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {item.price?.toLocaleString('pt-BR')}</span>}
                  {item.duration && <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.duration}h</span>}
                </div>
              </div>
            );
          })}
          
          {/* Add Activity Button */}
          <button onClick={() => onAddItem && onAddItem(day)} className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 no-print">
            <Plus size={18} /> Adicionar Atividade
          </button>
          
          {/* Flight Departure */}
          {isLast && flight && (
            <div className="pt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1"><Moon size={12} /> {departureTime || '20:00'}</span>
              </div>
              <h4 className="font-bold text-slate-800">✈️ Voo de Volta</h4>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{destination?.split(',')[0]} → {origin?.split(' ')[0]}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== COMMUNITY CARD ==========
const CommunityCard = ({ itinerary, onUse, onLike, onViewDetails, isLiked, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura', gastro: '🍽️ Gastronômico' };
  
  if (compact) return (
    <div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all cursor-pointer" onClick={() => onViewDetails && onViewDetails(itinerary)}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm text-slate-800 truncate">{itinerary.title}</h4>
          <p className="text-xs text-slate-500">{itinerary.duration} dias • R$ {(itinerary.budget/1000).toFixed(0)}k</p>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {itinerary.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</div>}
        <button onClick={(e) => { e.stopPropagation(); onLike && onLike(itinerary.id); }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}><Heart size={16} className={isLiked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold leading-tight">{itinerary.title}</h3><p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p></div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">{itinerary.author.avatar}</span><div className="flex-1"><p className="text-xs font-medium text-slate-700">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-teal-500" />}</p><p className="text-[10px] text-slate-400">{itinerary.duration} dias • {itinerary.travelers} viajantes • R$ {itinerary.budget.toLocaleString('pt-BR')}</p></div><div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" /><span className="text-sm font-bold">{itinerary.rating}</span></div></div>
        <div className="flex flex-wrap gap-1 mb-3">{itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{typeLabels[t] || t}</span>)}</div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />{itinerary.likes + (isLiked ? 1 : 0)}</span>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.reviews}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onViewDetails && onViewDetails(itinerary)} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-200 flex items-center gap-1"><Eye size={12} /> Detalhes</button>
            <button onClick={() => onUse && onUse(itinerary)} className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 flex items-center gap-1"><Copy size={12} /> Usar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== PROFILE PAGE ==========
const ProfilePage = ({ user, setUser, userProfile, setUserProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile);
  const [tempUser, setTempUser] = useState({ ...user });
  
  const toggleType = (typeId) => {
    if (!editing) return;
    const current = tempProfile.types || [];
    if (current.includes(typeId)) {
      if (current.length > 1) setTempProfile({...tempProfile, types: current.filter(t => t !== typeId)});
    } else if (current.length < 3) {
      setTempProfile({...tempProfile, types: [...current, typeId]});
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{user.avatar}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-teal-200">{user.email}</p>
            <p className="text-sm text-teal-300 mt-1">Membro desde {user.joinDate}</p>
          </div>
          <button onClick={onLogout} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 flex items-center gap-2"><LogOut size={16} /> Sair</button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {[{ id: 'info', label: 'Meus Dados', icon: User }, { id: 'profile', label: 'Perfil Viajante', icon: Compass }, { id: 'trips', label: 'Minhas Viagens', icon: Map }, { id: 'saved', label: 'Salvos', icon: Bookmark }, { id: 'settings', label: 'Configurações', icon: Settings }].map(tab => (
          <button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(false); }} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {/* Meus Dados */}
        {activeTab === 'info' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>
              {!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div><label className="text-sm font-medium text-slate-500 block mb-1">Nome Completo</label><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div>
              <div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div>
              <div><label className="text-sm font-medium text-slate-500 block mb-1">Telefone</label><input type="tel" value={tempUser.phone || ''} onChange={(e) => setTempUser({...tempUser, phone: e.target.value})} disabled={!editing} placeholder="+55 (11) 99999-9999" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div>
              <div><label className="text-sm font-medium text-slate-500 block mb-1">Cidade</label><input type="text" value={tempUser.city || ''} onChange={(e) => setTempUser({...tempUser, city: e.target.value})} disabled={!editing} placeholder="São Paulo, SP" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div>
            </div>
          </div>
        )}
        
        {/* Perfil Viajante */}
        {activeTab === 'profile' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>
              {!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}
            </div>
            <h3 className="font-semibold text-slate-700 mb-2">Seus estilos de viagem <span className="text-xs text-slate-400">(escolha até 3)</span></h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {TRAVELER_TYPES.map(type => {
                const isSelected = (tempProfile.types || []).includes(type.id);
                return (
                  <button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-slate-300'} ${!editing && 'opacity-70'}`}>
                    <type.icon size={28} className={isSelected ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} />
                    <p className="font-medium text-sm mt-2">{type.name}</p>
                    <p className="text-xs text-slate-500">{type.desc}</p>
                    {isSelected && <span className="text-[10px] text-teal-600 font-semibold">✓ Selecionado</span>}
                  </button>
                );
              })}
            </div>
            <h3 className="font-semibold text-slate-700 mb-3">Interesses</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {INTEREST_TAGS.map(tag => (
                <button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tag}</button>
              ))}
            </div>
            <h3 className="font-semibold text-slate-700 mb-3">Orçamento preferido</h3>
            <div className="grid grid-cols-3 gap-3">
              {[{ id: 'budget', label: 'Econômico', desc: 'Até R$ 15k', icon: '💰' }, { id: 'medium', label: 'Médio', desc: 'R$ 15k - 40k', icon: '✨' }, { id: 'luxury', label: 'Luxo', desc: 'Acima R$ 40k', icon: '👑' }].map(opt => (
                <button key={opt.id} onClick={() => editing && setTempProfile({...tempProfile, preferredBudget: opt.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${tempProfile.preferredBudget === opt.id ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}>
                  <span className="text-2xl">{opt.icon}</span>
                  <p className="font-medium mt-1">{opt.label}</p>
                  <p className="text-xs text-slate-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Minhas Viagens */}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500 mb-4">Suas viagens planejadas aparecerão aqui</p></div>}
        
        {/* Salvos */}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nada salvo ainda</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
        
        {/* Configurações */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Configurações da Conta</h2>
            {[{ icon: Bell, label: 'Notificações', desc: 'Alertas de preços e promoções' }, { icon: Shield, label: 'Privacidade', desc: 'Configurações de dados' }, { icon: CreditCard, label: 'Métodos de Pagamento', desc: 'Cartões e formas de pagamento' }].map((item, i) => (
              <button key={i} className="w-full p-4 bg-slate-50 rounded-xl text-left hover:bg-slate-100 transition-colors flex items-center justify-between">
                <div className="flex items-center gap-3"><item.icon size={20} className="text-slate-600" /><div><p className="font-medium">{item.label}</p><p className="text-xs text-slate-500">{item.desc}</p></div></div>
                <ChevronDown size={20} className="text-slate-400" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== MAIN APP COMPONENT ==========
export default function App() {
  // User state
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ types: [], interests: [], preferredBudget: 'medium' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  
  // Trip planning state
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-14');
  const [endDate, setEndDate] = useState('2026-04-20');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(28000);
  const [departureTime, setDepartureTime] = useState('22:00');
  const [returnTime, setReturnTime] = useState('20:00');
  
  // Itinerary state
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [daySchedule, setDaySchedule] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  
  // UI state
  const [communityFilter, setCommunityFilter] = useState({ destination: 'all', type: 'all' });
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [tripPriorities, setTripPriorities] = useState([]);
  const [likedItineraries, setLikedItineraries] = useState([]);
  const [showPriorityPanel, setShowPriorityPanel] = useState(false);
  
  // Modal state
  const [activityModal, setActivityModal] = useState({ isOpen: false, day: null, idx: null, current: null, mode: 'add' });
  const [communityDetailModal, setCommunityDetailModal] = useState({ isOpen: false, itinerary: null });
  
  // Computed values
  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const tripDays = useMemo(() => Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))), [startDate, endDate]);
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;
  
  // Arrival calculation
  const arrivalInfo = useMemo(() => {
    if (!destination || !selectedFlight) return null;
    return calculateArrival(origin, destination, departureTime, selectedFlight.duration);
  }, [origin, destination, departureTime, selectedFlight]);
  
  // Cost calculation
  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, activities: 0, food: 0, transport: 0, total: 0, percentages: {} };
    const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers * 2;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    let activitiesCost = 0, foodCost = 0, transportCost = 0;
    Object.values(daySchedule).forEach(day => { day.forEach(item => { if (item.type === 'transfer') transportCost += (item.price || 0); else if (item.category === 'restaurant') foodCost += (item.price || 0); else activitiesCost += (item.price || 0); }); });
    const total = flightCost + hotelCost + (activitiesCost + foodCost) * totalPayingTravelers + transportCost;
    return { flights: flightCost, hotels: hotelCost, activities: activitiesCost * totalPayingTravelers, food: foodCost * totalPayingTravelers, transport: transportCost, total, percentages: total > 0 ? { flights: Math.round((flightCost / total) * 100), hotels: Math.round((hotelCost / total) * 100), activities: Math.round(((activitiesCost * totalPayingTravelers) / total) * 100), food: Math.round(((foodCost * totalPayingTravelers) / total) * 100), transport: Math.round((transportCost / total) * 100) } : {} };
  }, [selectedFlight, selectedHotel, daySchedule, tripDays, totalPayingTravelers, itineraryGenerated]);

  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;
  
  // Insight action handler
  const handleInsightAction = (insight) => {
    if (!currentData) return;
    if (insight.actionType === 'upgrade_hotel') {
      const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays && h.id !== selectedHotel?.id);
      if (betterHotel) setSelectedHotel(betterHotel);
    } else if (insight.actionType === 'downgrade_hotel') {
      const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0);
      if (cheaperHotel) setSelectedHotel(cheaperHotel);
    } else if (insight.actionType === 'downgrade_flight') {
      const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price);
      if (cheaperFlight) setSelectedFlight(cheaperFlight);
    } else if (insight.actionType === 'upgrade_flight') {
      const betterFlight = currentData.flights.find(f => f.price > selectedFlight?.price && f.rating > selectedFlight?.rating);
      if (betterFlight) setSelectedFlight(betterFlight);
    }
  };

  // Enhanced AI Insights with Upgrade/Downgrade logic
  const insights = useMemo(() => {
    if (!itineraryGenerated || !currentData) return [];
    const list = [];
    const userTypes = userProfile.types || [];
    const prioritizesComfort = tripPriorities.includes('comfort') || userTypes.includes('luxury');
    
    // BUDGET DEFICIT - Downgrade suggestions
    if (isOverBudget) {
      const deficit = Math.abs(remaining);
      
      // Suggest hotel downgrade (unless comfort is priority)
      if (!prioritizesComfort) {
        const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0);
        if (cheaperHotel) {
          const savings = (selectedHotel.price - cheaperHotel.price) * tripDays;
          list.push({ 
            type: 'downgrade', icon: ArrowDownCircle, 
            title: '⬇️ Downgrade de Hotel Sugerido', 
            message: `Troque ${selectedHotel.name} (${selectedHotel.stars}★) por ${cheaperHotel.name} (${cheaperHotel.stars}★) - avaliação ${cheaperHotel.rating}⭐`, 
            savings, action: 'Aplicar Downgrade', actionType: 'downgrade_hotel' 
          });
        }
      }
      
      // Suggest flight downgrade
      const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price);
      if (cheaperFlight) {
        const savings = (selectedFlight.price - cheaperFlight.price) * totalPayingTravelers * 2;
        list.push({ 
          type: 'downgrade', icon: ArrowDownCircle, 
          title: '⬇️ Voo Mais Econômico', 
          message: `Opte por ${cheaperFlight.name} ao invés de ${selectedFlight.name}`, 
          savings, action: 'Trocar Voo', actionType: 'downgrade_flight' 
        });
      }
      
      // Overall warning
      list.push({ 
        type: 'danger', icon: AlertTriangle, 
        title: '⚠️ Orçamento Excedido!', 
        message: `Você está R$ ${deficit.toLocaleString('pt-BR')} acima do limite. Aplique os downgrades sugeridos ou aumente o orçamento.` 
      });
    }
    
    // BUDGET SURPLUS - Upgrade suggestions
    if (!isOverBudget && remaining > totalBudget * 0.15) {
      // Hotel upgrade
      const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price > selectedHotel?.price && (h.price - selectedHotel?.price) * tripDays <= remaining && h.id !== selectedHotel?.id);
      if (betterHotel) {
        const cost = (betterHotel.price - selectedHotel.price) * tripDays;
        list.push({ 
          type: 'upgrade', icon: ArrowUpCircle, 
          title: '✨ Upgrade Disponível!', 
          message: `Com R$ ${remaining.toLocaleString('pt-BR')} sobrando, faça upgrade para ${betterHotel.name} (${betterHotel.stars}★)!`, 
          cost, action: 'Aplicar Upgrade', actionType: 'upgrade_hotel' 
        });
      }
      
      // Flight upgrade
      const betterFlight = currentData.flights.find(f => f.price > selectedFlight?.price && (f.price - selectedFlight?.price) * totalPayingTravelers * 2 <= remaining);
      if (betterFlight && !betterHotel) {
        const cost = (betterFlight.price - selectedFlight.price) * totalPayingTravelers * 2;
        list.push({ 
          type: 'upgrade', icon: ArrowUpCircle, 
          title: '✈️ Upgrade de Voo', 
          message: `Voo ${betterFlight.name} com melhor avaliação (${betterFlight.rating}⭐) disponível!`, 
          cost, action: 'Fazer Upgrade', actionType: 'upgrade_flight' 
        });
      }
      
      if (!betterHotel && !betterFlight) {
        list.push({ 
          type: 'success', icon: Award, 
          title: '🎯 Dentro do Orçamento!', 
          message: `Sobrou R$ ${remaining.toLocaleString('pt-BR')}! Adicione mais experiências ou economize.` 
        });
      }
    }
    
    // Destination tip
    if (currentData.tip) {
      list.push({ type: 'tip', icon: Lightbulb, title: '💡 Dica Local', message: currentData.tip });
    }
    
    // Long flight warning
    if (arrivalInfo?.isLongFlight) {
      list.push({ 
        type: 'info', icon: Clock, 
        title: '😴 Voo Longo Detectado', 
        message: `${arrivalInfo.flightHours}h de voo. Recomendamos atividades leves no primeiro dia para adaptação ao fuso (${arrivalInfo.timezoneDiff > 0 ? '+' : ''}${arrivalInfo.timezoneDiff}h).` 
      });
    }
    
    return list;
  }, [itineraryGenerated, currentData, isOverBudget, remaining, selectedHotel, selectedFlight, tripDays, totalPayingTravelers, totalBudget, arrivalInfo, tripPriorities, userProfile]);


  // Filtered community itineraries
  const filteredCommunity = useMemo(() => {
    return COMMUNITY_ITINERARIES.filter(i => {
      if (communityFilter.destination !== 'all' && i.destination !== communityFilter.destination) return false;
      if (communityFilter.type !== 'all' && !i.tags.includes(communityFilter.type)) return false;
      return true;
    });
  }, [communityFilter]);

  const suggestedItineraries = useMemo(() => {
    if (likedItineraries.length === 0) return [];
    const likedTags = new Set();
    COMMUNITY_ITINERARIES.filter(i => likedItineraries.includes(i.id)).forEach(i => i.tags.forEach(t => likedTags.add(t)));
    return COMMUNITY_ITINERARIES.filter(i => !likedItineraries.includes(i.id) && i.tags.some(t => likedTags.has(t))).slice(0, 3);
  }, [likedItineraries]);

  const filteredDestinations = useMemo(() => {
    if (selectedContinent === 'all') return Object.entries(DESTINATIONS_DATABASE);
    return Object.entries(DESTINATIONS_DATABASE).filter(([_, d]) => d.continent === selectedContinent);
  }, [selectedContinent]);

  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  // Handlers
  const togglePriority = (id) => {
    if (tripPriorities.includes(id)) setTripPriorities(tripPriorities.filter(p => p !== id));
    else if (tripPriorities.length < 3) setTripPriorities([...tripPriorities, id]);
  };

  const toggleLike = (id) => {
    if (likedItineraries.includes(id)) setLikedItineraries(likedItineraries.filter(i => i !== id));
    else setLikedItineraries([...likedItineraries, id]);
  };
  
  // Activity edit handlers
  const handleEditItem = (day, idx, item) => {
    setActivityModal({ isOpen: true, day, idx, current: item, mode: 'swap' });
  };
  
  const handleAddItem = (day) => {
    setActivityModal({ isOpen: true, day, idx: null, current: null, mode: 'add' });
  };
  
  const handleRemoveItem = (day, idx) => {
    const newSchedule = { ...daySchedule };
    newSchedule[day] = newSchedule[day].filter((_, i) => i !== idx);
    setDaySchedule(newSchedule);
  };
  
  const handleSelectActivity = (activity) => {
    const { day, idx, mode } = activityModal;
    const newSchedule = { ...daySchedule };
    if (mode === 'swap' && idx !== null) {
      newSchedule[day][idx] = activity;
    } else {
      newSchedule[day] = [...(newSchedule[day] || []), activity];
    }
    setDaySchedule(newSchedule);
  };

  // Gap Intelligence - Add lunch suggestion if gap detected
  const addLunchSuggestions = (schedule, restaurants) => {
    const newSchedule = { ...schedule };
    Object.keys(newSchedule).forEach(day => {
      const items = newSchedule[day];
      const morningActs = items.filter(i => i.period === 'manhã' && i.category !== 'restaurant');
      const afternoonActs = items.filter(i => i.period === 'tarde' && i.category !== 'restaurant');
      const hasLunch = items.some(i => i.category === 'restaurant' && (i.period === 'tarde' || i.startTime?.includes('12') || i.startTime?.includes('13')));
      
      if (morningActs.length > 0 && afternoonActs.length > 0 && !hasLunch) {
        const lastMorning = morningActs[morningActs.length - 1];
        const lunchOption = restaurants?.find(r => r.period === 'tarde' && r.price < 100) || restaurants?.[0];
        if (lunchOption) {
          newSchedule[day].push({
            ...lunchOption,
            category: 'restaurant',
            type: 'lunch_suggestion',
            startTime: '12:30',
            name: `🥗 ${lunchOption.name} (Sugestão IA)`,
            location: `Próximo a ${lastMorning.location}`
          });
        }
      }
    });
    return newSchedule;
  };

  // Generate itinerary
  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);
    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.30, hotels: totalBudget * 0.35 };
      
      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers * 2 <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];
      
      const hotelBudget = budget.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudget);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];
      
      // Score activities
      const scoreActivity = (act) => {
        let score = act.rating * 10;
        const userTypes = userProfile.types || [];
        if (userTypes.includes('beach') && act.tags?.includes('beach')) score += 30;
        if (userTypes.includes('gastro') && act.tags?.includes('gastro')) score += 30;
        if (userTypes.includes('adventure') && act.tags?.includes('adventure')) score += 30;
        if (userTypes.includes('romantic') && act.tags?.includes('romantic')) score += 30;
        if (userTypes.includes('culture') && (act.tags?.includes('culture') || act.tags?.includes('history'))) score += 30;
        if (userTypes.includes('family') && act.childFriendly) score += 25;
        if (tripPriorities.includes('gastronomy') && act.tags?.includes('gastro')) score += 50;
        if (tripPriorities.includes('beaches') && act.tags?.includes('beach')) score += 50;
        if (tripPriorities.includes('culture') && act.tags?.includes('culture')) score += 50;
        if (tripPriorities.includes('adventure') && act.tags?.includes('adventure')) score += 50;
        if (children > 0 && !act.childFriendly) score -= 20;
        // Penalize heavy activities for first day if long flight
        const arrival = calculateArrival(origin, destination, departureTime, bestFlight.duration);
        if (arrival.isLongFlight && act.intensity === 'heavy') score -= 30;
        return score;
      };
      
      const sortedActivities = [...data.activities].sort((a, b) => scoreActivity(b) - scoreActivity(a));
      const restaurants = [...data.restaurants].sort((a, b) => b.rating - a.rating);
      
      // Build schedule
      let schedule = {};
      let actIdx = 0, restIdx = 0;
      const usedActivities = new Set();
      
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        
        // First day: transfer + rest if long flight
        if (d === 1) {
          schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: `Aeroporto → ${bestHotel.location}`, price: Math.round(80 + bestFlight.price * 0.02), duration: 1, period: 'manhã', startTime: arrivalInfo?.time || '08:00' });
        }
        
        const activitiesForDay = d === tripDays ? 1 : (d === 1 ? 2 : 3);
        
        for (let i = 0; i < sortedActivities.length && schedule[d].filter(i => i.category === 'activity').length < activitiesForDay; i++) {
          const act = sortedActivities[i];
          if (!usedActivities.has(act.id)) {
            // Skip heavy activities on first day if long flight
            const arrival = calculateArrival(origin, destination, departureTime, bestFlight.duration);
            if (d === 1 && arrival.isLongFlight && act.intensity === 'heavy') continue;
            usedActivities.add(act.id);
            schedule[d].push({ ...act, category: 'activity' });
          }
        }
        
        if (restIdx < restaurants.length) {
          const rest = restaurants[restIdx % restaurants.length];
          schedule[d].push({ ...rest, category: 'restaurant', location: rest.cuisine });
          restIdx++;
        }
      }
      
      // Add lunch suggestions with Gap Intelligence
      schedule = addLunchSuggestions(schedule, restaurants);
      
      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setDaySchedule(schedule);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  const useCommunityItinerary = (itinerary) => {
    const data = DESTINATIONS_DATABASE[itinerary.destination];
    if (!data) return;
    setDestination(itinerary.destination);
    setTotalBudget(itinerary.budget);
    const flight = data.flights.find(f => f.id === itinerary.flightId) || data.flights[0];
    const hotel = data.hotels.find(h => h.id === itinerary.hotelId) || data.hotels[0];
    setSelectedFlight(flight);
    setSelectedHotel(hotel);
    setTimeout(() => generateItinerary(), 100);
  };
  
  // Print handler
  const handlePrint = () => {
    const style = document.createElement('style');
    style.textContent = printStyles;
    document.head.appendChild(style);
    window.print();
    setTimeout(() => document.head.removeChild(style), 1000);
  };


  // ========== RENDER ==========
  
  // Landing page
  if (!user || currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button>
                  <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>
                  <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>
                </>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="px-6 py-2 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700">Entrar</button>
              )}
            </div>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl font-bold text-slate-800 mb-6">Planeje sua viagem dos sonhos com <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Inteligência Artificial</span></h1>
            <p className="text-xl text-slate-600 mb-8">Roteiros personalizados, cálculo automático de fusos horários e sugestões inteligentes de upgrades e economia.</p>
            <button onClick={() => user ? setCurrentView('planner') : setShowAuthModal(true)} className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center gap-2 mx-auto">
              <Sparkles size={24} /> Começar a Planejar
            </button>
          </div>
          
          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Clock, title: 'Cálculo de Fuso Inteligente', desc: 'Saiba exatamente que horas você chega, considerando fusos horários automaticamente.' },
              { icon: ArrowUpCircle, title: 'Concierge Financeiro', desc: 'Sugestões de upgrades quando sobra e downgrades estratégicos quando excede.' },
              { icon: Lightbulb, title: 'IA de Fadiga', desc: 'Atividades leves no primeiro dia para voos longos. Nunca mais jet lag pesado!' },
            ].map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all">
                <f.icon size={40} className="text-teal-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-500">{f.desc}</p>
              </div>
            ))}
          </div>
          
          {/* Top Destinations */}
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Destinos em Alta</h2>
          <div className="grid md:grid-cols-4 gap-4">
            {Object.entries(DESTINATIONS_DATABASE).slice(0, 4).map(([name, data]) => (
              <div key={name} onClick={() => { setDestination(name); user ? setCurrentView('planner') : setShowAuthModal(true); }} className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${data.coverUrl})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="text-3xl">{data.image}</span>
                  <h3 className="text-white font-bold">{name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setCurrentView('planner'); }} />
      </div>
    );
  }
  
  // Profile page
  if (currentView === 'profile') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('planner')} className="flex items-center gap-2 text-slate-600 hover:text-teal-600"><Globe size={24} className="text-teal-600" /><span className="font-bold">SmartTravel AI</span></button>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button>
              <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onLogout={() => { setUser(null); setCurrentView('landing'); }} />
        </div>
      </div>
    );
  }
  
  // Community page
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 text-slate-600 hover:text-teal-600"><Globe size={24} className="text-teal-600" /><span className="font-bold">SmartTravel AI</span></button>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button>
              <button className="text-teal-600 font-bold">Comunidade</button>
              <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span>{user.avatar}</span></button>
            </div>
          </div>
        </nav>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Comunidade de Viajantes</h1>
          <p className="text-slate-500 mb-8">Explore roteiros criados por viajantes reais</p>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select value={communityFilter.destination} onChange={(e) => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-xl">
              <option value="all">Todos os Destinos</option>
              {Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={communityFilter.type} onChange={(e) => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-xl">
              <option value="all">Todos os Tipos</option>
              {TRAVELER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          
          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunity.map(it => (
              <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} />
            ))}
          </div>
        </div>
        
        <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
      </div>
    );
  }


  // ========== PLANNER VIEW (Main) ==========
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Inject print styles */}
      <style>{printStyles}</style>
      
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('landing')} className="flex items-center gap-2 text-slate-600 hover:text-teal-600">
              <Globe size={24} className="text-teal-600" />
              <span className="font-bold">SmartTravel AI</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => setCurrentView('planner')} className="text-teal-600 font-bold">Planejar</button>
            <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>
            <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              <span>{user.avatar}</span>
              <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Selection */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm no-print">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-teal-600" /> Escolha seu Destino
              </h2>
              
              {/* Continent Filter */}
              <div className="flex flex-wrap gap-2 mb-4">
                {continents.map(c => (
                  <button key={c} onClick={() => setSelectedContinent(c)} className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedContinent === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {c === 'all' ? '🌍 Todos' : c}
                  </button>
                ))}
              </div>
              
              {/* Destination Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredDestinations.map(([name, data]) => (
                  <button key={name} onClick={() => { setDestination(name); setItineraryGenerated(false); }} className={`relative h-24 rounded-xl overflow-hidden group ${destination === name ? 'ring-2 ring-teal-500 ring-offset-2' : ''}`}>
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110" style={{ backgroundImage: `url(${data.coverUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <span className="text-lg">{data.image}</span>
                      <p className="text-white text-xs font-medium truncate">{name.split(',')[0]}</p>
                    </div>
                    {destination === name && <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Configuration */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm no-print">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-teal-600" /> Detalhes da Viagem
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Origem</label>
                  <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500">
                    {BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Ida</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Volta</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Horário Saída</label>
                  <input type="time" value={departureTime} onChange={e => setDepartureTime(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Adultos</label>
                  <input type="number" min="1" max="10" value={adults} onChange={e => setAdults(parseInt(e.target.value) || 1)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-500 block mb-1">Crianças</label>
                  <input type="number" min="0" max="6" value={children} onChange={e => { const val = parseInt(e.target.value) || 0; setChildren(val); setChildrenAges(Array(val).fill(5)); }} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium text-slate-500 block mb-1">Orçamento Total: R$ {totalBudget.toLocaleString('pt-BR')}</label>
                  <input type="range" min="5000" max="200000" step="1000" value={totalBudget} onChange={e => setTotalBudget(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600" />
                </div>
              </div>
              
              {/* Priorities */}
              <div className="mb-4">
                <button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-teal-600">
                  <Sliders size={16} /> Prioridades da Viagem ({tripPriorities.length}/3)
                  {showPriorityPanel ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {showPriorityPanel && (
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-3">
                    {TRIP_PRIORITIES.map(p => {
                      const isSelected = tripPriorities.includes(p.id);
                      return (
                        <button key={p.id} onClick={() => togglePriority(p.id)} disabled={!isSelected && tripPriorities.length >= 3} className={`p-3 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'} ${!isSelected && tripPriorities.length >= 3 ? 'opacity-50' : ''}`}>
                          <p.icon size={20} className={`mx-auto ${isSelected ? 'text-teal-600' : 'text-slate-400'}`} />
                          <p className="text-xs font-medium mt-1">{p.name}</p>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Generate Button */}
              <button onClick={generateItinerary} disabled={!destination || isGenerating} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 transition-all ${!destination ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : isGenerating ? 'bg-teal-400 text-white' : 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-teal-500/30'}`}>
                {isGenerating ? <><RefreshCw size={20} className="animate-spin" /> Gerando roteiro inteligente...</> : <><Sparkles size={20} /> {itineraryGenerated ? 'Regenerar Roteiro' : 'Gerar Roteiro com IA'}</>}
              </button>
            </div>

            {/* Itinerary Display */}
            {itineraryGenerated && (
              <div className="space-y-4">
                <div className="flex items-center justify-between no-print">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <Map size={22} className="text-teal-600" /> Seu Roteiro Personalizado
                    </h2>
                    <p className="text-slate-500 text-sm">{origin?.split(' ')[0]} → {destination} • {tripDays} dias • {adults + children} viajantes</p>
                  </div>
                  <button onClick={generateItinerary} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="Regenerar">
                    <RefreshCw size={20} />
                  </button>
                </div>
                
                {/* Arrival Info Banner */}
                {arrivalInfo && (
                  <div className={`p-4 rounded-xl flex items-center gap-4 no-print ${arrivalInfo.isOvernightFlight ? 'bg-orange-50 border border-orange-200' : 'bg-blue-50 border border-blue-200'}`}>
                    <div className="p-3 bg-white rounded-full shadow-sm">
                      {arrivalInfo.isOvernightFlight ? <Moon size={24} className="text-orange-500" /> : <Plane size={24} className="text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">
                        Chegada às {arrivalInfo.time} (horário local de {destination?.split(',')[0]})
                        {arrivalInfo.dayLabel && <span className="ml-2 px-2 py-0.5 bg-orange-200 text-orange-800 text-xs rounded-full">{arrivalInfo.dayLabel}</span>}
                      </p>
                      <p className="text-sm text-slate-600">
                        Diferença de fuso: {arrivalInfo.timezoneDiff > 0 ? '+' : ''}{arrivalInfo.timezoneDiff}h • Duração: {arrivalInfo.flightHours}h
                        {arrivalInfo.isLongFlight && <span className="ml-2 text-orange-600">⚠️ Voo longo - atividades leves no D1</span>}
                      </p>
                    </div>
                  </div>
                )}
                
                {/* Day Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map(day => (
                    <DayCard 
                      key={day} 
                      day={day} 
                      startDate={startDate} 
                      items={daySchedule[day] || []} 
                      isFirst={day === 1} 
                      isLast={day === tripDays} 
                      origin={origin} 
                      destination={destination} 
                      flight={selectedFlight} 
                      hotel={selectedHotel} 
                      totalPayingTravelers={totalPayingTravelers} 
                      tripDays={tripDays}
                      arrivalInfo={day === 1 ? arrivalInfo : null}
                      departureTime={day === tripDays ? returnTime : null}
                      onEditItem={handleEditItem}
                      onAddItem={handleAddItem}
                      onRemoveItem={handleRemoveItem}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Globe size={64} className="text-teal-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3>
                <p className="text-slate-500">Selecione para onde você quer ir e vamos criar o roteiro perfeito</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6 no-print">
            {/* Budget Card */}
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Orçamento</h3>
                <Wallet size={20} />
              </div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (
                <>
                  <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>
                    {isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                    <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos (ida+volta)</span><span>R$ {costs.flights.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.flights || 0}%)</span></span></div>
                    <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel ({tripDays} noites)</span><span>R$ {costs.hotels.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.hotels || 0}%)</span></span></div>
                    <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.activities || 0}%)</span></span></div>
                    <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.food || 0}%)</span></span></div>
                    <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Car size={14} />Transporte</span><span>R$ {costs.transport.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.transport || 0}%)</span></span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div>
                  </div>
                </>
              )}
            </div>

            {/* AI Insights */}
            {itineraryGenerated && insights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Sparkles size={18} className="text-teal-600" /> Insights da IA
                </h3>
                <div className="space-y-3">
                  {insights.map((insight, i) => (
                    <AIInsightCard key={i} insight={insight} onAction={handleInsightAction} />
                  ))}
                </div>
              </div>
            )}

            {/* Suggested Itineraries */}
            {suggestedItineraries.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <ThumbsUp size={18} className="text-rose-500" /> Recomendados para Você
                </h3>
                <p className="text-xs text-slate-500 mb-3">Baseado nos roteiros que você curtiu:</p>
                <div className="space-y-2">
                  {suggestedItineraries.map(it => (
                    <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} compact />
                  ))}
                </div>
              </div>
            )}

            {/* Community Suggestions for Destination */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Crown size={18} className="text-amber-500" /> Top Roteiros - {destination.split(',')[0]}
                </h3>
                <div className="space-y-2">
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => (
                    <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} compact />
                  ))}
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && (
                    <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda para este destino</p>
                  )}
                </div>
              </div>
            )}

            {/* Flight & Hotel Info */}
            {itineraryGenerated && selectedFlight && selectedHotel && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <Info size={18} className="text-blue-500" /> Suas Escolhas
                </h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm"><Plane size={16} /> {selectedFlight.name}</div>
                    <p className="text-xs text-blue-600 mt-1">{selectedFlight.duration} • ⭐ {selectedFlight.rating} • R$ {selectedFlight.price.toLocaleString('pt-BR')}/pessoa</p>
                  </div>
                  <div className="p-3 bg-violet-50 rounded-xl">
                    <div className="flex items-center gap-2 text-violet-700 font-semibold text-sm"><Hotel size={16} /> {selectedHotel.name}</div>
                    <p className="text-xs text-violet-600 mt-1">{'⭐'.repeat(selectedHotel.stars)} • {selectedHotel.location} • R$ {selectedHotel.price.toLocaleString('pt-BR')}/noite</p>
                  </div>
                </div>
              </div>
            )}

            {/* Download PDF Button */}
            {itineraryGenerated && (
              <button onClick={handlePrint} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30'}`}>
                {isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF do Roteiro</>}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      
      <ActivityModal 
        isOpen={activityModal.isOpen} 
        onClose={() => setActivityModal({ isOpen: false, day: null, idx: null, current: null, mode: 'add' })} 
        activities={currentData?.activities || []} 
        restaurants={currentData?.restaurants || []} 
        current={activityModal.current}
        mode={activityModal.mode}
        dayNum={activityModal.day}
        onSelect={handleSelectActivity}
        onRemove={() => activityModal.day && activityModal.idx !== null && handleRemoveItem(activityModal.day, activityModal.idx)}
      />
      
      <CommunityDetailModal 
        itinerary={communityDetailModal.itinerary} 
        isOpen={communityDetailModal.isOpen} 
        onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} 
        onUse={useCommunityItinerary} 
      />
    </div>
  );
}
