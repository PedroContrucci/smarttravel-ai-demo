import React, { useState, useMemo, useEffect, useCallback, useRef, createContext, useContext } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Mountain, Building, Palmtree, Crown, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, MessageSquare, Car, Copy, Download, Anchor, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Trash2, Eye, Coffee, Bed, ArrowUpCircle, ArrowDownCircle, FileText, Briefcase, Activity, DollarSign, AlertCircle, ChevronRight, BookOpen, Zap, BarChart3, ArrowRight, Shield, Banknote, Target, Timer, ExternalLink, CheckCircle2, Circle, Flame } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine, PieChart, Pie, Cell } from 'recharts';

// ============================================================
// 🔮 KINU v1.0 - TRAVEL OS
// Sua jornada, nossa inteligência coletiva.
// Sabedoria do Clã | Dark Premium | Glassmorphism
// ============================================================
console.log('%c🔮 KINU v1.0 — Sua jornada, nossa inteligência coletiva', 'background: linear-gradient(135deg, #020617 0%, #4F46E5 50%, #10b981 100%); color: white; font-size: 20px; padding: 12px; border-radius: 8px; font-weight: bold;');

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

// ========== v4.0: DARK MODE CONTEXT ==========
const ThemeContext = createContext({ isDark: false, toggle: () => {} });
const useTheme = () => useContext(ThemeContext);

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

// VERSÃO DO APP
const APP_VERSION = "1.0.0-KINU";

// ========== v4.0: BOOKING LINKS GENERATOR ==========
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

// ========== v4.0: PRICE HISTORY SIMULATION ==========
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

const getPeriodStyle = (period) => {
  const styles = { manhã: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-500', gradient: 'from-amber-400 to-orange-500' }, tarde: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500', gradient: 'from-orange-400 to-red-500' }, noite: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300', dot: 'bg-indigo-500', gradient: 'from-indigo-400 to-indigo-600' } };
  return styles[period] || styles.manhã;
};

const getCategoryIcon = (item) => { if (item.type === 'flight') return PlaneLanding; if (item.type === 'transfer') return Car; if (item.type === 'rest') return Bed; if (item.type === 'hotel') return Hotel; if (item.type === 'checkout') return Briefcase; if (item.type === 'daily-hotel') return Coffee; if (item.category === 'restaurant') return Utensils; if (item.tags?.includes('beach')) return Anchor; if (item.tags?.includes('culture')) return Building; if (item.tags?.includes('adventure')) return Mountain; return Camera; };

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'];
const TRAVELER_TYPES = [{ id: 'adventure', name: 'Aventureiro', icon: Mountain }, { id: 'culture', name: 'Cultural', icon: Building }, { id: 'beach', name: 'Praia', icon: Palmtree }, { id: 'gastro', name: 'Gastronômico', icon: Utensils }, { id: 'family', name: 'Família', icon: Users }, { id: 'romantic', name: 'Romântico', icon: Heart }, { id: 'budget', name: 'Econômico', icon: Wallet }, { id: 'luxury', name: 'Luxo', icon: Crown }];
const TRIP_PRIORITIES = [{ id: 'gastronomy', name: 'Gastronomia', icon: Utensils }, { id: 'beaches', name: 'Praias', icon: Anchor }, { id: 'culture', name: 'Cultura', icon: Building }, { id: 'adventure', name: 'Aventura', icon: Mountain }, { id: 'relaxation', name: 'Relaxamento', icon: Sparkles }, { id: 'kids', name: 'Crianças', icon: Baby }, { id: 'nightlife', name: 'Vida Noturna', icon: Music }, { id: 'shopping', name: 'Compras', icon: ShoppingBag }, { id: 'comfort', name: 'Conforto', icon: Hotel }];
const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];

