import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Compass, Mountain, Building, Palmtree, Crown, Mail, Lock, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, ArrowLeftRight, MessageSquare, Car, Copy, Phone, Download, Zap, Target, Award, ThumbsUp, Info, Anchor, Wine, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Edit3, Trash2, Eye, Coffee, Bed, ArrowUpCircle, ArrowDownCircle, ImageIcon, Send, Settings, CreditCard, Bell, Shield, Circle } from 'lucide-react';

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

// ========== TIME SLOT ENGINE - Cálculo automático de horários ==========
const TimeSlotEngine = {
  timeToMinutes: (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + (m || 0);
  },
  
  minutesToTime: (minutes) => {
    const h = Math.floor(minutes / 60) % 24;
    const m = minutes % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  },
  
  calculateEndTime: (startTime, durationHours) => {
    if (!startTime || !durationHours) return null;
    const startMinutes = TimeSlotEngine.timeToMinutes(startTime);
    const endMinutes = startMinutes + (durationHours * 60);
    return TimeSlotEngine.minutesToTime(endMinutes);
  },
  
  getNextAvailableSlot: (endTime, bufferMinutes = 30) => {
    const endMinutes = TimeSlotEngine.timeToMinutes(endTime);
    return TimeSlotEngine.minutesToTime(endMinutes + bufferMinutes);
  },
  
  getPeriodFromTime: (timeStr) => {
    const minutes = TimeSlotEngine.timeToMinutes(timeStr);
    if (minutes < 720) return 'manhã';
    if (minutes < 1080) return 'tarde';
    return 'noite';
  }
};

// ========== ROBUST ARRIVAL CALCULATION ==========
const calculateArrival = (originCity, destCity, departureTime, flightDurationStr, departureDate) => {
  const originOffset = CITY_OFFSETS[originCity] || -3;
  const destOffset = CITY_OFFSETS[destCity] || 0;
  const [depHour, depMin] = (departureTime || '22:00').split(':').map(Number);
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
  
  let actualArrivalDate = null;
  if (departureDate) {
    actualArrivalDate = new Date(departureDate + 'T12:00:00');
    actualArrivalDate.setDate(actualArrivalDate.getDate() + daysAdded);
  }
  
  const isLongFlight = flightMinutes > 7 * 60;
  const isOvernightFlight = daysAdded > 0;
  
  return {
    time: formattedTime,
    daysAdded,
    isOvernightFlight,
    isLongFlight,
    requiresRest: isLongFlight || (isOvernightFlight && flightMinutes > 5 * 60),
    flightHours: (flightMinutes / 60).toFixed(1),
    flightMinutes,
    timezoneDiff,
    dayLabel: daysAdded === 0 ? '' : daysAdded === 1 ? '+1 dia' : `+${daysAdded} dias`,
    actualArrivalDate: actualArrivalDate ? actualArrivalDate.toISOString().split('T')[0] : null,
    arrivalHour,
    arrivalMinutes: normalizedMinutes
  };
};

// ========== HELPER FUNCTIONS ==========
const formatDateFull = (dateStr, addDays = 0) => {
  const date = new Date(dateStr + 'T12:00:00');
  date.setDate(date.getDate() + addDays);
  const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const weekdaysShort = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return { 
    weekday: weekdays[date.getDay()],
    weekdayShort: weekdaysShort[date.getDay()],
    day: date.getDate().toString().padStart(2, '0'), 
    month: (date.getMonth() + 1).toString().padStart(2, '0'),
    monthName: months[date.getMonth()],
    year: date.getFullYear(),
    iso: date.toISOString().split('T')[0]
  };
};

const getPeriodStyle = (period) => {
  const styles = {
    manhã: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-500', label: 'Manhã', icon: Sunrise, gradient: 'from-amber-400 to-orange-500' },
    tarde: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500', label: 'Tarde', icon: Sun, gradient: 'from-orange-400 to-red-500' },
    noite: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300', dot: 'bg-indigo-500', label: 'Noite', icon: Moon, gradient: 'from-indigo-400 to-purple-600' },
  };
  return styles[period] || styles.manhã;
};

