import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Mountain, Building, Palmtree, Crown, PlaneTakeoff, PlaneLanding, MessageSquare, Copy, Download, Anchor, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Edit3, Trash2, ArrowUpCircle, ArrowDownCircle, Eye, Send, Baby, UserCheck, Replace, PlusCircle } from 'lucide-react';

// ========== CONSTANTS ==========
const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)'];

const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain },
  { id: 'culture', name: 'Cultural', icon: Building },
  { id: 'beach', name: 'Praia', icon: Palmtree },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils },
  { id: 'family', name: 'Família', icon: Users },
  { id: 'romantic', name: 'Romântico', icon: Heart },
  { id: 'budget', name: 'Econômico', icon: Wallet },
  { id: 'luxury', name: 'Luxo', icon: Crown },
];

const TRIP_PRIORITIES = [
  { id: 'gastronomy', name: 'Gastronomia', icon: Utensils },
  { id: 'beaches', name: 'Praias', icon: Anchor },
  { id: 'culture', name: 'Cultura', icon: Building },
  { id: 'adventure', name: 'Aventura', icon: Mountain },
  { id: 'relaxation', name: 'Relaxamento', icon: Sparkles },
  { id: 'kids', name: 'Crianças', icon: Baby },
  { id: 'nightlife', name: 'Vida Noturna', icon: Music },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag },
];

const FLIGHT_DATA = {
  'Paris, França': { hours: 11.5, timezone: '+4h' },
  'Miami, EUA': { hours: 8, timezone: '+2h' },
  'Dubai, EAU': { hours: 14.5, timezone: '+7h' },
  'Lisboa, Portugal': { hours: 9, timezone: '+3h' },
  'Tóquio, Japão': { hours: 24, timezone: '+12h' },
  'Roma, Itália': { hours: 12, timezone: '+4h' },
};