// ========== PREDICTIVE EXCHANGE ENGINE ==========
const CURRENCY_DATABASE = {
  BRL: { name: 'Real Brasileiro', symbol: 'R$', flag: '🇧🇷' },
  EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
  USD: { name: 'Dólar Americano', symbol: '$', flag: '🇺🇸' },
  JPY: { name: 'Iene Japonês', symbol: '¥', flag: '🇯🇵' },
  AED: { name: 'Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  MVR: { name: 'Rufia', symbol: 'Rf', flag: '🇲🇻' }
};

// CORRIGIDO: Paridade 1 BRL = X Moeda Estrangeira
const EXCHANGE_RATES = {
  'BRL-EUR': { rate: 0.163, trend: 'up', volatility: 0.08 },     // 1 BRL = 0.163 EUR (~R$6.13/EUR)
  'BRL-USD': { rate: 0.175, trend: 'stable', volatility: 0.05 }, // 1 BRL = 0.175 USD (~R$5.71/USD)
  'BRL-JPY': { rate: 26.2, trend: 'down', volatility: 0.12 },    // 1 BRL = 26.2 JPY
  'BRL-AED': { rate: 0.643, trend: 'stable', volatility: 0.04 }, // 1 BRL = 0.643 AED
  'BRL-MVR': { rate: 2.70, trend: 'stable', volatility: 0.03 }   // 1 BRL = 2.70 MVR
};

// UPGRADED: Projeção de 12 meses no futuro
const generateForexHistory = (basePair, months = 6) => {
  const baseRate = EXCHANGE_RATES[basePair]?.rate || 1;
  const volatility = EXCHANGE_RATES[basePair]?.volatility || 0.05;
  const trend = EXCHANGE_RATES[basePair]?.trend || 'stable';
  const data = [];
  let currentRate = baseRate * (1 - volatility * 2);
  // Histórico de 6 meses + Projeção de 12 meses
  for (let i = -months; i <= 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short', year: i >= 6 ? '2-digit' : undefined });
    const trendFactor = trend === 'up' ? 0.012 : trend === 'down' ? -0.010 : 0.002;
    const noise = (Math.random() - 0.5) * volatility * baseRate;
    const seasonalFactor = Math.sin((i / 12) * Math.PI * 2) * 0.02 * baseRate;
    currentRate = currentRate * (1 + trendFactor) + noise + seasonalFactor;
    currentRate = Math.max(baseRate * 0.80, Math.min(baseRate * 1.25, currentRate));
    data.push({ month: monthName, rate: parseFloat(currentRate.toFixed(4)), projected: i > 0, isCurrent: i === 0, monthIndex: i });
  }
  return data;
};

// UPGRADED: Análise avançada com estratégia recomendada e índice de confiança
const calculateAdvancedBuySignal = (forexData, tripDate) => {
  const currentRate = forexData.find(d => d.isCurrent)?.rate || 0;
  const projectedRates = forexData.filter(d => d.projected);
  const avgProjected = projectedRates.reduce((a, b) => a + b.rate, 0) / projectedRates.length;
  const minProjected = Math.min(...projectedRates.map(r => r.rate));
  const maxProjected = Math.max(...projectedRates.map(r => r.rate));
  const percentChange = ((avgProjected - currentRate) / currentRate) * 100;
  const volatilityRange = ((maxProjected - minProjected) / currentRate) * 100;
  
  // Encontra o melhor mês para compra
  const bestMonth = projectedRates.reduce((best, curr) => curr.rate < best.rate ? curr : best, projectedRates[0]);
  
  // Calcula índice de confiança (0-100%)
  const trendConsistency = projectedRates.filter((r, i, arr) => 
    i === 0 || (percentChange < 0 ? r.rate <= arr[i-1].rate : r.rate >= arr[i-1].rate)
  ).length / projectedRates.length;
  const confidenceIndex = Math.round(Math.min(95, Math.max(45, trendConsistency * 70 + (100 - volatilityRange) * 0.3)));
  
  let strategy, signal, message, color, icon, recommendation;
  
  if (percentChange < -3 && volatilityRange < 15) {
    // Tendência de queda clara - Lump Sum
    signal = 'wait';
    strategy = 'LUMP_SUM';
    color = 'amber';
    icon = Timer;
    message = `AGUARDE: Tendência de queda de ${Math.abs(percentChange).toFixed(1)}%`;
    recommendation = {
      type: 'Lump Sum (Compra Única)',
      description: `Aguarde e compre o valor total em ${bestMonth.month}`,
      rationale: 'Tendência de queda consistente identificada. Melhor aguardar o ponto mais baixo.',
      potentialSavings: ((currentRate - bestMonth.rate) / currentRate * 100).toFixed(1)
    };
  } else if (percentChange > 3) {
    // Tendência de alta - Compra imediata
    signal = 'buy';
    strategy = 'BUY_NOW';
    color = 'emerald';
    icon = Zap;
    message = `COMPRE AGORA: Tendência de alta de ${percentChange.toFixed(1)}%`;
    recommendation = {
      type: 'Compra Imediata',
      description: 'Aproveite a cotação atual antes da valorização',
      rationale: 'Projeção indica valorização da moeda estrangeira nos próximos meses.',
      potentialSavings: percentChange.toFixed(1)
    };
  } else {
    // Mercado estável - DCA
    signal = 'neutral';
    strategy = 'DCA';
    color = 'blue';
    icon = Target;
    message = 'ESTÁVEL: Mercado lateral, ideal para DCA';
    recommendation = {
      type: 'DCA (Dollar Cost Averaging)',
      description: 'Compre mensalmente até a viagem para diluir riscos',
      rationale: 'Mercado sem tendência clara. Estratégia de compras parceladas reduz exposição à volatilidade.',
      potentialSavings: (volatilityRange / 2).toFixed(1)
    };
  }
  
  return { signal, strategy, message, color, icon, recommendation, confidenceIndex, bestMonth, percentChange, volatilityRange };
};

const calculateBuySignal = (forexData) => {
  const currentRate = forexData.find(d => d.isCurrent)?.rate || 0;
  const projectedRates = forexData.filter(d => d.projected);
  const avgProjected = projectedRates.reduce((a, b) => a + b.rate, 0) / projectedRates.length;
  const percentChange = ((avgProjected - currentRate) / currentRate) * 100;
  if (percentChange < -2) return { signal: 'wait', message: 'AGUARDE: Queda estimada nos próximos 45 dias', color: 'amber', icon: Timer };
  if (percentChange > 2) return { signal: 'buy', message: 'MOMENTO IDEAL: Compre agora, tendência de alta', color: 'emerald', icon: Zap };
  return { signal: 'neutral', message: 'ESTÁVEL: Momento neutro para compra', color: 'slate', icon: Target };
};

const PredictiveExchangeEngine = ({ origin, destination, tripBudget, tripDate }) => {
  const destCurrency = useMemo(() => {
    if (destination?.includes('França') || destination?.includes('Itália') || destination?.includes('Espanha')) return 'EUR';
    if (destination?.includes('EUA')) return 'USD';
    if (destination?.includes('Japão')) return 'JPY';
    if (destination?.includes('Dubai')) return 'AED';
    if (destination?.includes('Maldivas')) return 'MVR';
    return 'USD';
  }, [destination]);
  const globalCurrency = destCurrency === 'EUR' ? 'EUR' : 'USD';
  const directPair = `BRL-${destCurrency}`;
  const globalPair = `BRL-${globalCurrency}`;
  const directRate = EXCHANGE_RATES[directPair]?.rate || 0.17;
  const globalRate = EXCHANGE_RATES[globalPair]?.rate || 0.17;
  const forexHistory = useMemo(() => generateForexHistory(directPair), [directPair]);
  const advancedSignal = useMemo(() => calculateAdvancedBuySignal(forexHistory, tripDate), [forexHistory, tripDate]);
  const estimatedExpense = tripBudget * 0.6;
  const destAmount = estimatedExpense * directRate;
  const BuySignalIcon = advancedSignal.icon;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-indigo-50 rounded-2xl border border-emerald-200 overflow-hidden shadow-lg exchange-analysis-section">
      <div className="bg-gradient-to-r from-emerald-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900/20 rounded-xl backdrop-blur-sm"><Banknote size={24} className="text-white" /></div>
          <div><h3 className="font-bold text-white text-lg">Motor de Câmbio KINU</h3><p className="text-emerald-100 text-sm">Sabedoria coletiva • Visão de 12 meses</p></div>
        </div>
        {/* Índice de Confiança */}
        <div className="text-right">
          <div className="flex items-center gap-2">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90">
                <circle cx="32" cy="32" r="28" stroke="rgba(255,255,255,0.2)" strokeWidth="6" fill="none" />
                <circle cx="32" cy="32" r="28" stroke="white" strokeWidth="6" fill="none" strokeDasharray={`${advancedSignal.confidenceIndex * 1.76} 176`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center"><span className="text-white font-bold text-sm">{advancedSignal.confidenceIndex}%</span></div>
            </div>
            <div className="text-left"><p className="text-xs text-emerald-200">Índice de</p><p className="text-sm font-bold text-white">Confiança IA</p></div>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3"><span className="text-2xl">{CURRENCY_DATABASE.BRL.flag}</span><ArrowRight size={16} className="text-indigo-500" /><span className="text-2xl">{CURRENCY_DATABASE[destCurrency]?.flag}</span></div>
            <p className="text-center text-2xl font-bold text-white">{CURRENCY_DATABASE[destCurrency]?.symbol} {directRate.toFixed(destCurrency === 'JPY' ? 2 : 3)}</p>
            <p className="text-center text-xs text-slate-500 mt-1">1 BRL = X {destCurrency}</p>
            <div className={`mt-2 text-center text-xs px-2 py-1 rounded-full ${EXCHANGE_RATES[directPair]?.trend === 'up' ? 'bg-red-100 text-red-600' : EXCHANGE_RATES[directPair]?.trend === 'down' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-300'}`}>
              {EXCHANGE_RATES[directPair]?.trend === 'up' ? '↑ Real desvalorizando' : EXCHANGE_RATES[directPair]?.trend === 'down' ? '↓ Real valorizando' : '→ Estável'}
            </div>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3"><span className="text-2xl">{CURRENCY_DATABASE.BRL.flag}</span><ArrowRight size={16} className="text-blue-500" /><span className="text-2xl">{CURRENCY_DATABASE[globalCurrency]?.flag}</span></div>
            <p className="text-center text-2xl font-bold text-white">{CURRENCY_DATABASE[globalCurrency]?.symbol} {globalRate.toFixed(3)}</p>
            <p className="text-center text-xs text-slate-500 mt-1">Referência Global</p>
            <div className="mt-2 text-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Moeda Global</div>
          </div>
          <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3"><span className="text-2xl">💰</span></div>
            <p className="text-center text-2xl font-bold text-indigo-600">~{CURRENCY_DATABASE[destCurrency]?.symbol} {destAmount.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            <p className="text-center text-xs text-slate-500 mt-1">Estimativa Viagem</p>
            <div className="mt-2 text-center text-xs px-2 py-1 rounded-full bg-teal-100 text-indigo-600">60% do orçamento</div>
          </div>
        </div>
        
        {/* Estratégia Recomendada - NOVA SEÇÃO */}
        <div className={`p-5 rounded-xl border-2 ${advancedSignal.signal === 'buy' ? 'bg-emerald-50 border-emerald-300' : advancedSignal.signal === 'wait' ? 'bg-amber-50 border-amber-300' : 'bg-blue-50 border-blue-300'}`}>
          <div className="flex items-start gap-4">
            <div className={`p-4 rounded-xl flex-shrink-0 ${advancedSignal.signal === 'buy' ? 'bg-emerald-500' : advancedSignal.signal === 'wait' ? 'bg-amber-500' : 'bg-blue-500'}`}>
              <BuySignalIcon size={28} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${advancedSignal.signal === 'buy' ? 'bg-emerald-200 text-emerald-800' : advancedSignal.signal === 'wait' ? 'bg-amber-200 text-amber-800' : 'bg-blue-200 text-blue-800'}`}>
                  {advancedSignal.strategy === 'DCA' ? '📊 DCA' : advancedSignal.strategy === 'LUMP_SUM' ? '🎯 LUMP SUM' : '⚡ COMPRA IMEDIATA'}
                </span>
                <p className={`font-bold text-lg ${advancedSignal.signal === 'buy' ? 'text-emerald-700' : advancedSignal.signal === 'wait' ? 'text-amber-700' : 'text-blue-700'}`}>
                  {advancedSignal.message}
                </p>
              </div>
              <div className="bg-slate-900/60 rounded-lg p-4 mt-3">
                <h4 className="font-bold text-white mb-2">📋 Estratégia Recomendada: {advancedSignal.recommendation.type}</h4>
                <p className="text-slate-300 text-sm mb-2">{advancedSignal.recommendation.description}</p>
                <p className="text-xs text-slate-500 italic">{advancedSignal.recommendation.rationale}</p>
                <div className="mt-3 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <TrendingDown size={16} className="text-emerald-500" />
                    <span className="text-sm text-slate-300">Economia potencial: <strong className="text-emerald-600">{advancedSignal.recommendation.potentialSavings}%</strong></span>
                  </div>
                  {advancedSignal.strategy === 'LUMP_SUM' && advancedSignal.bestMonth && (
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-amber-500" />
                      <span className="text-sm text-slate-300">Melhor mês: <strong className="text-amber-600">{advancedSignal.bestMonth.month}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-slate-900 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2"><BarChart3 size={18} className="text-indigo-600" />Tendência BRL/{destCurrency}</h4>
            <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">📈 6 meses histórico + 12 meses projeção</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={forexHistory}>
              <defs><linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/><stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} stroke="#94a3b8" interval={1} />
              <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" domain={['dataMin - 0.01', 'dataMax + 0.01']} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} formatter={(value, name, props) => [`${CURRENCY_DATABASE[destCurrency]?.symbol} ${value}`, props.payload.projected ? 'Projeção' : 'Histórico']} />
              <ReferenceLine x={forexHistory.find(d => d.isCurrent)?.month} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Hoje', position: 'top', fontSize: 10, fill: '#f59e0b' }} />
              <Area type="monotone" dataKey="rate" stroke="#14b8a6" strokeWidth={2} fill="url(#colorRate)" dot={(props) => { const { cx, cy, payload } = props; if (payload.projected) return <circle cx={cx} cy={cy} r={3} fill="#f59e0b" stroke="#fff" strokeWidth={1} />; if (payload.isCurrent) return <circle cx={cx} cy={cy} r={6} fill="#14b8a6" stroke="#fff" strokeWidth={2} />; return <circle cx={cx} cy={cy} r={2} fill="#14b8a6" />; }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3">
            <span className="flex items-center gap-2 text-xs text-slate-300"><span className="w-3 h-3 rounded-full bg-indigo-500"></span> Histórico</span>
            <span className="flex items-center gap-2 text-xs text-slate-300"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Projeção IA (12 meses)</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-700">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1"><Lightbulb size={12} /> Dicas de Câmbio</p>
          <ul className="space-y-2">
            <li className="text-sm text-slate-300 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Use cartões com IOF reduzido (1.1% vs 6.38%)</li>
            <li className="text-sm text-slate-300 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Evite trocar em aeroportos (-15% em média)</li>
            <li className="text-sm text-slate-300 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Considere conta global (Wise, Nomad)</li>
            {advancedSignal.strategy === 'DCA' && <li className="text-sm text-slate-300 flex items-center gap-2"><ChevronRight size={12} className="text-blue-500 flex-shrink-0" /><strong>DCA:</strong> Divida compras mensalmente até a viagem</li>}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ========== DESTINATION GUIDES (CORRIGIDO - Paridade 1 BRL = X Moeda) ==========
const DESTINATION_GUIDES = {
  'Paris, França': { visa: { required: false, info: 'Brasileiros não precisam de visto para estadias de até 90 dias no Espaço Schengen.', docs: ['Passaporte válido (6 meses)', 'Comprovante de hospedagem', 'Seguro viagem obrigatório', 'Passagem de volta'] }, health: { vaccines: ['Nenhuma vacina obrigatória'], insurance: 'Seguro viagem obrigatório - cobertura mínima €30.000', tips: ['Leve kit básico de medicamentos'] }, currency: { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.163, trend: 'up', tips: ['Use cartões com IOF reduzido', 'Evite trocar em aeroportos'] } },
  'Miami, EUA': { visa: { required: true, info: 'Visto B1/B2 americano obrigatório para brasileiros.', docs: ['Passaporte válido', 'Formulário DS-160', 'Comprovante financeiro', 'Vínculo com Brasil'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Altamente recomendado (saúde cara nos EUA)', tips: ['Mantenha documentos do seguro acessíveis'] }, currency: { code: 'USD', name: 'Dólar', symbol: '$', rate: 0.175, trend: 'stable', tips: ['Gorjetas de 15-20% são esperadas'] } },
  'Tóquio, Japão': { visa: { required: false, info: 'Brasileiros têm isenção de visto para estadias de até 90 dias.', docs: ['Passaporte válido', 'Comprovante de hospedagem', 'Passagem de volta'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Recomendado', tips: ['Sistema de saúde excelente'] }, currency: { code: 'JPY', name: 'Iene', symbol: '¥', rate: 26.2, trend: 'down', tips: ['Japão ainda usa muito dinheiro'] } },
  'Dubai, EAU': { visa: { required: false, info: 'Brasileiros recebem visto de 90 dias na chegada.', docs: ['Passaporte válido (6 meses)', 'Reserva de hotel'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Recomendado', tips: ['Clima extremo no verão'] }, currency: { code: 'AED', name: 'Dirham', symbol: 'د.إ', rate: 0.643, trend: 'stable', tips: ['Dólar amplamente aceito'] } },
  'Maldivas': { visa: { required: false, info: 'Visto de 30 dias gratuito na chegada.', docs: ['Passaporte válido (6 meses)', 'Reserva de hotel'] }, health: { vaccines: ['Febre amarela se vindo de área endêmica'], insurance: 'Obrigatório', tips: ['Leve protetor solar reef-safe'] }, currency: { code: 'MVR', name: 'Rufia', symbol: 'Rf', rate: 2.70, trend: 'stable', tips: ['Dólar aceito em resorts'] } }
};

// ========== ESSENTIAL LANGUAGE MODULE ==========
const ESSENTIAL_PHRASES = {
  'Paris, França': { language: 'Francês', flag: '🇫🇷', phrases: [{ phrase: "Où est l'hôpital?", translation: "Onde fica o hospital?", phonetic: "u é lopitál" }, { phrase: "Pouvez-vous m'aider?", translation: "Pode me ajudar?", phonetic: "puvê vu medê" }, { phrase: "Je ne comprends pas", translation: "Não entendo", phonetic: "je nê comprã pá" }, { phrase: "L'addition, s'il vous plaît", translation: "A conta, por favor", phonetic: "ladissiõ sil vu plê" }, { phrase: "Combien ça coûte?", translation: "Quanto custa?", phonetic: "combiã sa cut" }] },
  'Miami, EUA': { language: 'Inglês', flag: '🇺🇸', phrases: [{ phrase: "Where is the hospital?", translation: "Onde fica o hospital?", phonetic: "uér is de róspitól" }, { phrase: "Can you help me?", translation: "Pode me ajudar?", phonetic: "kén iú rélp mi" }, { phrase: "I don't understand", translation: "Não entendo", phonetic: "ái dont anderstând" }, { phrase: "The check, please", translation: "A conta, por favor", phonetic: "de tchék, pliz" }, { phrase: "How much is this?", translation: "Quanto custa isso?", phonetic: "rau mâtch is dis" }] },
  'Tóquio, Japão': { language: 'Japonês', flag: '🇯🇵', phrases: [{ phrase: "病院はどこですか?", translation: "Onde fica o hospital?", phonetic: "byouin wa doko desu ka" }, { phrase: "助けてください", translation: "Por favor, me ajude", phonetic: "tasukete kudasai" }, { phrase: "わかりません", translation: "Não entendo", phonetic: "wakarimasen" }, { phrase: "お会計お願いします", translation: "A conta, por favor", phonetic: "okaikei onegaishimasu" }, { phrase: "いくらですか?", translation: "Quanto custa?", phonetic: "ikura desu ka" }] },
  'Dubai, EAU': { language: 'Árabe', flag: '🇦🇪', phrases: [{ phrase: "أين المستشفى؟", translation: "Onde fica o hospital?", phonetic: "ayna al-mustashfa" }, { phrase: "هل يمكنك مساعدتي؟", translation: "Pode me ajudar?", phonetic: "hal yumkinuka musa'adati" }, { phrase: "لا أفهم", translation: "Não entendo", phonetic: "la afham" }, { phrase: "الحساب من فضلك", translation: "A conta, por favor", phonetic: "al-hisab min fadlik" }, { phrase: "بكم هذا؟", translation: "Quanto custa?", phonetic: "bikam hada" }] },
  'Maldivas': { language: 'Divehi/Inglês', flag: '🇲🇻', phrases: [{ phrase: "Where is the hospital?", translation: "Onde fica o hospital?", phonetic: "uér is de róspitól" }, { phrase: "Can you help me?", translation: "Pode me ajudar?", phonetic: "kén iú rélp mi" }, { phrase: "Shukuriyaa", translation: "Obrigado", phonetic: "shukuriá" }, { phrase: "The bill, please", translation: "A conta, por favor", phonetic: "de bil, pliz" }, { phrase: "How much?", translation: "Quanto custa?", phonetic: "rau mâtch" }] }
};

// ========== SMART PACKING LIST ==========
const PACKING_DATABASE = {
  essentials: [{ item: 'Passaporte', icon: FileText, category: 'Documentos' }, { item: 'Cartões de crédito', icon: Wallet, category: 'Documentos' }, { item: 'Seguro viagem', icon: Shield, category: 'Documentos' }, { item: 'Cópias de documentos', icon: Copy, category: 'Documentos' }, { item: 'Medicamentos pessoais', icon: Stethoscope, category: 'Saúde' }, { item: 'Carregador de celular', icon: Zap, category: 'Eletrônicos' }, { item: 'Adaptador de tomada', icon: Zap, category: 'Eletrônicos' }],
  beach: [{ item: 'Protetor solar FPS 50+', icon: Sun, category: 'Praia' }, { item: 'Óculos de sol', icon: Eye, category: 'Praia' }, { item: 'Roupa de banho', icon: Anchor, category: 'Praia' }, { item: 'Chinelos', icon: Shirt, category: 'Praia' }, { item: 'Chapéu/Boné', icon: Sun, category: 'Praia' }],
  culture: [{ item: 'Roupas formais', icon: Shirt, category: 'Vestuário' }, { item: 'Sapato confortável', icon: MapPin, category: 'Vestuário' }, { item: 'Cardigan/Blazer leve', icon: Shirt, category: 'Vestuário' }, { item: 'Câmera fotográfica', icon: Camera, category: 'Eletrônicos' }],
  adventure: [{ item: 'Tênis de trilha', icon: Mountain, category: 'Esportes' }, { item: 'Mochila resistente', icon: Briefcase, category: 'Esportes' }, { item: 'Garrafa de água', icon: Coffee, category: 'Esportes' }],
  coldWeather: [{ item: 'Casaco de inverno', icon: Thermometer, category: 'Vestuário' }, { item: 'Cachecol', icon: Shirt, category: 'Vestuário' }, { item: 'Luvas', icon: Shirt, category: 'Vestuário' }, { item: 'Gorro', icon: Shirt, category: 'Vestuário' }],
  hotWeather: [{ item: 'Roupas leves', icon: Shirt, category: 'Vestuário' }, { item: 'Protetor solar', icon: Sun, category: 'Saúde' }, { item: 'Repelente', icon: Shield, category: 'Saúde' }]
};

const DESTINATION_CLIMATE = {
  'Paris, França': { avgTemp: 12, climate: 'temperado', rainy: true },
  'Miami, EUA': { avgTemp: 28, climate: 'tropical', rainy: false },
  'Tóquio, Japão': { avgTemp: 16, climate: 'temperado', rainy: true },
  'Dubai, EAU': { avgTemp: 35, climate: 'desértico', rainy: false },
  'Maldivas': { avgTemp: 30, climate: 'tropical', rainy: false }
};

// ========== v4.0: VIRTUAL SUITCASE OPTIMIZER DATA ==========
const ITEM_WEIGHTS = {
  // Documentos - peso mínimo
  'Passaporte': 0.05, 'Cartões de crédito': 0.02, 'Seguro viagem': 0.01, 'Cópias de documentos': 0.05,
  // Eletrônicos
  'Carregador de celular': 0.15, 'Adaptador de tomada': 0.1, 'Câmera fotográfica': 0.8,
  // Vestuário
  'Casaco de inverno': 1.5, 'Cachecol': 0.2, 'Luvas': 0.1, 'Gorro': 0.1, 'Roupas leves': 0.2,
  'Roupas formais': 0.5, 'Sapato confortável': 0.6, 'Cardigan/Blazer leve': 0.4, 'Chinelos': 0.3,
  // Praia
  'Protetor solar FPS 50+': 0.25, 'Óculos de sol': 0.05, 'Roupa de banho': 0.2, 'Chapéu/Boné': 0.1,
  // Saúde
  'Medicamentos pessoais': 0.2, 'Protetor solar': 0.25, 'Repelente': 0.15,
  // Esportes/Aventura
  'Tênis de trilha': 0.8, 'Mochila resistente': 0.5, 'Garrafa de água': 0.15,
  // Outros
  'Guarda-chuva compacto': 0.35
};

const LUGGAGE_RECOMMENDATIONS = {
  short: { // 1-4 dias
    solo: { bags: [{ type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }], tip: 'Viagem curta: mala de mão é suficiente!' },
    couple: { bags: [{ type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }, { type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }], tip: 'Cada um com sua mala de mão.' },
    family: { bags: [{ type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }, { type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }], tip: 'Uma mala despachada + malas de mão.' }
  },
  medium: { // 5-10 dias
    solo: { bags: [{ type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }], tip: 'Mala média para mais flexibilidade.' },
    couple: { bags: [{ type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }, { type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }], tip: 'Cada um com mala média despachada.' },
    family: { bags: [{ type: 'Mala Grande 32kg', weight: 32, size: '78x52x32cm' }, { type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }, { type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }], tip: 'Mala grande + média + malas de mão.' }
  },
  long: { // 11+ dias
    solo: { bags: [{ type: 'Mala Grande 32kg', weight: 32, size: '78x52x32cm' }], tip: 'Mala grande para viagem longa.' },
    couple: { bags: [{ type: 'Mala Grande 32kg', weight: 32, size: '78x52x32cm' }, { type: 'Mala Média 23kg', weight: 23, size: '68x45x28cm' }], tip: 'Uma grande + uma média para dividir.' },
    family: { bags: [{ type: 'Mala Grande 32kg', weight: 32, size: '78x52x32cm' }, { type: 'Mala Grande 32kg', weight: 32, size: '78x52x32cm' }, { type: 'Mala de Mão', weight: 10, size: '55x40x20cm' }], tip: 'Duas malas grandes + malas de mão para a família.' }
  }
};

// ========== v4.0: AI CONCIERGE DATA ==========
const CONCIERGE_QUICK_ACTIONS = [
  { id: 'weather', label: '☀️ Verificar Clima', icon: Sun },
  { id: 'uber', label: '🚗 Chamar Uber', icon: Car },
  { id: 'hospital', label: '🏥 Hospital Próximo', icon: Stethoscope },
  { id: 'pharmacy', label: '💊 Farmácia Próxima', icon: Shield },
  { id: 'translate', label: '🌐 Traduzir Cardápio', icon: Languages },
  { id: 'emergency', label: '🆘 Emergência', icon: AlertCircle }
];

const CONCIERGE_RESPONSES = {
  weather: (dest) => `☀️ **Clima em ${dest?.split(',')[0] || 'seu destino'}:**\n\n🌡️ Temperatura: ${DESTINATION_CLIMATE[dest]?.avgTemp || 25}°C\n💧 Umidade: 65%\n🌤️ Condição: ${DESTINATION_CLIMATE[dest]?.climate || 'Agradável'}\n\n*Atualizado agora*`,
  uber: () => `🚗 **Uber Simulado:**\n\n✅ Motorista a caminho!\n📍 ETA: 4 minutos\n🚙 Toyota Corolla Prata\n👤 Carlos ★ 4.9\n\n*Integração simulada*`,
  hospital: (dest) => `🏥 **Hospital mais próximo:**\n\n📍 Hospital Central ${dest?.split(',')[0] || 'Local'}\n📞 +XX XXX-XXXX\n⏱️ 24h - Emergência\n🚗 ~8 min do seu hotel\n\n*Abrir no Google Maps*`,
  pharmacy: () => `💊 **Farmácia mais próxima:**\n\n📍 Pharmacy Express\n⏰ Aberta até 22h\n🚶 5 min a pé do hotel\n\n*Integração simulada*`,
  translate: () => `🌐 **Tradução de Cardápio:**\n\nEnvie uma foto do cardápio que eu traduzo para você!\n\n*Funcionalidade em desenvolvimento*`,
  emergency: () => `🆘 **Números de Emergência:**\n\n🚔 Polícia: 190 (BR) / 911 (EUA/EU)\n🚑 Ambulância: 192 (BR) / 112 (EU)\n🔥 Bombeiros: 193 (BR)\n📞 Embaixada: Consulte o app\n\n⚠️ Em caso de emergência real, ligue imediatamente!`,
  default: (msg, dest, hotel) => `🤖 **Concierge KINU:**\n\nEntendi sua pergunta: "${msg}"\n\n📍 Você está em: ${dest || 'destino não definido'}\n🏨 Hotel: ${hotel?.name || 'não selecionado'}\n\nComo posso ajudar? Use as ações rápidas ou descreva o que precisa!`
};

const generatePackingList = (destination, tripPriorities) => {
  const list = [...PACKING_DATABASE.essentials];
  const climate = DESTINATION_CLIMATE[destination];
  if (climate) {
    if (climate.avgTemp < 15) list.push(...PACKING_DATABASE.coldWeather);
    else if (climate.avgTemp > 25) list.push(...PACKING_DATABASE.hotWeather);
    if (climate.rainy) list.push({ item: 'Guarda-chuva compacto', icon: Umbrella, category: 'Acessórios' });
  }
  if (tripPriorities.includes('beaches') || tripPriorities.includes('relaxation')) list.push(...PACKING_DATABASE.beach);
  if (tripPriorities.includes('culture')) list.push(...PACKING_DATABASE.culture);
  if (tripPriorities.includes('adventure')) list.push(...PACKING_DATABASE.adventure);
  return list.reduce((acc, curr) => { if (!acc.find(item => item.item === curr.item)) acc.push(curr); return acc; }, []);
};

// ========== DYNAMIC LOCAL CLOCK COMPONENT ==========
const DynamicLocalClock = ({ origin, destination }) => {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const interval = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(interval); }, []);
  const originOffset = CITY_OFFSETS[origin] || -3;
  const destOffset = CITY_OFFSETS[destination] || 0;
  const getLocalTime = (offset) => { const utc = time.getTime() + (time.getTimezoneOffset() * 60000); const localTime = new Date(utc + (3600000 * offset)); return localTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }); };
  const timeDiff = destOffset - originOffset;
  return (
    <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl text-white">
      <div className="flex items-center gap-2"><Clock size={16} className="text-indigo-400" /><div><p className="text-xs text-slate-400">Brasil</p><p className="font-mono font-bold text-lg">{getLocalTime(originOffset)}</p></div></div>
      <div className="flex flex-col items-center"><ArrowRight size={14} className="text-slate-500" /><span className={`text-xs ${timeDiff > 0 ? 'text-amber-400' : timeDiff < 0 ? 'text-blue-400' : 'text-slate-400'}`}>{timeDiff > 0 ? `+${timeDiff}h` : timeDiff < 0 ? `${timeDiff}h` : '='}</span></div>
      <div className="flex items-center gap-2"><Globe size={16} className="text-emerald-400" /><div><p className="text-xs text-slate-400">{destination?.split(',')[0]}</p><p className="font-mono font-bold text-lg">{getLocalTime(destOffset)}</p></div></div>
    </div>
  );
};

// ========== SMART PACKING LIST COMPONENT ==========
const SmartPackingList = ({ destination, tripPriorities, startDate }) => {
  const [checkedItems, setCheckedItems] = useState({});
  const packingList = useMemo(() => generatePackingList(destination, tripPriorities), [destination, tripPriorities]);
  const climate = DESTINATION_CLIMATE[destination];
  const progress = (Object.values(checkedItems).filter(Boolean).length / packingList.length) * 100;
  const groupedItems = packingList.reduce((acc, item) => { if (!acc[item.category]) acc[item.category] = []; acc[item.category].push(item); return acc; }, {});
  const toggleItem = (item) => setCheckedItems(prev => ({ ...prev, [item]: !prev[item] }));
  
  return (
    <div className="bg-gradient-to-br from-violet-50 via-white to-purple-50 rounded-2xl border border-violet-200 overflow-hidden shadow-lg packing-list-section">
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3"><div className="p-2 bg-slate-900/20 rounded-xl backdrop-blur-sm"><Briefcase size={24} className="text-white" /></div><div><h3 className="font-bold text-white text-lg">Checklist Inteligente de Malas</h3><p className="text-violet-100 text-sm">Baseado em destino, clima e prioridades</p></div></div>
        <div className="text-right"><p className="text-2xl font-bold text-white">{Math.round(progress)}%</p><p className="text-xs text-violet-200">Preparado</p></div>
      </div>
      <div className="p-4">
        <div className="mb-4"><div className="h-2 bg-violet-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 transition-all duration-500" style={{ width: `${progress}%` }} /></div><p className="text-xs text-slate-500 mt-1">{Object.values(checkedItems).filter(Boolean).length} de {packingList.length} itens</p></div>
        {climate && <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl mb-4 border border-blue-200"><Thermometer size={20} className="text-blue-600" /><div><p className="text-sm font-medium text-slate-200">Clima esperado: <span className="text-blue-600">{climate.avgTemp}°C</span></p><p className="text-xs text-slate-500 capitalize">{climate.climate} {climate.rainy ? '• Possibilidade de chuva' : ''}</p></div></div>}
        <div className="space-y-4 max-h-[400px] overflow-y-auto">{Object.entries(groupedItems).map(([category, items]) => (<div key={category}><p className="text-xs font-bold text-slate-500 uppercase mb-2">{category}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{items.map((item, idx) => { const ItemIcon = item.icon; const isChecked = checkedItems[item.item]; return (<button key={idx} onClick={() => toggleItem(item.item)} className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${isChecked ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'bg-slate-900 border-slate-700 hover:border-violet-300 hover:bg-violet-50'}`}><div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isChecked ? 'bg-emerald-500' : 'bg-slate-100'}`}>{isChecked ? <Check size={14} className="text-white" /> : <ItemIcon size={14} className="text-slate-400" />}</div><span className={`text-sm ${isChecked ? 'line-through' : ''}`}>{item.item}</span></button>); })}</div></div>))}</div>
      </div>
    </div>
  );
};

// ========== ESSENTIAL LANGUAGE MODULE COMPONENT ==========
const EssentialLanguageModule = ({ destination }) => {
  const [playingPhrase, setPlayingPhrase] = useState(null);
  const langData = ESSENTIAL_PHRASES[destination];
  if (!langData) return null;
  const simulateAudio = (idx) => { setPlayingPhrase(idx); setTimeout(() => setPlayingPhrase(null), 2000); };
  
  return (
    <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-2xl border border-amber-200 overflow-hidden shadow-lg language-section">
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4 flex items-center gap-3"><div className="p-2 bg-slate-900/20 rounded-xl backdrop-blur-sm"><Languages size={24} className="text-white" /></div><div><h3 className="font-bold text-white text-lg">Frases Essenciais em {langData.language}</h3><p className="text-amber-100 text-sm">{langData.flag} 5 expressões de sobrevivência</p></div></div>
      <div className="p-4 space-y-3">{langData.phrases.map((phrase, idx) => (<div key={idx} className="bg-slate-900 rounded-xl p-4 border border-amber-100 hover:border-amber-300 transition-all group"><div className="flex items-start justify-between gap-3"><div className="flex-1"><p className="font-bold text-white text-lg">{phrase.phrase}</p><p className="text-slate-300 text-sm mt-1">{phrase.translation}</p><p className="text-amber-600 text-xs mt-2 font-mono bg-amber-50 px-2 py-1 rounded inline-block">🔊 "{phrase.phonetic}"</p></div><button onClick={() => simulateAudio(idx)} className={`p-3 rounded-xl transition-all ${playingPhrase === idx ? 'bg-amber-500 text-white animate-pulse' : 'bg-amber-100 text-amber-600 hover:bg-amber-200'}`}><Volume2 size={20} /></button></div></div>))}</div>
    </div>
  );
};

// ========== v4.0: SUITCASE 3D VISUALIZER ==========
const Suitcase3DVisualizer = ({ checkedItems, packingList, totalWeight, maxWeight }) => {
  const categories = useMemo(() => {
    const cats = {};
    packingList.forEach(item => {
      if (checkedItems[item.item]) {
        if (!cats[item.category]) cats[item.category] = 0;
        cats[item.category] += ITEM_WEIGHTS[item.item] || 0.3;
      }
    });
    return cats;
  }, [checkedItems, packingList]);
  
  const categoryColors = {
    'Documentos': '#6366f1', 'Eletrônicos': '#f59e0b', 'Vestuário': '#ec4899',
    'Praia': '#06b6d4', 'Saúde': '#10b981', 'Esportes': '#f97316', 'Acessórios': '#8b5cf6'
  };
  
  const fillPercentage = Math.min((totalWeight / maxWeight) * 100, 100);
  
  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700">
      <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Luggage size={20} className="text-cyan-400" /> Visualização 3D</h4>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 200 250" className="w-40 h-52">
          <ellipse cx="100" cy="240" rx="70" ry="8" fill="rgba(0,0,0,0.3)" />
          <rect x="30" y="50" width="140" height="180" rx="12" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <defs><clipPath id="suitcaseClip"><rect x="35" y="55" width="130" height="170" rx="8" /></clipPath></defs>
          <g clipPath="url(#suitcaseClip)">
            <rect x="35" y="55" width="130" height="170" fill="#0f172a" />
            <rect x="35" y={55 + 170 * (1 - fillPercentage / 100)} width="130" height={170 * fillPercentage / 100} fill="url(#fillGradient)" className="transition-all duration-700" />
            {Object.entries(categories).map(([cat, weight], idx) => {
              const y = 200 - (idx + 1) * 25;
              const width = Math.min(120, weight * 40);
              return <rect key={cat} x={40 + (idx % 2) * 10} y={y} width={width} height="20" rx="4" fill={categoryColors[cat] || '#64748b'} opacity="0.9" />;
            })}
          </g>
          <defs><linearGradient id="fillGradient" x1="0%" y1="100%" x2="0%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#06b6d4" /><stop offset="100%" stopColor="#6366f1" /></linearGradient></defs>
          <rect x="80" y="35" width="40" height="20" rx="4" fill="#334155" stroke="#475569" strokeWidth="2" />
          <rect x="90" y="30" width="20" height="10" rx="3" fill="#475569" />
          <line x1="100" y1="55" x2="100" y2="225" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="50" cy="235" r="8" fill="#334155" stroke="#475569" strokeWidth="2" />
          <circle cx="150" cy="235" r="8" fill="#334155" stroke="#475569" strokeWidth="2" />
        </svg>
      </div>
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        {Object.entries(categories).map(([cat, weight]) => (
          <div key={cat} className="flex items-center gap-1 px-2 py-1 bg-slate-700/50 rounded-full">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: categoryColors[cat] || '#64748b' }} />
            <span className="text-xs text-slate-300">{cat}</span>
            <span className="text-xs text-slate-500">{weight.toFixed(1)}kg</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== v4.0: VIRTUAL SUITCASE OPTIMIZER PRO ==========
const VirtualSuitcaseOptimizer = ({ destination, tripPriorities, tripDays, adults, children, checkedItems, packingList }) => {
  const [showDimensionsModal, setShowDimensionsModal] = useState(false);
  const [customBagSize, setCustomBagSize] = useState({ width: 55, height: 40, depth: 20 });
  const travelers = adults + children;
  const tripLength = tripDays <= 4 ? 'short' : tripDays <= 10 ? 'medium' : 'long';
  const travelerType = travelers === 1 ? 'solo' : travelers === 2 ? 'couple' : 'family';
  const recommendation = LUGGAGE_RECOMMENDATIONS[tripLength]?.[travelerType] || LUGGAGE_RECOMMENDATIONS.medium.couple;
  
  // v4.0: Sugestão automática para crianças
  const childrenBagSuggestion = children > 0 ? {
    needed: true,
    tip: `👶 Com ${children} criança(s), considere 1 mala média exclusiva para itens infantis (fraldas, brinquedos, roupas extras).`
  } : { needed: false };
  
  const totalWeight = useMemo(() => {
    return packingList.reduce((acc, item) => {
      if (checkedItems[item.item]) return acc + (ITEM_WEIGHTS[item.item] || 0.3);
      return acc;
    }, 0) * travelers;
  }, [packingList, checkedItems, travelers]);
  
  const maxWeight = recommendation.bags.reduce((acc, bag) => acc + bag.weight, 0) + (childrenBagSuggestion.needed ? 15 : 0);
  const weightPercentage = (totalWeight / maxWeight) * 100;
  const isOverweight = weightPercentage > 100;
  
  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl suitcase-section">
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-900/20 rounded-xl backdrop-blur-sm"><Luggage size={24} className="text-white" /></div>
          <div><h3 className="font-bold text-white text-lg">Organizador de Malas 3D</h3><p className="text-cyan-100 text-sm">Visualização inteligente + controle de peso</p></div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${isOverweight ? 'text-red-300 animate-pulse' : 'text-white'}`}>{totalWeight.toFixed(1)}kg</p>
          <p className="text-xs text-cyan-200">de {maxWeight}kg máx</p>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* 3D Visualizer */}
          <Suitcase3DVisualizer checkedItems={checkedItems} packingList={packingList} totalWeight={totalWeight} maxWeight={maxWeight} />
          
          {/* Recommendations */}
          <div className="space-y-4">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Briefcase size={18} className="text-cyan-400" /> Bagagem Recomendada</h4>
              <div className="space-y-2">
                {recommendation.bags.map((bag, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-2 bg-slate-700/50 rounded-lg">
                    <Luggage size={24} className="text-cyan-400" />
                    <div className="flex-1">
                      <p className="font-medium text-white text-sm">{bag.type}</p>
                      <p className="text-xs text-slate-400">{bag.size} • Até {bag.weight}kg</p>
                    </div>
                  </div>
                ))}
                {childrenBagSuggestion.needed && (
                  <div className="p-2 bg-pink-500/20 border border-pink-500/30 rounded-lg">
                    <p className="text-sm text-pink-300">{childrenBagSuggestion.tip}</p>
                  </div>
                )}
              </div>
            </div>
            
            <button onClick={() => setShowDimensionsModal(true)} className="w-full p-3 bg-slate-700/50 hover:bg-slate-700 rounded-xl border border-slate-600 transition-all text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale size={18} className="text-indigo-400" />
                  <span className="text-white text-sm font-medium">Definir Dimensões da Mala</span>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </div>
              <p className="text-xs text-slate-400 mt-1">Personalize o tamanho ou faça upload de foto</p>
            </button>
            
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
              <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Scale size={18} className="text-emerald-400" /> Capacidade</h4>
              <div className="relative h-4 bg-slate-700 rounded-full overflow-hidden">
                <div className={`absolute left-0 top-0 h-full rounded-full transition-all duration-700 ${isOverweight ? 'bg-gradient-to-r from-red-500 to-red-600' : weightPercentage > 80 ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'bg-gradient-to-r from-emerald-500 to-cyan-500'}`} style={{ width: `${Math.min(weightPercentage, 100)}%` }} />
              </div>
              <div className="flex justify-between mt-2 text-xs">
                <span className="text-slate-400">0kg</span>
                <span className={`font-bold ${isOverweight ? 'text-red-400' : 'text-emerald-400'}`}>{weightPercentage.toFixed(0)}%</span>
                <span className="text-slate-400">{maxWeight}kg</span>
              </div>
              {isOverweight && <p className="text-red-400 text-sm mt-2 flex items-center gap-1 animate-pulse"><AlertTriangle size={14} /> Excesso de {(totalWeight - maxWeight).toFixed(1)}kg!</p>}
              {!isOverweight && weightPercentage <= 80 && <p className="text-emerald-400 text-sm mt-2">✅ Peso ideal! Espaço para lembrancinhas.</p>}
            </div>
          </div>
        </div>
      </div>
      
      {showDimensionsModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 w-full max-w-md border border-slate-700">
            <h3 className="text-xl font-bold text-white mb-4">📐 Dimensões da Mala</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                {['width', 'height', 'depth'].map((dim, i) => (
                  <div key={dim}>
                    <label className="text-xs text-slate-400 block mb-1">{['Largura', 'Altura', 'Profundidade'][i]} (cm)</label>
                    <input type="number" value={customBagSize[dim]} onChange={e => setCustomBagSize({...customBagSize, [dim]: Number(e.target.value)})} className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white text-center" />
                  </div>
                ))}
              </div>
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <p className="text-sm text-slate-300">📷 Ou faça upload de uma foto da sua mala:</p>
                <button className="mt-2 w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm transition-all">Selecionar Imagem (Em breve)</button>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowDimensionsModal(false)} className="flex-1 py-2 bg-slate-700 text-white rounded-lg">Cancelar</button>
              <button onClick={() => setShowDimensionsModal(false)} className="flex-1 py-2 bg-cyan-600 text-white rounded-lg">Aplicar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ========== v4.0: AI CONCIERGE PRO (Consciência de Contexto) ==========