const getCategoryIcon = (item) => {
  if (item.type === 'flight') return PlaneLanding;
  if (item.type === 'transfer') return Car;
  if (item.type === 'rest') return Bed;
  if (item.type === 'hotel') return Hotel;
  if (item.category === 'restaurant') return Utensils;
  if (item.tags?.includes('beach')) return Anchor;
  if (item.tags?.includes('culture') || item.tags?.includes('history')) return Building;
  if (item.tags?.includes('adventure')) return Mountain;
  if (item.tags?.includes('shopping')) return ShoppingBag;
  return Camera;
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

// ========== PREMIUM PRINT STYLES ==========
const printStyles = `
@media print {
  @page { margin: 1.2cm; size: A4; }
  body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; background: white !important; font-size: 11px; }
  .no-print { display: none !important; }
  .print-break { page-break-after: always; break-after: page; }
  .print-avoid-break { page-break-inside: avoid; break-inside: avoid; }
  .timeline-container { max-height: none !important; overflow: visible !important; }
  .sticky-header { position: relative !important; top: 0 !important; }
  .day-section { break-inside: avoid; page-break-inside: avoid; margin-bottom: 20px; padding-bottom: 10px; }
  .activity-card { break-inside: avoid; page-break-inside: avoid; margin-bottom: 8px; }
  .sidebar-print { display: block !important; width: 100% !important; }
  .main-content { width: 100% !important; }
  .print-header { display: flex !important; justify-content: space-between; margin-bottom: 16px; padding-bottom: 16px; border-bottom: 2px solid #0d9488; }
  .print-logo { font-size: 20px; font-weight: bold; color: #0d9488; }
  .print-summary { background: #f0fdfa !important; padding: 12px; border-radius: 8px; margin-bottom: 16px; break-inside: avoid; }
  .arrival-banner { break-inside: avoid; page-break-inside: avoid; }
}
`;

// ========== DESTINATIONS DATABASE ==========
const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', image: '🗼', tags: ['culture', 'romantic', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800'],
    tip: 'Compre o Paris Museum Pass para economizar em museus!',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.7, airline: 'Air France', class: 'Business disponível' },
      { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3, airline: 'TAP', class: 'Econômica Premium' },
      { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.4, airline: 'LATAM', class: 'Econômica' },
      { id: 'pf4', name: 'KLM via Amsterdam', price: 3150, duration: '15h10', rating: 4.5, airline: 'KLM', class: 'Econômica Premium' },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9, amenities: ['Spa', 'Michelin Restaurant', 'Vista Jardim'] },
      { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.7, amenities: ['Rooftop', 'Spa'] },
      { id: 'ph3', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Tour Eiffel', rating: 4.5, amenities: ['Vista Torre', 'Fitness'] },
      { id: 'ph4', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4, amenities: ['Café da manhã'] },
      { id: 'ph5', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2, amenities: ['Wi-Fi', 'Central'] },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Four Seasons', duration: 2 },
      { id: 'pr2', name: 'Septime', price: 280, cuisine: 'Contemporânea', rating: 4.8, period: 'noite', tags: ['gastro'], location: '11º Arrond.', duration: 1.5 },
      { id: 'pr3', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5, period: 'tarde', tags: ['budget'], location: '9º Arrond.', duration: 1 },
      { id: 'pr4', name: 'Café de Flore', price: 75, cuisine: 'Café Parisiense', rating: 4.6, period: 'manhã', tags: ['romantic'], location: 'Saint-Germain', duration: 1 },
      { id: 'pr5', name: 'Pink Mamma', price: 85, cuisine: 'Italiana', rating: 4.6, period: 'noite', tags: ['family'], location: '10º Arrond.', duration: 1.5 },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: 2, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars', tags: ['landmark', 'romantic'], intensity: 'light' },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: 4, rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement', tags: ['culture', 'art'], intensity: 'moderate' },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: 1.5, rating: 4.7, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais', tags: ['romantic', 'scenic'], intensity: 'light' },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes', tags: ['culture', 'history'], intensity: 'heavy' },
      { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Montmartre', tags: ['culture', 'scenic'], intensity: 'moderate' },
      { id: 'pa6', name: 'Museu d\'Orsay', price: 85, duration: 3, rating: 4.8, childFriendly: true, period: 'tarde', location: '7º Arrondissement', tags: ['culture', 'art'], intensity: 'moderate' },
      { id: 'pa7', name: 'Disneyland Paris', price: 380, duration: 10, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Marne-la-Vallée', tags: ['family', 'kids'], intensity: 'heavy' },
      { id: 'pa8', name: 'Jardim de Luxemburgo', price: 0, duration: 2, rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement', tags: ['free', 'relaxation'], intensity: 'light' },
      { id: 'pa9', name: 'Aula de Culinária', price: 120, duration: 3, rating: 4.8, childFriendly: false, period: 'manhã', location: 'Le Marais', tags: ['gastro'], intensity: 'light' },
      { id: 'pa10', name: 'Show Moulin Rouge', price: 185, duration: 2, rating: 4.6, childFriendly: false, period: 'noite', location: 'Pigalle', tags: ['nightlife'], intensity: 'light' },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', image: '🌴', tags: ['beach', 'luxury', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800'],
    tip: 'Alugue carro para explorar as Keys e Everglades!',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.5, airline: 'American', class: 'Business disponível' },
      { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4, airline: 'LATAM', class: 'Econômica Premium' },
      { id: 'mf3', name: 'GOL - Direto', price: 2250, duration: '8h30', rating: 4.2, airline: 'GOL', class: 'Econômica' },
      { id: 'mf4', name: 'Azul via Orlando', price: 2050, duration: '11h', rating: 4.1, airline: 'Azul', class: 'Econômica' },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9, amenities: ['Praia privativa', 'Spa', 'Teatro'] },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8, amenities: ['3 piscinas', 'Spa asiático'] },
      { id: 'mh3', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6, amenities: ['11 piscinas', 'LIV Nightclub'] },
      { id: 'mh4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5, amenities: ['Rooftop', 'Ocean view'] },
      { id: 'mh5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4, amenities: ['Bar premiado', 'Social'] },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'], location: 'Downtown', duration: 2 },
      { id: 'mr2', name: 'Joe\'s Stone Crab', price: 220, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro'], location: 'South Beach', duration: 1.5 },
      { id: 'mr3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6, period: 'tarde', tags: ['culture', 'budget'], location: 'Little Havana', duration: 1 },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: 4, rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach', tags: ['beach', 'free'], intensity: 'light' },
      { id: 'ma2', name: 'Art Deco Tour', price: 45, duration: 2, rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive', tags: ['culture', 'history'], intensity: 'moderate' },
      { id: 'ma3', name: 'Everglades Tour', price: 95, duration: 4, rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades', tags: ['adventure', 'nature'], intensity: 'moderate' },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: 2, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood', tags: ['art', 'free', 'culture'], intensity: 'light' },
      { id: 'ma5', name: 'Vizcaya Museum', price: 65, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove', tags: ['culture', 'history'], intensity: 'moderate' },
      { id: 'ma6', name: 'Key West Day Trip', price: 195, duration: 14, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Key West', tags: ['scenic', 'beach'], intensity: 'heavy' },
      { id: 'ma7', name: 'Jet Ski South Beach', price: 120, duration: 1, rating: 4.5, childFriendly: false, period: 'tarde', location: 'South Beach', tags: ['adventure'], intensity: 'moderate' },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', image: '🗾', tags: ['culture', 'gastro', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800'],
    tip: 'Compre o JR Pass antes de viajar e reserve o teamLab com antecedência!',
    flights: [
      { id: 'tf1', name: 'JAL via Dallas', price: 7500, duration: '24h', rating: 4.8, airline: 'JAL', class: 'Business disponível' },
      { id: 'tf2', name: 'ANA via Houston', price: 6800, duration: '25h', rating: 4.7, airline: 'ANA', class: 'Business disponível' },
      { id: 'tf3', name: 'Emirates via Dubai', price: 5900, duration: '28h', rating: 4.6, airline: 'Emirates', class: 'Econômica Premium' },
      { id: 'tf4', name: 'Qatar via Doha', price: 5200, duration: '30h', rating: 4.5, airline: 'Qatar', class: 'Econômica' },
    ],
    hotels: [
      { id: 'th1', name: 'Park Hyatt Tokyo', stars: 5, price: 3800, location: 'Shinjuku', rating: 4.9, amenities: ['Rooftop Pool', 'Spa', 'Vista Mt. Fuji'] },
      { id: 'th2', name: 'Mandarin Oriental', stars: 5, price: 3200, location: 'Nihonbashi', rating: 4.8, amenities: ['Spa', '3 restaurantes Michelin'] },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 650, location: 'Shinjuku', rating: 4.5, amenities: ['Rooftop Bar', 'Central'] },
      { id: 'th4', name: 'Ryokan Asakusa', stars: 4, price: 480, location: 'Asakusa', rating: 4.6, amenities: ['Tradicional', 'Onsen'] },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1200, cuisine: 'Sushi', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Ginza', duration: 1.5 },
      { id: 'tr2', name: 'Narisawa', price: 850, cuisine: 'Innovative', rating: 4.9, period: 'noite', tags: ['gastro'], location: 'Aoyama', duration: 2 },
      { id: 'tr3', name: 'Ichiran Ramen', price: 35, cuisine: 'Ramen', rating: 4.6, period: 'tarde', tags: ['budget'], location: 'Shibuya', duration: 0.5 },
    ],
    activities: [
      { id: 'ta1', name: 'teamLab Borderless', price: 120, duration: 3, rating: 4.9, childFriendly: true, period: 'tarde', location: 'Odaiba', tags: ['art', 'culture'], intensity: 'light' },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: 2, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Asakusa', tags: ['culture', 'free', 'history'], intensity: 'moderate' },
      { id: 'ta3', name: 'Cruzamento Shibuya', price: 0, duration: 1, rating: 4.5, childFriendly: true, period: 'noite', location: 'Shibuya', tags: ['free', 'landmark'], intensity: 'light' },
      { id: 'ta4', name: 'Monte Fuji Day Trip', price: 250, duration: 12, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Mt. Fuji', tags: ['nature', 'adventure'], intensity: 'heavy' },
      { id: 'ta5', name: 'Tokyo DisneySea', price: 280, duration: 10, rating: 4.9, childFriendly: true, period: 'manhã', location: 'Chiba', tags: ['family', 'kids'], intensity: 'heavy' },
      { id: 'ta6', name: 'Mercado Tsukiji', price: 0, duration: 2, rating: 4.6, childFriendly: true, period: 'manhã', location: 'Tsukiji', tags: ['gastro', 'free'], intensity: 'moderate' },
    ]
  },
  'Dubai, EAU': {
    continent: 'Ásia', image: '🏙️', tags: ['luxury', 'adventure', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800'],
    tip: 'Reserve o Burj Khalifa no sunset para as melhores fotos!',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 4800, duration: '14h30', rating: 4.9, airline: 'Emirates', class: 'First Class disponível' },
      { id: 'df2', name: 'Qatar via Doha', price: 3600, duration: '18h', rating: 4.7, airline: 'Qatar', class: 'Business disponível' },
      { id: 'df3', name: 'Turkish via Istanbul', price: 3200, duration: '20h', rating: 4.5, airline: 'Turkish', class: 'Econômica Premium' },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 8500, location: 'Jumeirah', rating: 5.0, amenities: ['Helipad', 'Butler 24h', 'Restaurante Subaquático'] },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 2800, location: 'Palm Jumeirah', rating: 4.8, amenities: ['Aquaventure', 'Lost Chambers', 'Praia'] },
      { id: 'dh3', name: 'Address Downtown', stars: 5, price: 1650, location: 'Downtown', rating: 4.7, amenities: ['Vista Burj Khalifa', 'Spa'] },
      { id: 'dh4', name: 'JW Marriott Marquis', stars: 5, price: 950, location: 'Business Bay', rating: 4.6, amenities: ['2 Torres', 'Rooftop'] },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 650, cuisine: 'Fine Dining', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'], location: 'Burj Khalifa', duration: 2 },
      { id: 'dr2', name: 'Nobu Dubai', price: 450, cuisine: 'Japonesa', rating: 4.7, period: 'noite', tags: ['gastro'], location: 'Atlantis', duration: 1.5 },
      { id: 'dr3', name: 'Al Fanar', price: 85, cuisine: 'Emirati', rating: 4.5, period: 'tarde', tags: ['culture'], location: 'Festival City', duration: 1 },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa - At The Top', price: 180, duration: 2, rating: 4.8, childFriendly: true, period: 'tarde', location: 'Downtown', tags: ['landmark'], intensity: 'light' },
      { id: 'da2', name: 'Desert Safari Premium', price: 280, duration: 6, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Deserto', tags: ['adventure'], intensity: 'moderate' },
      { id: 'da3', name: 'Dubai Mall & Fountain', price: 0, duration: 4, rating: 4.6, childFriendly: true, period: 'noite', location: 'Downtown', tags: ['shopping', 'free'], intensity: 'light' },
      { id: 'da4', name: 'Aquaventure Waterpark', price: 320, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Palm Jumeirah', tags: ['family', 'adventure'], intensity: 'heavy' },
      { id: 'da5', name: 'Dubai Frame', price: 60, duration: 1.5, rating: 4.5, childFriendly: true, period: 'manhã', location: 'Zabeel Park', tags: ['landmark'], intensity: 'light' },
      { id: 'da6', name: 'Passeio de Iate', price: 450, duration: 3, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Marina', tags: ['luxury', 'romantic'], intensity: 'light' },
    ]
  },
  'Maldivas': {
    continent: 'Ásia', image: '🏝️', tags: ['beach', 'romantic', 'luxury'],
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
    galleryUrls: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800'],
    tip: 'Reserve uma villa sobre a água para a experiência completa!',
    flights: [
      { id: 'mvf1', name: 'Emirates via Dubai', price: 6200, duration: '18h', rating: 4.8, airline: 'Emirates', class: 'Business disponível' },
      { id: 'mvf2', name: 'Qatar via Doha', price: 5800, duration: '19h', rating: 4.7, airline: 'Qatar', class: 'Business disponível' },
      { id: 'mvf3', name: 'Singapore Airlines via SIN', price: 7200, duration: '22h', rating: 4.9, airline: 'Singapore Airlines', class: 'First Class' },
    ],
    hotels: [
      { id: 'mvh1', name: 'Soneva Fushi', stars: 5, price: 8500, location: 'Baa Atoll', rating: 5.0, amenities: ['Cinema Outdoor', 'Spa', 'No shoes'] },
      { id: 'mvh2', name: 'Conrad Rangali', stars: 5, price: 4800, location: 'Rangali Island', rating: 4.9, amenities: ['Restaurante Subaquático', 'Villa sobre água'] },
      { id: 'mvh3', name: 'Anantara Veli', stars: 5, price: 2800, location: 'South Malé', rating: 4.7, amenities: ['Adults Only', 'Spa overwater'] },
      { id: 'mvh4', name: 'Coco Palm Dhuni Kolhu', stars: 5, price: 1650, location: 'Baa Atoll', rating: 4.6, amenities: ['Eco Resort', 'Snorkel'] },
    ],
    restaurants: [
      { id: 'mvr1', name: 'Ithaa Undersea', price: 950, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'], location: 'Conrad', duration: 2 },
      { id: 'mvr2', name: 'Fresh in the Garden', price: 180, cuisine: 'Healthy', rating: 4.7, period: 'manhã', tags: ['gastro'], location: 'Soneva', duration: 1 },
    ],
    activities: [
      { id: 'mva1', name: 'Snorkel com Mantas', price: 180, duration: 3, rating: 4.9, childFriendly: false, period: 'manhã', location: 'Baa Atoll', tags: ['adventure', 'nature'], intensity: 'moderate' },
      { id: 'mva2', name: 'Spa Overwater', price: 350, duration: 2, rating: 4.8, childFriendly: false, period: 'tarde', location: 'Resort', tags: ['relaxation', 'luxury'], intensity: 'light' },
      { id: 'mva3', name: 'Jantar na Praia', price: 450, duration: 2.5, rating: 4.9, childFriendly: true, period: 'noite', location: 'Private Beach', tags: ['romantic', 'gastro'], intensity: 'light' },
      { id: 'mva4', name: 'Dolphin Cruise', price: 120, duration: 2, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Ocean', tags: ['nature', 'family'], intensity: 'light' },
      { id: 'mva5', name: 'Mergulho - Descoberta', price: 220, duration: 4, rating: 4.7, childFriendly: false, period: 'manhã', location: 'Reef', tags: ['adventure'], intensity: 'moderate' },
    ]
  }
};

// ========== COMMUNITY ITINERARIES ==========
const COMMUNITY_ITINERARIES = [
  { id: 'ci1', title: 'Paris Romântica', destination: 'Paris, França', author: { name: 'Maria Silva', avatar: '👩', verified: true }, duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 487, tags: ['romantic', 'culture'], highlights: ['Torre Eiffel Sunset', 'Cruzeiro Sena', 'Versalhes'], featured: true, flightId: 'pf2', hotelId: 'ph3', comments: [{ id: 1, user: 'Ana Costa', avatar: '👩', rating: 5, date: '2025-12-15', text: 'Roteiro perfeito para lua de mel!' }], ratings: { cleanliness: 4.9, value: 4.7, location: 5.0 } },
  { id: 'ci2', title: 'Miami Beach Life', destination: 'Miami, EUA', author: { name: 'Camila Andrade', avatar: '👩', verified: true }, duration: 5, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 312, tags: ['beach'], highlights: ['South Beach', 'Wynwood', 'Everglades'], featured: true, flightId: 'mf2', hotelId: 'mh5', comments: [{ id: 1, user: 'Lucas Santos', avatar: '👨', rating: 5, date: '2025-12-18', text: 'Miami tem muito mais que praia!' }], ratings: { cleanliness: 4.7, value: 4.8, location: 4.9 } },
  { id: 'ci3', title: 'Tóquio em Família', destination: 'Tóquio, Japão', author: { name: 'Pedro Tanaka', avatar: '👨‍👩‍👧‍👦', verified: true }, duration: 10, budget: 55000, travelers: 4, likes: 2890, rating: 4.8, reviews: 234, tags: ['family', 'culture'], highlights: ['DisneySea', 'teamLab', 'Senso-ji'], featured: true, flightId: 'tf3', hotelId: 'th2', comments: [{ id: 1, user: 'Família Ribeiro', avatar: '👨‍👩‍👧', rating: 5, date: '2025-12-08', text: 'Filhos amaram DisneySea!' }], ratings: { cleanliness: 4.9, value: 4.7, location: 4.8 } },
  { id: 'ci4', title: 'Dubai Luxuoso', destination: 'Dubai, EAU', author: { name: 'Helena Borges', avatar: '👸', verified: true }, duration: 6, budget: 55000, travelers: 2, likes: 2890, rating: 4.9, reviews: 198, tags: ['luxury', 'adventure'], highlights: ['Burj Khalifa Sunset', 'Desert Safari', 'Atlantis'], featured: true, flightId: 'df1', hotelId: 'dh2', comments: [{ id: 1, user: 'Ricardo & Paula', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Dubai é outro planeta!' }], ratings: { cleanliness: 4.9, value: 4.6, location: 4.8 } },
  { id: 'ci5', title: 'Maldivas Lua de Mel', destination: 'Maldivas', author: { name: 'Carolina Mendes', avatar: '👩', verified: true }, duration: 6, budget: 65000, travelers: 2, likes: 4567, rating: 4.9, reviews: 423, tags: ['romantic', 'luxury', 'beach'], highlights: ['Villa Overwater', 'Jantar Subaquático', 'Spa'], featured: true, flightId: 'mvf1', hotelId: 'mvh2', comments: [{ id: 1, user: 'Paulo & Julia', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Paraíso na Terra!' }], ratings: { cleanliness: 5.0, value: 4.5, location: 5.0 } },
];

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
          {mode === 'register' && <input type="text" placeholder="Seu nome completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500" />}
          <input type="email" placeholder="seu@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500" />
          <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500" />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl hover:shadow-lg">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <span>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium hover:underline">Cadastre-se</button></span> : <span>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium hover:underline">Entrar</button></span>}</p>
        </form>
      </div>
    </div>
  );
};

// ========== COMMUNITY DETAIL MODAL ==========
const CommunityDetailModal = ({ itinerary, isOpen, onClose, onUse }) => {
  const [tab, setTab] = useState('overview');
  if (!isOpen || !itinerary) return null;
  const dest = DESTINATIONS_DATABASE[itinerary.destination];
  const flight = dest?.flights.find(f => f.id === itinerary.flightId);
  const hotel = dest?.hotels.find(h => h.id === itinerary.hotelId);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="relative h-48 flex-shrink-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest?.coverUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/60"><X size={20} /></button>
          <div className="absolute bottom-4 left-6">
            {itinerary.featured && <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-2 inline-block"><Crown size={12} className="inline mr-1" />DESTAQUE</span>}
            <h2 className="text-2xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 flex items-center gap-1 mt-1"><MapPin size={14} /> {itinerary.destination}</p>
          </div>
        </div>
        <div className="flex border-b flex-shrink-0">
          {['overview', 'details', 'reviews'].map(t => (<button key={t} onClick={() => setTab(t)} className={`flex-1 py-3 font-medium text-sm ${tab === t ? 'border-b-2 border-teal-600 text-teal-600' : 'text-slate-500'}`}>{t === 'overview' ? 'Visão Geral' : t === 'details' ? 'Detalhes' : 'Avaliações'}</button>))}
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'overview' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl"><span className="text-4xl">{itinerary.author.avatar}</span><div><p className="font-bold text-slate-800">{itinerary.author.name}</p>{itinerary.author.verified && <span className="text-xs text-teal-600 flex items-center gap-1"><UserCheck size={12} /> Verificado</span>}</div></div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-teal-50 rounded-xl text-center"><p className="text-2xl font-bold text-teal-700">{itinerary.duration}</p><p className="text-xs text-teal-600">Dias</p></div>
                  <div className="p-4 bg-emerald-50 rounded-xl text-center"><p className="text-2xl font-bold text-emerald-700">R$ {(itinerary.budget/1000).toFixed(0)}k</p><p className="text-xs text-emerald-600">Orçamento</p></div>
                  <div className="p-4 bg-amber-50 rounded-xl text-center"><p className="text-2xl font-bold text-amber-700">{itinerary.rating}</p><p className="text-xs text-amber-600">Avaliação</p></div>
                  <div className="p-4 bg-rose-50 rounded-xl text-center"><p className="text-2xl font-bold text-rose-700">{itinerary.likes}</p><p className="text-xs text-rose-600">Curtidas</p></div>
                </div>
              </div>
              <div><h3 className="font-bold text-slate-800 mb-3">✨ Destaques</h3><div className="space-y-2">{itinerary.highlights.map((h, i) => <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg"><Check size={16} className="text-teal-600" /><span className="text-sm">{h}</span></div>)}</div></div>
            </div>
          )}
          {tab === 'details' && (
            <div className="space-y-4">
              {flight && <div className="p-4 bg-blue-50 rounded-xl"><p className="font-bold text-blue-800 flex items-center gap-2"><Plane size={18} /> Voo</p><p className="text-sm text-blue-700 mt-1">{flight.name} • {flight.duration} • R$ {flight.price}</p></div>}
              {hotel && <div className="p-4 bg-purple-50 rounded-xl"><p className="font-bold text-purple-800 flex items-center gap-2"><Hotel size={18} /> Hotel</p><p className="text-sm text-purple-700 mt-1">{hotel.name} • {'⭐'.repeat(hotel.stars)} • R$ {hotel.price}/noite</p></div>}
            </div>
          )}
          {tab === 'reviews' && (<div className="space-y-4">{itinerary.comments?.map(c => (<div key={c.id} className="p-4 bg-slate-50 rounded-xl"><div className="flex items-center gap-3 mb-2"><span className="text-2xl">{c.avatar}</span><div className="flex-1"><p className="font-medium text-slate-800">{c.user}</p><p className="text-xs text-slate-500">{c.date}</p></div><div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" />{c.rating}</div></div><p className="text-sm text-slate-600">{c.text}</p></div>))}</div>)}
        </div>
        <div className="p-4 border-t bg-slate-50 flex-shrink-0"><button onClick={() => { onUse(itinerary); onClose(); }} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg"><Copy size={20} /> Usar Este Roteiro como Base</button></div>
      </div>
    </div>
  );
};

// ========== ACTIVITY MODAL ==========
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
            <div><h2 className="text-xl font-bold flex items-center gap-2">{mode === 'swap' ? <RefreshCw size={22} /> : <Plus size={22} />} {mode === 'swap' ? 'Trocar Atividade' : 'Adicionar Atividade'}</h2>{dayNum && <p className="text-teal-100 text-sm">Dia {dayNum} do roteiro</p>}</div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X size={22} /></button>
          </div>
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
                <div className="flex-1"><p className="font-bold text-slate-800 group-hover:text-teal-700">{item.name}</p><p className="text-sm text-slate-500 mt-0.5">📍 {item.location || item.cuisine} {item.duration && `• ${item.duration}h`}</p><div className="flex flex-wrap items-center gap-2 mt-2">{item.price === 0 ? <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium">✨ Gratuito</span> : <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">R$ {item.price}</span>}{item.childFriendly && <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">👶 Kids</span>}</div></div>
                <div className="flex items-center gap-1 text-amber-500 ml-4"><Star size={16} className="fill-amber-500" /><span className="font-bold">{item.rating}</span></div>
              </div>
            </button>
          ))}
        </div>
        {current && mode === 'swap' && (<div className="p-4 border-t bg-red-50 flex-shrink-0"><button onClick={() => { onRemove(); onClose(); }} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Trash2 size={18} /> Remover do Roteiro</button></div>)}
      </div>
    </div>
  );
};

// ========== AI INSIGHT CARD ==========
const AIInsightCard = ({ insight, onAction, isHighlight = false }) => {
  const colors = { warning: { bg: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600', icon: 'text-amber-600' }, success: { bg: 'bg-emerald-50 border-emerald-200', btn: 'bg-emerald-500 hover:bg-emerald-600', icon: 'text-emerald-600' }, info: { bg: 'bg-blue-50 border-blue-200', btn: 'bg-blue-500 hover:bg-blue-600', icon: 'text-blue-600' }, danger: { bg: 'bg-red-50 border-red-200', btn: 'bg-red-500 hover:bg-red-600', icon: 'text-red-600' }, tip: { bg: 'bg-violet-50 border-violet-200', btn: 'bg-violet-500 hover:bg-violet-600', icon: 'text-violet-600' }, upgrade: { bg: 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300', btn: 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600', icon: 'text-emerald-600' }, downgrade: { bg: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600', icon: 'text-amber-600' } };
  const style = colors[insight.type] || colors.info;
  const Icon = insight.icon || Lightbulb;
  
  return (
    <div className={`p-4 rounded-xl border-2 ${style.bg} transition-all hover:shadow-md ${isHighlight ? 'ring-2 ring-emerald-400 ring-offset-2' : ''}`}>
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-lg bg-white shadow-sm"><Icon size={20} className={style.icon} /></div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">{insight.title}</p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{insight.message}</p>
          {insight.savings && <p className="text-xs font-bold text-emerald-600 mt-2">💰 Economia: R$ {insight.savings.toLocaleString('pt-BR')}</p>}
          {insight.cost && <p className="text-xs font-bold text-violet-600 mt-2">💎 Investimento: +R$ {insight.cost.toLocaleString('pt-BR')}</p>}
          {insight.action && <button onClick={() => onAction && onAction(insight)} className={`mt-3 px-4 py-2 ${style.btn} text-white text-xs font-bold rounded-lg transition-colors shadow-sm`}>{insight.action}</button>}
        </div>
      </div>
    </div>
  );
};

// ========== TIMELINE ACTIVITY CARD ==========
const TimelineActivityCard = ({ item, onEdit, onRemove, showActions = true, isFirst = false, isLast = false }) => {
  const periodStyle = getPeriodStyle(item.period);
  const Icon = getCategoryIcon(item);
  const endTime = item.endTime || (item.startTime && item.duration ? TimeSlotEngine.calculateEndTime(item.startTime, item.duration) : null);
  const getEmoji = () => { if (item.type === 'flight') return '✈️'; if (item.type === 'hotel') return '🏨'; if (item.type === 'rest') return '😴'; if (item.type === 'transfer') return '🚗'; if (item.category === 'restaurant') return '🍽️'; return ''; };
  
  return (
    <div className="relative pl-10 pb-6 group activity-card print-avoid-break">
      <div className={`absolute left-[14px] w-0.5 bg-gradient-to-b ${periodStyle.gradient} ${isFirst ? 'top-4' : 'top-0'} ${isLast ? 'h-4' : 'bottom-0'}`} />
      <div className={`absolute left-[7px] top-3 w-4 h-4 rounded-full ${periodStyle.dot} ring-4 ring-white shadow-lg z-10`}><div className="absolute inset-1 bg-white rounded-full opacity-40" /></div>
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-lg transition-all ml-2">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`px-3 py-1.5 ${periodStyle.bg} ${periodStyle.text} text-xs font-bold rounded-lg flex items-center gap-1.5 border ${periodStyle.border}`}>
              <Clock size={12} /><span className="font-mono">{item.startTime || periodStyle.label}</span>
              {endTime && (<><span className="opacity-60 mx-0.5">—</span><span className="font-mono">{endTime}</span></>)}
            </span>
            {item.childFriendly && <span className="text-xs text-pink-500 bg-pink-50 px-2 py-1 rounded-lg border border-pink-200">👶 Kids</span>}
            {item.intensity === 'heavy' && <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-lg border border-red-200">🔥 Intenso</span>}
            {item.type === 'rest' && <span className="text-xs text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg border border-indigo-200">💤 Recuperação</span>}
            {item.type === 'flight' && <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-lg border border-blue-200">✈️ Voo</span>}
            {item.type === 'hotel' && <span className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-lg border border-purple-200">🏨 Check-in</span>}
          </div>
          {showActions && (<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity no-print"><button onClick={() => onEdit && onEdit(item)} className="p-1.5 bg-teal-100 hover:bg-teal-200 rounded-lg" title="Trocar"><RefreshCw size={14} className="text-teal-600" /></button><button onClick={() => onRemove && onRemove()} className="p-1.5 bg-red-100 hover:bg-red-200 rounded-lg" title="Remover"><Trash2 size={14} className="text-red-600" /></button></div>)}
        </div>
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl ${periodStyle.bg} flex-shrink-0 border ${periodStyle.border}`}><Icon size={24} className={periodStyle.text} /></div>
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-slate-800 text-base">{getEmoji()} {item.name}</h4>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400 flex-shrink-0" /><span className="truncate">{item.location || item.cuisine}</span></p>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {item.price === 0 ? (<span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-emerald-200"><Sparkles size={10} /> Gratuito</span>) : item.price > 0 && (<span className="px-3 py-1 bg-teal-100 text-teal-700 text-xs font-bold rounded-lg border border-teal-200">R$ {item.price?.toLocaleString('pt-BR')}</span>)}
              {item.duration && <span className="text-xs text-slate-500 flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200"><Clock size={10} /> {item.duration}h</span>}
              {item.rating && <span className="text-xs text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200"><Star size={10} className="fill-amber-500" /> {item.rating}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== TIMELINE DAY SECTION ==========
const TimelineDaySection = ({ day, dayNumber, totalDays, dateInfo, items, flight, hotel, origin, destination, totalPayingTravelers, arrivalInfo, returnTime, onEditItem, onAddItem, onRemoveItem, upgradeInsight, isArrivalDay, isRestDay }) => {
  const sortedItems = [...items].sort((a, b) => (a.startTime || '12:00').localeCompare(b.startTime || '12:00'));
  let dayTotal = 0;
  if (isArrivalDay && flight) dayTotal += flight.price * totalPayingTravelers;
  if (hotel) dayTotal += hotel.price;
  items.forEach(item => { dayTotal += (item.price || 0); });
  if (dayNumber === totalDays && flight) dayTotal += flight.price * totalPayingTravelers;
  
  const allDayItems = [];
  
  if (isArrivalDay && flight) {
    allDayItems.push({ key: 'arrival-flight', item: { name: `Chegada - ${flight.name}`, location: `${origin?.split(' ')[0]} → ${destination?.split(',')[0]}`, startTime: arrivalInfo?.time || '??:??', period: TimeSlotEngine.getPeriodFromTime(arrivalInfo?.time || '12:00'), price: flight.price * totalPayingTravelers, duration: null, type: 'flight', tags: ['flight'] }, showActions: false });
  }
  
  if (isArrivalDay && arrivalInfo?.requiresRest) {
    const restStartHour = Math.min(23, (arrivalInfo?.arrivalHour || 10) + 1);
    const restStart = `${restStartHour.toString().padStart(2, '0')}:00`;
    const restDuration = Math.min(4, 22 - restStartHour);
    allDayItems.push({ key: 'rest-recovery', item: { name: 'Descanso e Recuperação', location: `Adaptação ao fuso (${arrivalInfo.timezoneDiff > 0 ? '+' : ''}${arrivalInfo.timezoneDiff}h) • Jet lag recovery`, startTime: restStart, endTime: TimeSlotEngine.calculateEndTime(restStart, restDuration), period: TimeSlotEngine.getPeriodFromTime(restStart), price: 0, duration: restDuration, type: 'rest', tags: ['rest'] }, showActions: false });
  }
  
  if (isArrivalDay && hotel) {
    const checkinTime = arrivalInfo?.arrivalHour ? `${Math.max(14, arrivalInfo.arrivalHour + 1).toString().padStart(2, '0')}:00` : '15:00';
    allDayItems.push({ key: 'hotel-checkin', item: { name: hotel.name, location: `${hotel.location} • ${'⭐'.repeat(hotel.stars)}`, startTime: checkinTime, period: TimeSlotEngine.getPeriodFromTime(checkinTime), price: hotel.price, duration: null, type: 'hotel', category: 'hotel', tags: ['hotel'] }, showActions: false });
  }
  
  sortedItems.forEach((item, idx) => { allDayItems.push({ key: `activity-${idx}`, item: item, showActions: true, onEdit: () => onEditItem && onEditItem(day, idx, item), onRemove: () => onRemoveItem && onRemoveItem(day, idx) }); });
  
  if (dayNumber === totalDays && flight) {
    allDayItems.push({ key: 'return-flight', item: { name: 'Voo de Volta', location: `${destination?.split(',')[0]} → ${origin?.split(' ')[0]}`, startTime: returnTime || '20:00', period: 'noite', price: flight.price * totalPayingTravelers, duration: null, type: 'flight', tags: ['flight'] }, showActions: false });
  }
  
  allDayItems.sort((a, b) => (a.item.startTime || '12:00').localeCompare(b.item.startTime || '12:00'));
  
  return (
    <div className="day-section mb-10 print-avoid-break">
      <div className="sticky top-16 z-20 bg-gradient-to-r from-slate-50/98 via-white/98 to-slate-50/98 backdrop-blur-md py-4 -mx-6 px-6 border-b border-slate-200 mb-6 sticky-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 text-white px-4 py-3 rounded-xl shadow-lg"><p className="text-[10px] font-medium text-teal-200 uppercase tracking-wider">{dateInfo.weekdayShort}</p><p className="text-2xl font-bold">{dateInfo.day}/{dateInfo.month}</p></div>
            <div><h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">Dia {dayNumber}{isArrivalDay && arrivalInfo?.isOvernightFlight && (<span className="px-3 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1.5 shadow-md animate-pulse"><Moon size={14} /> Chegada D+1</span>)}</h3><p className="text-sm text-slate-500">{dateInfo.weekday}</p></div>
            {isRestDay && (<span className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-indigo-200"><Bed size={14} /> Dia de Recuperação</span>)}
            {dayNumber === totalDays && (<span className="px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg flex items-center gap-1 border border-blue-200"><PlaneTakeoff size={14} /> Dia de Partida</span>)}
          </div>
          <div className="text-right"><p className="text-xs text-slate-500 uppercase tracking-wide">Custo do dia</p><p className="text-xl font-bold text-teal-600">R$ {dayTotal.toLocaleString('pt-BR')}</p></div>
        </div>
      </div>
      {isArrivalDay && upgradeInsight && (<div className="mb-6 ml-12"><AIInsightCard insight={upgradeInsight} isHighlight /></div>)}
      <div className="relative timeline-container">
        {allDayItems.map((entry, idx) => (<TimelineActivityCard key={entry.key} item={entry.item} onEdit={entry.onEdit} onRemove={entry.onRemove} showActions={entry.showActions} isFirst={idx === 0} isLast={idx === allDayItems.length - 1} />))}
        {!isRestDay && (<div className="relative pl-10 pb-4"><div className="absolute left-[14px] top-0 h-8 w-0.5 bg-gradient-to-b from-teal-200 to-transparent" /><button onClick={() => onAddItem && onAddItem(day)} className="ml-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 no-print"><Plus size={18} /> Adicionar Atividade</button></div>)}
      </div>
    </div>
  );
};

// ========== COMMUNITY CARD ==========
const CommunityCard = ({ itinerary, onUse, onLike, onViewDetails, isLiked, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura', gastro: '🍽️ Gastronômico' };
  
  if (compact) return (<div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all cursor-pointer" onClick={() => onViewDetails && onViewDetails(itinerary)}><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${destData?.coverUrl})` }} /><div className="flex-1 min-w-0"><h4 className="font-semibold text-sm text-slate-800 truncate">{itinerary.title}</h4><p className="text-xs text-slate-500">{itinerary.duration} dias • R$ {(itinerary.budget/1000).toFixed(0)}k</p></div><div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div></div></div>);
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-36 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {itinerary.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</div>}
        <button onClick={(e) => { e.stopPropagation(); onLike && onLike(itinerary.id); }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}><Heart size={16} className={isLiked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold leading-tight">{itinerary.title}</h3><p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p></div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3"><span className="text-xl">{itinerary.author.avatar}</span><div className="flex-1"><p className="text-xs font-medium text-slate-700">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-teal-500" />}</p><p className="text-[10px] text-slate-400">{itinerary.duration} dias • R$ {itinerary.budget.toLocaleString('pt-BR')}</p></div><div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" /><span className="text-sm font-bold">{itinerary.rating}</span></div></div>
        <div className="flex flex-wrap gap-1 mb-3">{itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{typeLabels[t] || t}</span>)}</div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100"><div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />{itinerary.likes}</span><span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.reviews}</span></div><button onClick={() => onViewDetails && onViewDetails(itinerary)} className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1"><Eye size={14} /> Ver Detalhes</button></div>
      </div>
    </div>
  );
};

// ========== PROFILE PAGE ==========
const ProfilePage = ({ user, setUser, userProfile, setUserProfile, onBack }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [tempProfile, setTempProfile] = useState(userProfile);
  const toggleType = (typeId) => { if ((tempProfile.types || []).includes(typeId)) setTempProfile({ ...tempProfile, types: (tempProfile.types || []).filter(t => t !== typeId) }); else if ((tempProfile.types || []).length < 3) setTempProfile({ ...tempProfile, types: [...(tempProfile.types || []), typeId] }); };
  
  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-teal-600"><ChevronUp className="rotate-[-90deg]" size={20} /> Voltar</button>
      <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-8 text-white text-center mb-6">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">{user.avatar}</div>
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p className="text-teal-100">{user.email}</p>
        <div className="mt-4 flex justify-center gap-8"><div><p className="text-2xl font-bold">{user.trips}</p><p className="text-xs text-teal-200">Viagens</p></div><div><p className="text-2xl font-bold">{user.joinDate}</p><p className="text-xs text-teal-200">Membro desde</p></div></div>
      </div>
      <div className="flex gap-2 mb-6">{['info', 'profile', 'trips', 'saved'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 rounded-xl font-medium ${activeTab === tab ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tab === 'info' ? 'Informações' : tab === 'profile' ? 'Perfil' : tab === 'trips' ? 'Viagens' : 'Salvos'}</button>)}</div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {activeTab === 'info' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}</div><div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-slate-500 block mb-1">Nome Completo</label><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div><div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div></div>)}
        {activeTab === 'profile' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>{!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}</div><h3 className="font-semibold text-slate-700 mb-2">Seus estilos de viagem <span className="text-xs text-slate-400">(até 3)</span></h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => { const isSelected = (tempProfile.types || []).includes(type.id); return (<button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'} ${!editing && 'opacity-70'}`}><type.icon size={28} className={isSelected ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="font-medium text-sm mt-2">{type.name}</p>{isSelected && <span className="text-[10px] text-teal-600 font-semibold">✓</span>}</button>); })}</div><h3 className="font-semibold text-slate-700 mb-3">Interesses</h3><div className="flex flex-wrap gap-2">{INTEREST_TAGS.map(tag => (<button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tag}</button>))}</div></div>)}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500">Suas viagens aparecerão aqui</p></div>}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nada salvo ainda</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
      </div>
    </div>
  );
};

// ========== MAIN APP COMPONENT ==========
export default function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ types: [], interests: [], preferredBudget: 'medium' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-20');
  const [endDate, setEndDate] = useState('2026-04-27');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(50000);
  const [outboundDepartureTime, setOutboundDepartureTime] = useState('22:00');
  const [returnDepartureTime, setReturnDepartureTime] = useState('18:00');
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [daySchedule, setDaySchedule] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [communityFilter, setCommunityFilter] = useState({ destination: 'all', type: 'all' });
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [tripPriorities, setTripPriorities] = useState([]);
  const [likedItineraries, setLikedItineraries] = useState([]);
  const [showPriorityPanel, setShowPriorityPanel] = useState(false);
  const [activityModal, setActivityModal] = useState({ isOpen: false, day: null, idx: null, current: null, mode: 'add' });
  const [communityDetailModal, setCommunityDetailModal] = useState({ isOpen: false, itinerary: null });
  
  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;
  
  const arrivalInfo = useMemo(() => {
    if (!destination || !selectedFlight) return null;
    return calculateArrival(origin, destination, outboundDepartureTime, selectedFlight.duration, startDate);
  }, [origin, destination, outboundDepartureTime, selectedFlight, startDate]);
  
  const actualStartDate = useMemo(() => arrivalInfo?.actualArrivalDate || startDate, [arrivalInfo, startDate]);
  
  const tripDays = useMemo(() => {
    const start = new Date(actualStartDate + 'T12:00:00');
    const end = new Date(endDate + 'T12:00:00');
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
  }, [actualStartDate, endDate]);
  
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
  
  const handleInsightAction = (insight) => {
    if (!currentData) return;
    if (insight.actionType === 'upgrade_hotel') { const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays && h.id !== selectedHotel?.id); if (betterHotel) setSelectedHotel(betterHotel); }
    else if (insight.actionType === 'downgrade_hotel') { const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0); if (cheaperHotel) setSelectedHotel(cheaperHotel); }
    else if (insight.actionType === 'downgrade_flight') { const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price); if (cheaperFlight) setSelectedFlight(cheaperFlight); }
    else if (insight.actionType === 'upgrade_flight') { const betterFlight = currentData.flights.find(f => f.price > selectedFlight?.price && f.rating > selectedFlight?.rating); if (betterFlight) setSelectedFlight(betterFlight); }
  };

  const insights = useMemo(() => {
    if (!itineraryGenerated || !currentData) return [];
    const list = [];
    const userTypes = userProfile.types || [];
    const prioritizesComfort = tripPriorities.includes('comfort') || userTypes.includes('luxury');
    if (isOverBudget) {
      const deficit = Math.abs(remaining);
      if (!prioritizesComfort) { const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0); if (cheaperHotel) { const savings = (selectedHotel.price - cheaperHotel.price) * tripDays; list.push({ type: 'downgrade', icon: ArrowDownCircle, title: '⬇️ Downgrade de Hotel', message: `Troque ${selectedHotel.name} por ${cheaperHotel.name} (${cheaperHotel.stars}★)`, savings, action: 'Aplicar', actionType: 'downgrade_hotel' }); } }
      const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price);
      if (cheaperFlight) { const savings = (selectedFlight.price - cheaperFlight.price) * totalPayingTravelers * 2; list.push({ type: 'downgrade', icon: ArrowDownCircle, title: '⬇️ Voo Econômico', message: `${cheaperFlight.name} disponível`, savings, action: 'Trocar', actionType: 'downgrade_flight' }); }
      list.push({ type: 'danger', icon: AlertTriangle, title: '⚠️ Orçamento Excedido!', message: `R$ ${deficit.toLocaleString('pt-BR')} acima do limite` });
    }
    if (!isOverBudget && remaining > totalBudget * 0.10) { const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price > selectedHotel?.price && (h.price - selectedHotel?.price) * tripDays <= remaining && h.id !== selectedHotel?.id); if (betterHotel) { const cost = (betterHotel.price - selectedHotel.price) * tripDays; list.push({ type: 'upgrade', icon: ArrowUpCircle, title: '✨ Upgrade Disponível!', message: `${betterHotel.name} (${betterHotel.stars}★) por +R$ ${cost.toLocaleString('pt-BR')}`, cost, action: 'Fazer Upgrade', actionType: 'upgrade_hotel' }); } }
    if (currentData.tip) list.push({ type: 'tip', icon: Lightbulb, title: '💡 Dica Local', message: currentData.tip });
    if (arrivalInfo?.requiresRest) list.push({ type: 'info', icon: Clock, title: '😴 Voo Longo Detectado', message: `${arrivalInfo.flightHours}h de voo. Dia 1 reservado para descanso e recuperação (fuso: ${arrivalInfo.timezoneDiff > 0 ? '+' : ''}${arrivalInfo.timezoneDiff}h).` });
    return list;
  }, [itineraryGenerated, currentData, isOverBudget, remaining, selectedHotel, selectedFlight, tripDays, totalPayingTravelers, totalBudget, arrivalInfo, tripPriorities, userProfile]);

  const upgradeInsight = useMemo(() => insights.find(i => i.type === 'upgrade'), [insights]);
  const filteredCommunity = useMemo(() => COMMUNITY_ITINERARIES.filter(i => { if (communityFilter.destination !== 'all' && i.destination !== communityFilter.destination) return false; if (communityFilter.type !== 'all' && !i.tags.includes(communityFilter.type)) return false; return true; }), [communityFilter]);
  const filteredDestinations = useMemo(() => selectedContinent === 'all' ? Object.entries(DESTINATIONS_DATABASE) : Object.entries(DESTINATIONS_DATABASE).filter(([_, d]) => d.continent === selectedContinent), [selectedContinent]);
  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  const togglePriority = (id) => { if (tripPriorities.includes(id)) setTripPriorities(tripPriorities.filter(p => p !== id)); else if (tripPriorities.length < 3) setTripPriorities([...tripPriorities, id]); };
  const toggleLike = (id) => { if (likedItineraries.includes(id)) setLikedItineraries(likedItineraries.filter(i => i !== id)); else setLikedItineraries([...likedItineraries, id]); };
  const handleEditItem = (day, idx, item) => setActivityModal({ isOpen: true, day, idx, current: item, mode: 'swap' });
  const handleAddItem = (day) => setActivityModal({ isOpen: true, day, idx: null, current: null, mode: 'add' });
  const handleRemoveItem = (day, idx) => { const newSchedule = { ...daySchedule }; newSchedule[day] = newSchedule[day].filter((_, i) => i !== idx); setDaySchedule(newSchedule); };
  const handleSelectActivity = (activity) => { const { day, idx, mode } = activityModal; const newSchedule = { ...daySchedule }; if (mode === 'swap' && idx !== null) newSchedule[day][idx] = activity; else newSchedule[day] = [...(newSchedule[day] || []), activity]; setDaySchedule(newSchedule); };

  // ========== GENERATE ITINERARY - MOTOR CORRIGIDO ==========
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
      const arrival = calculateArrival(origin, destination, outboundDepartureTime, bestFlight.duration, startDate);
      
      const scoreActivity = (act) => {
        let score = act.rating * 10;
        const userTypes = userProfile.types || [];
        if (userTypes.includes('beach') && act.tags?.includes('beach')) score += 30;
        if (userTypes.includes('gastro') && act.tags?.includes('gastro')) score += 30;
        if (userTypes.includes('culture') && (act.tags?.includes('culture') || act.tags?.includes('history'))) score += 30;
        if (userTypes.includes('adventure') && act.tags?.includes('adventure')) score += 30;
        if (tripPriorities.includes('gastronomy') && act.tags?.includes('gastro')) score += 50;
        if (tripPriorities.includes('beaches') && act.tags?.includes('beach')) score += 50;
        if (tripPriorities.includes('culture') && act.tags?.includes('culture')) score += 50;
        if (children > 0 && !act.childFriendly) score -= 20;
        if (children > 0 && act.childFriendly) score += 15;
        return score;
      };
      
      const sortedActivities = [...data.activities].sort((a, b) => scoreActivity(b) - scoreActivity(a));
      const restaurants = [...data.restaurants].sort((a, b) => b.rating - a.rating);
      let schedule = {};
      const usedActivities = new Set();
      const usedRestaurants = new Set();
      
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        
        // REGRA DE OURO DA FADIGA - DIA 1 COM BLOQUEIO
        if (d === 1 && arrival.requiresRest) {
          const dinnerRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && (r.period === 'noite' || r.tags?.includes('gastro')));
          if (dinnerRestaurant) {
            usedRestaurants.add(dinnerRestaurant.id);
            schedule[d].push({ ...dinnerRestaurant, category: 'restaurant', location: dinnerRestaurant.cuisine, startTime: '20:30', endTime: TimeSlotEngine.calculateEndTime('20:30', dinnerRestaurant.duration || 1.5), period: 'noite' });
          }
          continue;
        }
        
        const isLastDay = d === tripDays;
        const activitiesLimit = isLastDay ? 1 : 3;
        let dayStartTime = '09:00';
        if (d === 1 && !arrival.requiresRest) dayStartTime = `${Math.max(9, arrival.arrivalHour + 2).toString().padStart(2, '0')}:00`;
        let currentTimeMinutes = TimeSlotEngine.timeToMinutes(dayStartTime);
        let activitiesAdded = 0;
        
        for (let i = 0; i < sortedActivities.length && activitiesAdded < activitiesLimit; i++) {
          const act = sortedActivities[i];
          if (usedActivities.has(act.id)) continue;
          if (d === 1 && arrival.isOvernightFlight && act.intensity === 'heavy') continue;
          if (isLastDay && act.duration > 4) continue;
          const startTime = TimeSlotEngine.minutesToTime(currentTimeMinutes);
          const endTime = TimeSlotEngine.calculateEndTime(startTime, act.duration);
          const period = TimeSlotEngine.getPeriodFromTime(startTime);
          usedActivities.add(act.id);
          schedule[d].push({ ...act, category: 'activity', startTime, endTime, period });
          activitiesAdded++;
          currentTimeMinutes = TimeSlotEngine.timeToMinutes(endTime) + 30;
          
          if (currentTimeMinutes >= 720 && currentTimeMinutes < 840 && !schedule[d].some(i => i.startTime?.startsWith('12') || i.startTime?.startsWith('13'))) {
            const lunchRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && (r.period === 'tarde' || r.period === 'manhã'));
            if (lunchRestaurant) {
              usedRestaurants.add(lunchRestaurant.id);
              schedule[d].push({ ...lunchRestaurant, category: 'restaurant', location: lunchRestaurant.cuisine, startTime: '12:30', endTime: TimeSlotEngine.calculateEndTime('12:30', lunchRestaurant.duration || 1), period: 'tarde' });
              currentTimeMinutes = TimeSlotEngine.timeToMinutes('14:00');
            }
          }
        }
        
        if (!isLastDay && !schedule[d].some(i => i.category === 'restaurant' && i.period === 'noite')) {
          const dinnerRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && r.period === 'noite');
          if (dinnerRestaurant) {
            usedRestaurants.add(dinnerRestaurant.id);
            schedule[d].push({ ...dinnerRestaurant, category: 'restaurant', location: dinnerRestaurant.cuisine, startTime: '20:00', endTime: TimeSlotEngine.calculateEndTime('20:00', dinnerRestaurant.duration || 1.5), period: 'noite' });
          }
        }
      }
      
      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setDaySchedule(schedule);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 1500);
  };

  const useCommunityItinerary = (itinerary) => { const data = DESTINATIONS_DATABASE[itinerary.destination]; if (!data) return; setDestination(itinerary.destination); setTotalBudget(itinerary.budget); setTimeout(() => generateItinerary(), 100); };
  const handlePrint = () => { const style = document.createElement('style'); style.textContent = printStyles; document.head.appendChild(style); window.print(); setTimeout(() => document.head.removeChild(style), 1000); };

  // ========== RENDER ==========
  if (!user || currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2"><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div>
            <div className="flex items-center gap-4">
              {user ? (<><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button></>) : (<button onClick={() => setShowAuthModal(true)} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">Entrar</button>)}
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">Planeje viagens <span className="text-teal-600">incríveis</span> com IA</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">Roteiros personalizados, otimização de orçamento e sugestões inteligentes baseadas no seu perfil de viajante.</p>
          <div className="flex gap-4 justify-center">
            <button onClick={() => { if (!user) setShowAuthModal(true); else setCurrentView('planner'); }} className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold text-lg hover:bg-teal-700 shadow-lg hover:shadow-teal-500/30 transition-all flex items-center gap-2"><Sparkles size={24} /> Começar a Planejar</button>
            <button onClick={() => setCurrentView('community')} className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:border-teal-500 hover:text-teal-600 transition-all">Ver Comunidade</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            {[{ icon: Sparkles, title: 'IA Personalizada', desc: 'Roteiros adaptados ao seu perfil e preferências' }, { icon: Wallet, title: 'Otimização de Custos', desc: 'Sugestões de upgrade e downgrade em tempo real' }, { icon: Users, title: 'Comunidade', desc: 'Roteiros compartilhados por viajantes reais' }].map((f, i) => (<div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all"><div className="w-14 h-14 bg-teal-100 rounded-xl flex items-center justify-center mb-4"><f.icon size={28} className="text-teal-600" /></div><h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3><p className="text-slate-600">{f.desc}</p></div>))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Destinos Populares</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Object.entries(DESTINATIONS_DATABASE).slice(0, 4).map(([name, dest]) => (<div key={name} onClick={() => { setDestination(name); setCurrentView('planner'); if (!user) setShowAuthModal(true); }} className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group"><div className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-110" style={{ backgroundImage: `url(${dest.coverUrl})` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className="absolute bottom-4 left-4 right-4"><p className="text-white font-bold text-lg">{name.split(',')[0]}</p><p className="text-white/80 text-sm">{dest.continent}</p></div></div>))}
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setCurrentView('planner'); }} />
      </div>
    );
  }

  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div>
            <div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8"><h1 className="text-3xl font-bold text-slate-800">Comunidade de Viajantes</h1><p className="text-slate-600 mt-2">Descubra roteiros criados por viajantes reais</p></div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <select value={communityFilter.destination} onChange={e => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 border border-slate-200 rounded-lg"><option value="all">Todos os destinos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select>
            <select value={communityFilter.type} onChange={e => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 border border-slate-200 rounded-lg"><option value="all">Todos os tipos</option>{['romantic', 'family', 'budget', 'luxury', 'culture', 'beach', 'adventure'].map(t => <option key={t} value={t}>{t}</option>)}</select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} />)}</div>
        </div>
        <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
      </div>
    );
  }

  if (currentView === 'profile' && user) {
    return (
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div>
            <div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button onClick={() => { setUser(null); setCurrentView('landing'); }} className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"><LogOut size={18} /> Sair</button></div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onBack={() => setCurrentView('planner')} /></div>
      </div>
    );
  }

  // PLANNER PAGE
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div>
          <div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div>
        </div>
      </nav>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm no-print">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><PlaneTakeoff size={14} /> Origem</label><select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><PlaneLanding size={14} /> Destino</label><select value={destination} onChange={e => { setDestination(e.target.value); setItineraryGenerated(false); }} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"><option value="">Selecione...</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Calendar size={14} /> Datas</label><div className="flex gap-2"><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Users size={14} /> Viajantes</label><div className="flex gap-2"><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"><button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{adults} adultos</span><button onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"><button onClick={() => { setChildren(Math.max(0, children - 1)); setChildrenAges(childrenAges.slice(0, -1)); }} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{children} crian.</span><button onClick={() => { setChildren(children + 1); setChildrenAges([...childrenAges, 5]); }} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div></div></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-100">
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Wallet size={14} /> Orçamento Total</label><input type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Ida</label><input type="time" value={outboundDepartureTime} onChange={e => setOutboundDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Volta</label><input type="time" value={returnDepartureTime} onChange={e => setReturnDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Sliders size={14} /> Prioridades</label><button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left flex items-center justify-between"><span className="text-sm">{tripPriorities.length > 0 ? `${tripPriorities.length} selecionadas` : 'Selecionar...'}</span>{showPriorityPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div>
          </div>
          {showPriorityPanel && (<div className="mb-6 p-4 bg-slate-50 rounded-xl"><p className="text-sm text-slate-600 mb-3">Selecione até 3 prioridades para sua viagem:</p><div className="flex flex-wrap gap-2">{TRIP_PRIORITIES.map(p => (<button key={p.id} onClick={() => togglePriority(p.id)} className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${tripPriorities.includes(p.id) ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 hover:border-teal-400'}`}><p.icon size={16} /> {p.name}</button>))}</div></div>)}
          <button onClick={generateItinerary} disabled={!destination || isGenerating} className={`w-full py-4 font-bold rounded-xl text-white flex items-center justify-center gap-2 shadow-lg transition-all ${!destination ? 'bg-slate-300 cursor-not-allowed' : isGenerating ? 'bg-teal-400' : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:shadow-teal-500/30'}`}>{isGenerating ? <><RefreshCw size={20} className="animate-spin" /> Gerando roteiro...</> : <><Sparkles size={20} /> Gerar Roteiro Inteligente</>}</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 main-content">
            {itineraryGenerated && (
              <div className="space-y-6">
                <div className="hidden print-header"><div className="print-logo flex items-center gap-2"><Globe size={24} /> SmartTravel AI</div><div className="text-right"><p className="font-bold">{destination}</p><p className="text-sm text-slate-600">{formatDateFull(actualStartDate).day}/{formatDateFull(actualStartDate).month} - {formatDateFull(endDate).day}/{formatDateFull(endDate).month}/{formatDateFull(endDate).year}</p></div></div>
                <div className="hidden print-summary"><div className="grid grid-cols-4 gap-4 text-center"><div><p className="font-bold text-teal-700">{tripDays}</p><p className="text-xs">Dias</p></div><div><p className="font-bold text-teal-700">{totalPayingTravelers}</p><p className="text-xs">Viajantes</p></div><div><p className="font-bold text-teal-700">R$ {costs.total.toLocaleString('pt-BR')}</p><p className="text-xs">Total</p></div><div><p className="font-bold text-teal-700">{selectedHotel?.name}</p><p className="text-xs">Hotel</p></div></div></div>
                {arrivalInfo && (<div className={`arrival-banner rounded-2xl p-5 flex items-center gap-4 shadow-lg print-avoid-break ${arrivalInfo.isOvernightFlight ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'}`}><div className={`p-4 rounded-xl ${arrivalInfo.isOvernightFlight ? 'bg-orange-600/30' : 'bg-blue-600/30'}`}>{arrivalInfo.isOvernightFlight ? <Moon size={32} /> : <PlaneLanding size={32} />}</div><div className="flex-1"><p className="font-bold text-lg flex items-center gap-2">Chegada às {arrivalInfo.time}<span className="text-sm font-normal opacity-90">(horário local de {destination?.split(',')[0]})</span>{arrivalInfo.dayLabel && (<span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">{arrivalInfo.dayLabel}</span>)}</p><p className="text-sm opacity-90 mt-1">Fuso: {arrivalInfo.timezoneDiff > 0 ? '+' : ''}{arrivalInfo.timezoneDiff}h • Duração do voo: {arrivalInfo.flightHours}h{arrivalInfo.requiresRest && (<span className="ml-3 inline-flex items-center gap-1"><Bed size={14} /><span className="font-medium">Dia 1 reservado para recuperação</span></span>)}</p></div></div>)}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map(dayNum => {
                    const dateInfo = formatDateFull(actualStartDate, dayNum - 1);
                    const isRestDay = dayNum === 1 && arrivalInfo?.requiresRest;
                    return (<TimelineDaySection key={dayNum} day={dayNum} dayNumber={dayNum} totalDays={tripDays} dateInfo={dateInfo} items={daySchedule[dayNum] || []} flight={selectedFlight} hotel={selectedHotel} origin={origin} destination={destination} totalPayingTravelers={totalPayingTravelers} arrivalInfo={arrivalInfo} returnTime={returnDepartureTime} onEditItem={handleEditItem} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} upgradeInsight={dayNum === 1 ? upgradeInsight : null} isArrivalDay={dayNum === 1} isRestDay={isRestDay} />);
                  })}
                </div>
              </div>
            )}
            {!destination && (<div className="bg-white rounded-2xl border border-slate-200 p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer ir</p></div>)}
          </div>

          <div className="space-y-6 no-print sidebar-print">
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (<><div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>{isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}</div><div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm"><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos</span><span>R$ {costs.flights.toLocaleString('pt-BR')} ({costs.percentages.flights || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel</span><span>R$ {costs.hotels.toLocaleString('pt-BR')} ({costs.percentages.hotels || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString('pt-BR')} ({costs.percentages.activities || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString('pt-BR')} ({costs.percentages.food || 0}%)</span></div><div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div></div></>)}
            </div>
            {itineraryGenerated && insights.length > 0 && (<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-teal-600" /> Insights da IA</h3><div className="space-y-3">{insights.map((insight, i) => <AIInsightCard key={i} insight={insight} onAction={handleInsightAction} />)}</div></div>)}
            {destination && (<div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={18} className="text-amber-500" /> Top Roteiros - {destination.split(',')[0]}</h3><div className="space-y-2">{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => (<CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} compact />))}{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda</p>}</div></div>)}
            {itineraryGenerated && (<button onClick={handlePrint} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30'}`}>{isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF</>}</button>)}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      <ActivityModal isOpen={activityModal.isOpen} onClose={() => setActivityModal({ isOpen: false, day: null, idx: null, current: null, mode: 'add' })} activities={currentData?.activities || []} restaurants={currentData?.restaurants || []} current={activityModal.current} mode={activityModal.mode} dayNum={activityModal.day} onSelect={handleSelectActivity} onRemove={() => activityModal.day && activityModal.idx !== null && handleRemoveItem(activityModal.day, activityModal.idx)} />
      <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
    </div>
  );
}