// ========== DATABASE ==========
const DESTINATIONS = {
  'Paris, França': {
    image: '🗼', continent: 'Europa',
    cover: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    tip: 'Compre o Paris Museum Pass para economizar até 50% nos museus!',
    flights: [
      { id: 'f1', name: 'Air France Direto', price: 4200, duration: '11h30', rating: 4.7 },
      { id: 'f2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3 },
      { id: 'f3', name: 'LATAM via Madrid', price: 3450, duration: '16h', rating: 4.4 },
    ],
    hotels: [
      { id: 'h1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9 },
      { id: 'h2', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Torre Eiffel', rating: 4.5 },
      { id: 'h3', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4 },
      { id: 'h4', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2 },
    ],
    restaurants: [
      { id: 'r1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9 },
      { id: 'r2', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5 },
      { id: 'r3', name: 'Café de Flore', price: 75, cuisine: 'Café', rating: 4.6 },
    ],
    activities: [
      { id: 'a1', name: 'Torre Eiffel - Topo', price: 160, duration: 2, rating: 4.8, location: 'Champ de Mars', tags: ['landmark', 'romantic'], intensity: 'light', bestTime: '17:00', childFriendly: true },
      { id: 'a2', name: 'Museu do Louvre', price: 95, duration: 4, rating: 4.9, location: 'Centro', tags: ['culture', 'art'], intensity: 'moderate', bestTime: '09:00', childFriendly: true },
      { id: 'a3', name: 'Cruzeiro no Sena', price: 85, duration: 1.5, rating: 4.7, location: 'Rio Sena', tags: ['romantic', 'scenic'], intensity: 'light', bestTime: '19:00', childFriendly: true },
      { id: 'a4', name: 'Palácio de Versalhes', price: 195, duration: 6, rating: 4.8, location: 'Versalhes', tags: ['culture', 'history'], intensity: 'heavy', bestTime: '08:30', childFriendly: true },
      { id: 'a5', name: 'Montmartre Walking Tour', price: 45, duration: 3, rating: 4.6, location: 'Montmartre', tags: ['culture'], intensity: 'moderate', bestTime: '10:00', childFriendly: true },
      { id: 'a6', name: 'Museu d\'Orsay', price: 85, duration: 3, rating: 4.8, location: 'Centro', tags: ['art', 'culture'], intensity: 'moderate', bestTime: '14:00', childFriendly: true },
      { id: 'a7', name: 'Jardim de Luxemburgo', price: 0, duration: 2, rating: 4.6, location: 'Centro', tags: ['free', 'relaxation'], intensity: 'light', bestTime: '15:00', childFriendly: true },
      { id: 'a8', name: 'Show Moulin Rouge', price: 185, duration: 2.5, rating: 4.6, location: 'Pigalle', tags: ['nightlife'], intensity: 'light', bestTime: '21:00', childFriendly: false },
    ]
  },
  'Miami, EUA': {
    image: '🌴', continent: 'América',
    cover: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=800',
    tip: 'Alugue um carro para explorar as Keys e Everglades!',
    flights: [
      { id: 'f1', name: 'American Airlines Direto', price: 2850, duration: '8h', rating: 4.5 },
      { id: 'f2', name: 'LATAM Direto', price: 2450, duration: '8h', rating: 4.4 },
      { id: 'f3', name: 'Azul via Orlando', price: 2050, duration: '11h', rating: 4.1 },
    ],
    hotels: [
      { id: 'h1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9 },
      { id: 'h2', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6 },
      { id: 'h3', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8 },
      { id: 'h4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5 },
      { id: 'h5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4 },
    ],
    restaurants: [
      { id: 'r1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8 },
      { id: 'r2', name: 'Joe\'s Stone Crab', price: 220, cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'r3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6 },
    ],
    activities: [
      { id: 'a1', name: 'South Beach', price: 0, duration: 4, rating: 4.7, location: 'South Beach', tags: ['beach', 'free'], intensity: 'light', bestTime: '10:00', childFriendly: true },
      { id: 'a2', name: 'Art Deco Tour', price: 45, duration: 2, rating: 4.5, location: 'Ocean Drive', tags: ['culture'], intensity: 'moderate', bestTime: '09:30', childFriendly: true },
      { id: 'a3', name: 'Everglades Airboat', price: 95, duration: 4, rating: 4.6, location: 'Everglades', tags: ['adventure', 'nature'], intensity: 'moderate', bestTime: '08:00', childFriendly: true },
      { id: 'a4', name: 'Wynwood Walls', price: 0, duration: 2, rating: 4.7, location: 'Wynwood', tags: ['art', 'free'], intensity: 'light', bestTime: '11:00', childFriendly: true },
      { id: 'a5', name: 'Little Havana Food Tour', price: 75, duration: 3, rating: 4.7, location: 'Little Havana', tags: ['gastro', 'culture'], intensity: 'light', bestTime: '14:00', childFriendly: true },
      { id: 'a6', name: 'Key West Day Trip', price: 195, duration: 14, rating: 4.7, location: 'Key West', tags: ['scenic', 'beach'], intensity: 'heavy', bestTime: '07:00', childFriendly: true },
      { id: 'a7', name: 'Vizcaya Museum', price: 65, duration: 3, rating: 4.6, location: 'Coconut Grove', tags: ['culture', 'romantic'], intensity: 'moderate', bestTime: '10:00', childFriendly: true },
      { id: 'a8', name: 'Jet Ski South Beach', price: 120, duration: 1, rating: 4.5, location: 'South Beach', tags: ['adventure'], intensity: 'moderate', bestTime: '15:00', childFriendly: false },
    ]
  },
  'Dubai, EAU': {
    image: '🏙️', continent: 'Ásia',
    cover: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    tip: 'Reserve o Burj Khalifa para o pôr do sol - a vista é espetacular!',
    flights: [
      { id: 'f1', name: 'Emirates Direto', price: 4850, duration: '14h30', rating: 4.8 },
      { id: 'f2', name: 'Qatar via Doha', price: 3650, duration: '18h', rating: 4.6 },
    ],
    hotels: [
      { id: 'h1', name: 'Burj Al Arab', stars: 5, price: 7500, location: 'Jumeirah', rating: 4.9 },
      { id: 'h2', name: 'Atlantis The Palm', stars: 5, price: 2600, location: 'Palm', rating: 4.7 },
      { id: 'h3', name: 'JW Marriott Marquis', stars: 5, price: 950, location: 'Downtown', rating: 4.6 },
      { id: 'h4', name: 'Rove Downtown', stars: 4, price: 480, location: 'Downtown', rating: 4.4 },
    ],
    restaurants: [
      { id: 'r1', name: 'At.mosphere', price: 650, cuisine: 'Fine Dining', rating: 4.8 },
      { id: 'r2', name: 'Pierchic', price: 380, cuisine: 'Frutos do Mar', rating: 4.7 },
      { id: 'r3', name: 'Ravi Restaurant', price: 25, cuisine: 'Paquistanesa', rating: 4.6 },
    ],
    activities: [
      { id: 'a1', name: 'Burj Khalifa At The Top', price: 220, duration: 2, rating: 4.9, location: 'Downtown', tags: ['landmark'], intensity: 'light', bestTime: '17:00', childFriendly: true },
      { id: 'a2', name: 'Desert Safari', price: 165, duration: 7, rating: 4.7, location: 'Deserto', tags: ['adventure'], intensity: 'moderate', bestTime: '14:30', childFriendly: true },
      { id: 'a3', name: 'Dubai Mall + Aquário', price: 95, duration: 5, rating: 4.6, location: 'Downtown', tags: ['shopping', 'family'], intensity: 'moderate', bestTime: '16:00', childFriendly: true },
      { id: 'a4', name: 'Aquaventure Waterpark', price: 280, duration: 6, rating: 4.8, location: 'Palm', tags: ['family', 'adventure'], intensity: 'heavy', bestTime: '10:00', childFriendly: true },
      { id: 'a5', name: 'Gold Souk', price: 0, duration: 2, rating: 4.5, location: 'Deira', tags: ['shopping', 'culture', 'free'], intensity: 'light', bestTime: '10:00', childFriendly: true },
      { id: 'a6', name: 'Dhow Cruise', price: 85, duration: 2, rating: 4.4, location: 'Creek', tags: ['romantic'], intensity: 'light', bestTime: '19:30', childFriendly: true },
    ]
  },
  'Lisboa, Portugal': {
    image: '🇵🇹', continent: 'Europa',
    cover: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800',
    tip: 'O Lisboa Card dá transporte ilimitado + entrada em 26 museus!',
    flights: [
      { id: 'f1', name: 'TAP Direto', price: 2450, duration: '9h', rating: 4.5 },
      { id: 'f2', name: 'Azul Direto', price: 2280, duration: '9h', rating: 4.3 },
    ],
    hotels: [
      { id: 'h1', name: 'Four Seasons Ritz', stars: 5, price: 2200, location: 'Centro', rating: 4.9 },
      { id: 'h2', name: 'Memmo Alfama', stars: 5, price: 850, location: 'Alfama', rating: 4.7 },
      { id: 'h3', name: 'LX Boutique', stars: 4, price: 420, location: 'Cais do Sodré', rating: 4.5 },
      { id: 'h4', name: 'My Story Rossio', stars: 3, price: 280, location: 'Baixa', rating: 4.3 },
    ],
    restaurants: [
      { id: 'r1', name: 'Belcanto', price: 520, cuisine: 'Fine Dining', rating: 4.9 },
      { id: 'r2', name: 'Cervejaria Ramiro', price: 95, cuisine: 'Frutos do Mar', rating: 4.8 },
      { id: 'r3', name: 'Time Out Market', price: 55, cuisine: 'Food Hall', rating: 4.6 },
    ],
    activities: [
      { id: 'a1', name: 'Torre de Belém', price: 45, duration: 1.5, rating: 4.6, location: 'Belém', tags: ['landmark', 'history'], intensity: 'light', bestTime: '09:00', childFriendly: true },
      { id: 'a2', name: 'Mosteiro dos Jerónimos', price: 55, duration: 2, rating: 4.8, location: 'Belém', tags: ['history', 'culture'], intensity: 'moderate', bestTime: '09:30', childFriendly: true },
      { id: 'a3', name: 'Elétrico 28', price: 18, duration: 1, rating: 4.5, location: 'Centro', tags: ['scenic'], intensity: 'light', bestTime: '10:00', childFriendly: true },
      { id: 'a4', name: 'Day Trip Sintra', price: 125, duration: 8, rating: 4.9, location: 'Sintra', tags: ['nature', 'history'], intensity: 'heavy', bestTime: '08:30', childFriendly: true },
      { id: 'a5', name: 'Show de Fado', price: 75, duration: 2, rating: 4.7, location: 'Alfama', tags: ['culture', 'nightlife'], intensity: 'light', bestTime: '21:00', childFriendly: false },
      { id: 'a6', name: 'Pastéis de Belém', price: 15, duration: 1, rating: 4.8, location: 'Belém', tags: ['gastro'], intensity: 'light', bestTime: '10:30', childFriendly: true },
    ]
  },
};

// ========== COMMUNITY ITINERARIES WITH COMMENTS ==========
const COMMUNITY_ITINERARIES = [
  {
    id: 'ci1', title: 'Paris Romântica - Lua de Mel', destination: 'Paris, França',
    author: { name: 'Marina Silva', avatar: '👩‍🦰', verified: true },
    duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 412,
    tags: ['romantic', 'luxury'], featured: true, flightId: 'f1', hotelId: 'h2',
    highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro no Sena', 'Jantar Le Cinq'],
    description: 'Roteiro perfeito para casais em lua de mel. Inclui experiências românticas exclusivas e os melhores restaurantes de Paris.',
    dailyPlan: [
      { day: 1, title: 'Chegada + Montmartre', activities: ['Check-in hotel', 'Passeio Montmartre', 'Jantar romântico'] },
      { day: 2, title: 'Ícones', activities: ['Torre Eiffel', 'Almoço', 'Louvre'] },
      { day: 3, title: 'Versalhes', activities: ['Palácio de Versalhes', 'Jardins', 'Jantar'] },
    ],
    comments: [
      { id: 1, user: 'Ana & Pedro', avatar: '💑', rating: 5, date: '2025-12-15', text: 'Fizemos esse roteiro na nossa lua de mel e foi PERFEITO! O cruzeiro ao pôr do sol foi mágico.' },
      { id: 2, user: 'Bruno Martins', avatar: '👨', rating: 5, date: '2025-11-28', text: 'Levei minha esposa para 10 anos de casamento. Ela chorou de emoção na Torre Eiffel!' },
      { id: 3, user: 'Carla Dias', avatar: '👩', rating: 4, date: '2025-11-10', text: 'Muito bom! Só achei Versalhes cansativo para o primeiro dia.' },
    ]
  },
  {
    id: 'ci2', title: 'Miami Beach Life', destination: 'Miami, EUA',
    author: { name: 'Juliana Costa', avatar: '👩‍🦱', verified: true },
    duration: 5, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 289,
    tags: ['beach', 'adventure'], featured: true, flightId: 'f2', hotelId: 'h4',
    highlights: ['South Beach', 'Everglades', 'Wynwood Walls', 'Little Havana'],
    description: 'Roteiro equilibrado entre praia, cultura e aventura. Perfeito para quem quer curtir Miami além das praias.',
    dailyPlan: [
      { day: 1, title: 'Chegada + Praia', activities: ['Transfer', 'South Beach', 'Jantar Ocean Drive'] },
      { day: 2, title: 'Aventura', activities: ['Everglades Tour', 'Almoço cubano', 'Vizcaya'] },
    ],
    comments: [
      { id: 1, user: 'Lucas Santos', avatar: '👨', rating: 5, date: '2025-12-18', text: 'Miami tem muito mais que praia! Everglades foi sensacional!' },
      { id: 2, user: 'Mariana Alves', avatar: '👩', rating: 4, date: '2025-11-25', text: 'Ótimo roteiro! Leve repelente para Everglades 😅' },
    ]
  },
  {
    id: 'ci3', title: 'Dubai Luxuoso', destination: 'Dubai, EAU',
    author: { name: 'Helena Borges', avatar: '👸', verified: true },
    duration: 6, budget: 55000, travelers: 2, likes: 2890, rating: 4.9, reviews: 198,
    tags: ['luxury', 'adventure'], featured: true, flightId: 'f1', hotelId: 'h2',
    highlights: ['Burj Khalifa Sunset', 'Desert Safari VIP', 'Atlantis'],
    description: 'Experiência 5 estrelas em Dubai. Inclui transfer VIP, guias privados e restaurantes premiados.',
    dailyPlan: [
      { day: 1, title: 'Chegada VIP', activities: ['Transfer limousine', 'Check-in Atlantis', 'Jantar'] },
      { day: 2, title: 'Downtown', activities: ['Dubai Mall', 'Burj Khalifa sunset', 'Fonte'] },
    ],
    comments: [
      { id: 1, user: 'Ricardo & Paula', avatar: '💑', rating: 5, date: '2025-12-10', text: 'Dubai é outro planeta! Atlantis é espetacular.' },
    ]
  },
  {
    id: 'ci4', title: 'Lisboa Autêntica', destination: 'Lisboa, Portugal',
    author: { name: 'António Ferreira', avatar: '👨', verified: true },
    duration: 5, budget: 12000, travelers: 2, likes: 4123, rating: 4.8, reviews: 389,
    tags: ['culture', 'gastro'], featured: true, flightId: 'f2', hotelId: 'h3',
    highlights: ['Pastéis de Belém', 'Fado em Alfama', 'Sintra'],
    description: 'Descubra Lisboa como um local! Foco em experiências autênticas e gastronomia tradicional.',
    dailyPlan: [
      { day: 1, title: 'Chegada + Baixa', activities: ['Transfer', 'Passeio Baixa', 'Time Out Market'] },
      { day: 2, title: 'Belém', activities: ['Pastéis de Belém', 'Torre + Jerónimos', 'LX Factory'] },
    ],
    comments: [
      { id: 1, user: 'Sofia Nunes', avatar: '👩', rating: 5, date: '2025-12-12', text: 'Lisboa é acolhedora! O Fado em Alfama me fez chorar.' },
    ]
  },
];

// ========== HELPER FUNCTIONS ==========
const formatTime = (hour) => {
  const h = Math.floor(hour);
  const m = Math.round((hour - h) * 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
};

const parseTime = (timeStr) => {
  if (!timeStr) return 9;
  const [h, m] = timeStr.split(':').map(Number);
  return h + (m || 0) / 60;
};

const getWeekday = (dateStr, addDays = 0) => {
  const d = new Date(dateStr + 'T12:00:00');
  d.setDate(d.getDate() + addDays);
  const weekdays = ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'];
  return {
    weekday: weekdays[d.getDay()],
    day: d.getDate().toString().padStart(2, '0'),
    month: (d.getMonth() + 1).toString().padStart(2, '0')
  };
};

const calcArrival = (depTime, flightHours) => {
  const dep = parseTime(depTime);
  const arr = (dep + flightHours) % 24;
  const nextDay = dep + flightHours >= 24;
  return { time: formatTime(arr), nextDay };
};

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
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin({ name: form.name || 'Viajante', email: form.email, avatar: '👤' }); onClose(); }} className="p-6 space-y-4">
          {mode === 'register' && <input type="text" placeholder="Seu nome" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />}
          <input type="email" placeholder="seu@email.com" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />
          <input type="password" placeholder="••••••••" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <span>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium">Cadastre-se</button></span> : <span>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium">Entrar</button></span>}</p>
        </form>
      </div>
    </div>
  );
};

// ========== ITINERARY DETAIL MODAL (VER DETALHES + COMENTÁRIOS) ==========
const ItineraryDetailModal = ({ itinerary, isOpen, onClose, onUse }) => {
  const [tab, setTab] = useState('overview');
  const [newComment, setNewComment] = useState('');
  const [rating, setRating] = useState(5);
  
  if (!isOpen || !itinerary) return null;
  const dest = DESTINATIONS[itinerary.destination];
  const flight = dest?.flights.find(f => f.id === itinerary.flightId);
  const hotel = dest?.hotels.find(h => h.id === itinerary.hotelId);
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="relative h-48 flex-shrink-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${dest?.cover})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/40 rounded-full text-white hover:bg-black/60"><X size={20} /></button>
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex gap-2 mb-2">
              {itinerary.featured && <span className="px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</span>}
              {itinerary.tags.map(t => <span key={t} className="px-2 py-1 bg-white/20 text-white text-xs rounded-full">{t}</span>)}
            </div>
            <h2 className="text-2xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 flex items-center gap-1 mt-1"><MapPin size={14} /> {itinerary.destination}</p>
          </div>
        </div>
        
        {/* Stats */}
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
          {[{ id: 'overview', label: 'Visão Geral', icon: Eye }, { id: 'daily', label: 'Dia a Dia', icon: Calendar }, { id: 'reviews', label: `Avaliações (${itinerary.comments?.length || 0})`, icon: MessageSquare }].map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 ${tab === t.id ? 'text-teal-600 border-teal-600 bg-teal-50/50' : 'text-slate-500 border-transparent hover:bg-slate-50'}`}>
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'overview' && (
            <div className="space-y-6">
              <div><h3 className="font-bold text-slate-800 mb-2">Sobre este roteiro</h3><p className="text-slate-600">{itinerary.description}</p></div>
              <div>
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> Destaques</h3>
                <div className="grid grid-cols-2 gap-2">{itinerary.highlights.map((h, i) => <div key={i} className="flex items-center gap-2 p-3 bg-amber-50 rounded-xl"><span className="text-amber-500">✨</span><span className="text-sm font-medium text-amber-800">{h}</span></div>)}</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2"><Plane size={18} /> Voo Recomendado</div>
                  <p className="font-bold">{flight?.name}</p>
                  <p className="text-sm text-blue-600">{flight?.duration} • R$ {flight?.price.toLocaleString('pt-BR')}/pessoa</p>
                </div>
                <div className="p-4 bg-violet-50 rounded-xl border border-violet-200">
                  <div className="flex items-center gap-2 text-violet-700 font-semibold mb-2"><Hotel size={18} /> Hotel Recomendado</div>
                  <p className="font-bold">{hotel?.name} {'⭐'.repeat(hotel?.stars || 0)}</p>
                  <p className="text-sm text-violet-600">{hotel?.location} • R$ {hotel?.price.toLocaleString('pt-BR')}/noite</p>
                </div>
              </div>
            </div>
          )}
          
          {tab === 'daily' && (
            <div className="space-y-4">
              {itinerary.dailyPlan?.map((day, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-xl border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center font-bold">{day.day}</div>
                    <div><p className="font-bold">{day.title}</p><p className="text-xs text-slate-500">Dia {day.day}</p></div>
                  </div>
                  <div className="flex flex-wrap gap-2">{day.activities.map((a, j) => <span key={j} className="px-3 py-1 bg-white rounded-full text-sm border">{a}</span>)}</div>
                </div>
              ))}
            </div>
          )}
          
          {tab === 'reviews' && (
            <div className="space-y-4">
              {/* Add Review */}
              <div className="p-4 bg-teal-50 rounded-xl border border-teal-200">
                <p className="font-semibold text-teal-800 mb-3">Deixe sua avaliação</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm">Sua nota:</span>
                  {[1,2,3,4,5].map(n => <button key={n} onClick={() => setRating(n)}><Star size={24} className={n <= rating ? 'fill-amber-500 text-amber-500' : 'text-slate-300'} /></button>)}
                </div>
                <div className="flex gap-2">
                  <input type="text" value={newComment} onChange={e => setNewComment(e.target.value)} placeholder="Conte sua experiência..." className="flex-1 px-4 py-3 bg-white border rounded-xl" />
                  <button className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium flex items-center gap-2"><Send size={18} /> Enviar</button>
                </div>
              </div>
              
              {/* Comments List */}
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
        
        {/* Footer */}
        <div className="p-4 border-t bg-slate-50 flex-shrink-0">
          <button onClick={() => { onUse(itinerary); onClose(); }} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-lg">
            <Copy size={20} /> Usar Este Roteiro como Base
          </button>
        </div>
      </div>
    </div>
  );
};

// ========== ACTIVITY SELECTOR MODAL ==========
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
              <h2 className="text-xl font-bold flex items-center gap-2">{mode === 'swap' ? <Replace size={22} /> : <PlusCircle size={22} />} {mode === 'swap' ? 'Trocar Atividade' : 'Adicionar Atividade'}</h2>
              {dayNum && <p className="text-teal-100 text-sm">Dia {dayNum}</p>}
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X size={22} /></button>
          </div>
          {current && mode === 'swap' && <div className="mt-3 p-3 bg-white/10 rounded-xl"><p className="text-xs text-teal-200">Substituindo:</p><p className="font-medium">{current.name}</p></div>}
        </div>
        
        <div className="p-4 border-b flex-shrink-0">
          <div className="flex gap-2 mb-3">
            <button onClick={() => setTab('activities')} className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 ${tab === 'activities' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}><Camera size={18} /> Atividades</button>
            <button onClick={() => setTab('restaurants')} className={`flex-1 py-2.5 rounded-xl font-medium flex items-center justify-center gap-2 ${tab === 'restaurants' ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}><Utensils size={18} /> Restaurantes</button>
          </div>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar..." className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filtered.map(item => (
            <button key={item.id} onClick={() => { onSelect({ ...item, category: tab === 'restaurants' ? 'restaurant' : 'activity' }); onClose(); }} className="w-full p-4 bg-slate-50 hover:bg-teal-50 rounded-xl text-left border hover:border-teal-300 transition-all group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-800 group-hover:text-teal-700">{item.name}</p>
                  <p className="text-sm text-slate-500">📍 {item.location || item.cuisine} {item.duration && `• ${item.duration}h`}</p>
                  <div className="flex gap-2 mt-2">
                    {item.price === 0 ? <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Gratuito</span> : <span className="text-xs px-2 py-1 bg-teal-100 text-teal-700 rounded-full">R$ {item.price}</span>}
                    {item.childFriendly && <span className="text-xs px-2 py-1 bg-pink-100 text-pink-600 rounded-full">👶 Kids</span>}
                    {item.bestTime && <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">🕐 {item.bestTime}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-amber-500"><Star size={16} className="fill-amber-500" />{item.rating}</div>
              </div>
            </button>
          ))}
        </div>
        
        {current && mode === 'swap' && (
          <div className="p-4 border-t bg-red-50 flex-shrink-0">
            <button onClick={() => { onRemove(); onClose(); }} className="w-full py-3 bg-red-500 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Trash2 size={18} /> Remover do Roteiro</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ========== HOTEL SELECTOR MODAL ==========
const HotelModal = ({ isOpen, onClose, hotels, current, onSelect, days }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl flex flex-col">
        <div className="p-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white flex-shrink-0">
          <div className="flex items-center justify-between">
            <div><h2 className="text-xl font-bold flex items-center gap-2"><Hotel size={22} /> Trocar Hotel</h2><p className="text-violet-200 text-sm">{days} noites</p></div>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg"><X size={22} /></button>
          </div>
          {current && <div className="mt-3 p-3 bg-white/10 rounded-xl"><p className="text-xs text-violet-200">Atual:</p><p className="font-medium">{current.name} {'⭐'.repeat(current.stars)}</p></div>}
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {hotels?.map(h => {
            const isSelected = h.id === current?.id;
            const diff = current ? (h.price - current.price) * days : 0;
            return (
              <button key={h.id} onClick={() => { onSelect(h); onClose(); }} className={`w-full p-4 rounded-xl text-left border-2 transition-all ${isSelected ? 'border-violet-500 bg-violet-50' : 'border-slate-200 hover:border-violet-300'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold">{h.name} <span className="text-amber-500">{'⭐'.repeat(h.stars)}</span></p>
                    <p className="text-sm text-slate-500">{h.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-500">R$ {h.price.toLocaleString('pt-BR')}/noite</p>
                    <p className="text-lg font-bold text-violet-600">R$ {(h.price * days).toLocaleString('pt-BR')}</p>
                    {!isSelected && current && <p className={`text-xs font-medium ${diff > 0 ? 'text-red-500' : 'text-emerald-500'}`}>{diff > 0 ? '+' : ''}R$ {diff.toLocaleString('pt-BR')}</p>}
                  </div>
                </div>
                {isSelected && <span className="inline-block mt-2 px-3 py-1 bg-violet-500 text-white text-xs rounded-full">✓ Atual</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ========== AI INSIGHTS PANEL WITH TABS ==========
const AIInsightsPanel = ({ insights, upgrades, downgrades, onAction }) => {
  const [tab, setTab] = useState('tips');
  
  const tabs = [
    { id: 'tips', label: 'Dicas', icon: Lightbulb, color: 'violet', items: insights },
    { id: 'upgrades', label: 'Upgrades', icon: ArrowUpCircle, color: 'emerald', items: upgrades },
    { id: 'downgrades', label: 'Economia', icon: ArrowDownCircle, color: 'amber', items: downgrades },
  ];
  
  const current = tabs.find(t => t.id === tab);
  
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <h3 className="font-bold flex items-center gap-2"><Sparkles size={18} /> Insights da IA</h3>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 px-3 py-3 text-xs font-medium flex flex-col items-center gap-1 border-b-2 transition-all ${tab === t.id ? `text-${t.color}-600 border-${t.color}-600 bg-${t.color}-50` : 'text-slate-500 border-transparent hover:bg-slate-50'}`}>
            <t.icon size={18} />
            <span>{t.label}</span>
            {t.items?.length > 0 && <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${tab === t.id ? `bg-${t.color}-600 text-white` : 'bg-slate-200'}`}>{t.items.length}</span>}
          </button>
        ))}
      </div>
      
      {/* Content */}
      <div className="p-4 max-h-80 overflow-y-auto">
        {current?.items?.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <current.icon size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">{tab === 'tips' ? 'Gerando dicas...' : tab === 'upgrades' ? 'Nenhum upgrade disponível' : 'Você está dentro do orçamento! 🎉'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {current?.items?.map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border-2 ${item.type === 'upgrade' ? 'bg-emerald-50 border-emerald-200' : item.type === 'downgrade' ? 'bg-amber-50 border-amber-200' : item.type === 'danger' ? 'bg-red-50 border-red-200' : 'bg-violet-50 border-violet-200'}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${item.type === 'upgrade' ? 'bg-emerald-100' : item.type === 'downgrade' ? 'bg-amber-100' : item.type === 'danger' ? 'bg-red-100' : 'bg-violet-100'}`}>
                    {item.type === 'upgrade' && <ArrowUpCircle size={20} className="text-emerald-600" />}
                    {item.type === 'downgrade' && <ArrowDownCircle size={20} className="text-amber-600" />}
                    {item.type === 'danger' && <AlertTriangle size={20} className="text-red-600" />}
                    {(item.type === 'tip' || item.type === 'jetlag') && <Lightbulb size={20} className="text-violet-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{item.title}</p>
                    <p className="text-xs text-slate-600 mt-1">{item.message}</p>
                    {item.savings && <p className="text-xs font-bold text-emerald-600 mt-2">💰 Economia: R$ {item.savings.toLocaleString('pt-BR')}</p>}
                    {item.cost && <p className="text-xs font-bold text-violet-600 mt-2">💎 Investimento: +R$ {item.cost.toLocaleString('pt-BR')}</p>}
                    {item.action && <button onClick={() => onAction(item)} className={`mt-3 px-4 py-2 text-white text-xs font-bold rounded-lg ${item.type === 'upgrade' ? 'bg-emerald-500 hover:bg-emerald-600' : item.type === 'downgrade' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-violet-500 hover:bg-violet-600'}`}>{item.action}</button>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ========== CALENDAR DAY CARD ==========
const DayCard = ({ day, date, items, hotel, flight, isFirst, isLast, origin, dest, onEdit, onRemove, onAdd, travelers, arrTime, depTime, isLongFlight }) => {
  const [expanded, setExpanded] = useState(true);
  
  let total = hotel?.price || 0;
  items.forEach(i => total += i.price || 0);
  if (isFirst && flight) total += flight.price * travelers;
  if (isLast && flight) total += flight.price * travelers;
  
  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-200 text-xs font-medium">{date.weekday}</p>
            <p className="text-3xl font-bold">{date.day}<span className="text-lg text-teal-200">/{date.month}</span></p>
          </div>
          <div className="flex items-center gap-3">
            {isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> Chegada</span>}
            {isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneTakeoff size={12} /> Partida</span>}
            <div className="text-right"><p className="text-xs text-teal-200">Custo do dia</p><p className="text-xl font-bold">R$ {total.toLocaleString('pt-BR')}</p></div>
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 space-y-3">
          {/* Flight Arrival */}
          {isFirst && flight && (
            <div className="p-4 bg-amber-50 rounded-xl border-2 border-amber-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1"><PlaneLanding size={14} /> CHEGADA</span>
                <span className="text-sm font-bold text-amber-800">{arrTime}</span>
              </div>
              <p className="font-bold">{flight.name}</p>
              <p className="text-sm text-slate-600">{origin} → {dest}</p>
              {isLongFlight && <div className="mt-2 p-2 bg-amber-100 rounded-lg"><p className="text-xs text-amber-700">😴 Voo longo - Primeiro dia com atividades leves</p></div>}
              <p className="text-sm font-medium text-amber-700 mt-2">R$ {(flight.price * travelers).toLocaleString('pt-BR')}</p>
            </div>
          )}
          
          {/* Hotel */}
          {hotel && (
            <div className="p-4 bg-violet-50 rounded-xl border-2 border-violet-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-violet-700 flex items-center gap-1"><Hotel size={14} /> HOSPEDAGEM</span>
                  <p className="font-bold mt-1">{hotel.name} {'⭐'.repeat(hotel.stars)}</p>
                  <p className="text-sm text-slate-600">{hotel.location} • R$ {hotel.price.toLocaleString('pt-BR')}/noite</p>
                </div>
                <button onClick={() => onEdit({ type: 'hotel' })} className="p-3 bg-white rounded-xl shadow opacity-0 group-hover:opacity-100"><Edit3 size={16} className="text-violet-600" /></button>
              </div>
            </div>
          )}
          
          {/* Activities */}
          {items.map((item, idx) => (
            <div key={idx} className={`p-4 rounded-xl border-2 group ${item.category === 'restaurant' ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded-full shadow-sm">{item.startTime || '—'}</span>
                    {item.childFriendly && <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">👶 Kids</span>}
                  </div>
                  <p className="font-bold flex items-center gap-2">{item.category === 'restaurant' ? '🍽️' : '🎯'} {item.name}</p>
                  <p className="text-sm text-slate-500">{item.location || item.cuisine}</p>
                  <div className="flex gap-2 mt-2">
                    {item.price === 0 ? <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">Gratuito</span> : <span className="text-xs px-2 py-1 bg-white rounded-full shadow-sm">R$ {item.price}</span>}
                    {item.duration && <span className="text-xs text-slate-400">{item.duration}h</span>}
                  </div>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(item, day, idx)} className="p-2 bg-white rounded-lg shadow hover:shadow-md" title="Trocar"><Replace size={14} className="text-teal-600" /></button>
                  <button onClick={() => onRemove(day, idx)} className="p-2 bg-white rounded-lg shadow hover:shadow-md" title="Remover"><Trash2 size={14} className="text-red-500" /></button>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Activity Button */}
          <button onClick={() => onAdd(day)} className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 flex items-center justify-center gap-2">
            <PlusCircle size={20} /> Adicionar Atividade
          </button>
          
          {/* Flight Departure */}
          {isLast && flight && (
            <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1"><PlaneTakeoff size={14} /> PARTIDA</span>
                <span className="text-sm font-bold text-blue-800">{depTime}</span>
              </div>
              <p className="font-bold">{flight.name}</p>
              <p className="text-sm text-slate-600">{dest} → {origin}</p>
              <p className="text-sm font-medium text-blue-700 mt-2">R$ {(flight.price * travelers).toLocaleString('pt-BR')}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ========== COMMUNITY CARD ==========
const CommunityCard = ({ item, onView, onUse, onLike, liked }) => {
  const dest = DESTINATIONS[item.destination];
  return (
    <div className="bg-white rounded-2xl border overflow-hidden hover:shadow-xl transition-all group">
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${dest?.cover})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {item.featured && <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={10} /> DESTAQUE</div>}
        <button onClick={e => { e.stopPropagation(); onLike(item.id); }} className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center ${liked ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}><Heart size={16} className={liked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold leading-tight">{item.title}</h3>
          <p className="text-white/70 text-xs mt-1 flex items-center gap-1"><MapPin size={10} /> {item.destination}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{item.author.avatar}</span>
            <div>
              <p className="text-xs font-medium flex items-center gap-1">{item.author.name} {item.author.verified && <UserCheck size={10} className="text-teal-500" />}</p>
              <p className="text-xs text-slate-400">{item.duration}d • R$ {(item.budget/1000).toFixed(0)}k</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" /><span className="font-bold">{item.rating}</span></div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">{item.tags.slice(0,3).map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full">{t}</span>)}</div>
        
        {/* ✅ BOTÃO VER DETALHES */}
        <div className="flex gap-2">
          <button onClick={() => onView(item)} className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-medium rounded-xl hover:bg-slate-200 flex items-center justify-center gap-1"><Eye size={14} /> Ver Detalhes</button>
          <button onClick={() => onUse(item)} className="flex-1 py-2.5 bg-teal-600 text-white text-xs font-medium rounded-xl hover:bg-teal-700 flex items-center justify-center gap-1"><Copy size={14} /> Usar</button>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t">
          <span className="text-xs text-slate-400 flex items-center gap-1"><Heart size={12} /> {(item.likes/1000).toFixed(1)}k</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><MessageSquare size={12} /> {item.reviews}</span>
        </div>
      </div>
    </div>
  );
};

// ========== MAIN APP ==========
export default function App() {
  // State
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ types: [], budget: 'medium' });
  const [showAuth, setShowAuth] = useState(false);
  const [view, setView] = useState('landing');
  
  // Trip Planning
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-02-14');
  const [endDate, setEndDate] = useState('2026-02-19');
  const [depTime, setDepTime] = useState('22:00');  // ✅ HORÁRIO IDA
  const [retTime, setRetTime] = useState('20:00');  // ✅ HORÁRIO VOLTA
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [budget, setBudget] = useState(25000);
  
  // Itinerary
  const [generated, setGenerated] = useState(false);
  const [flight, setFlight] = useState(null);
  const [hotel, setHotel] = useState(null);
  const [schedule, setSchedule] = useState({});
  const [generating, setGenerating] = useState(false);
  
  // Priorities
  const [priorities, setPriorities] = useState([]);
  const [showPriorities, setShowPriorities] = useState(false);
  const [likes, setLikes] = useState([]);
  
  // Modals
  const [selItinerary, setSelItinerary] = useState(null);
  const [showItModal, setShowItModal] = useState(false);
  const [showActModal, setShowActModal] = useState(false);
  const [showHotelModal, setShowHotelModal] = useState(false);
  const [actMode, setActMode] = useState('add');
  const [editItem, setEditItem] = useState(null);
  const [editDay, setEditDay] = useState(null);
  
  // Computed
  const data = destination ? DESTINATIONS[destination] : null;
  const flightData = destination ? FLIGHT_DATA[destination] : null;
  const days = useMemo(() => Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000)), [startDate, endDate]);
  const travelers = adults + children;
  
  // ✅ CALCULAR CHEGADA COM BASE NO HORÁRIO E DURAÇÃO DO VOO
  const arrivalInfo = useMemo(() => {
    if (!flightData || !depTime) return { time: '08:00', nextDay: false, isLong: false };
    const arr = calcArrival(depTime, flightData.hours);
    return { ...arr, isLong: flightData.hours > 10 };
  }, [flightData, depTime]);
  
  // Calculate costs
  const costs = useMemo(() => {
    if (!generated) return { total: 0 };
    const f = (flight?.price || 0) * travelers * 2;
    const h = (hotel?.price || 0) * days;
    let a = 0, r = 0;
    Object.values(schedule).forEach(items => items.forEach(i => {
      if (i.category === 'restaurant') r += i.price || 0;
      else a += i.price || 0;
    }));
    return { flights: f, hotels: h, activities: a * travelers, food: r * travelers, total: f + h + (a + r) * travelers };
  }, [flight, hotel, schedule, days, travelers, generated]);
  
  const remaining = budget - costs.total;
  const overBudget = remaining < 0;

  // ========== AI INSIGHTS GENERATION ==========
  const { insights, upgrades, downgrades } = useMemo(() => {
    if (!generated || !data) return { insights: [], upgrades: [], downgrades: [] };
    const ins = [], ups = [], downs = [];
    
    // Local tip
    if (data.tip) ins.push({ type: 'tip', title: '💡 Dica Local', message: data.tip });
    
    // Jet lag warning
    if (arrivalInfo.isLong) ins.push({ type: 'jetlag', title: '😴 Atenção ao Jet Lag', message: `Voo de ${flightData?.hours}h com fuso ${flightData?.timezone}. Primeiro dia com atividades leves para adaptação.` });
    
    // UPGRADES
    if (remaining > 2000) {
      const betterHotel = data.hotels.find(h => h.stars > (hotel?.stars || 0) && h.price * days <= remaining + (hotel?.price || 0) * days);
      if (betterHotel && betterHotel.id !== hotel?.id) {
        const cost = (betterHotel.price - (hotel?.price || 0)) * days;
        ups.push({ type: 'upgrade', title: `🏨 Upgrade: ${betterHotel.name}`, message: `${betterHotel.stars}★ em ${betterHotel.location}. Experiência superior!`, cost, action: 'Aplicar Upgrade', actionType: 'upgrade_hotel', targetId: betterHotel.id });
      }
      
      const usedIds = Object.values(schedule).flat().map(i => i.id);
      data.activities.filter(a => !usedIds.includes(a.id) && a.price > 100 && a.rating >= 4.7).slice(0, 2).forEach(a => {
        if (a.price * travelers <= remaining) {
          ups.push({ type: 'upgrade', title: `✨ Adicionar: ${a.name}`, message: `${a.duration}h • Rating ${a.rating}. Horário: ${a.bestTime}`, cost: a.price * travelers, action: 'Adicionar', actionType: 'add_activity', targetId: a.id });
        }
      });
    }
    
    // DOWNGRADES
    if (overBudget) {
      ins.push({ type: 'danger', title: '⚠️ Orçamento Excedido!', message: `R$ ${Math.abs(remaining).toLocaleString('pt-BR')} acima do limite. Veja sugestões de economia.` });
      
      const cheapHotel = data.hotels.filter(h => h.price < (hotel?.price || 0) && h.rating >= 4.0).sort((a, b) => b.rating - a.rating)[0];
      if (cheapHotel) {
        downs.push({ type: 'downgrade', title: `🏨 Economia: ${cheapHotel.name}`, message: `${cheapHotel.stars}★ • Rating ${cheapHotel.rating}. Ótimo custo-benefício!`, savings: ((hotel?.price || 0) - cheapHotel.price) * days, action: 'Aplicar', actionType: 'downgrade_hotel', targetId: cheapHotel.id });
      }
      
      const cheapFlight = data.flights.filter(f => f.price < (flight?.price || 0)).sort((a, b) => b.rating - a.rating)[0];
      if (cheapFlight) {
        downs.push({ type: 'downgrade', title: `✈️ Voo Econômico: ${cheapFlight.name}`, message: `Rating ${cheapFlight.rating}`, savings: ((flight?.price || 0) - cheapFlight.price) * travelers * 2, action: 'Aplicar', actionType: 'downgrade_flight', targetId: cheapFlight.id });
      }
      
      Object.values(schedule).flat().filter(i => i.category === 'activity' && i.price > 80).slice(0, 2).forEach(a => {
        downs.push({ type: 'downgrade', title: `🎯 Remover: ${a.name}`, message: 'Substitua por gratuita', savings: a.price * travelers, action: 'Remover', actionType: 'remove_activity', targetId: a.id });
      });
    }
    
    return { insights: ins, upgrades: ups, downgrades: downs };
  }, [generated, data, hotel, flight, schedule, remaining, overBudget, days, travelers, arrivalInfo, flightData]);

  // ========== HANDLERS ==========
  const handleInsight = (item) => {
    if (item.actionType === 'upgrade_hotel' || item.actionType === 'downgrade_hotel') {
      setHotel(data.hotels.find(h => h.id === item.targetId));
    } else if (item.actionType === 'upgrade_flight' || item.actionType === 'downgrade_flight') {
      setFlight(data.flights.find(f => f.id === item.targetId));
    } else if (item.actionType === 'add_activity') {
      const act = data.activities.find(a => a.id === item.targetId);
      if (act) {
        const d = Object.keys(schedule).find(k => schedule[k].length < 4) || '2';
        setSchedule({ ...schedule, [d]: [...(schedule[d] || []), { ...act, category: 'activity', startTime: act.bestTime }] });
      }
    } else if (item.actionType === 'remove_activity') {
      const newSch = { ...schedule };
      Object.keys(newSch).forEach(d => {
        const idx = newSch[d].findIndex(i => i.id === item.targetId);
        if (idx >= 0) { newSch[d] = [...newSch[d]]; newSch[d].splice(idx, 1); }
      });
      setSchedule(newSch);
    }
  };
  
  const handleEdit = (item, day, idx) => {
    if (item?.type === 'hotel') { setShowHotelModal(true); return; }
    setEditItem(item); setEditDay(day); setActMode('swap'); setShowActModal(true);
  };
  
  const handleRemove = (day, idx) => {
    const newSch = { ...schedule };
    newSch[day] = [...newSch[day]];
    newSch[day].splice(idx, 1);
    setSchedule(newSch);
  };
  
  const handleAdd = (day) => {
    setEditItem(null); setEditDay(day); setActMode('add'); setShowActModal(true);
  };
  
  const handleSelect = (item) => {
    if (actMode === 'add' && editDay) {
      const last = schedule[editDay]?.[schedule[editDay].length - 1];
      const time = last?.startTime ? formatTime(parseTime(last.startTime) + (last.duration || 2) + 0.5) : item.bestTime || '14:00';
      setSchedule({ ...schedule, [editDay]: [...(schedule[editDay] || []), { ...item, startTime: time }] });
    } else if (actMode === 'swap' && editItem) {
      Object.keys(schedule).forEach(d => {
        const idx = schedule[d].findIndex(i => i.id === editItem.id);
        if (idx >= 0) {
          const newSch = { ...schedule };
          newSch[d] = [...newSch[d]];
          newSch[d][idx] = { ...item, startTime: newSch[d][idx].startTime };
          setSchedule(newSch);
        }
      });
    }
  };

  // ========== GENERATE ITINERARY ==========
  const generate = () => {
    if (!destination) return;
    setGenerating(true);
    
    setTimeout(() => {
      const d = DESTINATIONS[destination];
      
      // Select flight
      const flightBudget = budget * 0.30;
      const affordable = d.flights.filter(f => f.price * travelers * 2 <= flightBudget);
      const bestFlight = affordable.sort((a, b) => b.rating - a.rating)[0] || d.flights[d.flights.length - 1];
      
      // Select hotel
      const hotelBudget = budget * 0.35 / days;
      const bestHotel = d.hotels.filter(h => h.price <= hotelBudget).sort((a, b) => b.rating - a.rating)[0] || d.hotels[d.hotels.length - 1];
      
      // Score activities
      const score = (a) => {
        let s = a.rating * 10;
        profile.types?.forEach(t => {
          if (a.tags?.some(tag => tag.includes(t))) s += 30;
        });
        priorities.forEach(p => {
          if (a.tags?.some(tag => tag.includes(p))) s += 40;
        });
        if (children > 0 && !a.childFriendly) s -= 20;
        return s;
      };
      
      const sorted = [...d.activities].sort((a, b) => score(b) - score(a));
      const rests = [...d.restaurants].sort((a, b) => b.rating - a.rating);
      
      const sch = {};
      const used = new Set();
      let rIdx = 0;
      
      for (let day = 1; day <= days; day++) {
        sch[day] = [];
        
        if (day === 1) {
          // First day - light schedule
          const arrHour = parseTime(arrivalInfo.time);
          sch[day].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: bestHotel.location, price: 150, duration: 1.5, startTime: arrivalInfo.time });
          
          if (arrivalInfo.isLong) {
            sch[day].push({ type: 'rest', name: 'Descanso - Adaptação', location: 'Hotel', price: 0, duration: 2, startTime: formatTime(arrHour + 2) });
            const light = sorted.find(a => a.intensity === 'light' && !used.has(a.id));
            if (light) { used.add(light.id); sch[day].push({ ...light, category: 'activity', startTime: formatTime(Math.max(arrHour + 4, 16)) }); }
          } else {
            sorted.filter(a => !used.has(a.id) && a.intensity !== 'heavy').slice(0, 2).forEach((a, i) => {
              used.add(a.id);
              sch[day].push({ ...a, category: 'activity', startTime: formatTime(14 + i * 3) });
            });
          }
          
          const dinner = rests[rIdx++ % rests.length];
          sch[day].push({ ...dinner, category: 'restaurant', duration: 1.5, startTime: '20:00' });
          
        } else if (day === days) {
          // Last day
          sch[day].push({ type: 'checkout', name: 'Check-out', location: 'Hotel', price: 0, duration: 1, startTime: '10:00' });
          sorted.filter(a => !used.has(a.id) && a.duration <= 3).slice(0, 1).forEach(a => {
            used.add(a.id);
            sch[day].push({ ...a, category: 'activity', startTime: '11:00' });
          });
          const lunch = rests[rIdx++ % rests.length];
          sch[day].push({ ...lunch, category: 'restaurant', duration: 1, startTime: '13:00' });
          
        } else {
          // Regular day
          const morning = sorted.find(a => !used.has(a.id));
          if (morning) { used.add(morning.id); sch[day].push({ ...morning, category: 'activity', startTime: morning.bestTime || '09:00' }); }
          
          const lunch = rests[rIdx++ % rests.length];
          sch[day].push({ ...lunch, category: 'restaurant', duration: 1.5, startTime: '13:00' });
          
          const afternoon = sorted.find(a => !used.has(a.id));
          if (afternoon) { used.add(afternoon.id); sch[day].push({ ...afternoon, category: 'activity', startTime: afternoon.bestTime || '15:00' }); }
          
          const dinner = rests[rIdx++ % rests.length];
          sch[day].push({ ...dinner, category: 'restaurant', duration: 2, startTime: '20:00' });
        }
      }
      
      setFlight(bestFlight);
      setHotel(bestHotel);
      setSchedule(sch);
      setGenerated(true);
      setGenerating(false);
    }, 2000);
  };
  
  const useCommunity = (it) => {
    const d = DESTINATIONS[it.destination];
    if (!d) return;
    setDestination(it.destination);
    setBudget(it.budget);
    setFlight(d.flights.find(f => f.id === it.flightId) || d.flights[0]);
    setHotel(d.hotels.find(h => h.id === it.hotelId) || d.hotels[0]);
    
    const sch = {};
    for (let day = 1; day <= it.duration; day++) {
      sch[day] = [];
      if (day === 1) sch[day].push({ type: 'transfer', name: 'Transfer', location: 'Aeroporto', price: 150, duration: 1.5, startTime: '12:00' });
      const acts = d.activities.slice((day * 2) % d.activities.length, (day * 2) % d.activities.length + 2);
      acts.forEach((a, i) => sch[day].push({ ...a, category: 'activity', startTime: formatTime(10 + i * 4) }));
      sch[day].push({ ...d.restaurants[day % d.restaurants.length], category: 'restaurant', duration: 1.5, startTime: '20:00' });
    }
    
    const today = new Date();
    const start = new Date(today); start.setDate(today.getDate() + 30);
    const end = new Date(start); end.setDate(start.getDate() + it.duration);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    setSchedule(sch);
    setGenerated(true);
    setView('plan');
  };
  
  const togglePriority = (id) => {
    if (priorities.includes(id)) setPriorities(priorities.filter(p => p !== id));
    else if (priorities.length < 3) setPriorities([...priorities, id]);
  };
  
  const toggleLike = (id) => {
    if (likes.includes(id)) setLikes(likes.filter(l => l !== id));
    else setLikes([...likes, id]);
  };

  // ========== LANDING VIEW ==========
  if (view === 'landing') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <header className="p-4"><div className="max-w-7xl mx-auto flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center"><Globe size={24} className="text-white" /></div><span className="text-xl font-bold text-white">SmartTravel AI</span></div>{user ? <button onClick={() => setView('profile')} className="px-4 py-2 bg-white/10 text-white rounded-lg">{user.avatar} {user.name}</button> : <button onClick={() => setShowAuth(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg">Entrar</button>}</div></header>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm mb-6"><Sparkles size={16} /> Powered by AI</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Viaje <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Inteligente</span></h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">Roteiros personalizados que consideram fuso horário, jet lag, seus interesses e orçamento. {Object.keys(DESTINATIONS).length} destinos disponíveis.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button onClick={() => setView('plan')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg"><Sparkles size={20} /> Criar Meu Roteiro</button>
          <button onClick={() => setView('community')} className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><Users size={20} /> Ver Comunidade ({COMMUNITY_ITINERARIES.length} roteiros)</button>
        </div>
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={setUser} />
    </div>
  );

  // ========== COMMUNITY VIEW ==========
  if (view === 'community') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user ? <button className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuth(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Entrar</button>}</nav></div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Roteiros da Comunidade</h1>
        <p className="text-slate-500 mb-6">{COMMUNITY_ITINERARIES.length} roteiros com avaliações reais</p>
        <div className="bg-white rounded-2xl border p-4 mb-6 flex flex-wrap gap-4">
          <div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><select className="px-4 py-2 bg-slate-50 border rounded-xl"><option>Todos os Destinos</option>{Object.keys(DESTINATIONS).map(d => <option key={d}>{d}</option>)}</select></div>
          <div><label className="text-xs font-medium text-slate-500 mb-1 block">Tipo de Viagem</label><select className="px-4 py-2 bg-slate-50 border rounded-xl"><option>Todos os Tipos</option>{TRAVELER_TYPES.map(t => <option key={t.id}>{t.name}</option>)}</select></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMUNITY_ITINERARIES.map(it => (
            <CommunityCard key={it.id} item={it} onView={(i) => { setSelItinerary(i); setShowItModal(true); }} onUse={useCommunity} onLike={toggleLike} liked={likes.includes(it.id)} />
          ))}
        </div>
      </div>
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={setUser} />
      <ItineraryDetailModal itinerary={selItinerary} isOpen={showItModal} onClose={() => setShowItModal(false)} onUse={useCommunity} />
    </div>
  );

  // ========== PLAN VIEW ==========
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button className="text-teal-600 font-medium">Planejar</button><button onClick={() => setView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user ? <button className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuth(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Entrar</button>}</nav></div></header>
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Selection */}
            <div className="bg-white rounded-2xl border p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin size={20} className="text-teal-600" /> Escolha seu Destino</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Saindo de</label><select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border rounded-xl">{BRAZILIAN_CITIES.map(c => <option key={c}>{c}</option>)}</select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl font-medium text-teal-700">{destination ? `${DESTINATIONS[destination]?.image} ${destination}` : 'Selecione abaixo ↓'}</div></div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{Object.entries(DESTINATIONS).map(([name, d]) => (
                <button key={name} onClick={() => { setDestination(name); setGenerated(false); }} className={`relative overflow-hidden rounded-xl h-24 group ${destination === name ? 'ring-2 ring-teal-500 ring-offset-2' : ''}`}>
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform" style={{ backgroundImage: `url(${d.cover})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-2 left-2"><span className="text-2xl">{d.image}</span><p className="text-white text-xs font-bold">{name.split(',')[0]}</p></div>
                  {destination === name && <div className="absolute top-2 right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}
                </button>
              ))}</div>
            </div>
            
            {/* Trip Configuration */}
            {destination && (
              <div className="bg-white rounded-2xl border p-6 shadow-sm">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Calendar size={20} className="text-teal-600" /> Detalhes da Viagem</h2>
                
                {/* ✅ DATAS E HORÁRIOS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Ida</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Horário Partida</label><input type="time" value={depTime} onChange={e => setDepTime(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Volta</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Horário Volta</label><input type="time" value={retTime} onChange={e => setRetTime(e.target.value)} className="w-full px-3 py-2 bg-slate-50 border rounded-xl text-sm" /></div>
                </div>
                
                {/* ✅ INFO CHEGADA */}
                {flightData && (
                  <div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div><p className="text-xs text-amber-600 font-medium">Voo de {flightData.hours}h • Fuso {flightData.timezone}</p><p className="font-bold text-amber-800">Chegada prevista: {arrivalInfo.time} {arrivalInfo.nextDay && '(+1 dia)'}</p></div>
                      {arrivalInfo.isLong && <div className="px-3 py-1 bg-amber-200 rounded-full text-xs font-bold text-amber-800">😴 Jet Lag</div>}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Adultos</label><input type="number" value={adults} onChange={e => setAdults(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Crianças</label><input type="number" value={children} onChange={e => setChildren(Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-3 py-2 bg-slate-50 border rounded-xl" /></div>
                </div>
                
                <div className="mb-4"><label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento Total: R$ {budget.toLocaleString('pt-BR')}</label><input type="range" min="5000" max="100000" step="1000" value={budget} onChange={e => setBudget(parseInt(e.target.value))} className="w-full accent-teal-600" /></div>
                
                {/* Priorities */}
                <button onClick={() => setShowPriorities(!showPriorities)} className="w-full p-3 bg-violet-50 rounded-xl border border-violet-200 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2"><Sliders size={18} className="text-violet-600" /><span className="font-semibold">Prioridades do Roteiro</span>{priorities.length > 0 && <span className="px-2 py-0.5 bg-violet-600 text-white text-xs rounded-full">{priorities.length}</span>}</div>
                  {showPriorities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {showPriorities && <div className="mb-4 p-4 bg-slate-50 rounded-xl"><p className="text-xs text-slate-500 mb-3">Escolha até 3:</p><div className="grid grid-cols-4 gap-2">{TRIP_PRIORITIES.map(p => (<button key={p.id} onClick={() => togglePriority(p.id)} className={`p-3 rounded-xl text-center ${priorities.includes(p.id) ? 'bg-violet-600 text-white' : 'bg-white border hover:border-violet-300'}`}><p.icon size={20} className="mx-auto" /><p className="text-xs mt-1">{p.name}</p></button>))}</div></div>}
                
                <button onClick={generate} disabled={generating} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-70">
                  {generating ? <><RefreshCw size={20} className="animate-spin" /> Gerando...</> : <><Sparkles size={20} /> Gerar Roteiro Inteligente</>}
                </button>
              </div>
            )}
            
            {/* Generated Itinerary */}
            {generated && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={22} className="text-teal-600" /> Seu Roteiro Personalizado</h2><p className="text-slate-500 text-sm">{origin.split(' ')[0]} → {destination} • {days} dias • {travelers} viajantes</p></div>
                  <button onClick={() => { setGenerated(false); setSchedule({}); }} className="px-3 py-2 text-sm text-teal-600 border border-teal-200 rounded-lg hover:bg-teal-50 flex items-center gap-1"><RefreshCw size={14} /> Regenerar</button>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: days }, (_, i) => i + 1).map(d => (
                    <DayCard key={d} day={d} date={getWeekday(startDate, d - 1)} items={schedule[d] || []} hotel={hotel} flight={flight} isFirst={d === 1} isLast={d === days} origin={origin.split(' ')[0]} dest={destination.split(',')[0]} onEdit={handleEdit} onRemove={handleRemove} onAdd={handleAdd} travelers={travelers} arrTime={arrivalInfo.time} depTime={retTime} isLongFlight={arrivalInfo.isLong} />
                  ))}
                </div>
              </div>
            )}
            
            {!destination && <div className="bg-white rounded-2xl border p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer viajar</p></div>}
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget */}
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-5 text-white shadow-xl ${!generated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-1"><h3 className="font-semibold">Orçamento</h3><Wallet size={18} /></div>
              <div className="text-2xl font-bold">R$ {budget.toLocaleString('pt-BR')}</div>
              {generated && (<>
                <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${overBudget ? 'bg-red-500/40' : 'bg-white/20'}`}>{overBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{overBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Sobra: R$ ${remaining.toLocaleString('pt-BR')}`}</div>
                <div className="mt-3 pt-3 border-t border-white/20 space-y-1.5 text-sm">
                  <div className="flex justify-between"><span className="opacity-80">✈️ Voos</span><span>R$ {costs.flights?.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🏨 Hotel ({days}n)</span><span>R$ {costs.hotels?.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🎯 Passeios</span><span>R$ {costs.activities?.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between"><span className="opacity-80">🍽️ Alimentação</span><span>R$ {costs.food?.toLocaleString('pt-BR')}</span></div>
                  <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total?.toLocaleString('pt-BR')}</span></div>
                </div>
              </>)}
            </div>
            
            {/* AI Insights */}
            {generated && <AIInsightsPanel insights={insights} upgrades={upgrades} downgrades={downgrades} onAction={handleInsight} />}
            
            {/* Top Community */}
            {destination && (
              <div className="bg-white rounded-2xl border p-4 shadow-sm">
                <h3 className="font-bold mb-3 flex items-center gap-2"><Crown size={16} className="text-amber-500" /> Top Roteiros</h3>
                {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 2).map(it => (
                  <button key={it.id} onClick={() => { setSelItinerary(it); setShowItModal(true); }} className="w-full p-3 bg-slate-50 rounded-xl text-left hover:bg-teal-50 mb-2">
                    <div className="flex items-center justify-between">
                      <div><p className="font-semibold text-sm">{it.title}</p><p className="text-xs text-slate-500">{it.duration}d • R$ {(it.budget/1000).toFixed(0)}k</p></div>
                      <div className="flex items-center gap-1 text-amber-500"><Star size={14} className="fill-amber-500" />{it.rating}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={setUser} />
      <ItineraryDetailModal itinerary={selItinerary} isOpen={showItModal} onClose={() => setShowItModal(false)} onUse={useCommunity} />
      <ActivityModal isOpen={showActModal} onClose={() => setShowActModal(false)} activities={data?.activities} restaurants={data?.restaurants} current={editItem} onSelect={handleSelect} onRemove={() => { if (editItem) { Object.keys(schedule).forEach(d => { const idx = schedule[d].findIndex(i => i.id === editItem.id); if (idx >= 0) handleRemove(d, idx); }); } }} mode={actMode} dayNum={editDay} />
      <HotelModal isOpen={showHotelModal} onClose={() => setShowHotelModal(false)} hotels={data?.hotels} current={hotel} onSelect={setHotel} days={days} />
    </div>
  );
}