const AIConcierge = ({ isOpen, onClose, destination, hotel, user, daySchedule, tripDays, currentDay, onRemoveAfternoonActivities, realExpenses, plannedCosts }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showActionButtons, setShowActionButtons] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const messagesEndRef = useRef(null);
  
  // v4.0: Detectar atividade atual baseado na hora
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
  
  // Inicializar mensagem de boas-vindas
  useEffect(() => {
    const currentActivity = getCurrentActivity();
    const nextActivity = getNextActivity();
    
    let contextMessage = `👋 Olá${user?.name ? `, ${user.name.split(' ')[0]}` : ''}! Sou seu Concierge KINU.\n\n`;
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
        ? `🎯 **Atividade Atual:**\n\n📌 ${current.name}\n📍 ${current.location || 'Local não especificado'}\n⏰ ${current.startTime} - ${current.endTime}\n💰 R$ ${current.price?.toLocaleString() || '0'}`
        : `😴 Nenhuma atividade no momento.\n\n${next ? `⏭️ Próximo: ${next.name} às ${next.startTime}` : 'Sem mais atividades hoje.'}`;
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
    
    // v4.0: NLP com ações
    if (userMessage.includes('o que tenho agora') || userMessage.includes('atividade atual')) {
      const current = getCurrentActivity();
      const next = getNextActivity();
      response = current 
        ? `🎯 **Sua atividade agora:**\n\n📌 ${current.name}\n📍 ${current.location || hotel?.location || 'Ver mapa'}\n⏰ ${current.startTime} - ${current.endTime}\n${current.price ? `💰 R$ ${current.price.toLocaleString()}` : ''}`
        : `😴 Você não tem nenhuma atividade agora.\n\n${getNextActivity() ? `⏭️ Próximo: ${getNextActivity().name} às ${getNextActivity().startTime}` : 'Aproveite para descansar!'}`;
    }
    else if (userMessage.includes('cansado') || userMessage.includes('cancele a tarde') || userMessage.includes('remover tarde')) {
      response = `😴 Entendi que você está cansado!\n\n🔄 Posso remover todas as atividades da tarde do dia ${currentDay}. Isso vai:\n• Recalcular seu orçamento\n• Liberar tempo para descanso\n\nDeseja que eu faça isso?`;
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
      response = `💰 **Resumo Financeiro:**\n\n📊 Planejado: R$ ${totalPlanned.toLocaleString()}\n💵 Gasto Real: R$ ${totalReal.toLocaleString()}\n${variance > 0 ? `⚠️ Excedido: R$ ${variance.toLocaleString()}` : `✅ Economia: R$ ${Math.abs(variance).toLocaleString()}`}`;
    }
    else {
      response = `🤖 Entendi: "${input}"\n\n📍 ${destination || 'destino não definido'}\n📅 Dia ${currentDay || 1}\n\n💡 Tente:\n• "O que tenho agora?"\n• "Estou cansado, cancele a tarde"\n• Use as ações rápidas acima`;
    }
    
    setTimeout(() => { setMessages(prev => [...prev, { role: 'assistant', content: response, hasAction }]); setIsTyping(false); }, 1000);
  };
  
  const executeAction = () => {
    if (pendingAction === 'removeAfternoon' && onRemoveAfternoonActivities) {
      onRemoveAfternoonActivities(currentDay);
      setMessages(prev => [...prev, { role: 'assistant', content: `✅ **Feito!**\n\nRemovi as atividades da tarde do dia ${currentDay}.\n\n🔄 O orçamento foi recalculado.\n\n😴 Aproveite para descansar!` }]);
    }
    setShowActionButtons(false);
    setPendingAction(null);
  };
  
  const cancelAction = () => {
    setMessages(prev => [...prev, { role: 'assistant', content: `👍 Ok, mantive o roteiro como está!` }]);
    setShowActionButtons(false);
    setPendingAction(null);
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <div className="bg-slate-950/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-md h-[650px] max-h-[85vh] flex flex-col pointer-events-auto border border-indigo-500/30 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center relative">
              <KinuLogo size={24} />
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-600 animate-pulse" />
            </div>
            <div><p className="font-bold text-white">Concierge KINU</p><p className="text-xs text-indigo-200">Sabedoria do Clã • v1.0</p></div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all"><X size={20} className="text-white" /></button>
        </div>
        
        <div className="px-3 py-2 bg-slate-900/80 border-b border-slate-800 flex gap-2 overflow-x-auto">
          <button onClick={() => handleQuickAction('currentActivity')} className="px-3 py-1.5 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-xs font-medium text-indigo-300 hover:bg-indigo-500/30 transition-all whitespace-nowrap">🎯 Agora</button>
          {CONCIERGE_QUICK_ACTIONS.slice(0, 5).map(action => (
            <button key={action.id} onClick={() => handleQuickAction(action.id)} className="px-3 py-1.5 bg-slate-800/50 border border-slate-700 rounded-full text-xs font-medium text-slate-300 hover:bg-slate-700 transition-all whitespace-nowrap">{action.label}</button>
          ))}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-slate-800/80 backdrop-blur-sm text-slate-100 rounded-bl-sm border border-slate-700/50'}`}>
                <p className="text-sm whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && <div className="flex justify-start"><div className="bg-slate-800 p-3 rounded-2xl rounded-bl-sm border border-slate-700"><div className="flex gap-1"><span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" /><span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} /><span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} /></div></div></div>}
          
          {showActionButtons && (
            <div className="flex gap-2 justify-center mt-2">
              <button onClick={executeAction} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center gap-2 transition-all"><Check size={16} /> Executar Reajuste</button>
              <button onClick={cancelAction} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-medium transition-all">Manter Roteiro</button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-4 border-t border-slate-700 bg-slate-800">
          <div className="flex gap-2">
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Pergunte qualquer coisa..." className="flex-1 px-4 py-2.5 bg-slate-700 border border-slate-600 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-slate-400" />
            <button onClick={handleSend} className="p-2.5 bg-gradient-to-r from-indigo-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-all"><Send size={20} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ========== v4.0: TRIP EXECUTION DASHBOARD (Realizado vs Planejado) ==========
const TripExecutionDashboard = ({ plannedCosts, isActive, onToggleActive, realExpenses, onUpdateExpense }) => {
  const categories = [
    { id: 'flights', name: 'Voos', icon: Plane, planned: plannedCosts.flights },
    { id: 'hotels', name: 'Hospedagem', icon: Hotel, planned: plannedCosts.hotels },
    { id: 'activities', name: 'Passeios', icon: Camera, planned: plannedCosts.activities },
    { id: 'food', name: 'Alimentação', icon: Utensils, planned: plannedCosts.food },
    { id: 'transport', name: 'Transporte Local', icon: Car, planned: Math.round(plannedCosts.total * 0.05) },
    { id: 'shopping', name: 'Compras', icon: ShoppingBag, planned: Math.round(plannedCosts.total * 0.1) },
  ];
  
  const totalPlanned = categories.reduce((acc, cat) => acc + cat.planned, 0);
  const totalReal = Object.values(realExpenses).reduce((acc, val) => acc + (val || 0), 0);
  const variance = totalReal - totalPlanned;
  const variancePercent = totalPlanned > 0 ? (variance / totalPlanned) * 100 : 0;
  
  const getDeviationAlert = (catId, planned, real) => {
    if (!real || real === 0) return null;
    const deviation = ((real - planned) / planned) * 100;
    if (deviation > 20) return { type: 'danger', message: `⚠️ ${deviation.toFixed(0)}% acima do planejado!` };
    if (deviation > 10) return { type: 'warning', message: `⚡ ${deviation.toFixed(0)}% acima` };
    if (deviation < -10) return { type: 'success', message: `✅ Economia de ${Math.abs(deviation).toFixed(0)}%` };
    return null;
  };
  
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 rounded-2xl overflow-hidden shadow-xl trip-execution-section">
      <div className="px-6 py-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-xl ${isActive ? 'bg-emerald-500/20' : 'bg-slate-700'}`}>
            <Receipt size={24} className={isActive ? 'text-emerald-400' : 'text-slate-400'} />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Gestão Financeira da Viagem</h3>
            <p className="text-slate-400 text-sm">{isActive ? '🟢 Modo Viagem Ativa' : '⚪ Modo Planejamento'}</p>
          </div>
        </div>
        <button onClick={onToggleActive} className={`px-4 py-2 rounded-xl font-medium transition-all ${isActive ? 'bg-emerald-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'}`}>
          {isActive ? <><Pause size={16} className="inline mr-1" /> Pausar</> : <><Play size={16} className="inline mr-1" /> Iniciar Viagem</>}
        </button>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Resumo Geral */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-xs uppercase">Planejado</p>
            <p className="text-2xl font-bold text-white">R$ {totalPlanned.toLocaleString()}</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 text-center">
            <p className="text-slate-400 text-xs uppercase">Realizado</p>
            <p className={`text-2xl font-bold ${totalReal > totalPlanned ? 'text-red-400' : 'text-emerald-400'}`}>R$ {totalReal.toLocaleString()}</p>
          </div>
          <div className={`rounded-xl p-4 text-center ${variance > 0 ? 'bg-red-500/20' : 'bg-emerald-500/20'}`}>
            <p className="text-slate-400 text-xs uppercase">Variação</p>
            <p className={`text-2xl font-bold ${variance > 0 ? 'text-red-400' : 'text-emerald-400'}`}>{variance > 0 ? '+' : ''}{variancePercent.toFixed(1)}%</p>
          </div>
        </div>
        
        {/* Categorias */}
        <div className="space-y-2">
          {categories.map(cat => {
            const CatIcon = cat.icon;
            const real = realExpenses[cat.id] || 0;
            const alert = getDeviationAlert(cat.id, cat.planned, real);
            const progress = cat.planned > 0 ? (real / cat.planned) * 100 : 0;
            
            return (
              <div key={cat.id} className="bg-slate-700/30 rounded-xl p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <CatIcon size={16} className="text-slate-400" />
                    <span className="text-sm text-slate-300">{cat.name}</span>
                    {alert && <span className={`text-xs px-2 py-0.5 rounded-full ${alert.type === 'danger' ? 'bg-red-500/30 text-red-300 animate-pulse' : alert.type === 'warning' ? 'bg-amber-500/30 text-amber-300' : 'bg-emerald-500/30 text-emerald-300'}`}>{alert.message}</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    {isActive && (
                      <input type="number" value={real || ''} onChange={e => onUpdateExpense(cat.id, Number(e.target.value))} placeholder="R$ gasto" className="w-24 px-2 py-1 bg-slate-600 text-white text-sm rounded-lg text-right focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    )}
                    <span className="text-xs text-slate-500">/ R$ {cat.planned.toLocaleString()}</span>
                  </div>
                </div>
                <div className="h-1.5 bg-slate-600 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${progress > 100 ? 'bg-red-500' : progress > 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${Math.min(progress, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Alerta de Desvio Global */}
        {isActive && variance > totalPlanned * 0.2 && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <AlertTriangle size={24} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="font-bold text-red-300">⚠️ Desvio Crítico Detectado!</p>
                <p className="text-sm text-red-200 mt-1">Seus gastos estão {variancePercent.toFixed(0)}% acima do planejado. Sugestão da IA: Reduza passeios pagos nos próximos dias e opte por atrações gratuitas.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== v4.0: LIVE BOOKING PLACEHOLDER ==========
const LiveBookingPlaceholder = ({ type, item }) => {
  const [checking, setChecking] = useState(false);
  
  const handleCheck = () => {
    setChecking(true);
    setTimeout(() => setChecking(false), 2000);
  };
  
  return (
    <div className="mt-2 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Globe size={14} className="text-blue-600" />
          <span className="text-xs text-blue-700 font-medium">
            {type === 'hotel' ? 'Verificar no Booking.com' : 'Verificar no Amadeus GDS'}
          </span>
        </div>
        <button onClick={handleCheck} disabled={checking} className={`px-3 py-1 text-xs rounded-full font-medium transition-all ${checking ? 'bg-blue-200 text-blue-600' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
          {checking ? <><RefreshCw size={12} className="inline animate-spin mr-1" /> Verificando...</> : 'Checar Disponibilidade'}
        </button>
      </div>
      {checking && <p className="text-xs text-blue-500 mt-2 animate-pulse">🔄 Conectando com {type === 'hotel' ? 'Booking.com' : 'Amadeus'}... (simulação)</p>}
    </div>
  );
};

// ========== BUDGET SPEEDOMETER (MELHORADO) ==========
const BudgetSpeedometer = ({ total, spent, isOverBudget }) => {
  const percentage = Math.min((spent / total) * 100, 150);
  const angle = (percentage / 150) * 180 - 90;
  return (
    <div className="relative w-full h-32 flex items-center justify-center">
      <svg viewBox="0 0 200 110" className="w-full max-w-[200px]">
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="#e2e8f0" strokeWidth="16" strokeLinecap="round" />
        <defs><linearGradient id="budgetGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#10b981" /><stop offset="50%" stopColor="#f59e0b" /><stop offset="75%" stopColor="#ef4444" /><stop offset="100%" stopColor="#dc2626" /></linearGradient></defs>
        <path d="M 20 100 A 80 80 0 0 1 180 100" fill="none" stroke="url(#budgetGradient)" strokeWidth="16" strokeLinecap="round" strokeDasharray={`${Math.min(percentage, 100) * 2.51} 251`} />
        <g transform={`rotate(${angle}, 100, 100)`}><line x1="100" y1="100" x2="100" y2="35" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" /><circle cx="100" cy="100" r="8" fill="#1e293b" /></g>
      </svg>
      <div className="absolute bottom-0 text-center"><p className={`text-2xl font-bold ${isOverBudget ? 'text-red-600' : 'text-white'}`}>{percentage.toFixed(0)}%</p><p className="text-xs text-slate-500">do orçamento</p></div>
    </div>
  );
};

const printStyles = `@media print { @page { margin: 0.8cm; size: A4; } body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .no-print { display: none !important; } .print-avoid-break { page-break-inside: avoid; } .exchange-analysis-section { page-break-before: always; } .packing-list-section { page-break-before: always; } .language-section { page-break-inside: avoid; } }`;

// ========== DESTINATIONS DATABASE ==========
const DESTINATIONS_DATABASE = {
  'Paris, França': { 
    continent: 'Europa', 
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200', 
    galleryUrls: ['https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800','https://images.unsplash.com/photo-1431274172761-fca41d930114?w=800','https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800','https://images.unsplash.com/photo-1511739001486-6bfe10ce65f4?w=800','https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=800','https://images.unsplash.com/photo-1503917988258-f87a78e3c995?w=800','https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=800','https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?w=800','https://images.unsplash.com/photo-1551634979-2b11f8c946fe?w=800'], 
    tip: 'Compre o Paris Museum Pass!', 
    flights: [{ id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.7, airline: 'Air France' }, { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3, airline: 'TAP' }, { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.4, airline: 'LATAM' }], 
    hotels: [{ id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9, checkInTime: '15:00', checkOutTime: '11:00' }, { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.7, checkInTime: '15:00', checkOutTime: '12:00' }, { id: 'ph3', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Tour Eiffel', rating: 4.5, checkInTime: '14:00', checkOutTime: '12:00' }, { id: 'ph4', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4, checkInTime: '14:00', checkOutTime: '11:00' }, { id: 'ph5', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2, checkInTime: '14:00', checkOutTime: '11:00' }], 
    restaurants: [{ id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro'], location: 'Four Seasons', duration: 2 }, { id: 'pr2', name: 'Septime', price: 280, cuisine: 'Contemporânea', rating: 4.8, period: 'noite', tags: ['gastro'], location: '11º Arrond.', duration: 1.5 }, { id: 'pr3', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5, period: 'tarde', tags: ['budget'], location: '9º Arrond.', duration: 1 }, { id: 'pr4', name: 'Café de Flore', price: 75, cuisine: 'Café', rating: 4.6, period: 'manhã', tags: ['romantic'], location: 'Saint-Germain', duration: 1 }], 
    activities: [{ id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: 2, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars', tags: ['landmark'], intensity: 'light' }, { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: 4, rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement', tags: ['culture'], intensity: 'moderate' }, { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: 1.5, rating: 4.7, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais', tags: ['romantic'], intensity: 'light' }, { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes', tags: ['culture', 'history'], intensity: 'heavy' }, { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Montmartre', tags: ['culture'], intensity: 'moderate' }, { id: 'pa6', name: "Museu d'Orsay", price: 85, duration: 3, rating: 4.8, childFriendly: true, period: 'tarde', location: '7º Arrondissement', tags: ['culture'], intensity: 'moderate' }, { id: 'pa7', name: 'Disneyland Paris', price: 380, duration: 10, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Marne-la-Vallée', tags: ['family'], intensity: 'heavy' }, { id: 'pa8', name: 'Jardim de Luxemburgo', price: 0, duration: 2, rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement', tags: ['free'], intensity: 'light' }] 
  },
  'Miami, EUA': { 
    continent: 'América do Norte', 
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200', 
    galleryUrls: ['https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800','https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?w=800','https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800','https://images.unsplash.com/photo-1571041804726-53e8bf082096?w=800','https://images.unsplash.com/photo-1562095241-8c6714fd4178?w=800','https://images.unsplash.com/photo-1535498730771-e735b998cd64?w=800','https://images.unsplash.com/photo-1605723517503-3cadb5818a0c?w=800'], 
    tip: 'Alugue carro para explorar as Keys!', 
    flights: [{ id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.5, airline: 'American' }, { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4, airline: 'LATAM' }, { id: 'mf3', name: 'GOL - Direto', price: 2250, duration: '8h30', rating: 4.2, airline: 'GOL' }], 
    hotels: [{ id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9, checkInTime: '16:00', checkOutTime: '11:00' }, { id: 'mh2', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8, checkInTime: '16:00', checkOutTime: '12:00' }, { id: 'mh3', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6, checkInTime: '16:00', checkOutTime: '11:00' }, { id: 'mh4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5, checkInTime: '15:00', checkOutTime: '11:00' }, { id: 'mh5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4, checkInTime: '15:00', checkOutTime: '11:00' }], 
    restaurants: [{ id: 'mr1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8, period: 'noite', tags: ['gastro'], location: 'Downtown', duration: 2 }, { id: 'mr2', name: "Joe's Stone Crab", price: 220, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro'], location: 'South Beach', duration: 1.5 }, { id: 'mr3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6, period: 'tarde', tags: ['budget'], location: 'Little Havana', duration: 1 }], 
    activities: [{ id: 'ma1', name: 'South Beach', price: 0, duration: 4, rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach', tags: ['beach', 'free'], intensity: 'light' }, { id: 'ma2', name: 'Art Deco Tour', price: 45, duration: 2, rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive', tags: ['culture'], intensity: 'moderate' }, { id: 'ma3', name: 'Everglades Tour', price: 95, duration: 4, rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades', tags: ['adventure'], intensity: 'moderate' }, { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: 2, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood', tags: ['culture', 'free'], intensity: 'light' }, { id: 'ma5', name: 'Vizcaya Museum', price: 65, duration: 3, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove', tags: ['culture'], intensity: 'moderate' }] 
  },
  'Tóquio, Japão': { 
    continent: 'Ásia', 
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200', 
    galleryUrls: ['https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800','https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800','https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800','https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800','https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=800','https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800','https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800','https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800'], 
    tip: 'Compre o JR Pass antes de viajar!', 
    flights: [{ id: 'tf1', name: 'JAL via Dallas', price: 7500, duration: '24h', rating: 4.8, airline: 'JAL' }, { id: 'tf2', name: 'ANA via Houston', price: 6800, duration: '25h', rating: 4.7, airline: 'ANA' }, { id: 'tf3', name: 'Emirates via Dubai', price: 5900, duration: '28h', rating: 4.6, airline: 'Emirates' }], 
    hotels: [{ id: 'th1', name: 'Park Hyatt Tokyo', stars: 5, price: 3800, location: 'Shinjuku', rating: 4.9, checkInTime: '15:00', checkOutTime: '12:00' }, { id: 'th2', name: 'Mandarin Oriental', stars: 5, price: 3200, location: 'Nihonbashi', rating: 4.8, checkInTime: '15:00', checkOutTime: '12:00' }, { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 650, location: 'Shinjuku', rating: 4.5, checkInTime: '15:00', checkOutTime: '11:00' }, { id: 'th4', name: 'Ryokan Asakusa', stars: 4, price: 480, location: 'Asakusa', rating: 4.6, checkInTime: '16:00', checkOutTime: '10:00' }], 
    restaurants: [{ id: 'tr1', name: 'Sukiyabashi Jiro', price: 1200, cuisine: 'Sushi', rating: 4.9, period: 'noite', tags: ['gastro'], location: 'Ginza', duration: 1.5 }, { id: 'tr2', name: 'Narisawa', price: 850, cuisine: 'Innovative', rating: 4.9, period: 'noite', tags: ['gastro'], location: 'Aoyama', duration: 2 }, { id: 'tr3', name: 'Ichiran Ramen', price: 35, cuisine: 'Ramen', rating: 4.6, period: 'tarde', tags: ['budget'], location: 'Shibuya', duration: 0.5 }], 
    activities: [{ id: 'ta1', name: 'teamLab Borderless', price: 120, duration: 3, rating: 4.9, childFriendly: true, period: 'tarde', location: 'Odaiba', tags: ['culture'], intensity: 'light' }, { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: 2, rating: 4.7, childFriendly: true, period: 'manhã', location: 'Asakusa', tags: ['culture', 'free'], intensity: 'moderate' }, { id: 'ta3', name: 'Cruzamento Shibuya', price: 0, duration: 1, rating: 4.5, childFriendly: true, period: 'noite', location: 'Shibuya', tags: ['free'], intensity: 'light' }, { id: 'ta4', name: 'Monte Fuji Day Trip', price: 250, duration: 12, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Mt. Fuji', tags: ['adventure'], intensity: 'heavy' }, { id: 'ta5', name: 'Tokyo DisneySea', price: 280, duration: 10, rating: 4.9, childFriendly: true, period: 'manhã', location: 'Chiba', tags: ['family'], intensity: 'heavy' }] 
  },
  'Dubai, EAU': { 
    continent: 'Ásia', 
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', 
    galleryUrls: ['https://images.unsplash.com/photo-1518684079-3c830dcef090?w=800','https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800','https://images.unsplash.com/photo-1546412414-e1885259563a?w=800','https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=800','https://images.unsplash.com/photo-1582672060674-bc2bd808a8b5?w=800','https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=800','https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=800'], 
    tip: 'Reserve o Burj Khalifa no sunset!', 
    flights: [{ id: 'df1', name: 'Emirates - Direto', price: 4800, duration: '14h30', rating: 4.9, airline: 'Emirates' }, { id: 'df2', name: 'Qatar via Doha', price: 3600, duration: '18h', rating: 4.7, airline: 'Qatar' }], 
    hotels: [{ id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 8500, location: 'Jumeirah', rating: 5.0, checkInTime: '15:00', checkOutTime: '12:00' }, { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 2800, location: 'Palm Jumeirah', rating: 4.8, checkInTime: '15:00', checkOutTime: '11:00' }, { id: 'dh3', name: 'Address Downtown', stars: 5, price: 1650, location: 'Downtown', rating: 4.7, checkInTime: '15:00', checkOutTime: '12:00' }], 
    restaurants: [{ id: 'dr1', name: 'At.mosphere', price: 650, cuisine: 'Fine Dining', rating: 4.8, period: 'noite', tags: ['gastro'], location: 'Burj Khalifa', duration: 2 }, { id: 'dr2', name: 'Nobu Dubai', price: 450, cuisine: 'Japonesa', rating: 4.7, period: 'noite', tags: ['gastro'], location: 'Atlantis', duration: 1.5 }], 
    activities: [{ id: 'da1', name: 'Burj Khalifa - At The Top', price: 180, duration: 2, rating: 4.8, childFriendly: true, period: 'tarde', location: 'Downtown', tags: ['landmark'], intensity: 'light' }, { id: 'da2', name: 'Desert Safari Premium', price: 280, duration: 6, rating: 4.7, childFriendly: true, period: 'tarde', location: 'Deserto', tags: ['adventure'], intensity: 'moderate' }, { id: 'da3', name: 'Dubai Mall & Fountain', price: 0, duration: 4, rating: 4.6, childFriendly: true, period: 'noite', location: 'Downtown', tags: ['shopping', 'free'], intensity: 'light' }, { id: 'da4', name: 'Aquaventure Waterpark', price: 320, duration: 6, rating: 4.8, childFriendly: true, period: 'manhã', location: 'Palm Jumeirah', tags: ['family'], intensity: 'heavy' }] 
  },
  'Maldivas': { 
    continent: 'Ásia', 
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200', 
    galleryUrls: ['https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800','https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800','https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800','https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?w=800','https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=800','https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800','https://images.unsplash.com/photo-1439130490301-25e322d88054?w=800','https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800'], 
    tip: 'Reserve uma villa sobre a água!', 
    flights: [{ id: 'mvf1', name: 'Emirates via Dubai', price: 6200, duration: '18h', rating: 4.8, airline: 'Emirates' }, { id: 'mvf2', name: 'Qatar via Doha', price: 5800, duration: '19h', rating: 4.7, airline: 'Qatar' }], 
    hotels: [{ id: 'mvh1', name: 'Soneva Fushi', stars: 5, price: 8500, location: 'Baa Atoll', rating: 5.0, checkInTime: '14:00', checkOutTime: '12:00' }, { id: 'mvh2', name: 'Conrad Rangali', stars: 5, price: 4800, location: 'Rangali Island', rating: 4.9, checkInTime: '14:00', checkOutTime: '12:00' }, { id: 'mvh3', name: 'Anantara Veli', stars: 5, price: 2800, location: 'South Malé', rating: 4.7, checkInTime: '14:00', checkOutTime: '11:00' }], 
    restaurants: [{ id: 'mvr1', name: 'Ithaa Undersea', price: 950, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro'], location: 'Conrad', duration: 2 }], 
    activities: [{ id: 'mva1', name: 'Snorkel com Mantas', price: 180, duration: 3, rating: 4.9, childFriendly: false, period: 'manhã', location: 'Baa Atoll', tags: ['adventure'], intensity: 'moderate' }, { id: 'mva2', name: 'Spa Overwater', price: 350, duration: 2, rating: 4.8, childFriendly: false, period: 'tarde', location: 'Resort', tags: ['relaxation'], intensity: 'light' }, { id: 'mva3', name: 'Jantar na Praia', price: 450, duration: 2.5, rating: 4.9, childFriendly: true, period: 'noite', location: 'Private Beach', tags: ['romantic'], intensity: 'light' }, { id: 'mva4', name: 'Dolphin Cruise', price: 120, duration: 2, rating: 4.6, childFriendly: true, period: 'tarde', location: 'Ocean', tags: ['nature'], intensity: 'light' }] 
  }
};

// ========== FULL-DEPTH COMMUNITY ITINERARIES ==========
const COMMUNITY_ITINERARIES = [
  { id: 'ci1', title: 'Paris Romântica', destination: 'Paris, França', author: { name: 'Maria Silva', avatar: '👩', verified: true }, duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 487, tags: ['romantic', 'culture'], badges: ['💕 Melhor para Casais', '⭐ Top 10'], highlights: ['Torre Eiffel Sunset', 'Cruzeiro Sena', 'Versalhes'], featured: true, flightId: 'pf2', hotelId: 'ph3', comments: [{ id: 1, user: 'Ana Costa', avatar: '👩', rating: 5, date: '2025-12-15', text: 'Roteiro perfeito para lua de mel!' }], ratings: { cleanliness: 4.9, value: 4.7, location: 5.0 }, 
    dailySchedule: [
      { day: 1, theme: 'Chegada', items: [{ time: '17:00', endTime: '18:00', name: 'Chegada Paris CDG', type: 'arrival', cost: 0 }, { time: '18:30', endTime: '19:30', name: 'Transfer para Hotel', type: 'transfer', cost: 85 }, { time: '19:30', endTime: '20:00', name: 'Check-in Pullman', type: 'hotel', cost: 850 }, { time: '20:30', endTime: '22:00', name: 'Jantar leve', type: 'restaurant', cost: 120 }] },
      { day: 2, theme: 'Torre Eiffel & Sena', items: [{ time: '08:00', endTime: '09:00', name: 'Café da manhã', type: 'restaurant', cost: 0 }, { time: '09:30', endTime: '12:00', name: 'Torre Eiffel - Topo', type: 'activity', cost: 160 }, { time: '12:30', endTime: '14:00', name: 'Almoço Café de Flore', type: 'restaurant', cost: 150 }, { time: '14:30', endTime: '17:30', name: 'Champs-Élysées', type: 'activity', cost: 0 }, { time: '20:00', endTime: '22:00', name: 'Cruzeiro Bateaux', type: 'activity', cost: 170 }] },
      { day: 3, theme: 'Arte & Cultura', items: [{ time: '10:00', endTime: '14:00', name: 'Museu do Louvre', type: 'activity', cost: 95 }, { time: '14:30', endTime: '15:30', name: 'Almoço Bouillon', type: 'restaurant', cost: 55 }, { time: '16:00', endTime: '19:00', name: "Museu d'Orsay", type: 'activity', cost: 85 }, { time: '20:00', endTime: '22:30', name: 'Jantar Septime', type: 'restaurant', cost: 280 }] },
      { day: 4, theme: 'Versalhes', items: [{ time: '07:30', endTime: '08:30', name: 'Café reforçado', type: 'restaurant', cost: 45 }, { time: '09:00', endTime: '17:00', name: 'Palácio de Versalhes', type: 'activity', cost: 195 }, { time: '19:30', endTime: '21:30', name: 'Jantar Marais', type: 'restaurant', cost: 180 }] },
      { day: 5, theme: 'Montmartre', items: [{ time: '10:30', endTime: '13:30', name: 'Tour Montmartre', type: 'activity', cost: 45 }, { time: '14:00', endTime: '15:00', name: 'Almoço local', type: 'restaurant', cost: 85 }, { time: '20:00', endTime: '23:00', name: 'Show Moulin Rouge', type: 'activity', cost: 350 }] },
      { day: 6, theme: 'Compras & Gastronomia', items: [{ time: '10:30', endTime: '13:30', name: 'Galeries Lafayette', type: 'activity', cost: 0 }, { time: '16:00', endTime: '18:00', name: 'Jardin Luxembourg', type: 'activity', cost: 0 }, { time: '19:00', endTime: '22:00', name: 'Jantar Le Cinq', type: 'restaurant', cost: 850 }] },
      { day: 7, theme: 'Partida', items: [{ time: '08:00', endTime: '09:00', name: 'Último café', type: 'restaurant', cost: 0 }, { time: '09:30', endTime: '10:30', name: 'Check-out', type: 'checkout', cost: 0 }, { time: '11:00', endTime: '12:00', name: 'Transfer aeroporto', type: 'transfer', cost: 85 }, { time: '14:30', endTime: '15:30', name: 'Voo de retorno', type: 'flight', cost: 0 }] }
    ]
  },
  { id: 'ci2', title: 'Miami Beach Life', destination: 'Miami, EUA', author: { name: 'Camila Andrade', avatar: '👩', verified: true }, duration: 6, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 312, tags: ['beach', 'adventure'], badges: ['💰 Mais Econômico', '🏖️ Best Beach'], highlights: ['South Beach', 'Wynwood', 'Everglades'], featured: true, flightId: 'mf2', hotelId: 'mh5', comments: [{ id: 1, user: 'Lucas Santos', avatar: '👨', rating: 5, date: '2025-12-18', text: 'Miami incrível!' }], ratings: { cleanliness: 4.7, value: 4.8, location: 4.9 }, 
    dailySchedule: [
      { day: 1, theme: 'Chegada', items: [{ time: '14:00', endTime: '15:00', name: 'Chegada MIA', type: 'arrival', cost: 0 }, { time: '15:30', endTime: '16:30', name: 'Uber South Beach', type: 'transfer', cost: 35 }, { time: '17:00', endTime: '17:30', name: 'Check-in Freehand', type: 'hotel', cost: 320 }, { time: '18:00', endTime: '20:00', name: 'Sunset South Beach', type: 'activity', cost: 0 }, { time: '20:30', endTime: '22:00', name: 'Jantar Versailles', type: 'restaurant', cost: 45 }] },
      { day: 2, theme: 'South Beach & Art Deco', items: [{ time: '08:00', endTime: '09:00', name: 'Café local', type: 'restaurant', cost: 25 }, { time: '09:30', endTime: '13:00', name: 'Manhã de praia', type: 'activity', cost: 0 }, { time: '13:30', endTime: '14:30', name: 'Almoço Ocean Drive', type: 'restaurant', cost: 55 }, { time: '15:00', endTime: '17:00', name: 'Art Deco Tour', type: 'activity', cost: 45 }, { time: '20:30', endTime: '23:00', name: 'Lincoln Road', type: 'activity', cost: 100 }] },
      { day: 3, theme: 'Wynwood & Little Havana', items: [{ time: '09:00', endTime: '10:00', name: 'Brunch cubano', type: 'restaurant', cost: 35 }, { time: '10:30', endTime: '13:30', name: 'Wynwood Walls', type: 'activity', cost: 0 }, { time: '14:00', endTime: '15:00', name: 'Almoço Wynwood', type: 'restaurant', cost: 45 }, { time: '15:30', endTime: '18:30', name: 'Little Havana tour', type: 'activity', cost: 65 }, { time: '19:00', endTime: '21:00', name: 'Jantar cubano', type: 'restaurant', cost: 60 }] },
      { day: 4, theme: 'Everglades', items: [{ time: '07:00', endTime: '08:00', name: 'Café rápido', type: 'restaurant', cost: 20 }, { time: '10:00', endTime: '15:00', name: 'Everglades Airboat', type: 'activity', cost: 95 }, { time: '17:30', endTime: '19:00', name: 'Praia sunset', type: 'rest', cost: 0 }, { time: '20:00', endTime: '22:30', name: "Joe's Stone Crab", type: 'restaurant', cost: 220 }] },
      { day: 5, theme: 'Compras', items: [{ time: '11:00', endTime: '14:00', name: 'Aventura Mall', type: 'activity', cost: 0 }, { time: '18:30', endTime: '20:00', name: 'Vizcaya Museum', type: 'activity', cost: 65 }, { time: '21:00', endTime: '23:00', name: 'Jantar Zuma', type: 'restaurant', cost: 350 }] },
      { day: 6, theme: 'Partida', items: [{ time: '08:00', endTime: '09:00', name: 'Último café', type: 'restaurant', cost: 25 }, { time: '09:30', endTime: '10:00', name: 'Check-out', type: 'checkout', cost: 0 }, { time: '10:30', endTime: '11:30', name: 'Transfer aeroporto', type: 'transfer', cost: 35 }, { time: '13:00', endTime: '14:00', name: 'Voo retorno', type: 'flight', cost: 0 }] }
    ]
  },
  { id: 'ci3', title: 'Tóquio em Família', destination: 'Tóquio, Japão', author: { name: 'Pedro Tanaka', avatar: '👨‍👩‍👧‍👦', verified: true }, duration: 10, budget: 55000, travelers: 4, likes: 2890, rating: 4.8, reviews: 234, tags: ['family', 'culture'], badges: ['👨‍👩‍👧 Família', '🎌 Cultural'], highlights: ['DisneySea', 'teamLab', 'Senso-ji', 'Mt. Fuji'], featured: true, flightId: 'tf3', hotelId: 'th3', comments: [{ id: 1, user: 'Família Ribeiro', avatar: '👨‍👩‍👧', rating: 5, date: '2025-12-08', text: 'Filhos amaram!' }], ratings: { cleanliness: 4.9, value: 4.7, location: 4.8 }, 
    dailySchedule: [
      { day: 1, theme: 'Chegada', items: [{ time: '18:00', endTime: '19:30', name: 'Chegada Narita', type: 'arrival', cost: 0 }, { time: '20:00', endTime: '21:30', name: 'Limousine Bus', type: 'transfer', cost: 120 }, { time: '22:00', endTime: '22:30', name: 'Check-in', type: 'hotel', cost: 650 }, { time: '22:30', endTime: '23:30', name: 'Jantar convini', type: 'restaurant', cost: 40 }] },
      { day: 2, theme: 'Recuperação Jet Lag', items: [{ time: '10:00', endTime: '11:00', name: 'Café hotel', type: 'restaurant', cost: 0 }, { time: '12:00', endTime: '14:00', name: 'Shinjuku Gyoen', type: 'activity', cost: 20 }, { time: '14:30', endTime: '15:30', name: 'Ichiran Ramen', type: 'restaurant', cost: 70 }, { time: '16:00', endTime: '18:00', name: 'Explorar Shinjuku', type: 'activity', cost: 0 }, { time: '19:00', endTime: '21:00', name: 'Jantar yakitori', type: 'restaurant', cost: 120 }] },
      { day: 3, theme: 'Tradição', items: [{ time: '09:30', endTime: '12:30', name: 'Templo Senso-ji', type: 'activity', cost: 0 }, { time: '13:00', endTime: '14:00', name: 'Almoço tradicional', type: 'restaurant', cost: 80 }, { time: '14:30', endTime: '17:00', name: 'Tokyo Skytree', type: 'activity', cost: 120 }, { time: '20:30', endTime: '22:00', name: 'Sushi rotativo', type: 'restaurant', cost: 100 }] },
      { day: 4, theme: 'DisneySea', items: [{ time: '07:00', endTime: '08:00', name: 'Café rápido', type: 'restaurant', cost: 30 }, { time: '10:00', endTime: '21:00', name: 'Tokyo DisneySea', type: 'activity', cost: 1120 }] },
      { day: 5, theme: 'Pop Culture', items: [{ time: '10:30', endTime: '14:00', name: 'Akihabara', type: 'activity', cost: 0 }, { time: '14:30', endTime: '15:30', name: 'Maid café', type: 'restaurant', cost: 80 }, { time: '16:00', endTime: '19:00', name: 'Harajuku', type: 'activity', cost: 0 }, { time: '19:30', endTime: '21:30', name: 'Shibuya & jantar', type: 'restaurant', cost: 100 }] },
      { day: 6, theme: 'Arte Digital', items: [{ time: '11:00', endTime: '15:00', name: 'teamLab Planets', type: 'activity', cost: 200 }, { time: '17:00', endTime: '19:00', name: 'Gundam Base', type: 'activity', cost: 0 }, { time: '19:30', endTime: '21:30', name: 'Jantar vista', type: 'restaurant', cost: 150 }] },
      { day: 7, theme: 'Monte Fuji', items: [{ time: '06:00', endTime: '07:00', name: 'Café cedo', type: 'restaurant', cost: 30 }, { time: '10:30', endTime: '17:00', name: 'Day trip Mt. Fuji', type: 'activity', cost: 500 }, { time: '21:00', endTime: '22:30', name: 'Jantar Ginza', type: 'restaurant', cost: 200 }] },
      { day: 8, theme: 'Compras', items: [{ time: '10:30', endTime: '13:00', name: 'Ginza shopping', type: 'activity', cost: 0 }, { time: '15:00', endTime: '18:00', name: 'Meiji Shrine', type: 'activity', cost: 0 }, { time: '19:00', endTime: '22:00', name: 'Jantar Roppongi', type: 'restaurant', cost: 180 }] },
      { day: 9, theme: 'Dia Livre', items: [{ time: '10:30', endTime: '13:00', name: 'Atividade livre', type: 'activity', cost: 0 }, { time: '19:00', endTime: '22:00', name: 'Jantar omakase', type: 'restaurant', cost: 400 }] },
      { day: 10, theme: 'Sayonara', items: [{ time: '08:00', endTime: '09:00', name: 'Último café', type: 'restaurant', cost: 40 }, { time: '09:30', endTime: '10:30', name: 'Check-out', type: 'checkout', cost: 0 }, { time: '11:00', endTime: '13:00', name: 'Limousine Narita', type: 'transfer', cost: 120 }, { time: '15:00', endTime: '16:00', name: 'Voo retorno', type: 'flight', cost: 0 }] }
    ]
  },
  { id: 'ci4', title: 'Dubai Luxuoso', destination: 'Dubai, EAU', author: { name: 'Helena Borges', avatar: '👸', verified: true }, duration: 6, budget: 55000, travelers: 2, likes: 2890, rating: 4.9, reviews: 198, tags: ['luxury', 'adventure'], badges: ['👑 Luxo', '🌟 Premium'], highlights: ['Burj Khalifa Sunset', 'Desert Safari', 'Atlantis'], featured: true, flightId: 'df1', hotelId: 'dh2', comments: [{ id: 1, user: 'Ricardo & Paula', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Dubai é outro planeta!' }], ratings: { cleanliness: 4.9, value: 4.6, location: 4.8 }, 
    dailySchedule: [
      { day: 1, theme: 'Chegada', items: [{ time: '20:00', endTime: '21:00', name: 'Chegada DXB', type: 'arrival', cost: 0 }, { time: '21:30', endTime: '22:00', name: 'Limo transfer', type: 'transfer', cost: 200 }, { time: '22:30', endTime: '23:00', name: 'Check-in Atlantis', type: 'hotel', cost: 2800 }, { time: '23:30', endTime: '00:30', name: 'Jantar late night', type: 'restaurant', cost: 150 }] },
      { day: 2, theme: 'Atlantis', items: [{ time: '08:00', endTime: '09:00', name: 'Café buffet', type: 'restaurant', cost: 0 }, { time: '09:30', endTime: '14:00', name: 'Aquaventure', type: 'activity', cost: 320 }, { time: '14:30', endTime: '15:30', name: 'Almoço Ossiano', type: 'restaurant', cost: 250 }, { time: '16:00', endTime: '18:00', name: 'Lost Chambers', type: 'activity', cost: 150 }, { time: '21:00', endTime: '23:00', name: 'Jantar Nobu', type: 'restaurant', cost: 450 }] },
      { day: 3, theme: 'Downtown', items: [{ time: '11:00', endTime: '14:00', name: 'Dubai Mall', type: 'activity', cost: 120 }, { time: '16:00', endTime: '19:00', name: 'Burj Khalifa SKY', type: 'activity', cost: 450 }, { time: '19:30', endTime: '20:30', name: 'Dubai Fountain', type: 'activity', cost: 0 }, { time: '21:00', endTime: '23:30', name: 'At.mosphere', type: 'restaurant', cost: 650 }] },
      { day: 4, theme: 'Desert Safari', items: [{ time: '09:30', endTime: '12:30', name: 'Spa relaxamento', type: 'activity', cost: 400 }, { time: '13:00', endTime: '14:00', name: 'Almoço leve', type: 'restaurant', cost: 100 }, { time: '15:00', endTime: '23:00', name: 'Desert Safari VIP', type: 'activity', cost: 560 }] },
      { day: 5, theme: 'Experiências', items: [{ time: '10:30', endTime: '12:30', name: 'Gold Souk', type: 'activity', cost: 0 }, { time: '14:30', endTime: '17:00', name: 'Iate Palm', type: 'activity', cost: 800 }, { time: '18:00', endTime: '19:00', name: 'Helicopter tour', type: 'activity', cost: 1200 }, { time: '20:00', endTime: '22:30', name: 'Jantar despedida', type: 'restaurant', cost: 400 }] },
      { day: 6, theme: 'Partida', items: [{ time: '08:00', endTime: '09:00', name: 'Último café', type: 'restaurant', cost: 0 }, { time: '09:30', endTime: '10:30', name: 'Check-out', type: 'checkout', cost: 0 }, { time: '11:00', endTime: '12:00', name: 'Transfer aeroporto', type: 'transfer', cost: 200 }, { time: '14:00', endTime: '15:00', name: 'Voo retorno', type: 'flight', cost: 0 }] }
    ]
  },
  { id: 'ci5', title: 'Maldivas Lua de Mel', destination: 'Maldivas', author: { name: 'Carolina Mendes', avatar: '👩', verified: true }, duration: 7, budget: 65000, travelers: 2, likes: 4567, rating: 4.9, reviews: 423, tags: ['romantic', 'luxury', 'beach'], badges: ['💕 Lua de Mel', '🏝️ Paraíso', '⭐ #1'], highlights: ['Villa Overwater', 'Jantar Subaquático', 'Spa', 'Snorkel Mantas'], featured: true, flightId: 'mvf1', hotelId: 'mvh2', comments: [{ id: 1, user: 'Paulo & Julia', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Paraíso na Terra!' }], ratings: { cleanliness: 5.0, value: 4.5, location: 5.0 }, 
    dailySchedule: [
      { day: 1, theme: 'Chegada', items: [{ time: '16:00', endTime: '17:00', name: 'Chegada Malé', type: 'arrival', cost: 0 }, { time: '17:30', endTime: '18:15', name: 'Seaplane Conrad', type: 'transfer', cost: 650 }, { time: '18:30', endTime: '19:30', name: 'Check-in Water Villa', type: 'hotel', cost: 4800 }, { time: '20:00', endTime: '22:00', name: 'Jantar romântico', type: 'restaurant', cost: 350 }] },
      { day: 2, theme: 'Descobrindo', items: [{ time: '08:00', endTime: '09:30', name: 'Café floating', type: 'restaurant', cost: 0 }, { time: '10:00', endTime: '12:00', name: 'Snorkel house reef', type: 'activity', cost: 0 }, { time: '14:00', endTime: '16:00', name: 'Couples spa', type: 'activity', cost: 700 }, { time: '17:00', endTime: '19:00', name: 'Dolphin cruise', type: 'activity', cost: 240 }, { time: '20:00', endTime: '22:30', name: 'Jantar candlelight', type: 'restaurant', cost: 500 }] },
      { day: 3, theme: 'Aventura', items: [{ time: '07:00', endTime: '08:30', name: 'Café cedo', type: 'restaurant', cost: 0 }, { time: '09:00', endTime: '12:30', name: 'Snorkel mantas', type: 'activity', cost: 360 }, { time: '14:30', endTime: '17:00', name: 'Descanso villa', type: 'rest', cost: 0 }, { time: '19:30', endTime: '22:00', name: 'Ithaa Undersea', type: 'restaurant', cost: 950 }] },
      { day: 4, theme: 'Relaxamento', items: [{ time: '09:00', endTime: '10:30', name: 'Café na cama', type: 'restaurant', cost: 0 }, { time: '11:00', endTime: '13:00', name: 'Kayak', type: 'activity', cost: 0 }, { time: '15:00', endTime: '17:30', name: 'Spa wellness', type: 'activity', cost: 850 }, { time: '18:00', endTime: '19:30', name: 'Sandbank privado', type: 'activity', cost: 400 }, { time: '20:30', endTime: '22:30', name: 'Wine pairing', type: 'restaurant', cost: 600 }] },
      { day: 5, theme: 'Exploração', items: [{ time: '09:30', endTime: '12:30', name: 'Ilha local', type: 'activity', cost: 280 }, { time: '15:00', endTime: '17:00', name: 'Stand up paddle', type: 'activity', cost: 0 }, { time: '20:00', endTime: '22:00', name: 'Jantar Koko', type: 'restaurant', cost: 450 }] },
      { day: 6, theme: 'Último Dia', items: [{ time: '09:00', endTime: '10:30', name: 'Brunch champagne', type: 'restaurant', cost: 250 }, { time: '11:00', endTime: '13:00', name: 'Mergulho intro', type: 'activity', cost: 380 }, { time: '18:00', endTime: '19:30', name: 'Cinema estrelas', type: 'activity', cost: 350 }, { time: '20:00', endTime: '23:00', name: 'Jantar especial', type: 'restaurant', cost: 800 }] },
      { day: 7, theme: 'Despedida', items: [{ time: '07:00', endTime: '08:30', name: 'Último café', type: 'restaurant', cost: 0 }, { time: '09:00', endTime: '10:00', name: 'Check-out', type: 'checkout', cost: 0 }, { time: '10:30', endTime: '11:15', name: 'Seaplane Malé', type: 'transfer', cost: 650 }, { time: '14:00', endTime: '15:00', name: 'Voo retorno', type: 'flight', cost: 0 }] }
    ]
  }
];

// ========== COMPONENTS ==========
const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-8 bg-gradient-to-br from-indigo-600 to-emerald-600 text-white text-center">
          <Globe size={56} className="mx-auto mb-4" /><h2 className="text-2xl font-bold">KINU</h2><p className="text-teal-100 text-sm mt-1">Viaje de forma inteligente</p>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-6">{['login', 'signup'].map(m => <button key={m} onClick={() => setMode(m)} className={`flex-1 py-3 rounded-xl font-medium transition-all ${mode === m ? 'bg-indigo-600 text-white' : 'bg-slate-100'}`}>{m === 'login' ? 'Entrar' : 'Criar Conta'}</button>)}</div>
          <div className="space-y-4">{mode === 'signup' && <input type="text" placeholder="Nome completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border rounded-xl" />}<input type="email" placeholder="E-mail" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border rounded-xl" /><input type="password" placeholder="Senha" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border rounded-xl" /></div>
          <button onClick={() => { const user = { name: form.name || 'Viajante', email: form.email, avatar: '🌍', trips: 0, joinDate: '2025' }; onLogin(user); onClose(); }} className="w-full mt-6 py-4 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
        </div>
      </div>
    </div>
  );
};

const DestinationGuide = ({ destination }) => {
  const guide = DESTINATION_GUIDES[destination];
  if (!guide) return <p className="text-slate-500 text-center py-8">Guia não disponível para este destino</p>;
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className={`p-5 rounded-xl ${guide.visa.required ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' : 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'}`}><div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg ${guide.visa.required ? 'bg-amber-500' : 'bg-emerald-500'}`}><FileText size={20} className="text-white" /></div><h4 className="font-bold text-white">Visto</h4></div><p className={`text-sm font-semibold ${guide.visa.required ? 'text-amber-600' : 'text-emerald-600'}`}>{guide.visa.required ? '⚠️ Obrigatório' : '✅ Não necessário'}</p><p className="text-xs text-slate-300 mt-2">{guide.visa.info}</p></div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 rounded-lg bg-blue-500"><Stethoscope size={20} className="text-white" /></div><h4 className="font-bold text-white">Saúde</h4></div><p className="text-xs text-slate-300">{guide.health.insurance}</p><div className="mt-2 flex flex-wrap gap-1">{guide.health.vaccines.map((v, i) => <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{v}</span>)}</div></div>
        <div className="bg-gradient-to-br from-emerald-50 to-indigo-50 p-5 rounded-xl border border-emerald-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 rounded-lg bg-emerald-500"><DollarSign size={20} className="text-white" /></div><h4 className="font-bold text-white">Moeda</h4></div><p className="text-2xl font-bold text-emerald-700">{guide.currency.symbol} {guide.currency.code}</p><p className="text-xs text-slate-300 mt-1">1 BRL ≈ {guide.currency.rate} {guide.currency.code}</p></div>
      </div>
      <div className="bg-slate-900/70 rounded-xl p-4"><p className="text-xs font-semibold text-slate-500 uppercase mb-2">📋 Documentos necessários</p><div className="flex flex-wrap gap-2">{guide.visa.docs.map((d, i) => <span key={i} className="text-xs bg-slate-100 text-slate-200 px-3 py-1.5 rounded-full border border-slate-700">{d}</span>)}</div></div>
      <div className="bg-slate-900/70 rounded-xl p-4"><p className="text-xs font-semibold text-slate-500 uppercase mb-2">💡 Dicas de câmbio</p><ul className="space-y-1">{guide.currency.tips.map((tip, i) => <li key={i} className="text-sm text-slate-300 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500" />{tip}</li>)}</ul></div>
    </div>
  );
};

const MasonryGallery = ({ images, destination }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div>
      <div className="columns-2 md:columns-3 gap-3 space-y-3">
        {images.map((url, idx) => (
          <div key={idx} onClick={() => setSelectedImage(url)} className="relative break-inside-avoid rounded-xl overflow-hidden cursor-pointer group mb-3" style={{ aspectRatio: idx === 0 || idx === 4 ? '4/5' : idx % 3 === 1 ? '1/1' : '3/4' }}>
            <img src={url} alt={`${destination} ${idx + 1}`} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"><div className="absolute bottom-3 left-3 right-3"><div className="flex items-center gap-2"><Eye size={16} className="text-white" /><span className="text-white text-sm font-medium">Ver em tela cheia</span></div></div></div>
            {idx === 0 && <div className="absolute top-3 left-3 px-2 py-1 bg-slate-900/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-200">📸 {images.length} fotos</div>}
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 p-3 bg-slate-900/10 hover:bg-slate-900/20 rounded-full text-white transition-all" onClick={() => setSelectedImage(null)}><X size={24} /></button>
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

const PremiumItineraryRenderer = ({ dailySchedule, destination }) => {
  const [expandedDay, setExpandedDay] = useState(1);
  const typeIcons = { arrival: PlaneLanding, flight: Plane, hotel: Hotel, checkout: Briefcase, transfer: Car, activity: Camera, restaurant: Utensils, rest: Bed };
  const getTypeColor = (type) => ({ arrival: 'from-blue-500 to-indigo-500', flight: 'from-blue-400 to-cyan-500', hotel: 'from-purple-500 to-violet-500', checkout: 'from-orange-400 to-amber-500', transfer: 'from-cyan-500 to-indigo-500', activity: 'from-emerald-500 to-green-500', restaurant: 'from-rose-500 to-pink-500', rest: 'from-indigo-400 to-purple-400' }[type] || 'from-emerald-500 to-green-500');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-indigo-50 to-emerald-50 rounded-xl border border-indigo-200">
        <BookOpen size={20} className="text-indigo-600" /><p className="text-sm text-teal-700 font-medium">Guia Premium • Cronograma de {dailySchedule.length} dias</p>
      </div>
      {dailySchedule.map((dayData, idx) => {
        const isExpanded = expandedDay === dayData.day;
        return (
          <div key={idx} className={`bg-slate-900 rounded-2xl border overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-xl border-indigo-300' : 'shadow-sm border-slate-700 hover:border-slate-300'}`}>
            <button onClick={() => setExpandedDay(isExpanded ? null : dayData.day)} className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all ${isExpanded ? 'bg-gradient-to-r from-indigo-600 to-emerald-600 text-white' : 'bg-slate-950 hover:bg-slate-100'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${isExpanded ? 'bg-slate-900/20' : 'bg-teal-100 text-teal-700'}`}>{dayData.day}</div>
                <div><h4 className={`font-bold ${isExpanded ? 'text-white' : 'text-white'}`}>Dia {dayData.day} — {dayData.theme}</h4><p className={`text-xs ${isExpanded ? 'text-teal-100' : 'text-slate-500'}`}>{dayData.items.length} atividades</p></div>
              </div>
              <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5 space-y-3">
                {dayData.items.map((item, itemIdx) => {
                  const ItemIcon = typeIcons[item.type] || Camera;
                  return (
                    <div key={itemIdx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-800 hover:border-slate-700 hover:shadow-md transition-all group">
                      <div className="text-center w-20 flex-shrink-0">
                        <div className="font-mono text-sm font-bold text-indigo-600">{item.time}</div>
                        {item.endTime && <><div className="text-xs text-slate-400">—</div><div className="font-mono text-xs text-slate-500">{item.endTime}</div></>}
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} shadow-lg group-hover:scale-110 transition-transform`}><ItemIcon size={20} className="text-white" /></div>
                      <div className="flex-1 min-w-0"><p className="font-semibold text-white group-hover:text-indigo-700 transition-colors">{item.name}</p><p className="text-xs text-slate-500 capitalize mt-0.5">{item.type === 'restaurant' ? '🍽️ Refeição' : item.type === 'activity' ? '🎯 Atividade' : item.type === 'transfer' ? '🚗 Transporte' : item.type}</p></div>
                      {item.cost > 0 && <div className="text-right flex-shrink-0"><span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-lg">R$ {item.cost.toLocaleString()}</span></div>}
                    </div>
                  );
                })}
                <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between"><span className="text-xs text-slate-500">Total do dia:</span><span className="font-bold text-indigo-600">R$ {dayData.items.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ========== MODALS AND REMAINING COMPONENTS ==========
const AIInsightCard = ({ insight, onAction }) => {
  const colors = { upgrade: 'border-emerald-300 bg-emerald-50', downgrade: 'border-amber-300 bg-amber-50', danger: 'border-red-300 bg-red-50', tip: 'border-blue-300 bg-blue-50', info: 'border-slate-300 bg-slate-950' };
  return (
    <div className={`p-4 rounded-xl border-2 ${colors[insight.type] || colors.tip} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${insight.type === 'upgrade' ? 'bg-emerald-500' : insight.type === 'downgrade' ? 'bg-amber-500' : insight.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`}>
          <insight.icon size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{insight.title}</p>
          <p className="text-xs text-slate-300 mt-1">{insight.message}</p>
          {(insight.savings || insight.cost) && <p className={`text-xs font-bold mt-1 ${insight.savings ? 'text-emerald-600' : 'text-amber-600'}`}>{insight.savings ? `Economia: R$ ${insight.savings.toLocaleString()}` : `+R$ ${insight.cost.toLocaleString()}`}</p>}
        </div>
        {insight.action && <button onClick={() => onAction(insight)} className={`px-3 py-1.5 text-xs font-bold rounded-lg ${insight.type === 'upgrade' ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-amber-600 text-white hover:bg-amber-700'} transition-all`}>{insight.action}</button>}
      </div>
    </div>
  );
};

const ActivityModal = ({ isOpen, onClose, activities, restaurants, current, mode, dayNum, onSelect, onRemove }) => {
  const [tab, setTab] = useState('activities');
  const [search, setSearch] = useState('');
  if (!isOpen) return null;
  const items = tab === 'activities' ? activities : restaurants;
  const filtered = items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-white">{mode === 'swap' ? 'Trocar Atividade' : 'Adicionar ao Dia ' + dayNum}</h2><p className="text-sm text-slate-500 mt-1">Escolha uma opção abaixo</p></div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} className="text-slate-500" /></button>
        </div>
        <div className="p-4 border-b border-slate-800">
          <div className="flex gap-2 mb-4">{['activities', 'restaurants'].map(t => <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${tab === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>{t === 'activities' ? '🎯 Atividades' : '🍽️ Restaurantes'}</button>)}</div>
          <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl" />
        </div>
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="grid gap-3">
            {filtered.map(item => (
              <div key={item.id} onClick={() => { onSelect({ ...item, category: tab === 'restaurants' ? 'restaurant' : 'activity', location: item.location || item.cuisine, startTime: item.startTime || '10:00', endTime: TimeSlotEngine.calculateEndTime(item.startTime || '10:00', item.duration), period: item.period || 'manhã' }); onClose(); }} className="p-4 border border-slate-700 rounded-xl hover:border-indigo-400 hover:shadow-md cursor-pointer transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white group-hover:text-indigo-600">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.location || item.cuisine} • {item.duration}h • ⭐ {item.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-indigo-600">R$ {item.price}</p>
                    <p className="text-xs text-slate-400">por pessoa</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {mode === 'swap' && current && (
          <div className="p-4 border-t border-slate-700 bg-slate-950">
            <button onClick={() => { onRemove(); onClose(); }} className="w-full py-3 border-2 border-red-300 text-red-600 rounded-xl font-medium hover:bg-red-50 flex items-center justify-center gap-2"><Trash2 size={18} /> Remover "{current.name}"</button>
          </div>
        )}
      </div>
    </div>
  );
};

const CommunityDetailModal = ({ itinerary, isOpen, onClose, onUse }) => {
  const [activeTab, setActiveTab] = useState('overview');
  if (!isOpen || !itinerary) return null;
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 rounded-full text-white transition-all"><X size={24} /></button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {itinerary.badges?.map((badge, i) => <span key={i} className="px-3 py-1 bg-slate-900/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">{badge}</span>)}
            </div>
            <h2 className="text-3xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 mt-1 flex items-center gap-2"><MapPin size={14} /> {itinerary.destination} • {itinerary.duration} dias</p>
          </div>
        </div>
        <div className="flex border-b border-slate-700">{['overview', 'itinerary', 'gallery', 'exchange'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 font-medium transition-all ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 bg-teal-50/50' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-950'}`}>{tab === 'overview' ? '📋 Visão Geral' : tab === 'itinerary' ? '📅 Roteiro' : tab === 'gallery' ? '📸 Galeria' : '💱 Câmbio'}</button>)}</div>
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-950 rounded-xl">
                <span className="text-4xl">{itinerary.author.avatar}</span>
                <div className="flex-1"><p className="font-semibold text-white">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={14} className="inline text-indigo-500" />}</p><p className="text-sm text-slate-500">{itinerary.travelers} viajantes</p></div>
                <div className="text-right"><div className="flex items-center gap-1"><Star size={20} className="text-amber-500 fill-amber-500" /><span className="text-2xl font-bold text-white">{itinerary.rating}</span></div><p className="text-xs text-slate-500">{itinerary.reviews} avaliações</p></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl text-center"><p className="text-2xl font-bold text-emerald-700">R$ {(itinerary.budget/1000).toFixed(0)}k</p><p className="text-xs text-emerald-600">Orçamento Total</p></div>
                <div className="p-4 bg-blue-50 rounded-xl text-center"><p className="text-2xl font-bold text-blue-700">{itinerary.duration}</p><p className="text-xs text-blue-600">Dias</p></div>
                <div className="p-4 bg-rose-50 rounded-xl text-center"><p className="text-2xl font-bold text-rose-700">{itinerary.likes.toLocaleString()}</p><p className="text-xs text-rose-600">Curtidas</p></div>
              </div>
              <div><h4 className="font-semibold text-white mb-3">✨ Destaques</h4><div className="flex flex-wrap gap-2">{itinerary.highlights.map((h, i) => <span key={i} className="px-3 py-1.5 bg-teal-100 text-teal-700 text-sm rounded-full font-medium">{h}</span>)}</div></div>
              {itinerary.comments?.length > 0 && <div><h4 className="font-semibold text-white mb-3">💬 Avaliações Recentes</h4><div className="space-y-3">{itinerary.comments.slice(0, 3).map(c => <div key={c.id} className="p-4 bg-slate-950 rounded-xl"><div className="flex items-center gap-2 mb-2"><span className="text-xl">{c.avatar}</span><span className="font-medium text-slate-200">{c.user}</span><div className="flex items-center gap-1 ml-auto">{Array(c.rating).fill(0).map((_, i) => <Star key={i} size={12} className="text-amber-500 fill-amber-500" />)}</div></div><p className="text-sm text-slate-300">{c.text}</p><p className="text-xs text-slate-400 mt-2">{c.date}</p></div>)}</div></div>}
            </div>
          )}
          {activeTab === 'itinerary' && itinerary.dailySchedule && <PremiumItineraryRenderer dailySchedule={itinerary.dailySchedule} destination={itinerary.destination} />}
          {activeTab === 'gallery' && destData?.galleryUrls && <MasonryGallery images={destData.galleryUrls} destination={itinerary.destination} />}
          {activeTab === 'exchange' && <PredictiveExchangeEngine origin="Brasil" destination={itinerary.destination} tripBudget={itinerary.budget} tripDate="2026-04-20" />}
        </div>
        <div className="p-4 border-t border-slate-700 bg-slate-950 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border-2 border-slate-300 text-slate-200 rounded-xl font-medium hover:bg-slate-100">Fechar</button>
          <button onClick={() => { onUse(itinerary); onClose(); }} className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg flex items-center justify-center gap-2"><Sparkles size={18} /> Usar este Roteiro</button>
        </div>
      </div>
    </div>
  );
};

// ========== v4.0: TIMELINE ACTIVITY CARD COM CHECKBOX E SINCRONIA ==========
const TimelineActivityCard = ({ item, onEdit, onRemove, showActions = true, isFirst = false, isLast = false, tripActive = false, isCompleted = false, onToggleComplete, onSetRealPrice, realPrice, origin, destination, startDate }) => {
  const [showPricePopover, setShowPricePopover] = useState(false);
  const [tempPrice, setTempPrice] = useState(realPrice || item.price || 0);
  const [showBookingLinks, setShowBookingLinks] = useState(false);
  
  const periodStyle = getPeriodStyle(item.period);
  const ItemIcon = getCategoryIcon(item);
  const isSpecialItem = ['flight', 'hotel', 'transfer', 'rest', 'checkout', 'daily-hotel'].includes(item.type);
  const isPayableItem = item.price !== undefined && item.price > 0;
  
  // v4.0: Gerar links de booking dinâmicos
  const bookingLinks = useMemo(() => {
    if (item.type === 'flight') return generateBookingLinks('flight', { origin, destination, startDate });
    if (item.type === 'hotel') return generateBookingLinks('hotel', { destination, startDate, hotelName: item.name });
    return generateBookingLinks('activity', { destination, activityName: item.name });
  }, [item, origin, destination, startDate]);
  
  // v4.0: Simulação de preço histórico
  const priceHistory = useMemo(() => {
    if (!item.price) return null;
    return simulatePriceHistory(item.price);
  }, [item.price]);
  
  const handleCompleteClick = () => {
    if (tripActive && isPayableItem) {
      setShowPricePopover(true);
    } else if (tripActive) {
      onToggleComplete && onToggleComplete();
    }
  };
  
  const handleSavePrice = () => {
    onSetRealPrice && onSetRealPrice(tempPrice);
    onToggleComplete && onToggleComplete();
    setShowPricePopover(false);
  };
  
  return (
    <div className="relative pl-10 pb-5 print-avoid-break group">
      <div className={`absolute left-[14px] top-0 ${isLast ? 'h-6' : 'h-full'} w-0.5 ${isFirst ? 'bg-gradient-to-b from-indigo-400 to-indigo-200' : 'bg-teal-200'}`} />
      
      {/* v4.0: Checkbox de conclusão no lugar do ponto */}
      {tripActive && isPayableItem ? (
        <button onClick={handleCompleteClick} className={`absolute left-[5px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center z-10 transition-all ${isCompleted ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-900 border-slate-300 hover:border-emerald-400'}`}>
          {isCompleted && <Check size={14} className="text-white" />}
        </button>
      ) : (
        <div className={`absolute left-[7px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-md ${periodStyle.dot} z-10 group-hover:scale-125 transition-transform`} />
      )}
      
      <div className={`ml-2 p-4 rounded-xl border transition-all ${isCompleted ? 'bg-emerald-50 border-emerald-300' : isSpecialItem ? 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-700' : `${periodStyle.bg} ${periodStyle.border}`} hover:shadow-lg group-hover:border-indigo-400`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${isCompleted ? 'bg-emerald-500' : isSpecialItem ? 'bg-slate-200' : `bg-gradient-to-br ${periodStyle.gradient}`} shadow-md`}>
            <ItemIcon size={20} className={isCompleted ? 'text-white' : isSpecialItem ? 'text-slate-300' : 'text-white'} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-semibold ${isCompleted ? 'text-emerald-700 line-through' : isSpecialItem ? 'text-slate-200' : 'text-white'}`}>{item.name}</h4>
              {item.rating && <span className="flex items-center gap-0.5 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full"><Star size={10} className="fill-amber-500" /> {item.rating}</span>}
              {isCompleted && <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">✓ Concluído</span>}
              {/* v4.0: Badge de menor preço */}
              {priceHistory?.isLowestPrice && !isCompleted && <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full flex items-center gap-1"><Flame size={10} /> Menor preço 30d</span>}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
              {item.location && <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>}
              {item.duration && !isSpecialItem && <span className="flex items-center gap-1"><Clock size={11} /> {item.duration}h</span>}
              {item.startTime && <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${periodStyle.bg} ${periodStyle.text}`}>{item.startTime}{item.endTime ? ` - ${item.endTime}` : ''}</span>}
            </div>
            
            {/* v4.0: Links de Booking Dinâmicos */}
            {!isCompleted && isPayableItem && (
              <div className="mt-2">
                <button onClick={() => setShowBookingLinks(!showBookingLinks)} className="text-xs text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
                  <ExternalLink size={12} /> {showBookingLinks ? 'Ocultar links' : 'Ver opções de reserva'}
                </button>
                {showBookingLinks && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {item.type === 'flight' && (
                      <>
                        <a href={bookingLinks.googleFlights} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all">Google Flights</a>
                        <a href={bookingLinks.skyscanner} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-cyan-100 text-cyan-700 rounded-full hover:bg-cyan-200 transition-all">Skyscanner</a>
                        <a href={bookingLinks.kayak} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-all">Kayak</a>
                      </>
                    )}
                    {item.type === 'hotel' && (
                      <>
                        <a href={bookingLinks.booking} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-all">Booking.com</a>
                        <a href={bookingLinks.hotels} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all">Hotels.com</a>
                        <a href={bookingLinks.airbnb} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded-full hover:bg-pink-200 transition-all">Airbnb</a>
                      </>
                    )}
                    {!['flight', 'hotel'].includes(item.type) && (
                      <>
                        <a href={bookingLinks.getYourGuide} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition-all">GetYourGuide</a>
                        <a href={bookingLinks.tripadvisor} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-all">TripAdvisor</a>
                        <a href={bookingLinks.viator} target="_blank" rel="noopener noreferrer" className="px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-all">Viator</a>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="text-right flex-shrink-0">
            {item.price !== undefined && (
              <div>
                {isCompleted && realPrice !== undefined ? (
                  <div>
                    <p className="font-bold text-emerald-600">R$ {realPrice.toLocaleString()}</p>
                    <p className="text-xs text-slate-400 line-through">R$ {item.price.toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="font-bold text-indigo-600">R$ {item.price.toLocaleString()}</p>
                )}
              </div>
            )}
            {!isSpecialItem && showActions && !tripActive && (
              <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity no-print">
                <button onClick={() => onEdit && onEdit(item)} className="p-1.5 bg-slate-100 hover:bg-indigo-100 rounded-lg text-slate-500 hover:text-indigo-600 transition-all" title="Trocar"><RefreshCw size={14} /></button>
                <button onClick={() => onRemove && onRemove()} className="p-1.5 bg-slate-100 hover:bg-red-100 rounded-lg text-slate-500 hover:text-red-500 transition-all" title="Remover"><Trash2 size={14} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* v4.0: Pop-over para inserir preço real */}
      {showPricePopover && (
        <div className="absolute left-12 top-full mt-2 z-50 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 p-4 w-64">
          <div className="flex items-center gap-2 mb-3">
            <DollarSign size={18} className="text-emerald-500" />
            <h4 className="font-bold text-white">Quanto você pagou?</h4>
          </div>
          <p className="text-xs text-slate-500 mb-2">Planejado: R$ {item.price?.toLocaleString()}</p>
          <input type="number" value={tempPrice} onChange={e => setTempPrice(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-lg font-bold text-center focus:outline-none focus:ring-2 focus:ring-emerald-500" placeholder="R$ 0" autoFocus />
          <div className="flex gap-2 mt-3">
            <button onClick={() => setShowPricePopover(false)} className="flex-1 py-2 text-sm bg-slate-100 text-slate-300 rounded-lg hover:bg-slate-200 transition-all">Cancelar</button>
            <button onClick={handleSavePrice} className="flex-1 py-2 text-sm bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all">Confirmar</button>
          </div>
          {tempPrice < item.price && <p className="text-xs text-emerald-600 mt-2 text-center">💰 Economia de R$ {(item.price - tempPrice).toLocaleString()}!</p>}
          {tempPrice > item.price && <p className="text-xs text-amber-600 mt-2 text-center">⚠️ R$ {(tempPrice - item.price).toLocaleString()} acima do planejado</p>}
        </div>
      )}
    </div>
  );
};

const TimelineDaySection = ({ day, dayNumber, totalDays, dateInfo, items, flight, hotel, origin, destination, totalPayingTravelers, arrivalInfo, returnTime, onEditItem, onAddItem, onRemoveItem, upgradeInsight, isArrivalDay, isRestDay, tripActive, completedItems, itemRealPrices, onItemComplete, startDate }) => {
  const isLastDay = dayNumber === totalDays;
  const sortedItems = [...items].sort((a, b) => TimeSlotEngine.timeToMinutes(a.startTime || '00:00') - TimeSlotEngine.timeToMinutes(b.startTime || '00:00'));
  const allDayItems = [];
  
  // Arrival Day Logic with Smart Blocking
  if (isArrivalDay && arrivalInfo) {
    allDayItems.push({ key: 'flight-arrival', item: { type: 'flight', name: `Chegada: ${flight?.name || 'Voo'}`, location: `${origin} → ${destination}`, price: flight?.price * totalPayingTravelers, startTime: arrivalInfo.time, period: TimeSlotEngine.getPeriodFromTime(arrivalInfo.time) }, showActions: false });
    allDayItems.push({ key: 'transfer', item: { type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: hotel?.location || 'Hotel', startTime: TimeSlotEngine.minutesToTime(arrivalInfo.arrivalMinutes + 60), endTime: TimeSlotEngine.minutesToTime(arrivalInfo.arrivalMinutes + 120), period: TimeSlotEngine.getPeriodFromTime(TimeSlotEngine.minutesToTime(arrivalInfo.arrivalMinutes + 60)) }, showActions: false });
    allDayItems.push({ key: 'hotel-checkin', item: { type: 'hotel', name: `Check-in: ${hotel?.name || 'Hotel'}`, location: hotel?.location, price: hotel?.price, startTime: hotel?.checkInTime || '15:00', period: 'tarde' }, showActions: false });
    
    // Smart Blocking: Rest period for long flights
    if (isRestDay) {
      allDayItems.push({ key: 'rest', item: { type: 'rest', name: '😴 Período de Descanso', location: 'Recuperação do Jet Lag', startTime: TimeSlotEngine.minutesToTime(Math.max(arrivalInfo.arrivalMinutes + 180, 900)), endTime: '20:00', period: 'tarde' }, showActions: false });
    }
  }
  
  // Regular day items - Smart Blocking: Filter out non-dinner items on rest days
  sortedItems.forEach((item, idx) => {
    if (isRestDay && item.category !== 'restaurant') return;
    if (isRestDay && item.period !== 'noite') return;
    allDayItems.push({ key: `item-${idx}`, item, onEdit: () => onEditItem(day, idx, item), onRemove: () => onRemoveItem(day, idx), showActions: true });
  });
  
  // Daily hotel card (non-arrival, non-last day)
  if (!isArrivalDay && !isLastDay && hotel) {
    allDayItems.unshift({ key: 'daily-hotel', item: { type: 'daily-hotel', name: hotel.name, location: hotel.location, startTime: '07:00', period: 'manhã' }, showActions: false });
  }
  
  // Last day checkout
  if (isLastDay && hotel) {
    allDayItems.unshift({ key: 'checkout', item: { type: 'checkout', name: `Check-out: ${hotel.name}`, location: hotel.location, startTime: hotel.checkOutTime || '11:00', period: 'manhã' }, showActions: false });
    allDayItems.push({ key: 'departure', item: { type: 'flight', name: `Voo de Retorno: ${flight?.name}`, location: `${destination} → ${origin}`, price: flight?.price * totalPayingTravelers, startTime: returnTime, period: TimeSlotEngine.getPeriodFromTime(returnTime) }, showActions: false });
  }
  
  // Sort all items
  allDayItems.sort((a, b) => TimeSlotEngine.timeToMinutes(a.item.startTime || '00:00') - TimeSlotEngine.timeToMinutes(b.item.startTime || '00:00'));

  return (
    <div className="mb-8 print-avoid-break">
      <div className={`sticky top-0 z-10 py-3 mb-4 border-b ${tripActive ? 'bg-slate-900/95 backdrop-blur-md border-slate-700' : 'bg-slate-900/95 backdrop-blur-md border-slate-800'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${tripActive ? 'bg-gradient-to-br from-emerald-500 to-cyan-500' : 'bg-gradient-to-br from-indigo-500 to-emerald-500'}`}><span className="text-white font-bold text-lg">{dayNumber}</span></div>
            <div><p className={`font-bold ${tripActive ? 'text-white' : 'text-white'}`}>{dateInfo.weekday}</p><p className={`text-sm ${tripActive ? 'text-slate-400' : 'text-slate-500'}`}>{dateInfo.day}/{dateInfo.month}/{dateInfo.year}</p></div>
          </div>
          {isRestDay && <span className="ml-auto px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Bed size={12} /> Dia de Recuperação — Apenas Jantar</span>}
          {isLastDay && <span className="ml-auto px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Último Dia</span>}
          {tripActive && <span className="ml-auto px-3 py-1.5 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30 flex items-center gap-1"><Play size={10} /> VIAGEM ATIVA</span>}
        </div>
      </div>
      <div className="relative">
        {upgradeInsight && <div className="mb-4"><AIInsightCard insight={upgradeInsight} onAction={() => {}} /></div>}
        {allDayItems.map((entry, idx) => (
          <TimelineActivityCard 
            key={entry.key} 
            item={entry.item} 
            onEdit={entry.onEdit} 
            onRemove={entry.onRemove} 
            showActions={entry.showActions} 
            isFirst={idx === 0} 
            isLast={idx === allDayItems.length - 1}
            tripActive={tripActive}
            isCompleted={completedItems?.[`${day}-${entry.key}`] || false}
            realPrice={itemRealPrices?.[`${day}-${entry.key}`]}
            onToggleComplete={() => onItemComplete && onItemComplete(day, entry.key, entry.item.price)}
            onSetRealPrice={(price) => onItemComplete && onItemComplete(day, entry.key, price)}
            origin={origin}
            destination={destination}
            startDate={startDate}
          />
        ))}
        {!isRestDay && <div className="relative pl-10 pb-4"><div className="absolute left-[14px] top-0 h-8 w-0.5 bg-gradient-to-b from-indigo-200 to-transparent" /><button onClick={() => onAddItem && onAddItem(day)} className="ml-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 no-print hover:shadow-md"><Plus size={18} /> Adicionar Atividade</button></div>}
      </div>
    </div>
  );
};

const CommunityCard = ({ itinerary, onUse, onLike, onViewDetails, isLiked, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura' };
  
  if (compact) {
    return (
      <div className="bg-slate-900/80 backdrop-blur-md rounded-xl border border-white/50 p-3 hover:shadow-xl transition-all cursor-pointer group hover:bg-slate-900/90" onClick={() => onViewDetails && onViewDetails(itinerary)} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
          <div className="flex-1 min-w-0"><h4 className="font-semibold text-sm text-white truncate group-hover:text-indigo-600 transition-colors">{itinerary.title}</h4><p className="text-xs text-slate-500">{itinerary.duration} dias • R$ {(itinerary.budget/1000).toFixed(0)}k</p></div>
          <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all group" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
      <div className="relative h-44 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {itinerary.featured && <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1"><Crown size={10} /> DESTAQUE</span>}
          {itinerary.badges?.slice(0, 1).map((badge, i) => <span key={i} className="px-2.5 py-1 bg-slate-900/90 backdrop-blur-sm text-slate-200 text-[10px] font-semibold rounded-full shadow-md">{badge}</span>)}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onLike && onLike(itinerary.id); }} className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${isLiked ? 'bg-rose-500 text-white scale-110' : 'bg-slate-900/20 text-white hover:bg-slate-900/40 hover:scale-110'}`}><Heart size={18} className={isLiked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{itinerary.title}</h3><p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p></div>
      </div>
      <div className="p-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{itinerary.author.avatar}</span>
          <div className="flex-1"><p className="text-xs font-medium text-slate-200">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-indigo-500" />}</p><p className="text-[10px] text-slate-400">{itinerary.duration} dias • R$ {itinerary.budget.toLocaleString()}</p></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full border border-amber-200"><Star size={14} className="text-amber-500 fill-amber-500" /><span className="text-sm font-bold text-amber-700">{itinerary.rating}</span></div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">{itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100/80 text-slate-300 text-[10px] rounded-full backdrop-blur-sm">{typeLabels[t] || t}</span>)}</div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-700/50">
          <div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />{itinerary.likes.toLocaleString()}</span><span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.reviews}</span></div>
          <button onClick={() => onViewDetails && onViewDetails(itinerary)} className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 px-3 py-1.5 bg-teal-50 rounded-lg hover:bg-indigo-100 transition-all"><Eye size={14} /> Ver Detalhes</button>
        </div>
      </div>
    </div>
  );
};

const ProfilePage = ({ user, setUser, userProfile, setUserProfile, onBack }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [tempUser, setTempUser] = useState(user);
  const [tempProfile, setTempProfile] = useState(userProfile);
  const toggleType = (typeId) => { if ((tempProfile.types || []).includes(typeId)) setTempProfile({ ...tempProfile, types: (tempProfile.types || []).filter(t => t !== typeId) }); else if ((tempProfile.types || []).length < 3) setTempProfile({ ...tempProfile, types: [...(tempProfile.types || []), typeId] }); };
  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-300 hover:text-indigo-600 transition-all"><ChevronUp className="rotate-[-90deg]" size={20} /> Voltar</button>
      <div className="bg-gradient-to-br from-indigo-600 to-emerald-600 rounded-2xl p-8 text-white text-center mb-6 shadow-xl"><div className="w-24 h-24 bg-slate-900/20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">{user.avatar}</div><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-teal-100">{user.email}</p><div className="mt-4 flex justify-center gap-8"><div><p className="text-2xl font-bold">{user.trips}</p><p className="text-xs text-teal-200">Viagens</p></div><div><p className="text-2xl font-bold">{user.joinDate}</p><p className="text-xs text-teal-200">Membro desde</p></div></div></div>
      <div className="flex gap-2 mb-6">{['info', 'profile', 'trips', 'saved'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 rounded-xl font-medium transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}>{tab === 'info' ? 'Informações' : tab === 'profile' ? 'Perfil' : tab === 'trips' ? 'Viagens' : 'Salvos'}</button>)}</div>
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-sm">
        {activeTab === 'info' && <div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-white">Informações Pessoais</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium transition-all">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all">Salvar</button>}</div><div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-slate-500 block mb-1">Nome</label><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-950 border rounded-xl disabled:opacity-70 transition-all" /></div><div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-950 border rounded-xl disabled:opacity-70 transition-all" /></div></div></div>}
        {activeTab === 'profile' && <div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-white">Perfil do Viajante</h2>{!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-medium transition-all">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all">Salvar</button>}</div><h3 className="font-semibold text-slate-200 mb-2">Estilos de viagem <span className="text-xs text-slate-400">(até 3)</span></h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => { const isSelected = (tempProfile.types || []).includes(type.id); return <button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all hover:scale-105 ${isSelected ? 'border-indigo-500 bg-teal-50 shadow-md' : 'border-slate-700 hover:border-slate-300'} ${!editing && 'opacity-70'}`}><type.icon size={28} className={isSelected ? 'text-indigo-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="font-medium text-sm mt-2">{type.name}</p>{isSelected && <span className="text-[10px] text-indigo-600 font-semibold">✓</span>}</button>; })}</div><h3 className="font-semibold text-slate-200 mb-3">Interesses</h3><div className="flex flex-wrap gap-2">{INTEREST_TAGS.map(tag => <button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${tempProfile.interests?.includes(tag) ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-300 hover:bg-slate-200'}`}>{tag}</button>)}</div></div>}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-white mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500">Suas viagens aparecerão aqui</p></div>}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-white mb-2">Nada salvo</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
      </div>
    </div>
  );
};

// ========== MAIN APP ==========
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
  const [tripPriorities, setTripPriorities] = useState([]);
  const [likedItineraries, setLikedItineraries] = useState([]);
  const [showPriorityPanel, setShowPriorityPanel] = useState(false);
  const [activityModal, setActivityModal] = useState({ isOpen: false, day: null, idx: null, current: null, mode: 'add' });
  const [communityDetailModal, setCommunityDetailModal] = useState({ isOpen: false, itinerary: null });
  const [itineraryTab, setItineraryTab] = useState('timeline');
  
  // ========== v4.0: NOVOS ESTADOS ==========
  const [showConcierge, setShowConcierge] = useState(false);
  const [tripActive, setTripActive] = useState(false);
  const [realExpenses, setRealExpenses] = useState({});
  const [packingCheckedItems, setPackingCheckedItems] = useState({});
  const packingList = useMemo(() => generatePackingList(destination, tripPriorities), [destination, tripPriorities]);
  
  // ========== v4.0: KINU ESTADOS ==========
  const [isDark, setIsDark] = useState(false);
  const [completedItems, setCompletedItems] = useState({});
  const [itemRealPrices, setItemRealPrices] = useState({});
  const [currentDay, setCurrentDay] = useState(1);
  
  const updateRealExpense = useCallback((category, value) => {
    setRealExpenses(prev => ({ ...prev, [category]: value }));
  }, []);
  
  // v4.0: Sincronizar gastos reais quando item é completado
  const handleItemComplete = useCallback((dayNum, itemKey, realPrice) => {
    const key = `${dayNum}-${itemKey}`;
    setCompletedItems(prev => ({ ...prev, [key]: true }));
    if (realPrice !== undefined) {
      setItemRealPrices(prev => ({ ...prev, [key]: realPrice }));
      // Atualizar realExpenses baseado no tipo do item
      const item = daySchedule[dayNum]?.find((_, idx) => `item-${idx}` === itemKey || itemKey.includes(idx));
      if (item) {
        const category = item.type === 'flight' ? 'flights' : item.type === 'hotel' ? 'hotels' : item.category === 'restaurant' ? 'food' : 'activities';
        setRealExpenses(prev => ({ ...prev, [category]: (prev[category] || 0) + realPrice }));
      }
    }
  }, [daySchedule]);
  
  // v4.0: Remover atividades da tarde (para o Concierge)
  const handleRemoveAfternoonActivities = useCallback((dayNum) => {
    const newSchedule = { ...daySchedule };
    if (newSchedule[dayNum]) {
      newSchedule[dayNum] = newSchedule[dayNum].filter(item => {
        const itemMinutes = TimeSlotEngine.timeToMinutes(item.startTime || '00:00');
        return itemMinutes < 720 || itemMinutes >= 1080; // Manter manhã (<12h) e noite (>=18h)
      });
    }
    setDaySchedule(newSchedule);
  }, [daySchedule]);

  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;
  const arrivalInfo = useMemo(() => { if (!destination || !selectedFlight) return null; return calculateArrival(origin, destination, outboundDepartureTime, selectedFlight.duration, startDate); }, [origin, destination, outboundDepartureTime, selectedFlight, startDate]);
  const actualStartDate = useMemo(() => arrivalInfo?.actualArrivalDate || startDate, [arrivalInfo, startDate]);
  const tripDays = useMemo(() => { const start = new Date(actualStartDate + 'T12:00:00'); const end = new Date(endDate + 'T12:00:00'); return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1); }, [actualStartDate, endDate]);
  const costs = useMemo(() => { if (!itineraryGenerated) return { flights: 0, hotels: 0, activities: 0, food: 0, total: 0, percentages: {} }; const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers * 2; const hotelCost = (selectedHotel?.price || 0) * tripDays; let activitiesCost = 0, foodCost = 0; Object.values(daySchedule).forEach(day => { day.forEach(item => { if (item.category === 'restaurant') foodCost += (item.price || 0); else activitiesCost += (item.price || 0); }); }); const total = flightCost + hotelCost + (activitiesCost + foodCost) * totalPayingTravelers; return { flights: flightCost, hotels: hotelCost, activities: activitiesCost * totalPayingTravelers, food: foodCost * totalPayingTravelers, total, percentages: total > 0 ? { flights: Math.round((flightCost / total) * 100), hotels: Math.round((hotelCost / total) * 100), activities: Math.round(((activitiesCost * totalPayingTravelers) / total) * 100), food: Math.round(((foodCost * totalPayingTravelers) / total) * 100) } : {} }; }, [selectedFlight, selectedHotel, daySchedule, tripDays, totalPayingTravelers, itineraryGenerated]);
  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  const handleInsightAction = (insight) => { if (!currentData) return; if (insight.actionType === 'upgrade_hotel') { const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays && h.id !== selectedHotel?.id); if (betterHotel) setSelectedHotel(betterHotel); } else if (insight.actionType === 'downgrade_hotel') { const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0); if (cheaperHotel) setSelectedHotel(cheaperHotel); } else if (insight.actionType === 'downgrade_flight') { const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price); if (cheaperFlight) setSelectedFlight(cheaperFlight); } };
  const insights = useMemo(() => { if (!itineraryGenerated || !currentData) return []; const list = []; const userTypes = userProfile.types || []; const prioritizesComfort = tripPriorities.includes('comfort') || userTypes.includes('luxury'); if (isOverBudget) { const deficit = Math.abs(remaining); if (!prioritizesComfort) { const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0); if (cheaperHotel) { const savings = (selectedHotel.price - cheaperHotel.price) * tripDays; list.push({ type: 'downgrade', icon: ArrowDownCircle, title: '⬇️ Downgrade de Hotel', message: `Troque ${selectedHotel.name} por ${cheaperHotel.name}`, savings, action: 'Aplicar', actionType: 'downgrade_hotel' }); } } const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price); if (cheaperFlight) { const savings = (selectedFlight.price - cheaperFlight.price) * totalPayingTravelers * 2; list.push({ type: 'downgrade', icon: ArrowDownCircle, title: '⬇️ Voo Econômico', message: `${cheaperFlight.name} disponível`, savings, action: 'Trocar', actionType: 'downgrade_flight' }); } list.push({ type: 'danger', icon: AlertTriangle, title: '⚠️ Orçamento Excedido!', message: `R$ ${deficit.toLocaleString()} acima do limite` }); } if (!isOverBudget && remaining > totalBudget * 0.10) { const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price > selectedHotel?.price && (h.price - selectedHotel?.price) * tripDays <= remaining && h.id !== selectedHotel?.id); if (betterHotel) { const cost = (betterHotel.price - selectedHotel.price) * tripDays; list.push({ type: 'upgrade', icon: ArrowUpCircle, title: '✨ Upgrade Disponível!', message: `${betterHotel.name} (${betterHotel.stars}★)`, cost, action: 'Fazer Upgrade', actionType: 'upgrade_hotel' }); } } if (currentData.tip) list.push({ type: 'tip', icon: Lightbulb, title: '💡 Dica Local', message: currentData.tip }); if (arrivalInfo?.requiresRest) list.push({ type: 'info', icon: Clock, title: '😴 Voo Longo Detectado', message: `${arrivalInfo.flightHours}h de voo. Dia 1 reservado para descanso.` }); return list; }, [itineraryGenerated, currentData, isOverBudget, remaining, selectedHotel, selectedFlight, tripDays, totalPayingTravelers, totalBudget, arrivalInfo, tripPriorities, userProfile]);
  const upgradeInsight = useMemo(() => insights.find(i => i.type === 'upgrade'), [insights]);
  const filteredCommunity = useMemo(() => COMMUNITY_ITINERARIES.filter(i => { if (communityFilter.destination !== 'all' && i.destination !== communityFilter.destination) return false; if (communityFilter.type !== 'all' && !i.tags.includes(communityFilter.type)) return false; return true; }), [communityFilter]);

  const togglePriority = (id) => { if (tripPriorities.includes(id)) setTripPriorities(tripPriorities.filter(p => p !== id)); else if (tripPriorities.length < 3) setTripPriorities([...tripPriorities, id]); };
  const toggleLike = (id) => { if (likedItineraries.includes(id)) setLikedItineraries(likedItineraries.filter(i => i !== id)); else setLikedItineraries([...likedItineraries, id]); };
  const handleEditItem = (day, idx, item) => setActivityModal({ isOpen: true, day, idx, current: item, mode: 'swap' });
  const handleAddItem = (day) => setActivityModal({ isOpen: true, day, idx: null, current: null, mode: 'add' });
  const handleRemoveItem = (day, idx) => { const newSchedule = { ...daySchedule }; newSchedule[day] = newSchedule[day].filter((_, i) => i !== idx); setDaySchedule(newSchedule); };
  const handleSelectActivity = (activity) => { const { day, idx, mode } = activityModal; const newSchedule = { ...daySchedule }; if (mode === 'swap' && idx !== null) newSchedule[day][idx] = activity; else newSchedule[day] = [...(newSchedule[day] || []), activity]; setDaySchedule(newSchedule); };

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
      const scoreActivity = (act) => { let score = act.rating * 10; const userTypes = userProfile.types || []; if (userTypes.includes('beach') && act.tags?.includes('beach')) score += 30; if (userTypes.includes('gastro') && act.tags?.includes('gastro')) score += 30; if (userTypes.includes('culture') && (act.tags?.includes('culture') || act.tags?.includes('history'))) score += 30; if (userTypes.includes('adventure') && act.tags?.includes('adventure')) score += 30; if (tripPriorities.includes('gastronomy') && act.tags?.includes('gastro')) score += 50; if (tripPriorities.includes('beaches') && act.tags?.includes('beach')) score += 50; if (tripPriorities.includes('culture') && act.tags?.includes('culture')) score += 50; if (children > 0 && !act.childFriendly) score -= 20; if (children > 0 && act.childFriendly) score += 15; return score; };
      const sortedActivities = [...data.activities].sort((a, b) => scoreActivity(b) - scoreActivity(a));
      const restaurants = [...data.restaurants].sort((a, b) => b.rating - a.rating);
      let schedule = {};
      const usedActivities = new Set();
      const usedRestaurants = new Set();
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        if (d === 1 && arrival.requiresRest) {
          const dinnerRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && r.period === 'noite');
          if (dinnerRestaurant) { usedRestaurants.add(dinnerRestaurant.id); schedule[d].push({ ...dinnerRestaurant, category: 'restaurant', location: dinnerRestaurant.cuisine, startTime: '20:30', endTime: TimeSlotEngine.calculateEndTime('20:30', dinnerRestaurant.duration || 1.5), period: 'noite' }); }
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
          if (currentTimeMinutes + (act.duration * 60) > 1320) continue;
          const startTime = TimeSlotEngine.minutesToTime(currentTimeMinutes);
          const endTime = TimeSlotEngine.calculateEndTime(startTime, act.duration);
          const period = TimeSlotEngine.getPeriodFromTime(startTime);
          usedActivities.add(act.id);
          schedule[d].push({ ...act, category: 'activity', startTime, endTime, period });
          activitiesAdded++;
          currentTimeMinutes = TimeSlotEngine.timeToMinutes(endTime) + 30;
          if (currentTimeMinutes >= 720 && currentTimeMinutes < 840 && !schedule[d].some(i => i.startTime?.startsWith('12') || i.startTime?.startsWith('13'))) {
            const lunchRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && (r.period === 'tarde' || r.period === 'manhã'));
            if (lunchRestaurant) { usedRestaurants.add(lunchRestaurant.id); schedule[d].push({ ...lunchRestaurant, category: 'restaurant', location: lunchRestaurant.cuisine, startTime: '12:30', endTime: TimeSlotEngine.calculateEndTime('12:30', lunchRestaurant.duration || 1), period: 'tarde' }); currentTimeMinutes = TimeSlotEngine.timeToMinutes('14:00'); }
          }
        }
        if (!isLastDay && !schedule[d].some(i => i.category === 'restaurant' && i.period === 'noite')) {
          const dinnerRestaurant = restaurants.find(r => !usedRestaurants.has(r.id) && r.period === 'noite');
          if (dinnerRestaurant) { usedRestaurants.add(dinnerRestaurant.id); schedule[d].push({ ...dinnerRestaurant, category: 'restaurant', location: dinnerRestaurant.cuisine, startTime: '20:00', endTime: TimeSlotEngine.calculateEndTime('20:00', dinnerRestaurant.duration || 1.5), period: 'noite' }); }
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
  const handlePrint = () => { const style = document.createElement('style'); style.textContent = printStyles + `.exchange-section { page-break-before: always; } .exchange-chart { max-height: 150px; }`; document.head.appendChild(style); window.print(); setTimeout(() => document.head.removeChild(style), 1000); };

  // ========== LANDING PAGE ==========
  if (!user || currentView === 'landing') {
    return (
      <div className="min-h-screen bg-slate-950">
        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        </div>
        {/* KINU Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 text-white text-center py-2.5 px-4 text-sm font-bold relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
          <span className="relative">🔮 KINU v1.0 — Sua jornada, nossa inteligência coletiva. Sabedoria de milhares de viajantes ao seu dispor.</span>
        </div>
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
                  <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 transition-all"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>
                </>
              ) : (
                <button onClick={() => setShowAuthModal(true)} className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/30 font-medium transition-all">Entrar no Clã</button>
              )}
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full text-indigo-300 text-sm font-semibold mb-6 backdrop-blur-sm">
            <Sparkles size={16} className="text-indigo-400" /> Sabedoria Coletiva • Conhecimento Validado 
            <span className="ml-2 px-2 py-0.5 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white text-xs rounded-full font-bold">+10K ROTEIROS</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Milhares viajaram.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Você herda a sabedoria.</span></h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8">O KINU une a <strong className="text-indigo-400">inteligência coletiva</strong> de milhares de viajantes com <strong className="text-emerald-400">engenharia de precisão</strong>. Cada roteiro é conhecimento validado pelo clã.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => { if (!user) setShowAuthModal(true); else setCurrentView('planner'); }} className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-indigo-600 to-emerald-500 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all flex items-center gap-2 hover:scale-105"><Sparkles size={24} /> Iniciar Jornada</button>
            <button onClick={() => setCurrentView('community')} className="px-8 py-4 border-2 border-slate-600 text-slate-300 rounded-xl font-bold text-lg hover:border-emerald-500 hover:text-emerald-400 transition-all hover:scale-105">Explorar o Clã</button>
          </div>
        </div>
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
              <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-4 border border-slate-700 hover:border-emerald-500/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 transition-all hover:scale-105 group text-center">
                <div className={`w-12 h-12 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform shadow-lg`}><f.icon size={24} className="text-white" /></div>
                <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                <p className="text-slate-400 text-xs">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Destinos Populares</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(DESTINATIONS_DATABASE).map(([name, dest]) => (
              <div key={name} onClick={() => { setDestination(name); setCurrentView('planner'); if (!user) setShowAuthModal(true); }} className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group border border-slate-700 hover:border-emerald-500/50 transition-all">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${dest.coverUrl})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white font-bold text-lg">{name.split(',')[0]}</p>
                  <p className="text-slate-300 text-sm">{dest.continent}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setCurrentView('planner'); }} />
      </div>
    );
  }

  // ========== COMMUNITY PAGE ==========
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-slate-950">
        <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-700 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><KinuLogo size={28} /><span className="text-xl font-bold text-white">KINU</span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-300 hover:text-indigo-400 font-medium">Planejar</button><button className="text-indigo-400 font-medium">Clã</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div></div></nav>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8"><h1 className="text-3xl font-bold text-white">Conhecimento do Clã</h1><p className="text-slate-300 mt-2">Descubra Roteiros validados por milhares de viajantes. Herde a sabedoria.</p></div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <select value={communityFilter.destination} onChange={e => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-900"><option value="all">Todos os destinos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select>
            <select value={communityFilter.type} onChange={e => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 border border-slate-700 rounded-lg bg-slate-900"><option value="all">Todos os tipos</option>{['romantic', 'family', 'budget', 'luxury', 'culture', 'beach', 'adventure'].map(t => <option key={t} value={t}>{t}</option>)}</select>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} />)}</div>
        </div>
        <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
      </div>
    );
  }

  // ========== PROFILE PAGE ==========
  if (currentView === 'profile' && user) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
        <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><KinuLogo size={28} /><span className="text-xl font-bold text-white">KINU</span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-400 hover:text-indigo-400 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-400 hover:text-indigo-400 font-medium">Clã</button><button onClick={() => { setUser(null); setCurrentView('landing'); }} className="text-red-400 hover:text-red-300 font-medium flex items-center gap-1"><LogOut size={18} /> Sair</button></div></div></nav>
        <div className="relative max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onBack={() => setCurrentView('planner')} /></div>
      </div>
    );
  }

  // ========== PLANNER PAGE ==========
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-600/5 rounded-full blur-3xl" />
      </div>
      {/* KINU Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-emerald-600 text-white text-center py-2 px-4 text-sm font-bold no-print">
        🔮 KINU v1.0 | Sabedoria do Clã • Motor de Câmbio Preditivo • Concierge KINU • Malas 3D ⚡
      </div>
      <nav className="bg-slate-950/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 no-print"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><KinuLogo size={28} /><span className="text-xl font-bold text-white">KINU</span><span className="text-xs px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-full font-bold ml-2">v1.0</span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-indigo-400 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-400 hover:text-indigo-400 font-medium">Clã</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600 to-emerald-600 text-white rounded-lg hover:shadow-lg hover:shadow-indigo-500/20"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div></div></nav>
      <div className="relative max-w-7xl mx-auto px-4 py-8">
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 mb-8 shadow-xl no-print">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><PlaneTakeoff size={14} /> Origem</label><select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><PlaneLanding size={14} /> Destino</label><select value={destination} onChange={e => { setDestination(e.target.value); setItineraryGenerated(false); }} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl"><option value="">Selecione...</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Calendar size={14} /> Datas</label><div className="flex gap-2"><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm" /><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-950 border border-slate-700 rounded-xl text-sm" /></div></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Users size={14} /> Viajantes</label><div className="flex gap-2"><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl"><button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{adults} adultos</span><button onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl"><button onClick={() => { setChildren(Math.max(0, children - 1)); setChildrenAges(childrenAges.slice(0, -1)); }} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{children} crian.</span><button onClick={() => { setChildren(children + 1); setChildrenAges([...childrenAges, 5]); }} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div></div></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-800">
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Wallet size={14} /> Orçamento Total</label><input type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Ida</label><input type="time" value={outboundDepartureTime} onChange={e => setOutboundDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Volta</label><input type="time" value={returnDepartureTime} onChange={e => setReturnDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-300 block mb-2 flex items-center gap-1"><Sliders size={14} /> Prioridades</label><button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-left flex items-center justify-between"><span className="text-sm">{tripPriorities.length > 0 ? `${tripPriorities.length} selecionadas` : 'Selecionar...'}</span>{showPriorityPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div>
          </div>
          {showPriorityPanel && <div className="mb-6 p-4 bg-slate-950 rounded-xl"><p className="text-sm text-slate-300 mb-3">Selecione até 3 prioridades:</p><div className="flex flex-wrap gap-2">{TRIP_PRIORITIES.map(p => <button key={p.id} onClick={() => togglePriority(p.id)} className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${tripPriorities.includes(p.id) ? 'bg-indigo-600 text-white' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><p.icon size={16} /> {p.name}</button>)}</div></div>}
          <button onClick={generateItinerary} disabled={!destination || isGenerating} className={`w-full py-4 font-bold rounded-xl text-white flex items-center justify-center gap-2 shadow-lg transition-all ${!destination ? 'bg-slate-300 cursor-not-allowed' : isGenerating ? 'bg-indigo-400' : 'bg-gradient-to-r from-indigo-600 to-emerald-600 hover:shadow-indigo-500/30 hover:scale-[1.02]'}`}>{isGenerating ? <><RefreshCw size={20} className="animate-spin" /> Gerando roteiro...</> : <><Sparkles size={20} /> Gerar Roteiro com Sabedoria do Clã</>}</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 main-content">
            {itineraryGenerated && (
              <div className="space-y-6">
                <div className="flex gap-2 mb-4 no-print flex-wrap">
                  <button onClick={() => setItineraryTab('timeline')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'timeline' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><Calendar size={18} /> Timeline</button>
                  <button onClick={() => setItineraryTab('guide')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'guide' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><BookOpen size={18} /> Guia</button>
                  <button onClick={() => setItineraryTab('exchange')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'exchange' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><Banknote size={18} /> Câmbio</button>
                  <button onClick={() => setItineraryTab('extras')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'extras' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><Luggage size={18} /> Malas</button>
                  <button onClick={() => setItineraryTab('gestao')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'gestao' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-900 border border-slate-700 hover:border-indigo-400'}`}><Receipt size={18} /> Gestão</button>
                </div>
                
                {/* Relógio Local Dinâmico */}
                <div className="mb-4">
                  <DynamicLocalClock origin={origin} destination={destination} />
                </div>
                
                {itineraryTab === 'timeline' && (
                  <>
                    {arrivalInfo && <div className={`arrival-banner rounded-2xl p-5 flex items-center gap-4 shadow-lg print-avoid-break ${arrivalInfo.isOvernightFlight ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'}`}><div className={`p-4 rounded-xl ${arrivalInfo.isOvernightFlight ? 'bg-orange-600/30' : 'bg-blue-600/30'}`}>{arrivalInfo.isOvernightFlight ? <Moon size={32} /> : <PlaneLanding size={32} />}</div><div className="flex-1"><p className="font-bold text-lg flex items-center gap-2">Chegada às {arrivalInfo.time}<span className="text-sm font-normal opacity-90">(horário local de {destination?.split(',')[0]})</span>{arrivalInfo.dayLabel && <span className="ml-2 px-3 py-1 bg-slate-900/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">{arrivalInfo.dayLabel}</span>}</p><p className="text-sm opacity-90 mt-1">Fuso: {arrivalInfo.timezoneDiff > 0 ? '+' : ''}{arrivalInfo.timezoneDiff}h • Duração: {arrivalInfo.flightHours}h{arrivalInfo.requiresRest && <span className="ml-3 inline-flex items-center gap-1"><Bed size={14} /><span className="font-medium">Dia 1 reservado para recuperação</span></span>}</p></div></div>}
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-sm">
                      {Array.from({ length: tripDays }, (_, i) => i + 1).map(dayNum => {
                        const dateInfo = formatDateFull(actualStartDate, dayNum - 1);
                        const isRestDay = dayNum === 1 && arrivalInfo?.requiresRest;
                        return <TimelineDaySection key={dayNum} day={dayNum} dayNumber={dayNum} totalDays={tripDays} dateInfo={dateInfo} items={daySchedule[dayNum] || []} flight={selectedFlight} hotel={selectedHotel} origin={origin} destination={destination} totalPayingTravelers={totalPayingTravelers} arrivalInfo={arrivalInfo} returnTime={returnDepartureTime} onEditItem={handleEditItem} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} upgradeInsight={dayNum === 1 ? upgradeInsight : null} isArrivalDay={dayNum === 1} isRestDay={isRestDay} tripActive={tripActive} completedItems={completedItems} itemRealPrices={itemRealPrices} onItemComplete={handleItemComplete} startDate={startDate} />;
                      })}
                    </div>
                  </>
                )}
                
                {itineraryTab === 'guide' && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-700 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-xl shadow-lg"><Globe size={24} className="text-white" /></div><div><h2 className="text-xl font-bold text-white">Guia do Destino</h2><p className="text-sm text-slate-500">{destination}</p></div></div>
                    <DestinationGuide destination={destination} />
                  </div>
                )}
                
                {itineraryTab === 'exchange' && <div className="exchange-section"><PredictiveExchangeEngine origin={origin} destination={destination} tripBudget={totalBudget} tripDate={startDate} /></div>}
                
                {itineraryTab === 'extras' && (
                  <div className="space-y-6">
                    <VirtualSuitcaseOptimizer destination={destination} tripPriorities={tripPriorities} tripDays={tripDays} adults={adults} children={children} checkedItems={packingCheckedItems} packingList={packingList} />
                    <SmartPackingList destination={destination} tripPriorities={tripPriorities} startDate={startDate} />
                    <EssentialLanguageModule destination={destination} />
                  </div>
                )}
                
                {itineraryTab === 'gestao' && (
                  <div className="space-y-6">
                    <TripExecutionDashboard plannedCosts={costs} isActive={tripActive} onToggleActive={() => setTripActive(!tripActive)} realExpenses={realExpenses} onUpdateExpense={updateRealExpense} />
                  </div>
                )}
              </div>
            )}
            {!destination && <div className="bg-slate-900 rounded-2xl border border-slate-700 p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold text-white mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer ir</p></div>}
          </div>

          <div className="space-y-6 no-print sidebar-print">
            <div className={`bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-6 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString()}</div>
              {itineraryGenerated && (
                <>
                  <BudgetSpeedometer total={totalBudget} spent={costs.total} isOverBudget={isOverBudget} />
                  <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-slate-900/20'}`}>
                    {isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString()}` : `Disponível: R$ ${remaining.toLocaleString()}`}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos</span><span>R$ {costs.flights.toLocaleString()} ({costs.percentages.flights || 0}%)</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel</span><span>R$ {costs.hotels.toLocaleString()} ({costs.percentages.hotels || 0}%)</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString()} ({costs.percentages.activities || 0}%)</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString()} ({costs.percentages.food || 0}%)</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString()}</span></div>
                  </div>
                </>
              )}
            </div>
            {itineraryGenerated && insights.length > 0 && <div className="bg-slate-900 rounded-2xl border border-slate-700 p-4 shadow-sm"><h3 className="font-bold text-white mb-3 flex items-center gap-2"><Sparkles size={18} className="text-indigo-600" /> Insights da IA</h3><div className="space-y-3">{insights.map((insight, i) => <AIInsightCard key={i} insight={insight} onAction={handleInsightAction} />)}</div></div>}
            {destination && <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl border border-slate-700 p-4 shadow-sm"><h3 className="font-bold text-white mb-3 flex items-center gap-2"><Crown size={18} className="text-amber-500" /> Top Roteiros - {destination.split(',')[0]}</h3><div className="space-y-2">{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} compact />)}{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda</p>}</div></div>}
            {itineraryGenerated && <button onClick={handlePrint} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30 hover:scale-[1.02]'}`}>{isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF Completo</>}</button>}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      <ActivityModal isOpen={activityModal.isOpen} onClose={() => setActivityModal({ isOpen: false, day: null, idx: null, current: null, mode: 'add' })} activities={currentData?.activities || []} restaurants={currentData?.restaurants || []} current={activityModal.current} mode={activityModal.mode} dayNum={activityModal.day} onSelect={handleSelectActivity} onRemove={() => activityModal.day && activityModal.idx !== null && handleRemoveItem(activityModal.day, activityModal.idx)} />
      <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
      
      {/* v4.0: AI Concierge Chat Pro */}
      <AIConcierge 
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
      
      {/* KINU: Botão Flutuante Concierge */}
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
