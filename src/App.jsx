import React, { useState, useMemo, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Mountain, Building, Palmtree, Crown, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, MessageSquare, Car, Copy, Download, Anchor, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Trash2, Eye, Coffee, Bed, ArrowUpCircle, ArrowDownCircle, FileText, Briefcase, Activity, DollarSign, AlertCircle, ChevronRight, BookOpen, Zap, BarChart3, ArrowRight, Shield, Banknote, Target, Timer, ExternalLink, CheckCircle2, Circle, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

// ============================================================
// 🔮 KINU v1.0 - TRAVEL OS
// Sua jornada, nossa inteligência coletiva.
// Sabedoria do Clã | Dark Premium | Glassmorphism
// ============================================================
console.log('%c🔮 KINU v1.0 - Sua jornada, nossa inteligência coletiva', 'background: linear-gradient(135deg, #020617 0%, #4F46E5 50%, #10b981 100%); color: white; font-size: 20px; padding: 12px; border-radius: 8px; font-weight: bold;');

// ========== KINU DARK MODE CONTEXT ==========
const ThemeContext = createContext({ isDark: true, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);

// KINU Logo SVG Component
const KinuLogo = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
    <defs>
      <linearGradient id="kinuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="50%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#10b981" />
      </linearGradient>
    </defs>
    <path 
      d="M30,50 Q30,20 50,20 Q70,20 70,40 Q70,60 50,60 Q30,60 30,80 Q30,95 50,80 Q70,65 70,50" 
      fill="none" 
      stroke="url(#kinuGradient)" 
      strokeWidth="8" 
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Ícones SVG customizados (compatibilidade total)
const Volume2 = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>;
const Thermometer = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>;
const Umbrella = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M23 12a11.05 11.05 0 0 0-22 0zm-5 7a3 3 0 0 1-6 0v-7"></path></svg>;
const Shirt = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path></svg>;
const Languages = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m5 8 6 6"></path><path d="m4 14 6-6 2-3"></path><path d="M2 5h12"></path><path d="M7 2h1"></path><path d="m22 22-5-10-5 10"></path><path d="M14 18h6"></path></svg>;
const Stethoscope = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"></path><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"></path><circle cx="20" cy="10" r="2"></circle></svg>;
const ImageIcon = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>;
const ListIcon = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>;
const Send = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>;
const Bot = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>;
const Scale = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"></path><path d="M7 21h10"></path><path d="M12 3v18"></path><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"></path></svg>;
const Luggage = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 20h0a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h0"></path><path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14"></path><path d="M10 20h4"></path><circle cx="16" cy="20" r="2"></circle><circle cx="8" cy="20" r="2"></circle></svg>;
const Receipt = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1Z"></path><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path><path d="M12 17V7"></path></svg>;
const Play = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const Pause = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>;
const MoonStar = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path><path d="M19 3v4"></path><path d="M21 5h-4"></path></svg>;
const SunMedium = ({ size, className }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="4"></circle><path d="M12 3v1"></path><path d="M12 20v1"></path><path d="M3 12h1"></path><path d="M20 12h1"></path><path d="m18.364 5.636-.707.707"></path><path d="m6.343 17.657-.707.707"></path><path d="m5.636 5.636.707.707"></path><path d="m17.657 17.657.707.707"></path></svg>;

// KINU Brand Constants
const KINU_BRAND = {
  name: 'KINU',
  tagline: 'Sua jornada, nossa inteligência coletiva.',
  version: '1.0.0',
  clanTerms: {
    community: 'Clã',
    itinerary: 'Conhecimento Validado',
    members: 'Viajantes do Clã',
    wisdom: 'Sabedoria Coletiva'
  }
};

// ========== KINU: BOOKING LINKS GENERATOR ==========
const generateBookingLinks = (type, data) => {
  const { origin, destination, startDate, endDate, hotelName, activityName } = data;
  const destCity = destination?.split(',')[0]?.trim() || '';
  const originCity = origin?.split('(')[0]?.trim() || '';
  
  switch(type) {
    case 'flight':
      return {
        googleFlights: `https://www.google.com/travel/flights?q=Flights%20to%20${encodeURIComponent(destCity)}%20from%20${encodeURIComponent(originCity)}%20on%20${startDate}`,
        skyscanner: `https://www.skyscanner.com.br/transporte/passagens-aereas/${encodeURIComponent(originCity)}/${encodeURIComponent(destCity)}/${startDate?.replace(/-/g, '')}`,
        kayak: `https://www.kayak.com.br/flights/${encodeURIComponent(originCity)}-${encodeURIComponent(destCity)}/${startDate}`
      };
    case 'hotel':
      return {
        booking: `https://www.booking.com/searchresults.html?ss=${encodeURIComponent(hotelName || destCity)}&checkin=${startDate}&checkout=${endDate}`,
        hotels: `https://www.hotels.com/search.do?destination=${encodeURIComponent(destCity)}&startDate=${startDate}&endDate=${endDate}`,
        airbnb: `https://www.airbnb.com.br/s/${encodeURIComponent(destCity)}/homes?checkin=${startDate}&checkout=${endDate}`
      };
    case 'activity':
      return {
        getYourGuide: `https://www.getyourguide.com.br/s/?q=${encodeURIComponent(activityName || destCity)}`,
        tripadvisor: `https://www.tripadvisor.com.br/Search?q=${encodeURIComponent(activityName || destCity)}`,
        viator: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(activityName || destCity)}`
      };
    default:
      return {};
  }
};

// ========== KINU: PRICE HISTORY SIMULATION ==========
const simulatePriceHistory = (currentPrice) => {
  const history = [];
  let price = currentPrice * (1 + (Math.random() * 0.3 - 0.1));
  for (let i = 30; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 0.08;
    price = price * (1 + variation);
    history.push({ day: 30 - i, price: Math.round(price) });
  }
  const minPrice = Math.min(...history.map(h => h.price));
  const isLowestPrice = currentPrice <= minPrice * 1.05;
  return { history, isLowestPrice, minPrice, avgPrice: Math.round(history.reduce((a, b) => a + b.price, 0) / history.length) };
};

// ========== CORE ENGINE ==========
const CITY_OFFSETS = { 'São Paulo (GRU)': -3, 'Rio de Janeiro (GIG)': -3, 'Brasília (BSB)': -3, 'Belo Horizonte (CNF)': -3, 'Salvador (SSA)': -3, 'Fortaleza (FOR)': -3, 'Recife (REC)': -3, 'Porto Alegre (POA)': -3, 'Curitiba (CWB)': -3, 'Manaus (MAO)': -4, 'Florianópolis (FLN)': -3, 'Natal (NAT)': -3, 'Paris, França': 1, 'Londres, UK': 0, 'Roma, Itália': 1, 'Barcelona, Espanha': 1, 'Lisboa, Portugal': 0, 'Amsterdam, Holanda': 1, 'Santorini, Grécia': 2, 'Nova York, EUA': -5, 'Miami, EUA': -5, 'Los Angeles, EUA': -8, 'Cancún, México': -5, 'Buenos Aires, Argentina': -3, 'Tóquio, Japão': 9, 'Dubai, EAU': 4, 'Bangkok, Tailândia': 7, 'Bali, Indonésia': 8, 'Singapura': 8, 'Sydney, Austrália': 10, 'Maldivas': 5, 'Cape Town, África do Sul': 2 };

const TimeSlotEngine = {
  timeToMinutes: (t) => { if (!t) return 0; const [h, m] = t.split(':').map(Number); return h * 60 + (m || 0); },
  minutesToTime: (m) => { const h = Math.floor(m / 60) % 24; const min = m % 60; return `${h.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`; },
  calculateEndTime: (s, d) => { if (!s || !d) return null; return TimeSlotEngine.minutesToTime(TimeSlotEngine.timeToMinutes(s) + d * 60); },
  getPeriodFromTime: (t) => { const m = TimeSlotEngine.timeToMinutes(t); if (m < 720) return 'manhã'; if (m < 1080) return 'tarde'; return 'noite'; }
};

const calculateArrival = (originCity, destCity, departureTime, flightDurationStr, departureDate) => {
  const originOffset = CITY_OFFSETS[originCity] || -3, destOffset = CITY_OFFSETS[destCity] || 0;
  const [depHour, depMin] = (departureTime || '22:00').split(':').map(Number);
  const departureMinutes = depHour * 60 + (depMin || 0);
  let flightMinutes = 0;
  if (flightDurationStr) { const match = flightDurationStr.match(/(\d+)h(\d+)?/); if (match) flightMinutes = parseInt(match[1]) * 60 + (parseInt(match[2]) || 0); }
  const timezoneDiff = destOffset - originOffset;
  const arrivalMinutes = departureMinutes + flightMinutes + (timezoneDiff * 60);
  let daysAdded = 0, normalizedMinutes = arrivalMinutes;
  while (normalizedMinutes >= 1440) { normalizedMinutes -= 1440; daysAdded++; }
  while (normalizedMinutes < 0) { normalizedMinutes += 1440; daysAdded--; }
  const arrivalHour = Math.floor(normalizedMinutes / 60), arrivalMin = Math.round(normalizedMinutes % 60);
  const formattedTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMin.toString().padStart(2, '0')}`;
  let actualArrivalDate = null;
  if (departureDate) { actualArrivalDate = new Date(departureDate + 'T12:00:00'); actualArrivalDate.setDate(actualArrivalDate.getDate() + daysAdded); }
  const isLongFlight = flightMinutes > 7 * 60, isOvernightFlight = daysAdded > 0;
  return { time: formattedTime, daysAdded, isOvernightFlight, isLongFlight, requiresRest: isLongFlight || (isOvernightFlight && flightMinutes > 5 * 60), flightHours: (flightMinutes / 60).toFixed(1), flightMinutes, timezoneDiff, dayLabel: daysAdded === 0 ? '' : daysAdded === 1 ? '+1 dia' : `+${daysAdded} dias`, actualArrivalDate: actualArrivalDate ? actualArrivalDate.toISOString().split('T')[0] : null, arrivalHour, arrivalMinutes: normalizedMinutes };
};

const formatDateFull = (dateStr, addDays = 0) => {
  const date = new Date(dateStr + 'T12:00:00'); date.setDate(date.getDate() + addDays);
  const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const weekdaysShort = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];
  return { weekday: weekdays[date.getDay()], weekdayShort: weekdaysShort[date.getDay()], day: date.getDate().toString().padStart(2, '0'), month: (date.getMonth() + 1).toString().padStart(2, '0'), year: date.getFullYear() };
};

// KINU: Custom period styles with Indigo focus
const getPeriodStyle = (period) => {
  const styles = { 
    manhã: { bg: 'bg-indigo-500/10', text: 'text-indigo-300', border: 'border-indigo-500/30', dot: 'bg-indigo-500', gradient: 'from-indigo-400 to-indigo-600' }, 
    tarde: { bg: 'bg-emerald-500/10', text: 'text-emerald-300', border: 'border-emerald-500/30', dot: 'bg-emerald-500', gradient: 'from-emerald-400 to-emerald-600' }, 
    noite: { bg: 'bg-violet-500/10', text: 'text-violet-300', border: 'border-violet-500/30', dot: 'bg-violet-500', gradient: 'from-violet-400 to-purple-600' } 
  };
  return styles[period] || styles.manhã;
};

const getCategoryIcon = (item) => { if (item.type === 'flight') return PlaneLanding; if (item.type === 'transfer') return Car; if (item.type === 'rest') return Bed; if (item.type === 'hotel') return Hotel; if (item.type === 'checkout') return Briefcase; if (item.type === 'daily-hotel') return Coffee; if (item.category === 'restaurant') return Utensils; if (item.tags?.includes('beach')) return Anchor; if (item.tags?.includes('culture')) return Building; if (item.tags?.includes('adventure')) return Mountain; return Camera; };

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'];
const TRAVELER_TYPES = [{ id: 'adventure', name: 'Aventureiro', icon: Mountain }, { id: 'culture', name: 'Cultural', icon: Building }, { id: 'beach', name: 'Praia', icon: Palmtree }, { id: 'gastro', name: 'Gastronômico', icon: Utensils }, { id: 'family', name: 'Família', icon: Users }, { id: 'romantic', name: 'Romântico', icon: Heart }, { id: 'budget', name: 'Econômico', icon: Wallet }, { id: 'luxury', name: 'Luxo', icon: Crown }];
const TRIP_PRIORITIES = [{ id: 'gastronomy', name: 'Gastronomia', icon: Utensils }, { id: 'beaches', name: 'Praias', icon: Anchor }, { id: 'culture', name: 'Cultura', icon: Building }, { id: 'adventure', name: 'Aventura', icon: Mountain }, { id: 'relaxation', name: 'Relaxamento', icon: Sparkles }, { id: 'kids', name: 'Crianças', icon: Baby }, { id: 'nightlife', name: 'Vida Noturna', icon: Music }, { id: 'shopping', name: 'Compras', icon: ShoppingBag }, { id: 'comfort', name: 'Conforto', icon: Hotel }];
const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];

// ========== KINU PREDICTIVE EXCHANGE ENGINE ==========
const CURRENCY_DATABASE = {
  BRL: { name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  USD: { name: 'Dólar Americano', symbol: '$', flag: '🇺🇸' },
  JPY: { name: 'Iene Japonês', symbol: '¥', flag: '🇯🇵' },
  AED: { name: 'Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  MVR: { name: 'Rufia', symbol: 'Rf', flag: '🇲🇻' }
};

const EXCHANGE_RATES = {
  'BRL-EUR': { rate: 0.163, trend: 'up', volatility: 0.08 },
  'BRL-USD': { rate: 0.175, trend: 'stable', volatility: 0.05 },
  'BRL-JPY': { rate: 26.2, trend: 'down', volatility: 0.12 },
  'BRL-AED': { rate: 0.643, trend: 'stable', volatility: 0.04 },
  'BRL-MVR': { rate: 2.70, trend: 'stable', volatility: 0.03 }
};

const generateForexHistory = (basePair, months = 6) => {
  const baseRate = EXCHANGE_RATES[basePair]?.rate || 1;
  const volatility = EXCHANGE_RATES[basePair]?.volatility || 0.05;
  const trend = EXCHANGE_RATES[basePair]?.trend || 'stable';
  const data = [];
  let currentRate = baseRate * (1 - volatility * 2);
  for (let i = -months; i <= 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short', year: i >= 6 ? '2-digit' : undefined });
    const trendFactor = trend === 'up' ? 0.012 : trend === 'down' ? -0.010 : 0.002;
    const noise = (Math.random() - 0.5) * volatility * baseRate;
    currentRate = currentRate * (1 + trendFactor) + noise;
    currentRate = Math.max(currentRate, baseRate * 0.7);
    currentRate = Math.min(currentRate, baseRate * 1.4);
    data.push({ month: monthName, rate: parseFloat(currentRate.toFixed(4)), projected: i > 0, isCurrent: i === 0 });
  }
  return data;
};

const calculateAdvancedBuySignal = (forexData, tripDate) => {
  const currentRate = forexData.find(d => d.isCurrent)?.rate || 0;
  const projectedRates = forexData.filter(d => d.projected);
  const avgProjected = projectedRates.reduce((a, b) => a + b.rate, 0) / projectedRates.length;
  const percentChange = ((avgProjected - currentRate) / currentRate) * 100;
  const bestMonth = projectedRates.reduce((best, curr) => curr.rate < best.rate ? curr : best, projectedRates[0]);
  const worstMonth = projectedRates.reduce((worst, curr) => curr.rate > worst.rate ? curr : worst, projectedRates[0]);
  const volatilityRange = ((worstMonth.rate - bestMonth.rate) / currentRate) * 100;
  const confidenceIndex = Math.round(Math.max(50, Math.min(95, 75 + Math.abs(percentChange) * 2 - volatilityRange)));
  
  let signal, strategy, message, color, icon, recommendation;
  
  if (percentChange < -3) {
    signal = 'wait';
    strategy = 'LUMP_SUM_DELAYED';
    color = 'amber';
    icon = Timer;
    message = `A sabedoria do clã indica: aguarde ${Math.abs(percentChange).toFixed(1)}% de queda`;
    recommendation = {
      type: 'Compra Única (Aguardar)',
      description: `O conhecimento coletivo sugere comprar em ${bestMonth.month}`,
      rationale: 'Tendência de queda identificada pela análise do clã.',
      potentialSavings: ((currentRate - bestMonth.rate) / currentRate * 100).toFixed(1)
    };
  } else if (percentChange > 3) {
    signal = 'buy';
    strategy = 'BUY_NOW';
    color = 'emerald';
    icon = Zap;
    message = `Oportunidade identificada! Tendência de alta de ${percentChange.toFixed(1)}%`;
    recommendation = {
      type: 'Compra Imediata',
      description: 'O clã recomenda aproveitar a cotação atual',
      rationale: 'Projeção indica valorização da moeda estrangeira.',
      potentialSavings: percentChange.toFixed(1)
    };
  } else {
    signal = 'neutral';
    strategy = 'DCA';
    color = 'indigo';
    icon = Target;
    message = 'Mercado estável. Estratégia DCA recomendada pelo clã';
    recommendation = {
      type: 'DCA (Compras Parceladas)',
      description: 'Sabedoria coletiva: compre mensalmente para diluir riscos',
      rationale: 'Mercado lateral. Estratégia validada por milhares de viajantes.',
      potentialSavings: (volatilityRange / 2).toFixed(1)
    };
  }
  
  return { signal, strategy, message, color, icon, recommendation, confidenceIndex, bestMonth, percentChange, volatilityRange };
};

// ========== KINU: COMMUNITY ITINERARIES (CLÃ) ==========
const COMMUNITY_ITINERARIES = [
  {
    id: 1,
    title: 'Paris Romântica - Sabedoria do Clã',
    destination: 'Paris, França',
    duration: 7,
    budget: 25000,
    rating: 4.9,
    reviews: 847,
    likes: 2341,
    travelers: '3.2k',
    author: { name: 'Marina Silva', avatar: '👩‍🦰', verified: true },
    tags: ['romantic', 'culture', 'gastro'],
    badges: ['🏆 Top 10 do Clã', '✨ Mais Clonado'],
    highlights: ['Torre Eiffel ao entardecer', 'Cruzeiro no Sena', 'Montmartre secreto'],
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    comments: [
      { id: 1, user: 'Carlos M.', avatar: '👨', text: 'Conhecimento validado! Melhor roteiro que já segui.', rating: 5, date: 'Há 2 dias' },
      { id: 2, user: 'Ana Paula', avatar: '👩', text: 'A sabedoria do clã realmente funciona!', rating: 5, date: 'Há 1 semana' }
    ]
  },
  {
    id: 2,
    title: 'Tóquio Tech & Tradição',
    destination: 'Tóquio, Japão',
    duration: 10,
    budget: 35000,
    rating: 4.8,
    reviews: 623,
    likes: 1876,
    travelers: '2.1k',
    author: { name: 'Pedro Tanaka', avatar: '👨‍💼', verified: true },
    tags: ['culture', 'gastro', 'adventure'],
    badges: ['🎌 Expert Japão', '💎 Premium'],
    highlights: ['Shibuya Crossing', 'Templos de Kyoto', 'Gastronomia Omakase'],
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    comments: []
  },
  {
    id: 3,
    title: 'Maldivas Lua de Mel',
    destination: 'Maldivas',
    duration: 6,
    budget: 45000,
    rating: 5.0,
    reviews: 412,
    likes: 3102,
    travelers: '1.8k',
    author: { name: 'Juliana Costa', avatar: '👰', verified: true },
    tags: ['romantic', 'luxury', 'beach'],
    badges: ['💍 Perfeito p/ Casais', '🌊 Melhor Praia'],
    highlights: ['Villa sobre água', 'Snorkel com tubarões', 'Jantar na areia'],
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800',
    comments: []
  }
];

// ========== KINU: DESTINATIONS DATABASE ==========
const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa',
    currency: 'EUR',
    language: 'Francês',
    timezone: 'CET',
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    galleryUrls: [
      'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800',
      'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=800'
    ],
    tip: 'O clã recomenda: compre o Paris Museum Pass para economizar filas e dinheiro.',
    flights: [
      { id: 'f1', name: 'LATAM Premium', price: 4200, duration: '11h30', rating: 4.5, stops: 0 },
      { id: 'f2', name: 'Air France Direct', price: 5800, duration: '11h15', rating: 4.8, stops: 0 },
      { id: 'f3', name: 'TAP Portugal', price: 3400, duration: '14h20', rating: 4.2, stops: 1 }
    ],
    hotels: [
      { id: 'h1', name: 'Le Marais Boutique', price: 850, rating: 4.6, stars: 4, location: 'Le Marais', amenities: ['WiFi', 'Café'] },
      { id: 'h2', name: 'Hôtel Plaza Athénée', price: 2800, rating: 4.9, stars: 5, location: 'Champs-Élysées', amenities: ['Spa', 'Michelin'] },
      { id: 'h3', name: 'Ibis Montmartre', price: 420, rating: 4.0, stars: 3, location: 'Montmartre', amenities: ['WiFi'] }
    ],
    activities: [
      { id: 'a1', name: 'Torre Eiffel - Acesso Prioritário', price: 180, duration: 2, rating: 4.9, period: 'manhã', location: 'Champ de Mars', tags: ['culture', 'landmark'], childFriendly: true },
      { id: 'a2', name: 'Museu do Louvre - Tour Guiado', price: 220, duration: 4, rating: 4.8, period: 'manhã', location: 'Louvre', tags: ['culture', 'art'], childFriendly: true },
      { id: 'a3', name: 'Cruzeiro no Rio Sena', price: 150, duration: 2, rating: 4.7, period: 'noite', location: 'Pont Neuf', tags: ['romantic'], childFriendly: true },
      { id: 'a4', name: 'Montmartre & Sacré-Cœur', price: 90, duration: 3, rating: 4.6, period: 'tarde', location: 'Montmartre', tags: ['culture', 'history'], childFriendly: true },
      { id: 'a5', name: 'Versailles Day Trip', price: 280, duration: 6, rating: 4.8, period: 'manhã', location: 'Versailles', tags: ['culture', 'history'], childFriendly: true },
      { id: 'a6', name: 'Aula de Culinária Francesa', price: 350, duration: 4, rating: 4.9, period: 'manhã', location: 'Le Marais', tags: ['gastro'], childFriendly: false }
    ],
    restaurants: [
      { id: 'r1', name: 'Le Comptoir du Panthéon', price: 180, duration: 2, rating: 4.7, period: 'noite', cuisine: 'Bistrô Francês' },
      { id: 'r2', name: 'Café de Flore', price: 120, duration: 1.5, rating: 4.5, period: 'manhã', cuisine: 'Café Clássico' },
      { id: 'r3', name: "L'Ambroisie", price: 650, duration: 3, rating: 4.9, period: 'noite', cuisine: '3 Estrelas Michelin' }
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia',
    currency: 'JPY',
    language: 'Japonês',
    timezone: 'JST',
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    galleryUrls: [
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800',
      'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800'
    ],
    tip: 'O clã indica: compre o JR Pass antes de viajar para economizar em trens.',
    flights: [
      { id: 'f1', name: 'ANA Direct', price: 8500, duration: '24h30', rating: 4.9, stops: 1 },
      { id: 'f2', name: 'JAL via Dallas', price: 7200, duration: '26h', rating: 4.7, stops: 1 },
      { id: 'f3', name: 'Emirates via Dubai', price: 6800, duration: '28h', rating: 4.6, stops: 1 }
    ],
    hotels: [
      { id: 'h1', name: 'Park Hyatt Tokyo', price: 3200, rating: 4.9, stars: 5, location: 'Shinjuku', amenities: ['Spa', 'Pool', 'View'] },
      { id: 'h2', name: 'Shibuya Stream Hotel', price: 980, rating: 4.5, stars: 4, location: 'Shibuya', amenities: ['WiFi', 'Modern'] },
      { id: 'h3', name: 'Capsule Hotel Anshin', price: 180, rating: 4.0, stars: 2, location: 'Shinjuku', amenities: ['WiFi'] }
    ],
    activities: [
      { id: 'a1', name: 'Shibuya Crossing Experience', price: 0, duration: 1, rating: 4.5, period: 'noite', location: 'Shibuya', tags: ['culture'], childFriendly: true },
      { id: 'a2', name: 'Templo Senso-ji & Asakusa', price: 50, duration: 3, rating: 4.8, period: 'manhã', location: 'Asakusa', tags: ['culture', 'history'], childFriendly: true },
      { id: 'a3', name: 'Day Trip Monte Fuji', price: 450, duration: 10, rating: 4.9, period: 'manhã', location: 'Fuji', tags: ['adventure', 'nature'], childFriendly: true },
      { id: 'a4', name: 'Mercado Tsukiji Outer', price: 120, duration: 3, rating: 4.7, period: 'manhã', location: 'Tsukiji', tags: ['gastro'], childFriendly: true },
      { id: 'a5', name: 'Akihabara Tech Tour', price: 80, duration: 4, rating: 4.4, period: 'tarde', location: 'Akihabara', tags: ['culture'], childFriendly: true }
    ],
    restaurants: [
      { id: 'r1', name: 'Sukiyabashi Jiro', price: 1200, duration: 2, rating: 5.0, period: 'noite', cuisine: 'Sushi Omakase' },
      { id: 'r2', name: 'Ichiran Ramen', price: 80, duration: 1, rating: 4.5, period: 'noite', cuisine: 'Ramen' },
      { id: 'r3', name: 'Gonpachi Nishi-Azabu', price: 280, duration: 2, rating: 4.6, period: 'noite', cuisine: 'Izakaya' }
    ]
  },
  'Maldivas': {
    continent: 'Ásia',
    currency: 'MVR',
    language: 'Divehi/Inglês',
    timezone: 'MVT',
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
    galleryUrls: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800',
      'https://images.unsplash.com/photo-1540202404-a2f29016b523?w=800'
    ],
    tip: 'A sabedoria do clã ensina: reserve transfer de speedboat com antecedência.',
    flights: [
      { id: 'f1', name: 'Emirates via Dubai', price: 9200, duration: '18h', rating: 4.8, stops: 1 },
      { id: 'f2', name: 'Qatar via Doha', price: 8800, duration: '19h', rating: 4.7, stops: 1 },
      { id: 'f3', name: 'Singapore Airlines', price: 10500, duration: '20h', rating: 4.9, stops: 1 }
    ],
    hotels: [
      { id: 'h1', name: 'Soneva Fushi', price: 8500, rating: 5.0, stars: 5, location: 'Baa Atoll', amenities: ['Villa', 'Spa', 'Diving'] },
      { id: 'h2', name: 'Anantara Veli', price: 4200, rating: 4.8, stars: 5, location: 'South Malé', amenities: ['Overwater', 'Spa'] },
      { id: 'h3', name: 'Coco Bodu Hithi', price: 3100, rating: 4.6, stars: 5, location: 'North Malé', amenities: ['Beach Villa'] }
    ],
    activities: [
      { id: 'a1', name: 'Snorkel com Tubarões', price: 380, duration: 3, rating: 4.9, period: 'manhã', location: 'Recife', tags: ['adventure', 'beach'], childFriendly: false },
      { id: 'a2', name: 'Jantar Subaquático', price: 850, duration: 3, rating: 5.0, period: 'noite', location: 'Resort', tags: ['gastro', 'romantic'], childFriendly: false },
      { id: 'a3', name: 'Sunset Dolphin Cruise', price: 220, duration: 2, rating: 4.8, period: 'tarde', location: 'Ocean', tags: ['romantic', 'nature'], childFriendly: true },
      { id: 'a4', name: 'Aula de Mergulho PADI', price: 650, duration: 6, rating: 4.7, period: 'manhã', location: 'Dive Center', tags: ['adventure'], childFriendly: false }
    ],
    restaurants: [
      { id: 'r1', name: 'Ithaa Undersea', price: 950, duration: 3, rating: 5.0, period: 'noite', cuisine: 'Fine Dining Subaquático' },
      { id: 'r2', name: 'Fresh in the Garden', price: 280, duration: 2, rating: 4.7, period: 'noite', cuisine: 'Orgânico' },
      { id: 'r3', name: 'Sunset Bar', price: 180, duration: 2, rating: 4.5, period: 'tarde', cuisine: 'Cocktails & Light' }
    ]
  }
};

// ========== KINU: CONCIERGE RESPONSES ==========
const CONCIERGE_RESPONSES = {
  translate: () => `🌐 **Tradutor do Clã Ativado**\n\nEnvie uma foto do cardápio ou digite o texto que deseja traduzir.\n\n💡 A sabedoria coletiva já traduziu mais de 10.000 cardápios!`,
  uber: () => `🚗 **Transporte Inteligente**\n\nO conhecimento do clã indica:\n\n📱 Uber/Bolt funcionam na maioria dos destinos\n🚕 Táxis oficiais nos aeroportos\n🚇 Metrô costuma ser mais rápido\n\n💡 Dica validada: Baixe o app local antes de embarcar!`,
  hospital: (dest) => `🏥 **Emergência Médica**\n\nEm ${dest || 'seu destino'}:\n\n📞 Emergência: 112 (Europa) / 911 (EUA)\n🏨 Peça ao hotel para acionar assistência\n📋 Tenha sempre o seguro viagem em mãos\n\n⚠️ O clã recomenda: DaVi Saúde ou Assist Card`,
  pharmacy: () => `💊 **Farmácias**\n\nDica do clã:\n\n🔍 Busque "Pharmacy" ou "Farmacia" no Maps\n🕐 Muitas 24h em áreas turísticas\n💳 Leve receita traduzida se necessário\n\n💡 Medicamentos básicos: leve do Brasil!`,
  weather: (dest) => `🌤️ **Clima em ${dest || 'seu destino'}**\n\nO clã monitora:\n\n📱 Use Weather.com ou Windy\n👔 Vista em camadas na Europa\n☔ Sempre tenha guarda-chuva compacto\n\n💡 Conhecimento validado: clima muda rápido!`
};

const CONCIERGE_QUICK_ACTIONS = [
  { id: 'translate', label: '🌐 Traduzir' },
  { id: 'uber', label: '🚗 Transporte' },
  { id: 'weather', label: '🌤️ Clima' },
  { id: 'hospital', label: '🏥 Emergência' },
  { id: 'pharmacy', label: '💊 Farmácia' }
];

// ========== KINU CONCIERGE IA ==========
const KinuConcierge = ({ isOpen, onClose, destination, hotel, user, daySchedule, tripDays, currentDay, tripActive, onRemoveAfternoonActivities, realExpenses, plannedCosts }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const messagesEndRef = useRef(null);
  
  const getCurrentActivity = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todaySchedule = daySchedule?.[currentDay] || [];
    
    for (const item of todaySchedule) {
      if (item.startTime && item.endTime) {
        const startMins = TimeSlotEngine.timeToMinutes(item.startTime);
        const endMins = TimeSlotEngine.timeToMinutes(item.endTime);
        if (currentMinutes >= startMins && currentMinutes <= endMins) return item;
      }
    }
    return null;
  }, [daySchedule, currentDay]);
  
  const getNextActivity = useCallback(() => {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todaySchedule = daySchedule?.[currentDay] || [];
    
    for (const item of todaySchedule) {
      if (item.startTime) {
        const startMins = TimeSlotEngine.timeToMinutes(item.startTime);
        if (startMins > currentMinutes) return item;
      }
    }
    return null;
  }, [daySchedule, currentDay]);
  
  useEffect(() => {
    const currentActivity = getCurrentActivity();
    const nextActivity = getNextActivity();
    
    let contextMessage = `🔮 Bem-vindo${user?.name ? `, ${user.name.split(' ')[0]}` : ''} ao Concierge KINU.\n\n`;
    contextMessage += `A sabedoria do clã está ao seu dispor.\n\n`;
    contextMessage += `📍 Destino: ${destination || 'Não definido'}\n`;
    contextMessage += `🏨 Hotel: ${hotel?.name || 'Não selecionado'}\n`;
    contextMessage += `📅 Dia ${currentDay || 1} de ${tripDays || 7}\n\n`;
    
    if (currentActivity) {
      contextMessage += `🎯 **Agora:** ${currentActivity.name}\n`;
      contextMessage += `📍 ${currentActivity.location || 'Local não especificado'}\n\n`;
    }
    if (nextActivity) {
      contextMessage += `⏭️ **Próximo:** ${nextActivity.name} às ${nextActivity.startTime}\n\n`;
    }
    contextMessage += `💡 Pergunte "O que tenho agora?" ou "Estou cansado, cancele a tarde"!`;
    
    setMessages([{ role: 'assistant', content: contextMessage }]);
  }, [destination, hotel, user, currentDay, tripDays, getCurrentActivity, getNextActivity]);
  
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);
  
  const handleQuickAction = (actionId) => {
    setIsTyping(true);
    let response = CONCIERGE_RESPONSES[actionId] ? CONCIERGE_RESPONSES[actionId](destination) : '';
    
    if (actionId === 'currentActivity') {
      const current = getCurrentActivity();
      const next = getNextActivity();
      response = current 
        ? `🎯 **Atividade Atual (Conhecimento Validado):**\n\n📌 ${current.name}\n📍 ${current.location || 'Local não especificado'}\n⏰ ${current.startTime} - ${current.endTime}\n💰 R$ ${current.price?.toLocaleString() || '0'}`
        : `😴 Nenhuma atividade no momento.\n\n${next ? `⏭️ Próximo: ${next.name} às ${next.startTime}` : 'A sabedoria do clã sugere descanso.'}`;
    }
    
    setTimeout(() => { setMessages(prev => [...prev, { role: 'assistant', content: response }]); setIsTyping(false); }, 800);
  };
  
  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', content: input }]);
    setIsTyping(true);
    setInput('');
    
    let response = '';
    let hasAction = false;
    
    if (userMessage.includes('o que tenho agora') || userMessage.includes('atividade atual')) {
      const current = getCurrentActivity();
      const next = getNextActivity();
      response = current 
        ? `🎯 **Conhecimento validado pelo clã:**\n\n📌 ${current.name}\n📍 ${current.location || hotel?.location || 'Ver mapa'}\n⏰ ${current.startTime} - ${current.endTime}\n${current.price ? `💰 R$ ${current.price.toLocaleString()}` : ''}`
        : `😴 Você não tem atividade agora.\n\n${getNextActivity() ? `⏭️ Próximo: ${getNextActivity().name} às ${getNextActivity().startTime}` : 'O clã sugere aproveitar para descansar!'}`;
    }
    else if (userMessage.includes('cansado') || userMessage.includes('cancele a tarde') || userMessage.includes('remover tarde')) {
      response = `😴 Entendido. O clã cuida de você!\n\n🔄 Posso remover as atividades da tarde do dia ${currentDay}. Isso vai:\n• Recalcular seu orçamento\n• Liberar tempo para recuperação\n\nDeseja que eu faça isso?`;
      hasAction = true;
      setPendingAction('removeAfternoon');
      setShowActionButtons(true);
    }
    else if (userMessage.includes('traduz') || userMessage.includes('cardápio')) { response = CONCIERGE_RESPONSES.translate(); }
    else if (userMessage.includes('uber') || userMessage.includes('táxi')) { response = CONCIERGE_RESPONSES.uber(); }
    else if (userMessage.includes('hospital') || userMessage.includes('médico')) { response = CONCIERGE_RESPONSES.hospital(destination); }
    else if (userMessage.includes('farmácia')) { response = CONCIERGE_RESPONSES.pharmacy(); }
    else if (userMessage.includes('clima') || userMessage.includes('tempo')) { response = CONCIERGE_RESPONSES.weather(destination); }
    else if (userMessage.includes('gasto') || userMessage.includes('orçamento')) {
      const totalReal = Object.values(realExpenses || {}).reduce((a, b) => a + (b || 0), 0);
      const totalPlanned = plannedCosts?.total || 0;
      const variance = totalReal - totalPlanned;
      response = `💰 **Resumo Financeiro do Clã:**\n\n📊 Planejado: R$ ${totalPlanned.toLocaleString()}\n💵 Gasto Real: R$ ${totalReal.toLocaleString()}\n${variance > 0 ? `⚠️ Excedido: R$ ${variance.toLocaleString()}` : `✅ Economia: R$ ${Math.abs(variance).toLocaleString()}`}`;
    }
    else {
      response = `🔮 A sabedoria do clã recebeu: "${input}"\n\n📍 ${destination || 'destino não definido'}\n📅 Dia ${currentDay || 1}\n\n💡 Experimente:\n• "O que tenho agora?"\n• "Estou cansado, cancele a tarde"\n• Use as ações rápidas acima`;
    }
    
    setTimeout(() => { setMessages(prev => [...prev, { role: 'assistant', content: response, hasAction }]); setIsTyping(false); }, 1000);
  };
  
  const executeAction = () => {
    if (pendingAction === 'removeAfternoon' && onRemoveAfternoonActivities) {
      onRemoveAfternoonActivities(currentDay);
      setMessages(prev => [...prev, { role: 'assistant', content: `✅ **O clã executou sua solicitação!**\n\nAtividades da tarde do dia ${currentDay} removidas.\n\n🔄 Orçamento recalculado.\n\n😴 Descanse bem. A jornada continua amanhã!` }]);
    }
    setShowActionButtons(false);
    setPendingAction(null);
  };
  
  const cancelAction = () => {
    setMessages(prev => [...prev, { role: 'assistant', content: `👍 Entendido. O roteiro permanece como validado pelo clã.` }]);
    setShowActionButtons(false);
    setPendingAction(null);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md h-[650px] max-h-[85vh] flex flex-col pointer-events-auto border border-indigo-500/30 overflow-hidden">
        {/* KINU Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
              <KinuLogo size={24} />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-600 animate-pulse" />
            </div>
            <div>
              <p className="font-bold text-white">Concierge KINU</p>
              <p className="text-xs text-indigo-200">Sabedoria do Clã • v1.0</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20} className="text-white" /></button>
        </div>
        
        {/* Quick Actions */}
        <div className="flex gap-2 px-4 py-3 overflow-x-auto bg-slate-900/50 border-b border-slate-800">
          <button onClick={() => handleQuickAction('currentActivity')} className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs font-medium text-indigo-300 hover:bg-indigo-500/30 transition-all whitespace-nowrap">🎯 Agora</button>
          {CONCIERGE_QUICK_ACTIONS.slice(0, 5).map(action => (
            <button key={action.id} onClick={() => handleQuickAction(action.id)} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-medium text-slate-300 hover:bg-slate-700 transition-all whitespace-nowrap">{action.label}</button>
          ))}
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-800/80 backdrop-blur-sm text-slate-100 rounded-bl-sm border border-slate-700/50'}`}>
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800/80 backdrop-blur-sm p-3 rounded-2xl rounded-bl-sm border border-slate-700/50">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          
          {showActionButtons && (
            <div className="flex gap-2 justify-center mt-2">
              <button onClick={executeAction} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all"><Check size={16} /> Executar</button>
              <button onClick={cancelAction} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all">Manter</button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
          <div className="flex gap-2">
            <input 
              type="text" 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSend()} 
              placeholder="Pergunte ao clã..." 
              className="flex-1 px-4 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-500" 
            />
            <button onClick={handleSend} className="p-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-all"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== KINU: GLASSMORPHISM CARD COMPONENT ==========
const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl ${hover ? 'hover:border-indigo-500/30 hover:shadow-indigo-500/10 transition-all' : ''} ${className}`}>
    {children}
  </div>
);

// ========== KINU: BUDGET SPEEDOMETER ==========
const BudgetSpeedometer = ({ total, spent, isOverBudget }) => {
  const percentage = Math.min((spent / total) * 100, 150);
  const rotation = (percentage / 150) * 180 - 90;
  
  return (
    <div className="relative w-40 h-24 mx-auto">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <defs>
          <linearGradient id="kinuGaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="50%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="#1e293b" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 45 A 40 40 0 0 1 90 45" fill="none" stroke="url(#kinuGaugeGradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray={`${percentage * 1.26} 126`} />
        <line x1="50" y1="45" x2="50" y2="15" stroke={isOverBudget ? '#ef4444' : '#6366f1'} strokeWidth="3" strokeLinecap="round" transform={`rotate(${rotation}, 50, 45)`} className="transition-transform duration-700" />
        <circle cx="50" cy="45" r="4" fill="#6366f1" />
      </svg>
      <div className="absolute bottom-0 left-0 right-0 text-center">
        <p className={`text-xl font-bold ${isOverBudget ? 'text-red-400' : 'text-emerald-400'}`}>{percentage.toFixed(0)}%</p>
      </div>
    </div>
  );
};

// ========== KINU: COMMUNITY CARD (CLÃ) ==========
const CommunityCard = ({ itinerary, onUse, onLike, onViewDetails, isLiked, compact }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  
  return (
    <GlassCard className={`overflow-hidden group ${compact ? 'p-3' : ''}`}>
      {!compact && (
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${destData?.coverUrl || itinerary.coverUrl})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {itinerary.badges?.map((badge, i) => (
              <span key={i} className="px-2 py-1 bg-indigo-500/80 backdrop-blur-sm text-white text-xs font-bold rounded-full">{badge}</span>
            ))}
          </div>
          <div className="absolute top-3 right-3">
            <button onClick={(e) => { e.stopPropagation(); onLike(itinerary.id); }} className={`p-2 rounded-full transition-all ${isLiked ? 'bg-rose-500 text-white' : 'bg-slate-900/50 backdrop-blur-sm text-white/70 hover:text-rose-400'}`}>
              <Heart size={16} className={isLiked ? 'fill-current' : ''} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-white font-bold text-lg leading-tight">{itinerary.title}</h3>
            <p className="text-slate-300 text-sm flex items-center gap-1 mt-1"><MapPin size={12} /> {itinerary.destination}</p>
          </div>
        </div>
      )}
      <div className={compact ? '' : 'p-4'}>
        {compact && (
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-slate-100 text-sm truncate">{itinerary.title}</h4>
              <p className="text-xs text-slate-400">{itinerary.duration} dias • {itinerary.travelers} viajantes</p>
            </div>
          </div>
        )}
        <div className={`flex items-center justify-between ${compact ? '' : 'mb-3'}`}>
          <div className="flex items-center gap-2">
            <span className="text-lg">{itinerary.author.avatar}</span>
            <div>
              <p className="text-sm font-medium text-slate-200 flex items-center gap-1">
                {itinerary.author.name}
                {itinerary.author.verified && <UserCheck size={12} className="text-indigo-400" />}
              </p>
              {!compact && <p className="text-xs text-slate-500">{itinerary.travelers} viajantes do clã</p>}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-slate-200">{itinerary.rating}</span>
          </div>
        </div>
        {!compact && (
          <>
            <div className="flex flex-wrap gap-1 mb-3">
              {itinerary.highlights?.slice(0, 3).map((h, i) => (
                <span key={i} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full">{h}</span>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => onViewDetails(itinerary)} className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-1">
                <Eye size={14} /> Detalhes
              </button>
              <button onClick={() => onUse(itinerary)} className="flex-1 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-1">
                <Copy size={14} /> Clonar
              </button>
            </div>
          </>
        )}
      </div>
    </GlassCard>
  );
};

// ========== KINU: AUTH MODAL ==========
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  
  if (!isOpen) return null;
  
  const handleSubmit = () => {
    if (mode === 'register' && !name.trim()) return;
    if (!email.trim()) return;
    onLogin({ name: name || email.split('@')[0], email, avatar: '🧭', memberSince: new Date().toISOString() });
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <GlassCard className="w-full max-w-md overflow-hidden" hover={false}>
        <div className="p-8">
          <div className="text-center mb-8">
            <KinuLogo size={48} className="mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white">Bem-vindo ao KINU</h2>
            <p className="text-slate-400 mt-2">{KINU_BRAND.tagline}</p>
          </div>
          
          <div className="flex gap-2 mb-6">
            <button onClick={() => setMode('login')} className={`flex-1 py-2 rounded-lg font-medium transition-all ${mode === 'login' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Entrar</button>
            <button onClick={() => setMode('register')} className={`flex-1 py-2 rounded-lg font-medium transition-all ${mode === 'register' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Criar Conta</button>
          </div>
          
          <div className="space-y-4">
            {mode === 'register' && (
              <input type="text" placeholder="Seu nome" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            )}
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
            <button onClick={handleSubmit} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
              {mode === 'login' ? 'Entrar no Clã' : 'Juntar-se ao Clã'}
            </button>
          </div>
          
          <p className="text-center text-slate-500 text-sm mt-6">
            Ao continuar, você aceita compartilhar conhecimento com o clã
          </p>
        </div>
      </GlassCard>
    </div>
  );
};

// ========== KINU: PREDICTIVE EXCHANGE ENGINE COMPONENT ==========
const PredictiveExchangeEngine = ({ origin, destination, tripBudget, tripDate }) => {
  const destCurrency = useMemo(() => {
    if (destination?.includes('França') || destination?.includes('Itália') || destination?.includes('Espanha')) return 'EUR';
    if (destination?.includes('EUA')) return 'USD';
    if (destination?.includes('Japão')) return 'JPY';
    if (destination?.includes('Dubai')) return 'AED';
    if (destination?.includes('Maldivas')) return 'MVR';
    return 'USD';
  }, [destination]);
  
  const directPair = `BRL-${destCurrency}`;
  const directRate = EXCHANGE_RATES[directPair]?.rate || 0.17;
  const forexHistory = useMemo(() => generateForexHistory(directPair), [directPair]);
  const advancedSignal = useMemo(() => calculateAdvancedBuySignal(forexHistory, tripDate), [forexHistory, tripDate]);
  const estimatedExpense = tripBudget * 0.6;
  const destAmount = estimatedExpense * directRate;
  const BuySignalIcon = advancedSignal.icon;

  return (
    <GlassCard className="overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-emerald-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Banknote size={24} className="text-white" /></div>
          <div>
            <h3 className="font-bold text-white text-lg">Motor de Câmbio KINU</h3>
            <p className="text-indigo-200 text-sm">Sabedoria coletiva • Visão 12 meses</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div className="relative w-14 h-14">
              <svg className="w-14 h-14 transform -rotate-90">
                <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.2)" strokeWidth="5" fill="none" />
                <circle cx="28" cy="28" r="24" stroke="white" strokeWidth="5" fill="none" strokeDasharray={`${advancedSignal.confidenceIndex * 1.5} 150`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-white font-bold text-xs">{advancedSignal.confidenceIndex}%</span></div>
            </div>
            <div className="text-left"><p className="text-xs text-indigo-200">Índice</p><p className="text-sm font-bold text-white">Confiança</p></div>
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4 text-center border border-slate-700/50">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">{CURRENCY_DATABASE.BRL.flag}</span>
              <ArrowRight size={14} className="text-indigo-400" />
              <span className="text-xl">{CURRENCY_DATABASE[destCurrency]?.flag}</span>
            </div>
            <p className="text-2xl font-bold text-white">{CURRENCY_DATABASE[destCurrency]?.symbol} {directRate.toFixed(destCurrency === 'JPY' ? 2 : 3)}</p>
            <p className="text-xs text-slate-500 mt-1">1 BRL = X {destCurrency}</p>
          </div>
          <div className={`rounded-xl p-4 text-center border ${advancedSignal.color === 'emerald' ? 'bg-emerald-500/20 border-emerald-500/30' : advancedSignal.color === 'amber' ? 'bg-amber-500/20 border-amber-500/30' : 'bg-indigo-500/20 border-indigo-500/30'}`}>
            <BuySignalIcon size={24} className={`mx-auto mb-2 ${advancedSignal.color === 'emerald' ? 'text-emerald-400' : advancedSignal.color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`} />
            <p className={`font-bold ${advancedSignal.color === 'emerald' ? 'text-emerald-400' : advancedSignal.color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`}>{advancedSignal.strategy}</p>
            <p className="text-xs text-slate-400 mt-1">{advancedSignal.recommendation.type}</p>
          </div>
        </div>
        
        <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50">
          <p className={`text-sm font-medium ${advancedSignal.color === 'emerald' ? 'text-emerald-400' : advancedSignal.color === 'amber' ? 'text-amber-400' : 'text-indigo-400'}`}>
            🔮 {advancedSignal.message}
          </p>
          <p className="text-xs text-slate-400 mt-2">{advancedSignal.recommendation.rationale}</p>
        </div>
        
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forexHistory}>
              <defs>
                <linearGradient id="kinuForexGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 10 }} domain={['dataMin - 0.01', 'dataMax + 0.01']} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }} labelStyle={{ color: '#94a3b8' }} />
              <Area type="monotone" dataKey="rate" stroke="#6366f1" strokeWidth={2} fill="url(#kinuForexGradient)" />
              <ReferenceLine y={forexHistory.find(d => d.isCurrent)?.rate} stroke="#10b981" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </GlassCard>
  );
};

// ========== KINU: PRINT STYLES ==========
const printStyles = `
  @media print {
    .no-print { display: none !important; }
    body { background: white !important; color: black !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
  }
`;

// ========== KINU: MAIN APP COMPONENT ==========
export default function App() {
  // State
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(15000);
  const [tripPriorities, setTripPriorities] = useState([]);
  const [userProfile, setUserProfile] = useState({ types: [], interests: [] });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [daySchedule, setDaySchedule] = useState({});
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outboundDepartureTime, setOutboundDepartureTime] = useState('22:00');
  const [returnTime, setReturnTime] = useState('18:00');
  const [likedItineraries, setLikedItineraries] = useState([]);
  const [communityFilter, setCommunityFilter] = useState({ destination: 'all', type: 'all' });
  const [tripActive, setTripActive] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [realExpenses, setRealExpenses] = useState({});
  const [completedItems, setCompletedItems] = useState({});
  const [itemRealPrices, setItemRealPrices] = useState({});
  
  // Computed
  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;
  const arrivalInfo = useMemo(() => { if (!destination || !selectedFlight) return null; return calculateArrival(origin, destination, outboundDepartureTime, selectedFlight.duration, startDate); }, [origin, destination, outboundDepartureTime, selectedFlight, startDate]);
  const actualStartDate = useMemo(() => arrivalInfo?.actualArrivalDate || startDate, [arrivalInfo, startDate]);
  const tripDays = useMemo(() => { const start = new Date(actualStartDate + 'T12:00:00'); const end = new Date(endDate + 'T12:00:00'); return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1); }, [actualStartDate, endDate]);
  
  const costs = useMemo(() => { 
    if (!itineraryGenerated) return { flights: 0, hotels: 0, activities: 0, food: 0, total: 0, percentages: {} }; 
    const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers * 2; 
    const hotelCost = (selectedHotel?.price || 0) * tripDays; 
    let activitiesCost = 0, foodCost = 0; 
    Object.values(daySchedule).forEach(day => { 
      day.forEach(item => { 
        if (item.category === 'restaurant') foodCost += (item.price || 0); 
        else activitiesCost += (item.price || 0); 
      }); 
    }); 
    const total = flightCost + hotelCost + (activitiesCost + foodCost) * totalPayingTravelers; 
    return { 
      flights: flightCost, 
      hotels: hotelCost, 
      activities: activitiesCost * totalPayingTravelers, 
      food: foodCost * totalPayingTravelers, 
      total, 
      percentages: total > 0 ? { 
        flights: Math.round((flightCost / total) * 100), 
        hotels: Math.round((hotelCost / total) * 100), 
        activities: Math.round(((activitiesCost * totalPayingTravelers) / total) * 100), 
        food: Math.round(((foodCost * totalPayingTravelers) / total) * 100) 
      } : {} 
    }; 
  }, [selectedFlight, selectedHotel, daySchedule, tripDays, totalPayingTravelers, itineraryGenerated]);
  
  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;
  
  const handleRemoveAfternoonActivities = useCallback((dayNum) => {
    const newSchedule = { ...daySchedule };
    if (newSchedule[dayNum]) {
      newSchedule[dayNum] = newSchedule[dayNum].filter(item => {
        const itemMinutes = TimeSlotEngine.timeToMinutes(item.startTime || '00:00');
        return itemMinutes < 720 || itemMinutes >= 1080;
      });
    }
    setDaySchedule(newSchedule);
  }, [daySchedule]);

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
      
      const sortedActivities = [...data.activities].sort((a, b) => b.rating - a.rating);
      const restaurants = [...data.restaurants].sort((a, b) => b.rating - a.rating);
      let schedule = {};
      const usedActivities = new Set();
      const usedRestaurants = new Set();
      
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        if (d === 1 && arrival.requiresRest) {
          const dinnerRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && r.period === 'noite');
          if (dinnerRestaurant) { 
            usedRestaurants.add(dinnerRestaurant.id); 
            schedule[d].push({ ...dinnerRestaurant, category: 'restaurant', location: dinnerRestaurant.cuisine, startTime: '20:30', endTime: TimeSlotEngine.calculateEndTime('20:30', dinnerRestaurant.duration || 1.5), period: 'noite' }); 
          }
          continue;
        }
        
        // Morning
        const morningAct = sortedActivities.find(a => !usedActivities.has(a.id) && a.period === 'manhã');
        if (morningAct) { usedActivities.add(morningAct.id); schedule[d].push({ ...morningAct, startTime: '09:00', endTime: TimeSlotEngine.calculateEndTime('09:00', morningAct.duration), period: 'manhã' }); }
        
        // Afternoon
        const afternoonAct = sortedActivities.find(a => !usedActivities.has(a.id) && a.period === 'tarde');
        if (afternoonAct) { usedActivities.add(afternoonAct.id); schedule[d].push({ ...afternoonAct, startTime: '14:00', endTime: TimeSlotEngine.calculateEndTime('14:00', afternoonAct.duration), period: 'tarde' }); }
        
        // Dinner
        const dinner = restaurants.find(r => !usedRestaurants.has(r.id) && r.period === 'noite');
        if (dinner) { usedRestaurants.add(dinner.id); schedule[d].push({ ...dinner, category: 'restaurant', location: dinner.cuisine, startTime: '20:00', endTime: TimeSlotEngine.calculateEndTime('20:00', dinner.duration || 1.5), period: 'noite' }); }
      }
      
      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setDaySchedule(schedule);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 1500);
  };

  const useCommunityItinerary = (itinerary) => { 
    const data = DESTINATIONS_DATABASE[itinerary.destination]; 
    if (!data) return; 
    setDestination(itinerary.destination); 
    setTotalBudget(itinerary.budget); 
    setCurrentView('planner');
    setTimeout(() => generateItinerary(), 100); 
  };

  // ========== KINU LANDING PAGE ==========
  if (!user || currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        </div>
        
        {/* Version Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 text-white text-center py-2.5 px-4 text-sm font-bold relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <span className="relative">🔮 KINU v1.0 — Sua jornada, nossa inteligência coletiva. Sabedoria de milhares de viajantes ao seu dispor.</span>
        </div>
        
        {/* Navigation */}
        <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <KinuLogo size={32} />
              <span className="text-xl font-bold text-white">KINU</span>
              <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full font-bold ml-2">v1.0</span>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <button onClick={() => setCurrentView('planner')} className="text-slate-400 hover:text-indigo-400 font-medium transition-colors">Planejar</button>
                  <button onClick={() => setCurrentView('community')} className="text-slate-400 hover:text-indigo-400 font-medium transition-colors">Clã</button>
                  <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
                    <span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}
                  </button>
                </>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 font-medium transition-all">Entrar</button>
              )}
            </div>
          </div>
        </nav>
        
        {/* Hero Section */}
        <div className="relative max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-indigo-400" /> Sabedoria Coletiva • Conhecimento Validado 
            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xs rounded-full font-bold">+10K ROTEIROS</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Milhares viajaram.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-300 to-emerald-400">Você herda a sabedoria.</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">
            O KINU une a <strong className="text-indigo-400">inteligência coletiva</strong> de milhares de viajantes com <strong className="text-emerald-400">engenharia de precisão</strong>. Cada roteiro é conhecimento validado pelo clã.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => { if (!user) setShowAuthModal(true); else setCurrentView('planner'); }} className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all flex items-center gap-2 hover:scale-105">
              <Sparkles size={24} /> Iniciar Jornada
            </button>
            <button onClick={() => setCurrentView('community')} className="px-8 py-4 border-2 border-slate-700 text-slate-300 rounded-xl font-bold text-lg hover:border-indigo-500 hover:text-indigo-400 transition-all hover:scale-105">
              Explorar o Clã
            </button>
          </div>
        </div>
        
        {/* Features */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-white text-center mb-8">🔮 O Poder do KINU</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { icon: Users, title: 'Sabedoria Coletiva', desc: '+10K roteiros validados', color: 'from-indigo-500 to-indigo-600' },
              { icon: Banknote, title: 'Motor de Câmbio', desc: 'Previsão de 12 meses', color: 'from-emerald-500 to-emerald-600' },
              { icon: Bed, title: 'Bloqueio de Fadiga', desc: 'Jet Lag inteligente', color: 'from-violet-500 to-violet-600' },
              { icon: Bot, title: 'Concierge KINU', desc: 'IA contextual', color: 'from-indigo-500 to-emerald-500' },
              { icon: Luggage, title: 'Mala 3D', desc: 'Visualização inteligente', color: 'from-cyan-500 to-cyan-600' },
              { icon: Receipt, title: 'Sincronia Total', desc: 'Real vs Planejado', color: 'from-amber-500 to-amber-600' }
            ].map((f, i) => (
              <GlassCard key={i} className="p-4 text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                  <f.icon size={24} className="text-white" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-slate-400 text-xs">{f.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
        
        {/* Destinations */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Destinos com Conhecimento Validado</h2>
          <p className="text-slate-400 text-center mb-12">Roteiros testados e aprovados pelo clã</p>
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(DESTINATIONS_DATABASE).map(([name, dest]) => (
              <div key={name} onClick={() => { setDestination(name); setCurrentView('planner'); if (!user) setShowAuthModal(true); }} className="relative h-64 rounded-2xl overflow-hidden cursor-pointer group border border-slate-800 hover:border-indigo-500/50 transition-all">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${dest.coverUrl})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-bold text-xl">{name.split(',')[0]}</p>
                  <p className="text-slate-300 text-sm">{dest.continent}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2 py-1 bg-indigo-500/80 text-white text-xs rounded-full">✓ Validado pelo Clã</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setCurrentView('planner'); }} />
      </div>
    );
  }

  // ========== KINU COMMUNITY PAGE (CLÃ) ==========
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
        
        <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
              <KinuLogo size={28} />
              <span className="text-xl font-bold text-white">KINU</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setCurrentView('planner')} className="text-slate-400 hover:text-indigo-400 font-medium">Planejar</button>
              <button className="text-indigo-400 font-medium">Clã</button>
              {user && (
                <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg">
                  <span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}
                </button>
              )}
            </div>
          </div>
        </nav>
        
        <div className="relative max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Conhecimento do Clã</h1>
            <p className="text-slate-400 mt-2">Roteiros validados por milhares de viajantes. Herde a sabedoria.</p>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <select value={communityFilter.destination} onChange={e => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white">
              <option value="all">Todos os destinos</option>
              {Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={communityFilter.type} onChange={e => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-800 text-white">
              <option value="all">Todos os tipos</option>
              {['romantic', 'family', 'budget', 'luxury', 'culture', 'beach', 'adventure'].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COMMUNITY_ITINERARIES.map(it => (
              <CommunityCard 
                key={it.id} 
                itinerary={it} 
                onUse={useCommunityItinerary} 
                onLike={(id) => setLikedItineraries(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])} 
                onViewDetails={() => {}} 
                isLiked={likedItineraries.includes(it.id)} 
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ========== KINU PLANNER PAGE ==========
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>
      
      {/* Navigation */}
      <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <KinuLogo size={28} />
            <span className="text-xl font-bold text-white">KINU</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-indigo-400 font-medium">Planejar</button>
            <button onClick={() => setCurrentView('community')} className="text-slate-400 hover:text-indigo-400 font-medium">Clã</button>
            {user && (
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg">
                <span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}
              </button>
            )}
          </div>
        </div>
      </nav>
      
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <MapPin size={20} className="text-indigo-400" /> Configure sua Jornada
              </h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Origem</label>
                  <select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Destino</label>
                  <select value={destination} onChange={e => setDestination(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="">Escolha um destino</option>
                    {Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Data de Ida</label>
                  <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Data de Volta</label>
                  <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Adultos</label>
                  <input type="number" min="1" max="10" value={adults} onChange={e => setAdults(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Orçamento Total (R$)</label>
                  <input type="number" step="1000" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                </div>
              </div>
              
              <button onClick={generateItinerary} disabled={!destination || !startDate || !endDate || isGenerating} className={`w-full mt-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${!destination || !startDate || !endDate ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-indigo-500/30'}`}>
                {isGenerating ? (
                  <><RefreshCw size={20} className="animate-spin" /> Consultando sabedoria do clã...</>
                ) : (
                  <><Sparkles size={20} /> Gerar Roteiro com Sabedoria do Clã</>
                )}
              </button>
            </GlassCard>
            
            {/* Itinerary Display */}
            {itineraryGenerated && (
              <>
                {/* Flight & Hotel Selection */}
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Plane size={18} className="text-indigo-400" /> Voo Selecionado (Validado pelo Clã)
                  </h3>
                  {selectedFlight && (
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-indigo-500/30">
                      <div>
                        <p className="font-bold text-white">{selectedFlight.name}</p>
                        <p className="text-sm text-slate-400">{selectedFlight.duration} • {selectedFlight.stops === 0 ? 'Direto' : `${selectedFlight.stops} parada(s)`}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">R$ {selectedFlight.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">por pessoa</p>
                      </div>
                    </div>
                  )}
                </GlassCard>
                
                <GlassCard className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Hotel size={18} className="text-indigo-400" /> Hotel Selecionado (Recomendação do Clã)
                  </h3>
                  {selectedHotel && (
                    <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-emerald-500/30">
                      <div>
                        <p className="font-bold text-white">{selectedHotel.name}</p>
                        <p className="text-sm text-slate-400">{selectedHotel.location} • {'★'.repeat(selectedHotel.stars)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-400">R$ {selectedHotel.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-500">por noite</p>
                      </div>
                    </div>
                  )}
                </GlassCard>
                
                {/* Day Schedule */}
                {Object.entries(daySchedule).map(([day, items]) => (
                  <GlassCard key={day} className="p-6">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Calendar size={18} className="text-indigo-400" /> Dia {day}
                    </h3>
                    <div className="space-y-3">
                      {items.length === 0 ? (
                        <p className="text-slate-500 text-center py-4">O clã recomenda descanso neste dia</p>
                      ) : (
                        items.map((item, idx) => {
                          const periodStyle = getPeriodStyle(item.period);
                          const ItemIcon = getCategoryIcon(item);
                          return (
                            <div key={idx} className={`p-4 rounded-xl border ${periodStyle.border} ${periodStyle.bg}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${periodStyle.gradient} flex items-center justify-center`}>
                                  <ItemIcon size={18} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-white">{item.name}</p>
                                  <p className="text-xs text-slate-400">{item.location} • {item.startTime} - {item.endTime}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-emerald-400">R$ {item.price?.toLocaleString() || '0'}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </GlassCard>
                ))}
                
                {/* Exchange Engine */}
                {destination && (
                  <PredictiveExchangeEngine origin={origin} destination={destination} tripBudget={totalBudget} tripDate={startDate} />
                )}
              </>
            )}
          </div>
          
          {/* Right Column - Budget */}
          <div className="space-y-6">
            <div className={`rounded-2xl p-6 ${isOverBudget ? 'bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-500/30' : 'bg-gradient-to-br from-indigo-900/50 to-emerald-900/50 border border-indigo-500/30'}`}>
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Wallet size={18} /> Orçamento KINU
              </h3>
              <p className="text-3xl font-bold text-white">R$ {totalBudget.toLocaleString()}</p>
              
              {itineraryGenerated && (
                <>
                  <BudgetSpeedometer total={totalBudget} spent={costs.total} isOverBudget={isOverBudget} />
                  <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30 text-red-300' : 'bg-emerald-500/30 text-emerald-300'}`}>
                    {isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString()}` : `Disponível: R$ ${remaining.toLocaleString()}`}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                    <div className="flex justify-between text-slate-300"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos</span><span>R$ {costs.flights.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-300"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel</span><span>R$ {costs.hotels.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-300"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString()}</span></div>
                    <div className="flex justify-between text-slate-300"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/20 text-white"><span>Total</span><span>R$ {costs.total.toLocaleString()}</span></div>
                  </div>
                </>
              )}
            </div>
            
            {/* Community Itineraries */}
            {destination && (
              <GlassCard className="p-4">
                <h3 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Crown size={18} className="text-amber-400" /> Roteiros do Clã - {destination.split(',')[0]}
                </h3>
                <div className="space-y-2">
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 2).map(it => (
                    <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={() => {}} onViewDetails={() => {}} isLiked={false} compact />
                  ))}
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && (
                    <p className="text-sm text-slate-500 text-center py-4">Nenhum roteiro validado ainda</p>
                  )}
                </div>
              </GlassCard>
            )}
            
            {itineraryGenerated && (
              <button onClick={() => window.print()} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30 hover:scale-[1.02]'}`}>
                {isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar Roteiro PDF</>}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Concierge KINU */}
      <KinuConcierge 
        isOpen={showConcierge} 
        onClose={() => setShowConcierge(false)} 
        destination={destination} 
        hotel={selectedHotel} 
        user={user}
        daySchedule={daySchedule}
        tripDays={tripDays}
        currentDay={currentDay}
        tripActive={tripActive}
        onRemoveAfternoonActivities={handleRemoveAfternoonActivities}
        realExpenses={realExpenses}
        plannedCosts={costs}
      />
      
      {/* Floating Concierge Button */}
      {itineraryGenerated && !showConcierge && (
        <button onClick={() => setShowConcierge(true)} className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-indigo-600 to-emerald-600 rounded-full shadow-2xl shadow-indigo-500/30 flex items-center justify-center text-white hover:scale-110 transition-all z-40 group no-print">
          <KinuLogo size={28} />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse border-2 border-slate-950">🔮</span>
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap border border-slate-700">Concierge KINU</span>
        </button>
      )}
    </div>
  );
}
