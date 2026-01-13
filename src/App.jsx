import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Compass, Mountain, Building, Palmtree, Crown, Mail, Lock, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, ArrowLeftRight, MessageSquare, Car, Copy, Phone, Download, Zap, Target, Award, ThumbsUp, Info, Anchor, Wine, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp } from 'lucide-react';

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'];

const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain, color: 'emerald' },
  { id: 'culture', name: 'Cultural', icon: Building, color: 'violet' },
  { id: 'beach', name: 'Praia', icon: Palmtree, color: 'cyan' },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils, color: 'orange' },
  { id: 'family', name: 'Família', icon: Users, color: 'pink' },
  { id: 'romantic', name: 'Romântico', icon: Heart, color: 'rose' },
  { id: 'budget', name: 'Econômico', icon: Wallet, color: 'lime' },
  { id: 'luxury', name: 'Luxo', icon: Crown, color: 'amber' },
];

const TRIP_PRIORITIES = [
  { id: 'gastronomy', name: 'Gastronomia', icon: Utensils, desc: 'Foco em restaurantes e experiências culinárias' },
  { id: 'beaches', name: 'Praias', icon: Anchor, desc: 'Priorizar atividades de praia e mar' },
  { id: 'culture', name: 'Cultura', icon: Building, desc: 'Museus, história e arte' },
  { id: 'adventure', name: 'Aventura', icon: Mountain, desc: 'Trilhas, esportes e adrenalina' },
  { id: 'relaxation', name: 'Relaxamento', icon: Sparkles, desc: 'Spas, resorts e tranquilidade' },
  { id: 'kids', name: 'Crianças', icon: Baby, desc: 'Atividades family-friendly' },
  { id: 'nightlife', name: 'Vida Noturna', icon: Music, desc: 'Shows, bares e entretenimento' },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag, desc: 'Lojas, outlets e mercados' },
];

const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];

const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', image: '🗼', tags: ['culture', 'romantic', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    tip: 'Compre o Paris Museum Pass para economizar em museus!',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.7, airline: 'Air France' },
      { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.3, airline: 'TAP' },
      { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.4, airline: 'LATAM' },
      { id: 'pf4', name: 'KLM via Amsterdam', price: 3150, duration: '15h10', rating: 4.5, airline: 'KLM' },
      { id: 'pf5', name: 'Iberia via Madrid', price: 2850, duration: '15h40', rating: 4.2, airline: 'Iberia' },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9 },
      { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.7 },
      { id: 'ph3', name: 'Pullman Tour Eiffel', stars: 4, price: 850, location: 'Tour Eiffel', rating: 4.5 },
      { id: 'ph4', name: 'Mercure Montmartre', stars: 4, price: 580, location: 'Montmartre', rating: 4.4 },
      { id: 'ph5', name: 'Ibis Bastille', stars: 3, price: 380, location: 'Bastille', rating: 4.2 },
      { id: 'ph6', name: 'Generator Paris', stars: 2, price: 150, location: 'Canal Saint-Martin', rating: 4.0 },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'pr2', name: 'Septime', price: 280, cuisine: 'Contemporânea', rating: 4.8, period: 'noite', tags: ['gastro'] },
      { id: 'pr3', name: 'Bouillon Chartier', price: 55, cuisine: 'Tradicional', rating: 4.5, period: 'tarde', tags: ['budget'] },
      { id: 'pr4', name: 'Café de Flore', price: 75, cuisine: 'Café', rating: 4.6, period: 'manhã', tags: ['romantic', 'culture'] },
      { id: 'pr5', name: 'Pink Mamma', price: 85, cuisine: 'Italiana', rating: 4.6, period: 'noite', tags: ['family'] },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars', tags: ['landmark', 'romantic'] },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement', tags: ['culture', 'art'] },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: '1h30', rating: 4.7, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais', tags: ['romantic', 'scenic'] },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: '6h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes', tags: ['culture', 'history'] },
      { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Montmartre', tags: ['culture', 'scenic'] },
      { id: 'pa6', name: 'Museu dOrsay', price: 85, duration: '3h', rating: 4.8, childFriendly: true, period: 'tarde', location: '7º Arrondissement', tags: ['culture', 'art'] },
      { id: 'pa7', name: 'Disneyland Paris', price: 380, duration: '10h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Marne-la-Vallée', tags: ['family', 'kids'] },
      { id: 'pa8', name: 'Jardim de Luxemburgo', price: 0, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement', tags: ['free', 'nature', 'romantic', 'relaxation'] },
      { id: 'pa9', name: 'Aula de Culinária', price: 120, duration: '3h', rating: 4.8, childFriendly: false, period: 'manhã', location: 'Le Marais', tags: ['gastro'] },
      { id: 'pa10', name: 'Show Moulin Rouge', price: 185, duration: '2h', rating: 4.6, childFriendly: false, period: 'noite', location: 'Pigalle', tags: ['nightlife', 'entertainment'] },
      { id: 'pa11', name: 'Sainte-Chapelle', price: 45, duration: '1h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Île de la Cité', tags: ['culture', 'history'] },
      { id: 'pa12', name: 'Galeries Lafayette', price: 0, duration: '3h', rating: 4.4, childFriendly: true, period: 'tarde', location: 'Boulevard Haussmann', tags: ['shopping', 'free'] },
    ]
  },
  'Nova York, EUA': {
    continent: 'América do Norte', image: '🗽', tags: ['culture', 'luxury', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
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
      { id: 'nr1', name: 'Eleven Madison Park', price: 1200, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'nr2', name: 'Katzs Deli', price: 65, cuisine: 'Deli', rating: 4.7, period: 'tarde', tags: ['culture', 'budget'] },
      { id: 'nr3', name: 'Joes Pizza', price: 25, cuisine: 'Pizza NY', rating: 4.6, period: 'tarde', tags: ['budget', 'family'] },
      { id: 'nr4', name: 'Le Bernardin', price: 450, cuisine: 'Frutos do Mar', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 180, duration: '2h', rating: 4.7, childFriendly: true, period: 'noite', location: '5th Avenue', tags: ['landmark', 'scenic'] },
      { id: 'na2', name: 'Estátua da Liberdade', price: 145, duration: '5h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Liberty Island', tags: ['landmark', 'history'] },
      { id: 'na3', name: 'Broadway Show', price: 380, duration: '3h', rating: 4.9, childFriendly: true, period: 'noite', location: 'Theater District', tags: ['entertainment', 'culture', 'nightlife'] },
      { id: 'na4', name: 'MoMA', price: 125, duration: '3h', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Midtown', tags: ['culture', 'art'] },
      { id: 'na5', name: 'Central Park Bike', price: 65, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Central Park', tags: ['adventure', 'nature', 'family'] },
      { id: 'na6', name: 'Top of the Rock', price: 165, duration: '1h30', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Rockefeller', tags: ['landmark', 'scenic'] },
      { id: 'na7', name: '9/11 Memorial', price: 95, duration: '3h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Lower Manhattan', tags: ['history', 'culture'] },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: '2h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Brooklyn Bridge', tags: ['free', 'scenic', 'romantic'] },
      { id: 'na9', name: 'High Line Park', price: 0, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Chelsea', tags: ['free', 'nature', 'relaxation'] },
      { id: 'na10', name: 'Chelsea Market', price: 0, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Chelsea', tags: ['gastro', 'shopping', 'free'] },
      { id: 'na11', name: 'SUMMIT One Vanderbilt', price: 195, duration: '1h30', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Midtown', tags: ['landmark', 'scenic'] },
      { id: 'na12', name: 'Outlet Woodbury', price: 85, duration: '8h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Woodbury', tags: ['shopping'] },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', image: '🌴', tags: ['beach', 'luxury', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    tip: 'Alugue carro para explorar as Keys e Everglades!',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.5, airline: 'American' },
      { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4, airline: 'LATAM' },
      { id: 'mf3', name: 'GOL - Direto', price: 2250, duration: '8h30', rating: 4.2, airline: 'GOL' },
      { id: 'mf4', name: 'Azul via Orlando', price: 2050, duration: '11h', rating: 4.1, airline: 'Azul' },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9 },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2400, location: 'South Beach', rating: 4.8 },
      { id: 'mh3', name: 'Fontainebleau', stars: 5, price: 1200, location: 'Mid-Beach', rating: 4.6 },
      { id: 'mh4', name: 'Hyatt Centric', stars: 4, price: 750, location: 'South Beach', rating: 4.5 },
      { id: 'mh5', name: 'Freehand Miami', stars: 3, price: 320, location: 'Miami Beach', rating: 4.4 },
      { id: 'mh6', name: 'Generator Miami', stars: 2, price: 140, location: 'South Beach', rating: 4.1 },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 350, cuisine: 'Japonesa', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'mr2', name: 'Joes Stone Crab', price: 220, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro'] },
      { id: 'mr3', name: 'Versailles', price: 45, cuisine: 'Cubana', rating: 4.6, period: 'tarde', tags: ['culture', 'budget'] },
      { id: 'mr4', name: 'Juvia', price: 180, cuisine: 'Fusion', rating: 4.7, period: 'noite', tags: ['gastro', 'romantic'] },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: '4h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach', tags: ['beach', 'free', 'relaxation'] },
      { id: 'ma2', name: 'Art Deco Tour', price: 45, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive', tags: ['culture', 'history'] },
      { id: 'ma3', name: 'Everglades Tour', price: 95, duration: '4h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades', tags: ['adventure', 'nature', 'family', 'kids'] },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood', tags: ['art', 'free', 'culture'] },
      { id: 'ma5', name: 'Vizcaya Museum', price: 65, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove', tags: ['culture', 'history', 'romantic'] },
      { id: 'ma6', name: 'Little Havana Tour', price: 75, duration: '3h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Little Havana', tags: ['gastro', 'culture'] },
      { id: 'ma7', name: 'Jet Ski South Beach', price: 120, duration: '1h', rating: 4.5, childFriendly: false, period: 'tarde', location: 'South Beach', tags: ['adventure', 'beach'] },
      { id: 'ma8', name: 'Key West Day Trip', price: 195, duration: '14h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Key West', tags: ['scenic', 'beach', 'adventure'] },
      { id: 'ma9', name: 'Sawgrass Mills Outlet', price: 0, duration: '5h', rating: 4.4, childFriendly: true, period: 'tarde', location: 'Sunrise', tags: ['shopping', 'free'] },
      { id: 'ma10', name: 'Miami Seaquarium', price: 85, duration: '4h', rating: 4.3, childFriendly: true, period: 'manhã', location: 'Key Biscayne', tags: ['family', 'kids'] },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', image: '🗾', tags: ['culture', 'gastro', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
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
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1800, cuisine: 'Sushi Omakase', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'tr2', name: 'Ichiran Ramen', price: 45, cuisine: 'Ramen', rating: 4.7, period: 'tarde', tags: ['budget', 'gastro'] },
      { id: 'tr3', name: 'Tsukiji Market', price: 75, cuisine: 'Frutos do Mar', rating: 4.8, period: 'manhã', tags: ['gastro', 'culture'] },
      { id: 'tr4', name: 'Gonpachi', price: 95, cuisine: 'Izakaya', rating: 4.6, period: 'noite', tags: ['gastro', 'culture'] },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 95, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Sumida', tags: ['landmark', 'scenic'] },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Asakusa', tags: ['culture', 'free'] },
      { id: 'ta3', name: 'teamLab Planets', price: 165, duration: '2h30', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Toyosu', tags: ['art', 'experience'] },
      { id: 'ta4', name: 'DisneySea Tokyo', price: 320, duration: '10h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Urayasu', tags: ['family', 'kids'] },
      { id: 'ta5', name: 'Monte Fuji Day Trip', price: 280, duration: '11h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Mt. Fuji', tags: ['nature', 'scenic', 'adventure'] },
      { id: 'ta6', name: 'Shibuya + Harajuku', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Shibuya', tags: ['culture', 'free', 'shopping'] },
      { id: 'ta7', name: 'Akihabara Tour', price: 55, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Akihabara', tags: ['culture', 'shopping'] },
      { id: 'ta8', name: 'Aula de Sushi', price: 150, duration: '3h', rating: 4.8, childFriendly: false, period: 'manhã', location: 'Tsukiji', tags: ['gastro'] },
      { id: 'ta9', name: 'Meiji Shrine', price: 0, duration: '1h30', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Harajuku', tags: ['culture', 'free', 'relaxation'] },
      { id: 'ta10', name: 'Robot Restaurant', price: 85, duration: '2h', rating: 4.3, childFriendly: false, period: 'noite', location: 'Shinjuku', tags: ['nightlife', 'entertainment'] },
      { id: 'ta11', name: 'Onsen Experience', price: 65, duration: '2h', rating: 4.6, childFriendly: false, period: 'noite', location: 'Odaiba', tags: ['relaxation', 'culture'] },
    ]
  },
  'Roma, Itália': {
    continent: 'Europa', image: '🏛️', tags: ['culture', 'gastro', 'romantic'],
    coverUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
    tip: 'Reserve Coliseu e Vaticano com antecedência! Filas de 3+ horas.',
    flights: [
      { id: 'rf1', name: 'ITA Airways - Direto', price: 3650, duration: '12h', rating: 4.4, airline: 'ITA' },
      { id: 'rf2', name: 'TAP via Lisboa', price: 2750, duration: '15h', rating: 4.2, airline: 'TAP' },
      { id: 'rf3', name: 'Iberia via Madrid', price: 2650, duration: '16h', rating: 4.1, airline: 'Iberia' },
    ],
    hotels: [
      { id: 'rh1', name: 'Hotel de Russie', stars: 5, price: 3200, location: 'Piazza del Popolo', rating: 4.9 },
      { id: 'rh2', name: 'Hotel Artemide', stars: 4, price: 580, location: 'Via Nazionale', rating: 4.5 },
      { id: 'rh3', name: 'Hotel Campo de Fiori', stars: 3, price: 320, location: 'Centro', rating: 4.3 },
      { id: 'rh4', name: 'Generator Rome', stars: 2, price: 120, location: 'Termini', rating: 4.0 },
    ],
    restaurants: [
      { id: 'rr1', name: 'La Pergola', price: 720, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'rr2', name: 'Roscioli', price: 120, cuisine: 'Romana', rating: 4.7, period: 'tarde', tags: ['gastro'] },
      { id: 'rr3', name: 'Da Baffetto', price: 35, cuisine: 'Pizza', rating: 4.6, period: 'noite', tags: ['budget', 'family'] },
      { id: 'rr4', name: 'Armando al Pantheon', price: 85, cuisine: 'Trattoria', rating: 4.7, period: 'tarde', tags: ['gastro', 'culture'] },
    ],
    activities: [
      { id: 'ra1', name: 'Coliseu + Fórum', price: 125, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Centro', tags: ['history', 'landmark', 'culture'] },
      { id: 'ra2', name: 'Vaticano + Sistina', price: 165, duration: '5h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Vaticano', tags: ['culture', 'art', 'history'] },
      { id: 'ra3', name: 'Fontana di Trevi', price: 0, duration: '1h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Centro', tags: ['landmark', 'romantic', 'free'] },
      { id: 'ra4', name: 'Aula de Pasta', price: 85, duration: '3h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Trastevere', tags: ['gastro'] },
      { id: 'ra5', name: 'Villa Borghese', price: 55, duration: '3h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Villa Borghese', tags: ['art', 'nature', 'relaxation'] },
      { id: 'ra6', name: 'Trastevere Food Tour', price: 75, duration: '3h', rating: 4.7, childFriendly: true, period: 'noite', location: 'Trastevere', tags: ['gastro', 'culture', 'nightlife'] },
      { id: 'ra7', name: 'Panteão', price: 0, duration: '1h', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Centro', tags: ['history', 'free', 'culture'] },
      { id: 'ra8', name: 'Piazza Navona', price: 0, duration: '1h', rating: 4.5, childFriendly: true, period: 'noite', location: 'Centro', tags: ['free', 'scenic', 'romantic'] },
      { id: 'ra9', name: 'Galleria Borghese', price: 65, duration: '2h', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Villa Borghese', tags: ['art', 'culture'] },
    ]
  },
  'Barcelona, Espanha': {
    continent: 'Europa', image: '🏖️', tags: ['beach', 'culture', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
    tip: 'Sagrada Família esgota rápido! Reserve online 2+ semanas antes.',
    flights: [
      { id: 'bf1', name: 'Iberia via Madrid', price: 2650, duration: '14h', rating: 4.3, airline: 'Iberia' },
      { id: 'bf2', name: 'TAP via Lisboa', price: 2450, duration: '13h', rating: 4.2, airline: 'TAP' },
    ],
    hotels: [
      { id: 'bh1', name: 'Hotel Arts', stars: 5, price: 2400, location: 'Port Olímpic', rating: 4.8 },
      { id: 'bh2', name: 'W Barcelona', stars: 5, price: 1800, location: 'Barceloneta', rating: 4.7 },
      { id: 'bh3', name: 'Hotel 1898', stars: 4, price: 520, location: 'Las Ramblas', rating: 4.5 },
      { id: 'bh4', name: 'Generator Barcelona', stars: 2, price: 110, location: 'Gràcia', rating: 4.1 },
    ],
    restaurants: [
      { id: 'br1', name: 'Tickets', price: 220, cuisine: 'Tapas Modernas', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'br2', name: 'Cal Pep', price: 110, cuisine: 'Frutos do Mar', rating: 4.7, period: 'tarde', tags: ['gastro'] },
      { id: 'br3', name: 'La Boqueria', price: 45, cuisine: 'Mercado', rating: 4.6, period: 'tarde', tags: ['gastro', 'budget'] },
    ],
    activities: [
      { id: 'ba1', name: 'Sagrada Família', price: 95, duration: '2h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Eixample', tags: ['landmark', 'culture', 'art'] },
      { id: 'ba2', name: 'Park Güell', price: 55, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Gràcia', tags: ['art', 'nature'] },
      { id: 'ba3', name: 'Casa Batlló', price: 85, duration: '1h30', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Passeig de Gràcia', tags: ['art', 'culture'] },
      { id: 'ba4', name: 'Barceloneta Beach', price: 0, duration: '4h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Barceloneta', tags: ['beach', 'free', 'relaxation'] },
      { id: 'ba5', name: 'Gothic Quarter', price: 35, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Barri Gòtic', tags: ['history', 'culture'] },
      { id: 'ba6', name: 'Camp Nou Tour', price: 65, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Les Corts', tags: ['sports', 'family'] },
      { id: 'ba7', name: 'Show de Flamenco', price: 85, duration: '1h30', rating: 4.6, childFriendly: true, period: 'noite', location: 'Ciutat Vella', tags: ['culture', 'nightlife'] },
      { id: 'ba8', name: 'La Pedrera', price: 75, duration: '1h30', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Passeig de Gràcia', tags: ['art', 'culture'] },
      { id: 'ba9', name: 'Montjuïc', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Montjuïc', tags: ['scenic', 'free', 'nature'] },
    ]
  },
  'Lisboa, Portugal': {
    continent: 'Europa', image: '🇵🇹', tags: ['culture', 'gastro', 'romantic'],
    coverUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200',
    tip: 'Lisboa Card dá transporte ilimitado + museus. Vale muito!',
    flights: [
      { id: 'lf1', name: 'TAP - Direto', price: 2450, duration: '9h', rating: 4.5, airline: 'TAP' },
      { id: 'lf2', name: 'Azul - Direto', price: 2280, duration: '9h', rating: 4.3, airline: 'Azul' },
    ],
    hotels: [
      { id: 'lh1', name: 'Four Seasons Ritz', stars: 5, price: 2200, location: 'Marquês de Pombal', rating: 4.9 },
      { id: 'lh2', name: 'LX Boutique', stars: 4, price: 420, location: 'Cais do Sodré', rating: 4.5 },
      { id: 'lh3', name: 'My Story Rossio', stars: 3, price: 280, location: 'Baixa', rating: 4.3 },
      { id: 'lh4', name: 'Lisboa Central Hostel', stars: 2, price: 85, location: 'Baixa', rating: 4.2 },
    ],
    restaurants: [
      { id: 'lr1', name: 'Belcanto', price: 520, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'lr2', name: 'Cervejaria Ramiro', price: 95, cuisine: 'Frutos do Mar', rating: 4.8, period: 'noite', tags: ['gastro'] },
      { id: 'lr3', name: 'Time Out Market', price: 55, cuisine: 'Food Hall', rating: 4.6, period: 'tarde', tags: ['gastro', 'family'] },
      { id: 'lr4', name: 'Pastéis de Belém', price: 18, cuisine: 'Pastelaria', rating: 4.8, period: 'manhã', tags: ['gastro', 'budget', 'culture'] },
    ],
    activities: [
      { id: 'la1', name: 'Torre de Belém', price: 45, duration: '1h30', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Belém', tags: ['landmark', 'history'] },
      { id: 'la2', name: 'Mosteiro Jerónimos', price: 55, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Belém', tags: ['history', 'culture'] },
      { id: 'la3', name: 'Elétrico 28', price: 18, duration: '1h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Alfama', tags: ['scenic', 'culture'] },
      { id: 'la4', name: 'Sintra Day Trip', price: 125, duration: '8h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Sintra', tags: ['nature', 'history', 'romantic'] },
      { id: 'la5', name: 'Fado Show', price: 75, duration: '2h', rating: 4.7, childFriendly: false, period: 'noite', location: 'Alfama', tags: ['culture', 'nightlife'] },
      { id: 'la6', name: 'Oceanário', price: 55, duration: '3h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Parque das Nações', tags: ['family', 'kids'] },
      { id: 'la7', name: 'Alfama Walking Tour', price: 25, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Alfama', tags: ['culture', 'budget'] },
      { id: 'la8', name: 'Miradouro da Senhora do Monte', price: 0, duration: '1h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Graça', tags: ['scenic', 'free', 'romantic'] },
    ]
  },
  'Cancún, México': {
    continent: 'América do Norte', image: '🏝️', tags: ['beach', 'adventure', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1200',
    tip: 'Visite Chichén Itzá bem cedo para evitar calor e multidões!',
    flights: [
      { id: 'cf1', name: 'Aeroméxico - Direto', price: 2450, duration: '7h', rating: 4.4, airline: 'Aeroméxico' },
      { id: 'cf2', name: 'LATAM via Lima', price: 2150, duration: '10h', rating: 4.2, airline: 'LATAM' },
      { id: 'cf3', name: 'Copa via Panamá', price: 1950, duration: '9h', rating: 4.1, airline: 'Copa' },
    ],
    hotels: [
      { id: 'ch1', name: 'Le Blanc Spa', stars: 5, price: 2400, location: 'Zona Hoteleira', rating: 4.9 },
      { id: 'ch2', name: 'Hyatt Ziva', stars: 5, price: 1400, location: 'Punta Cancun', rating: 4.7 },
      { id: 'ch3', name: 'Fiesta Americana', stars: 4, price: 580, location: 'Zona Hoteleira', rating: 4.5 },
      { id: 'ch4', name: 'Selina Cancun', stars: 3, price: 180, location: 'Centro', rating: 4.2 },
    ],
    restaurants: [
      { id: 'cr1', name: 'Lorenzillos', price: 195, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'cr2', name: 'La Habichuela', price: 125, cuisine: 'Yucateca', rating: 4.7, period: 'noite', tags: ['gastro', 'culture'] },
      { id: 'cr3', name: 'Tacos Rigo', price: 25, cuisine: 'Tacos', rating: 4.5, period: 'tarde', tags: ['budget', 'gastro'] },
    ],
    activities: [
      { id: 'ca1', name: 'Chichén Itzá', price: 220, duration: '10h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Yucatán', tags: ['history', 'culture'] },
      { id: 'ca2', name: 'Xcaret Park', price: 320, duration: '10h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Riviera Maya', tags: ['nature', 'family', 'kids', 'beach'] },
      { id: 'ca3', name: 'Isla Mujeres', price: 120, duration: '6h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Isla Mujeres', tags: ['beach', 'scenic', 'relaxation'] },
      { id: 'ca4', name: 'Cenote Ik Kil', price: 65, duration: '4h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Valladolid', tags: ['nature', 'adventure', 'beach'] },
      { id: 'ca5', name: 'Snorkel Cozumel', price: 145, duration: '6h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Cozumel', tags: ['adventure', 'beach'] },
      { id: 'ca6', name: 'Ruínas de Tulum', price: 115, duration: '5h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Tulum', tags: ['history', 'beach', 'culture'] },
      { id: 'ca7', name: 'Xel-Há All Inclusive', price: 280, duration: '8h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Riviera Maya', tags: ['beach', 'family', 'relaxation'] },
      { id: 'ca8', name: 'Coco Bongo', price: 95, duration: '4h', rating: 4.5, childFriendly: false, period: 'noite', location: 'Zona Hoteleira', tags: ['nightlife'] },
    ]
  },
  'Dubai, EAU': {
    continent: 'Ásia', image: '🏙️', tags: ['luxury', 'adventure', 'family'],
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    tip: 'Reserve Burj Khalifa para o pôr do sol! A vista é espetacular.',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 4850, duration: '14h', rating: 4.8, airline: 'Emirates' },
      { id: 'df2', name: 'Qatar via Doha', price: 3650, duration: '18h', rating: 4.6, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 7500, location: 'Jumeirah', rating: 4.9 },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 2600, location: 'Palm Jumeirah', rating: 4.7 },
      { id: 'dh3', name: 'JW Marriott Marquis', stars: 5, price: 950, location: 'Business Bay', rating: 4.6 },
      { id: 'dh4', name: 'Rove Downtown', stars: 4, price: 480, location: 'Downtown', rating: 4.4 },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 550, cuisine: 'Fine Dining', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury', 'romantic'] },
      { id: 'dr2', name: 'Pierchic', price: 380, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite', tags: ['gastro', 'romantic'] },
      { id: 'dr3', name: 'Ravi Restaurant', price: 25, cuisine: 'Paquistanesa', rating: 4.6, period: 'tarde', tags: ['budget', 'culture'] },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa', price: 220, duration: '2h', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Downtown', tags: ['landmark', 'scenic'] },
      { id: 'da2', name: 'Desert Safari', price: 165, duration: '6h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Deserto', tags: ['adventure', 'culture'] },
      { id: 'da3', name: 'Dubai Mall + Fountain', price: 0, duration: '4h', rating: 4.6, childFriendly: true, period: 'noite', location: 'Downtown', tags: ['free', 'shopping', 'scenic'] },
      { id: 'da4', name: 'Aquaventure', price: 280, duration: '6h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Palm Jumeirah', tags: ['family', 'adventure', 'kids'] },
      { id: 'da5', name: 'Dubai Frame', price: 75, duration: '1h30', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Zabeel Park', tags: ['landmark', 'scenic'] },
      { id: 'da6', name: 'Dhow Creek Cruise', price: 65, duration: '2h', rating: 4.4, childFriendly: true, period: 'noite', location: 'Dubai Creek', tags: ['scenic', 'romantic'] },
      { id: 'da7', name: 'Gold & Spice Souk', price: 0, duration: '2h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Deira', tags: ['shopping', 'culture', 'free'] },
      { id: 'da8', name: 'Ski Dubai', price: 95, duration: '3h', rating: 4.4, childFriendly: true, period: 'tarde', location: 'Mall of Emirates', tags: ['family', 'adventure', 'kids'] },
    ]
  },
  'Londres, UK': {
    continent: 'Europa', image: '🇬🇧', tags: ['culture', 'family', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200',
    tip: 'Museus são gratuitos! British Museum e National Gallery valem muito.',
    flights: [
      { id: 'lof1', name: 'British Airways - Direto', price: 4350, duration: '11h', rating: 4.6, airline: 'British Airways' },
      { id: 'lof2', name: 'TAP via Lisboa', price: 2850, duration: '14h', rating: 4.2, airline: 'TAP' },
    ],
    hotels: [
      { id: 'loh1', name: 'The Savoy', stars: 5, price: 3800, location: 'Strand', rating: 4.9 },
      { id: 'loh2', name: 'citizenM Tower', stars: 4, price: 620, location: 'Tower Hill', rating: 4.5 },
      { id: 'loh3', name: 'Hub by Premier Inn', stars: 3, price: 350, location: 'Westminster', rating: 4.2 },
      { id: 'loh4', name: 'Generator London', stars: 2, price: 130, location: 'Kings Cross', rating: 4.0 },
    ],
    restaurants: [
      { id: 'lor1', name: 'The Ledbury', price: 680, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'lor2', name: 'Dishoom', price: 75, cuisine: 'Indiana', rating: 4.7, period: 'tarde', tags: ['gastro', 'culture'] },
      { id: 'lor3', name: 'Borough Market', price: 45, cuisine: 'Food Market', rating: 4.6, period: 'tarde', tags: ['gastro', 'budget'] },
    ],
    activities: [
      { id: 'loa1', name: 'Tower of London', price: 165, duration: '3h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Tower Hill', tags: ['history', 'landmark'] },
      { id: 'loa2', name: 'British Museum', price: 0, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Bloomsbury', tags: ['culture', 'free', 'history'] },
      { id: 'loa3', name: 'London Eye', price: 155, duration: '1h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'South Bank', tags: ['landmark', 'scenic'] },
      { id: 'loa4', name: 'Harry Potter Studio', price: 265, duration: '5h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Watford', tags: ['family', 'kids'] },
      { id: 'loa5', name: 'Westminster Tour', price: 35, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Westminster', tags: ['history', 'culture'] },
      { id: 'loa6', name: 'West End Show', price: 350, duration: '3h', rating: 4.8, childFriendly: true, period: 'noite', location: 'West End', tags: ['entertainment', 'culture', 'nightlife'] },
      { id: 'loa7', name: 'Buckingham Palace', price: 85, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Westminster', tags: ['history', 'landmark'] },
      { id: 'loa8', name: 'Camden Market', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Camden', tags: ['shopping', 'free', 'culture'] },
      { id: 'loa9', name: 'Hyde Park', price: 0, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Hyde Park', tags: ['nature', 'free', 'relaxation'] },
    ]
  },
  'Maldivas': {
    continent: 'Ásia', image: '🏝️', tags: ['beach', 'romantic', 'luxury'],
    coverUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=1200',
    tip: 'Melhor época: novembro a abril (estação seca).',
    flights: [
      { id: 'mvf1', name: 'Emirates via Dubai', price: 6200, duration: '22h', rating: 4.7, airline: 'Emirates' },
      { id: 'mvf2', name: 'Qatar via Doha', price: 5800, duration: '24h', rating: 4.6, airline: 'Qatar' },
    ],
    hotels: [
      { id: 'mvh1', name: 'Soneva Fushi', stars: 5, price: 8500, location: 'Baa Atoll', rating: 4.9 },
      { id: 'mvh2', name: 'Conrad Maldives', stars: 5, price: 4500, location: 'Rangali Island', rating: 4.8 },
      { id: 'mvh3', name: 'Anantara Veli', stars: 5, price: 2800, location: 'South Malé', rating: 4.7 },
      { id: 'mvh4', name: 'Centara Ras Fushi', stars: 4, price: 1200, location: 'North Malé', rating: 4.5 },
    ],
    restaurants: [
      { id: 'mvr1', name: 'Ithaa Undersea', price: 950, cuisine: 'Fine Dining Subaquático', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury', 'romantic'] },
      { id: 'mvr2', name: 'Resort Dining', price: 180, cuisine: 'Internacional', rating: 4.6, period: 'noite', tags: ['gastro'] },
    ],
    activities: [
      { id: 'mva1', name: 'Snorkel com Mantas', price: 180, duration: '3h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Hanifaru Bay', tags: ['adventure', 'nature', 'beach'] },
      { id: 'mva2', name: 'Mergulho Certificado', price: 250, duration: '4h', rating: 4.8, childFriendly: false, period: 'manhã', location: 'Atoll', tags: ['adventure', 'beach'] },
      { id: 'mva3', name: 'Sunset Dolphin Cruise', price: 95, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Oceano Índico', tags: ['romantic', 'scenic', 'relaxation'] },
      { id: 'mva4', name: 'Spa Overwater', price: 350, duration: '2h', rating: 4.8, childFriendly: false, period: 'tarde', location: 'Resort', tags: ['relaxation', 'luxury', 'romantic'] },
      { id: 'mva5', name: 'Jantar Privado na Praia', price: 450, duration: '3h', rating: 4.9, childFriendly: false, period: 'noite', location: 'Resort', tags: ['romantic', 'gastro', 'luxury'] },
      { id: 'mva6', name: 'Kayak no Atoll', price: 45, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Resort', tags: ['adventure', 'beach'] },
      { id: 'mva7', name: 'Pesca ao Pôr do Sol', price: 120, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Oceano Índico', tags: ['adventure', 'relaxation'] },
    ]
  },
  'Santorini, Grécia': {
    continent: 'Europa', image: '🇬🇷', tags: ['romantic', 'beach', 'culture'],
    coverUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200',
    tip: 'Reserve restaurantes em Oia para o pôr do sol com antecedência!',
    flights: [
      { id: 'sf1', name: 'TAP via Lisboa + Atenas', price: 3850, duration: '18h', rating: 4.3, airline: 'TAP' },
      { id: 'sf2', name: 'Turkish via Istambul', price: 3250, duration: '20h', rating: 4.2, airline: 'Turkish' },
    ],
    hotels: [
      { id: 'sh1', name: 'Grace Hotel', stars: 5, price: 3200, location: 'Imerovigli', rating: 4.9 },
      { id: 'sh2', name: 'Canaves Oia', stars: 5, price: 2400, location: 'Oia', rating: 4.8 },
      { id: 'sh3', name: 'Cosmopolitan Suites', stars: 4, price: 850, location: 'Fira', rating: 4.6 },
      { id: 'sh4', name: 'Youth Hostel Anna', stars: 2, price: 120, location: 'Perissa', rating: 4.0 },
    ],
    restaurants: [
      { id: 'sr1', name: 'Lycabettus', price: 220, cuisine: 'Grega Contemporânea', rating: 4.8, period: 'noite', tags: ['gastro', 'romantic'] },
      { id: 'sr2', name: 'Ammoudi Fish Tavern', price: 85, cuisine: 'Frutos do Mar', rating: 4.7, period: 'tarde', tags: ['gastro', 'culture'] },
    ],
    activities: [
      { id: 'sa1', name: 'Pôr do Sol em Oia', price: 0, duration: '2h', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Oia', tags: ['romantic', 'free', 'scenic'] },
      { id: 'sa2', name: 'Passeio de Catamarã', price: 165, duration: '5h', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Caldera', tags: ['romantic', 'scenic', 'beach', 'adventure'] },
      { id: 'sa3', name: 'Wine Tasting', price: 95, duration: '4h', rating: 4.7, childFriendly: false, period: 'tarde', location: 'Vinícolas', tags: ['gastro', 'culture'] },
      { id: 'sa4', name: 'Akrotiri Site', price: 35, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Akrotiri', tags: ['history', 'culture'] },
      { id: 'sa5', name: 'Red Beach', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Red Beach', tags: ['beach', 'free', 'nature'] },
      { id: 'sa6', name: 'Fira to Oia Hike', price: 0, duration: '4h', rating: 4.6, childFriendly: false, period: 'manhã', location: 'Caldera Trail', tags: ['adventure', 'free', 'scenic'] },
      { id: 'sa7', name: 'Hot Springs', price: 45, duration: '2h', rating: 4.4, childFriendly: true, period: 'tarde', location: 'Nea Kameni', tags: ['relaxation', 'nature'] },
    ]
  },
  'Bali, Indonésia': {
    continent: 'Ásia', image: '🌺', tags: ['beach', 'culture', 'romantic'],
    coverUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
    tip: 'Alugue scooter para explorar Ubud facilmente e economicamente!',
    flights: [
      { id: 'blf1', name: 'Singapore via Singapura', price: 4800, duration: '26h', rating: 4.6, airline: 'Singapore' },
      { id: 'blf2', name: 'Emirates via Dubai', price: 5200, duration: '28h', rating: 4.5, airline: 'Emirates' },
    ],
    hotels: [
      { id: 'blh1', name: 'Four Seasons Sayan', stars: 5, price: 3800, location: 'Ubud', rating: 4.9 },
      { id: 'blh2', name: 'Potato Head Suites', stars: 5, price: 1400, location: 'Seminyak', rating: 4.7 },
      { id: 'blh3', name: 'The Kayon Resort', stars: 4, price: 450, location: 'Ubud', rating: 4.6 },
      { id: 'blh4', name: 'Kos One Hostel', stars: 2, price: 65, location: 'Canggu', rating: 4.1 },
    ],
    restaurants: [
      { id: 'blr1', name: 'Locavore', price: 280, cuisine: 'Fine Dining Local', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'blr2', name: 'Warung Babi Guling', price: 25, cuisine: 'Balinesa', rating: 4.7, period: 'tarde', tags: ['gastro', 'budget', 'culture'] },
    ],
    activities: [
      { id: 'bla1', name: 'Terraços de Tegallalang', price: 15, duration: '2h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Ubud', tags: ['nature', 'culture', 'scenic'] },
      { id: 'bla2', name: 'Templo Uluwatu + Kecak', price: 45, duration: '4h', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Uluwatu', tags: ['culture', 'scenic'] },
      { id: 'bla3', name: 'Tirta Empul Temple', price: 25, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Tampaksiring', tags: ['culture', 'spiritual'] },
      { id: 'bla4', name: 'Monte Batur Sunrise', price: 75, duration: '8h', rating: 4.7, childFriendly: false, period: 'manhã', location: 'Monte Batur', tags: ['adventure', 'nature', 'scenic'] },
      { id: 'bla5', name: 'Aula de Surf', price: 55, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Canggu', tags: ['adventure', 'beach'] },
      { id: 'bla6', name: 'Spa Balinês', price: 85, duration: '2h', rating: 4.8, childFriendly: false, period: 'tarde', location: 'Ubud', tags: ['relaxation', 'luxury'] },
      { id: 'bla7', name: 'Nusa Penida Day Trip', price: 120, duration: '10h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Nusa Penida', tags: ['beach', 'adventure', 'scenic'] },
      { id: 'bla8', name: 'Monkey Forest', price: 15, duration: '2h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Ubud', tags: ['nature', 'family', 'kids'] },
      { id: 'bla9', name: 'Tanah Lot Sunset', price: 25, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Tanah Lot', tags: ['culture', 'scenic', 'romantic'] },
    ]
  },
  'Amsterdam, Holanda': {
    continent: 'Europa', image: '🌷', tags: ['culture', 'romantic', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=1200',
    tip: 'Alugue bicicleta! É a melhor forma de explorar a cidade.',
    flights: [
      { id: 'amf1', name: 'KLM - Direto', price: 3650, duration: '12h', rating: 4.7, airline: 'KLM' },
      { id: 'amf2', name: 'TAP via Lisboa', price: 2850, duration: '15h', rating: 4.3, airline: 'TAP' },
    ],
    hotels: [
      { id: 'amh1', name: 'Waldorf Astoria', stars: 5, price: 2800, location: 'Canal Ring', rating: 4.9 },
      { id: 'amh2', name: 'Pulitzer Amsterdam', stars: 5, price: 1650, location: 'Jordaan', rating: 4.7 },
      { id: 'amh3', name: 'Hotel V Nesplein', stars: 4, price: 480, location: 'Centro', rating: 4.5 },
      { id: 'amh4', name: 'Generator Amsterdam', stars: 2, price: 95, location: 'Oost', rating: 4.1 },
    ],
    restaurants: [
      { id: 'amr1', name: 'Ciel Bleu', price: 450, cuisine: 'Fine Dining', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'amr2', name: 'Foodhallen', price: 55, cuisine: 'Food Hall', rating: 4.6, period: 'tarde', tags: ['gastro', 'family'] },
    ],
    activities: [
      { id: 'ama1', name: 'Museu Van Gogh', price: 95, duration: '3h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Museumplein', tags: ['culture', 'art'] },
      { id: 'ama2', name: 'Anne Frank House', price: 75, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Jordaan', tags: ['history', 'culture'] },
      { id: 'ama3', name: 'Cruzeiro pelos Canais', price: 45, duration: '1h30', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Canais', tags: ['scenic', 'romantic'] },
      { id: 'ama4', name: 'Rijksmuseum', price: 85, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Museumplein', tags: ['culture', 'art', 'history'] },
      { id: 'ama5', name: 'Tour de Bike', price: 35, duration: '3h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Centro', tags: ['adventure', 'scenic'] },
      { id: 'ama6', name: 'Heineken Experience', price: 65, duration: '2h', rating: 4.5, childFriendly: false, period: 'tarde', location: 'De Pijp', tags: ['culture', 'gastro'] },
      { id: 'ama7', name: 'Vondelpark', price: 0, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Zuid', tags: ['nature', 'free', 'relaxation'] },
      { id: 'ama8', name: 'Keukenhof Gardens', price: 95, duration: '5h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Lisse', tags: ['nature', 'scenic'] },
    ]
  },
  'Sydney, Austrália': {
    continent: 'Oceania', image: '🦘', tags: ['beach', 'adventure', 'culture'],
    coverUrl: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200',
    tip: 'Faça o Bondi to Coogee coastal walk - é gratuito e espetacular!',
    flights: [
      { id: 'syf1', name: 'Qantas via Santiago', price: 7200, duration: '24h', rating: 4.7, airline: 'Qantas' },
      { id: 'syf2', name: 'Emirates via Dubai', price: 6800, duration: '30h', rating: 4.6, airline: 'Emirates' },
    ],
    hotels: [
      { id: 'syh1', name: 'Park Hyatt Sydney', stars: 5, price: 4200, location: 'The Rocks', rating: 4.9 },
      { id: 'syh2', name: 'QT Sydney', stars: 5, price: 1800, location: 'CBD', rating: 4.7 },
      { id: 'syh3', name: 'Ovolo Woolloomooloo', stars: 4, price: 850, location: 'Woolloomooloo', rating: 4.6 },
      { id: 'syh4', name: 'Wake Up Sydney', stars: 2, price: 95, location: 'CBD', rating: 4.1 },
    ],
    restaurants: [
      { id: 'syr1', name: 'Quay', price: 580, cuisine: 'Fine Dining', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'syr2', name: 'The Grounds', price: 75, cuisine: 'Café Australiano', rating: 4.7, period: 'manhã', tags: ['gastro', 'family'] },
    ],
    activities: [
      { id: 'sya1', name: 'Opera House Tour', price: 145, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Circular Quay', tags: ['landmark', 'culture'] },
      { id: 'sya2', name: 'Bondi Beach', price: 0, duration: '4h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Bondi', tags: ['beach', 'free', 'relaxation'] },
      { id: 'sya3', name: 'Harbour Bridge Climb', price: 350, duration: '3h', rating: 4.9, childFriendly: false, period: 'manhã', location: 'The Rocks', tags: ['adventure', 'scenic'] },
      { id: 'sya4', name: 'Taronga Zoo', price: 125, duration: '5h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Mosman', tags: ['family', 'kids', 'nature'] },
      { id: 'sya5', name: 'Bondi to Coogee Walk', price: 0, duration: '3h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Bondi', tags: ['adventure', 'free', 'scenic', 'beach'] },
      { id: 'sya6', name: 'Blue Mountains Day Trip', price: 195, duration: '10h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Blue Mountains', tags: ['nature', 'adventure', 'scenic'] },
      { id: 'sya7', name: 'The Rocks Markets', price: 0, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'The Rocks', tags: ['shopping', 'free', 'culture'] },
      { id: 'sya8', name: 'Manly Ferry + Beach', price: 25, duration: '4h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Manly', tags: ['beach', 'scenic', 'family'] },
    ]
  },
  'Cape Town, África do Sul': {
    continent: 'África', image: '🦁', tags: ['adventure', 'nature', 'gastro'],
    coverUrl: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=1200',
    tip: 'Table Mountain: vá cedo ou perto do pôr do sol para menos filas!',
    flights: [
      { id: 'ctf1', name: 'South African via Joburg', price: 4200, duration: '18h', rating: 4.3, airline: 'South African' },
      { id: 'ctf2', name: 'Emirates via Dubai', price: 4800, duration: '22h', rating: 4.6, airline: 'Emirates' },
    ],
    hotels: [
      { id: 'cth1', name: 'Ellerman House', stars: 5, price: 4500, location: 'Bantry Bay', rating: 4.9 },
      { id: 'cth2', name: 'One&Only Cape Town', stars: 5, price: 2800, location: 'V&A Waterfront', rating: 4.8 },
      { id: 'cth3', name: 'Taj Cape Town', stars: 5, price: 950, location: 'City Centre', rating: 4.6 },
      { id: 'cth4', name: 'Never@Home', stars: 2, price: 85, location: 'Long Street', rating: 4.2 },
    ],
    restaurants: [
      { id: 'ctr1', name: 'The Test Kitchen', price: 380, cuisine: 'Fine Dining Africana', rating: 4.9, period: 'noite', tags: ['gastro', 'luxury'] },
      { id: 'ctr2', name: 'La Colombe', price: 320, cuisine: 'Francesa', rating: 4.8, period: 'noite', tags: ['gastro', 'luxury', 'romantic'] },
    ],
    activities: [
      { id: 'cta1', name: 'Table Mountain', price: 95, duration: '3h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Table Mountain', tags: ['landmark', 'nature', 'scenic'] },
      { id: 'cta2', name: 'Cape Peninsula Tour', price: 145, duration: '10h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Cape Peninsula', tags: ['scenic', 'nature', 'adventure'] },
      { id: 'cta3', name: 'Robben Island', price: 85, duration: '4h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Robben Island', tags: ['history', 'culture'] },
      { id: 'cta4', name: 'Wine Tasting Stellenbosch', price: 125, duration: '6h', rating: 4.7, childFriendly: false, period: 'manhã', location: 'Stellenbosch', tags: ['gastro', 'scenic'] },
      { id: 'cta5', name: 'Shark Cage Diving', price: 280, duration: '8h', rating: 4.6, childFriendly: false, period: 'manhã', location: 'Gansbaai', tags: ['adventure'] },
      { id: 'cta6', name: 'Bo-Kaap Tour', price: 35, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Bo-Kaap', tags: ['culture', 'history'] },
      { id: 'cta7', name: 'V&A Waterfront', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Waterfront', tags: ['shopping', 'free', 'family'] },
      { id: 'cta8', name: 'Camps Bay Beach', price: 0, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Camps Bay', tags: ['beach', 'free', 'relaxation'] },
    ]
  },
};

const COMMUNITY_ITINERARIES = [
  { id: 'ci1', title: 'Paris Romântica - Lua de Mel', destination: 'Paris, França', author: { name: 'Marina Silva', avatar: '👩', verified: true }, duration: 7, budget: 35000, travelers: 2, likes: 4521, rating: 4.9, reviews: 412, tags: ['romantic', 'luxury'], highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro no Sena', 'Jantar Le Cinq'], featured: true, flightId: 'pf1', hotelId: 'ph3' },
  { id: 'ci2', title: 'Paris Econômico', destination: 'Paris, França', author: { name: 'Lucas Costa', avatar: '👨', verified: false }, duration: 5, budget: 10000, travelers: 1, likes: 2845, rating: 4.6, reviews: 228, tags: ['budget'], highlights: ['Museus Gratuitos', 'Passeios a Pé', 'Boulangeries'], featured: false, flightId: 'pf5', hotelId: 'ph6' },
  { id: 'ci3', title: 'NYC em 5 Dias', destination: 'Nova York, EUA', author: { name: 'Juliana Costa', avatar: '👩', verified: true }, duration: 5, budget: 22000, travelers: 2, likes: 5234, rating: 4.8, reviews: 523, tags: ['culture'], highlights: ['Top of the Rock', 'Broadway', 'Central Park'], featured: true, flightId: 'nf3', hotelId: 'nh4' },
  { id: 'ci4', title: 'NYC Shopping & Shows', destination: 'Nova York, EUA', author: { name: 'Patrícia Lima', avatar: '👩', verified: true }, duration: 7, budget: 45000, travelers: 2, likes: 3890, rating: 4.7, reviews: 345, tags: ['luxury', 'culture'], highlights: ['Woodbury Outlet', '3 Shows Broadway', 'Fifth Avenue'], featured: false, flightId: 'nf1', hotelId: 'nh2' },
  { id: 'ci5', title: 'Miami Beach Life', destination: 'Miami, EUA', author: { name: 'Camila Andrade', avatar: '👩', verified: true }, duration: 5, budget: 18000, travelers: 2, likes: 3456, rating: 4.7, reviews: 312, tags: ['beach'], highlights: ['South Beach', 'Wynwood', 'Pool Parties'], featured: true, flightId: 'mf2', hotelId: 'mh5' },
  { id: 'ci6', title: 'Miami em Família', destination: 'Miami, EUA', author: { name: 'Roberto Alves', avatar: '👨', verified: true }, duration: 7, budget: 32000, travelers: 4, likes: 2567, rating: 4.6, reviews: 234, tags: ['family'], highlights: ['Everglades', 'Seaquarium', 'Key West'], featured: false, flightId: 'mf1', hotelId: 'mh4' },
  { id: 'ci7', title: 'Tóquio em Família', destination: 'Tóquio, Japão', author: { name: 'Pedro Santos', avatar: '👨', verified: true }, duration: 10, budget: 55000, travelers: 4, likes: 2890, rating: 4.8, reviews: 234, tags: ['family', 'culture'], highlights: ['DisneySea', 'teamLab', 'Senso-ji'], featured: true, flightId: 'tf3', hotelId: 'th2' },
  { id: 'ci8', title: 'Tóquio Gastronômico', destination: 'Tóquio, Japão', author: { name: 'Chef André', avatar: '👨', verified: true }, duration: 8, budget: 42000, travelers: 2, likes: 3456, rating: 4.9, reviews: 298, tags: ['gastro'], highlights: ['Tsukiji Market', 'Aula de Sushi', 'Ramen Hopping'], featured: false, flightId: 'tf2', hotelId: 'th3' },
  { id: 'ci9', title: 'Roma Histórica', destination: 'Roma, Itália', author: { name: 'Marcos Oliveira', avatar: '👨', verified: true }, duration: 6, budget: 24000, travelers: 2, likes: 3234, rating: 4.8, reviews: 289, tags: ['culture'], highlights: ['Coliseu VIP', 'Vaticano', 'Trastevere'], featured: true, flightId: 'rf2', hotelId: 'rh2' },
  { id: 'ci10', title: 'Roma Gastronômica', destination: 'Roma, Itália', author: { name: 'Giovanna Rossi', avatar: '👩', verified: true }, duration: 5, budget: 22000, travelers: 2, likes: 2456, rating: 4.9, reviews: 198, tags: ['gastro'], highlights: ['Aula de Pasta', 'Trastevere Food Tour', 'Mercado Testaccio'], featured: false, flightId: 'rf3', hotelId: 'rh3' },
  { id: 'ci11', title: 'Barcelona Gaudí', destination: 'Barcelona, Espanha', author: { name: 'Sofia Martinez', avatar: '👩', verified: true }, duration: 6, budget: 22000, travelers: 2, likes: 3678, rating: 4.7, reviews: 312, tags: ['beach', 'culture'], highlights: ['Sagrada Família', 'Park Güell', 'Barceloneta'], featured: true, flightId: 'bf2', hotelId: 'bh3' },
  { id: 'ci12', title: 'Lisboa Pastéis e Fado', destination: 'Lisboa, Portugal', author: { name: 'Antonio Ferreira', avatar: '👨', verified: true }, duration: 5, budget: 15000, travelers: 2, likes: 4123, rating: 4.8, reviews: 389, tags: ['gastro', 'culture'], highlights: ['Pastéis de Belém', 'Fado em Alfama', 'Sintra'], featured: true, flightId: 'lf2', hotelId: 'lh2' },
  { id: 'ci13', title: 'Cancún All-Inclusive', destination: 'Cancún, México', author: { name: 'Amanda Ribeiro', avatar: '👩', verified: true }, duration: 7, budget: 20000, travelers: 2, likes: 3890, rating: 4.8, reviews: 345, tags: ['beach', 'romantic'], highlights: ['Resort 5★', 'Isla Mujeres', 'Cenotes'], featured: true, flightId: 'cf1', hotelId: 'ch2' },
  { id: 'ci14', title: 'Cancún Aventura', destination: 'Cancún, México', author: { name: 'Diego Torres', avatar: '👨', verified: true }, duration: 6, budget: 18000, travelers: 2, likes: 2890, rating: 4.7, reviews: 267, tags: ['adventure'], highlights: ['Chichén Itzá', 'Cenotes', 'Snorkel Cozumel'], featured: false, flightId: 'cf2', hotelId: 'ch3' },
  { id: 'ci15', title: 'Dubai Luxo Extremo', destination: 'Dubai, EAU', author: { name: 'Helena Borges', avatar: '👩', verified: true }, duration: 7, budget: 75000, travelers: 2, likes: 2567, rating: 4.9, reviews: 198, tags: ['luxury'], highlights: ['Burj Al Arab', 'Desert Safari', 'At.mosphere'], featured: true, flightId: 'df1', hotelId: 'dh2' },
  { id: 'ci16', title: 'Londres Clássica', destination: 'Londres, UK', author: { name: 'Patricia Souza', avatar: '👩', verified: true }, duration: 6, budget: 26000, travelers: 2, likes: 3234, rating: 4.7, reviews: 267, tags: ['culture', 'family'], highlights: ['Harry Potter Studio', 'Tower of London', 'West End'], featured: true, flightId: 'lof2', hotelId: 'loh2' },
  { id: 'ci17', title: 'Maldivas Lua de Mel', destination: 'Maldivas', author: { name: 'Carolina Mendes', avatar: '👩', verified: true }, duration: 6, budget: 85000, travelers: 2, likes: 4567, rating: 4.9, reviews: 423, tags: ['romantic', 'luxury', 'beach'], highlights: ['Overwater Villa', 'Jantar na Praia', 'Snorkel com Mantas'], featured: true, flightId: 'mvf1', hotelId: 'mvh2' },
  { id: 'ci18', title: 'Santorini Romântico', destination: 'Santorini, Grécia', author: { name: 'Isabela Torres', avatar: '👩', verified: true }, duration: 5, budget: 32000, travelers: 2, likes: 3890, rating: 4.8, reviews: 334, tags: ['romantic', 'beach'], highlights: ['Pôr do Sol em Oia', 'Catamarã', 'Wine Tasting'], featured: true, flightId: 'sf2', hotelId: 'sh3' },
  { id: 'ci19', title: 'Bali Espiritual', destination: 'Bali, Indonésia', author: { name: 'Fernanda Luz', avatar: '👩', verified: true }, duration: 10, budget: 25000, travelers: 2, likes: 3456, rating: 4.8, reviews: 298, tags: ['culture', 'romantic'], highlights: ['Templos', 'Arrozais', 'Spa Balinês'], featured: true, flightId: 'blf2', hotelId: 'blh3' },
  { id: 'ci20', title: 'Bali Aventura', destination: 'Bali, Indonésia', author: { name: 'Thiago Surf', avatar: '👨', verified: true }, duration: 12, budget: 18000, travelers: 1, likes: 2345, rating: 4.7, reviews: 187, tags: ['adventure', 'beach'], highlights: ['Surf em Canggu', 'Monte Batur', 'Nusa Penida'], featured: false, flightId: 'blf1', hotelId: 'blh4' },
  { id: 'ci21', title: 'Amsterdam Completa', destination: 'Amsterdam, Holanda', author: { name: 'Renata Arts', avatar: '👩', verified: true }, duration: 5, budget: 22000, travelers: 2, likes: 2890, rating: 4.7, reviews: 234, tags: ['culture', 'romantic'], highlights: ['Van Gogh', 'Canais', 'Bike Tour'], featured: true, flightId: 'amf1', hotelId: 'amh3' },
  { id: 'ci22', title: 'Sydney & Blue Mountains', destination: 'Sydney, Austrália', author: { name: 'Paulo Aussie', avatar: '👨', verified: true }, duration: 10, budget: 45000, travelers: 2, likes: 2456, rating: 4.8, reviews: 198, tags: ['adventure', 'beach'], highlights: ['Opera House', 'Bondi Beach', 'Blue Mountains'], featured: true, flightId: 'syf1', hotelId: 'syh3' },
  { id: 'ci23', title: 'Cape Town Adventure', destination: 'Cape Town, África do Sul', author: { name: 'André Safari', avatar: '👨', verified: true }, duration: 8, budget: 35000, travelers: 2, likes: 2678, rating: 4.8, reviews: 212, tags: ['adventure', 'gastro'], highlights: ['Table Mountain', 'Wine Tasting', 'Cape Peninsula'], featured: true, flightId: 'ctf2', hotelId: 'cth3' },
];

const formatDate = (dateStr, addDays = 0) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + addDays);
  return { weekday: d.toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase().replace('-FEIRA', ''), day: d.getDate().toString().padStart(2, '0'), month: (d.getMonth() + 1).toString().padStart(2, '0') };
};

const getPeriodStyle = (period) => {
  const styles = { manhã: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Sunrise, label: 'Manhã' }, tarde: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Sun, label: 'Tarde' }, noite: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Moon, label: 'Noite' } };
  return styles[period] || styles.manhã;
};

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  if (!isOpen) return null;
  const handleSubmit = (e) => { e.preventDefault(); onLogin({ name: formData.name || 'Viajante', email: formData.email, avatar: '👤', joinDate: 'Janeiro 2026', phone: '', city: '' }); onClose(); };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"><X size={20} /></button>
        <div className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-center"><Globe size={48} className="mx-auto mb-3" /><h2 className="text-2xl font-bold">SmartTravel AI</h2><p className="opacity-80 text-sm">{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta grátis'}</p></div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && <div><label className="text-sm font-medium text-slate-600 block mb-1">Nome</label><div className="relative"><User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Seu nome" required /></div></div>}
          <div><label className="text-sm font-medium text-slate-600 block mb-1">E-mail</label><div className="relative"><Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="seu@email.com" required /></div></div>
          <div><label className="text-sm font-medium text-slate-600 block mb-1">Senha</label><div className="relative"><Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="••••••••" required /></div></div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium">Cadastre-se</button></> : <>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium">Entrar</button></>}</p>
        </form>
      </div>
    </div>
  );
};

const AIInsightCard = ({ insight, onAction }) => {
  const colors = { warning: { bg: 'bg-amber-50 border-amber-200', btn: 'bg-amber-500 hover:bg-amber-600' }, success: { bg: 'bg-emerald-50 border-emerald-200', btn: 'bg-emerald-500 hover:bg-emerald-600' }, info: { bg: 'bg-blue-50 border-blue-200', btn: 'bg-blue-500 hover:bg-blue-600' }, danger: { bg: 'bg-red-50 border-red-200', btn: 'bg-red-500 hover:bg-red-600' }, tip: { bg: 'bg-violet-50 border-violet-200', btn: 'bg-violet-500 hover:bg-violet-600' }, profile: { bg: 'bg-teal-50 border-teal-200', btn: 'bg-teal-500 hover:bg-teal-600' } };
  const style = colors[insight.type] || colors.info;
  const Icon = insight.icon;
  return (
    <div className={`p-4 rounded-xl border-2 ${style.bg} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${style.bg}`}><Icon size={20} className="text-slate-700" /></div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-slate-800 text-sm">{insight.title}</p>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{insight.message}</p>
          {insight.action && <button onClick={() => onAction && onAction(insight)} className={`mt-3 px-4 py-1.5 ${style.btn} text-white text-xs font-semibold rounded-lg transition-colors`}>{insight.action}</button>}
        </div>
      </div>
    </div>
  );
};

const DayCard = ({ day, startDate, items, isFirst, isLast, origin, destination, flight, hotel, totalPayingTravelers, tripDays }) => {
  const dateInfo = formatDate(startDate, day - 1);
  let dayTotal = 0;
  if (isFirst && flight) dayTotal += flight.price * totalPayingTravelers;
  if (hotel) dayTotal += hotel.price;
  items.forEach(item => { dayTotal += (item.price || 0); });
  if (isLast && flight) dayTotal += flight.price * totalPayingTravelers;
  
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-4 text-white">
        <div className="flex items-center justify-between"><div><p className="text-teal-200 text-xs font-medium tracking-wide">{dateInfo.weekday}</p><p className="text-3xl font-bold">{dateInfo.day}/{dateInfo.month}</p></div><div className="flex items-center gap-2">{isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> Chegada</span>}{isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneTakeoff size={12} /> Partida</span>}</div></div>
        <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between"><span className="text-teal-200 text-xs">Custo do dia:</span><span className="font-bold text-lg">R$ {dayTotal.toLocaleString('pt-BR')}</span></div>
      </div>
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {isFirst && flight && <div className="pb-3 border-b border-slate-100"><div className="flex items-center gap-2 mb-2"><span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1"><Sunrise size={12} /> Manhã</span></div><h4 className="font-bold text-slate-800">✈️ Chegada - {flight.name}</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{origin?.split(' ')[0]} → {destination?.split(',')[0]}</p><div className="flex items-center gap-3 mt-2"><span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span><span className="text-xs text-slate-400">{flight.duration}</span></div></div>}
        
        {hotel && <div className="pb-3 border-b border-slate-100"><div className="flex items-center gap-2 mb-2"><span className="px-2.5 py-1 bg-violet-100 text-violet-700 text-xs font-semibold rounded-full flex items-center gap-1"><Hotel size={12} /> Hospedagem</span></div><h4 className="font-bold text-slate-800">🏨 {hotel.name}</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{hotel.location} • {'⭐'.repeat(hotel.stars)}</p><div className="flex items-center gap-3 mt-2"><span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {hotel.price.toLocaleString('pt-BR')}/noite</span></div></div>}
        
        {items.map((item, idx) => { const periodStyle = getPeriodStyle(item.period); const PeriodIcon = periodStyle.icon; return (<div key={idx} className="pb-3 border-b border-slate-100 last:border-0"><div className="flex items-center gap-2 mb-2"><span className={`px-2.5 py-1 ${periodStyle.bg} ${periodStyle.text} text-xs font-semibold rounded-full flex items-center gap-1`}><PeriodIcon size={12} /> {periodStyle.label}</span>{item.childFriendly && <span className="text-xs text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full">👶 Kids</span>}</div><h4 className="font-bold text-slate-800">{item.category === 'restaurant' ? '🍽️' : '🎯'} {item.name}</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{item.location || item.cuisine}</p><div className="flex items-center gap-3 mt-2">{item.price === 0 ? <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded flex items-center gap-1"><Sparkles size={10} /> Gratuito</span> : <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {item.price?.toLocaleString('pt-BR')}</span>}{item.duration && <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.duration}</span>}</div></div>); })}
        
        {isLast && flight && <div className="pt-3"><div className="flex items-center gap-2 mb-2"><span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1"><Moon size={12} /> Noite</span></div><h4 className="font-bold text-slate-800">✈️ Voo de Volta</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{destination?.split(',')[0]} → {origin?.split(' ')[0]}</p><div className="flex items-center gap-3 mt-2"><span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span></div></div>}
      </div>
    </div>
  );
};

const CommunityCard = ({ itinerary, onUse, onLike, isLiked, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura', gastro: '🍽️ Gastronômico' };
  
  if (compact) return (<div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all cursor-pointer" onClick={() => onUse && onUse(itinerary)}><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${destData?.coverUrl})` }} /><div className="flex-1 min-w-0"><h4 className="font-semibold text-sm text-slate-800 truncate">{itinerary.title}</h4><p className="text-xs text-slate-500">{itinerary.duration} dias • R$ {(itinerary.budget/1000).toFixed(0)}k</p></div><div className="text-right flex-shrink-0"><div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div></div></div></div>);
  
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
          <div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />{itinerary.likes + (isLiked ? 1 : 0)}</span><span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.reviews}</span></div>
          <button onClick={() => onUse && onUse(itinerary)} className="px-3 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-lg hover:bg-teal-700 flex items-center gap-1"><Copy size={12} /> Usar</button>
        </div>
      </div>
    </div>
  );
};

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
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-6"><div className="flex items-center gap-4"><div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{user.avatar}</div><div className="flex-1"><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-teal-200">{user.email}</p><p className="text-sm text-teal-300 mt-1">Membro desde {user.joinDate}</p></div><button onClick={onLogout} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 flex items-center gap-2"><LogOut size={16} /> Sair</button></div></div>
      <div className="flex gap-2 mb-6 flex-wrap">{[{ id: 'info', label: 'Informações', icon: User }, { id: 'profile', label: 'Perfil Viajante', icon: Compass }, { id: 'trips', label: 'Minhas Viagens', icon: Map }, { id: 'saved', label: 'Salvos', icon: Bookmark }].map(tab => (<button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(false); }} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-teal-600 text-white shadow-lg' : 'bg-white text-slate-600 hover:bg-slate-50'}`}><tab.icon size={16} /> {tab.label}</button>))}</div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {activeTab === 'info' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}</div><div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-slate-500 block mb-1">Nome Completo</label><div className="relative"><User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><div className="relative"><Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">Telefone</label><div className="relative"><Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={tempUser.phone || ''} onChange={(e) => setTempUser({...tempUser, phone: e.target.value})} disabled={!editing} placeholder="+55 (11) 99999-9999" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">Cidade</label><div className="relative"><MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={tempUser.city || ''} onChange={(e) => setTempUser({...tempUser, city: e.target.value})} disabled={!editing} placeholder="São Paulo, SP" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div></div></div>)}
        {activeTab === 'profile' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>{!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Salvar</button>}</div>
          <h3 className="font-semibold text-slate-700 mb-2">Seus estilos de viagem <span className="text-xs text-slate-400">(escolha até 3)</span></h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => {
            const isSelected = (tempProfile.types || []).includes(type.id);
            const count = (tempProfile.types || []).length;
            return (<button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing || (!isSelected && count >= 3)} className={`p-4 rounded-xl border-2 text-center transition-all ${isSelected ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-slate-300'} ${!editing && 'opacity-70'}`}><type.icon size={28} className={isSelected ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="font-medium text-sm mt-2">{type.name}</p>{isSelected && <span className="text-[10px] text-teal-600 font-semibold">✓ Selecionado</span>}</button>);
          })}</div>
          <h3 className="font-semibold text-slate-700 mb-3">Interesses</h3><div className="flex flex-wrap gap-2 mb-6">{INTEREST_TAGS.map(tag => (<button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tag}</button>))}</div>
          <h3 className="font-semibold text-slate-700 mb-3">Orçamento preferido</h3><div className="grid grid-cols-3 gap-3">{[{ id: 'budget', label: 'Econômico', desc: 'Até R$ 15k', icon: '💰' }, { id: 'medium', label: 'Médio', desc: 'R$ 15k - 40k', icon: '✨' }, { id: 'luxury', label: 'Luxo', desc: 'Acima R$ 40k', icon: '👑' }].map(opt => (<button key={opt.id} onClick={() => editing && setTempProfile({...tempProfile, preferredBudget: opt.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${tempProfile.preferredBudget === opt.id ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-slate-300'}`}><span className="text-2xl">{opt.icon}</span><p className="font-medium mt-1">{opt.label}</p><p className="text-xs text-slate-500">{opt.desc}</p></button>))}</div>
        </div>)}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500 mb-4">Suas viagens planejadas aparecerão aqui</p></div>}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nada salvo ainda</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ types: [], interests: [], preferredBudget: 'medium' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing');
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-14');
  const [endDate, setEndDate] = useState('2026-04-20');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(28000);
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

  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const tripDays = useMemo(() => Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))), [startDate, endDate]);
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;

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

  // Handle insight actions
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
    }
  };

  // Enhanced AI insights
  const insights = useMemo(() => {
    if (!itineraryGenerated || !currentData) return [];
    const list = [];
    const destTags = currentData.tags || [];
    const userTypes = userProfile.types || [];

    // Budget insights
    if (isOverBudget) {
      const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price && h.rating >= 4.0);
      const cheaperFlight = currentData.flights.find(f => f.price < selectedFlight?.price);
      let msg = `Você está R$ ${Math.abs(remaining).toLocaleString('pt-BR')} acima do limite.`;
      if (cheaperHotel) msg += ` Troque para ${cheaperHotel.name} e economize R$ ${((selectedHotel.price - cheaperHotel.price) * tripDays).toLocaleString('pt-BR')}.`;
      list.push({ type: 'danger', icon: AlertTriangle, title: '⚠️ Orçamento Excedido!', message: msg, action: cheaperHotel ? 'Trocar Hotel' : (cheaperFlight ? 'Trocar Voo' : null), actionType: cheaperHotel ? 'downgrade_hotel' : 'downgrade_flight' });
    } else if (remaining > totalBudget * 0.20) {
      const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays && h.id !== selectedHotel?.id);
      if (betterHotel) {
        list.push({ type: 'success', icon: Sparkles, title: '✨ Upgrade Disponível!', message: `Com R$ ${remaining.toLocaleString('pt-BR')} sobrando, faça upgrade para ${betterHotel.name} (5★) por +R$ ${((betterHotel.price - selectedHotel.price) * tripDays).toLocaleString('pt-BR')}!`, action: 'Aplicar Upgrade', actionType: 'upgrade_hotel' });
      } else {
        list.push({ type: 'success', icon: Award, title: '🎯 Dentro do Orçamento!', message: `Sobrou R$ ${remaining.toLocaleString('pt-BR')}! Você pode adicionar mais experiências ou economizar.` });
      }
    }

    // Profile-based insights
    if (userTypes.includes('beach') && destTags.includes('beach')) {
      const beachActs = currentData.activities.filter(a => a.tags?.includes('beach'));
      list.push({ type: 'profile', icon: Anchor, title: '🏖️ Perfil: Praia', message: `Perfeito! ${destination.split(',')[0]} tem ${beachActs.length} experiências de praia. Priorizamos atividades aquáticas no seu roteiro.` });
    }
    if (userTypes.includes('gastro')) {
      const gastroCount = Object.values(daySchedule).flat().filter(i => i.category === 'restaurant' || i.tags?.includes('gastro')).length;
      list.push({ type: 'profile', icon: Utensils, title: '🍽️ Perfil: Gastronômico', message: `Incluímos ${gastroCount} experiências gastronômicas! Os melhores restaurantes locais estão no roteiro.` });
    }
    if (userTypes.includes('adventure')) {
      const adventureActs = currentData.activities.filter(a => a.tags?.includes('adventure'));
      list.push({ type: 'profile', icon: Mountain, title: '🏔️ Perfil: Aventureiro', message: `${adventureActs.length} atividades de aventura disponíveis em ${destination.split(',')[0]}!` });
    }
    if (userTypes.includes('romantic') && destTags.includes('romantic')) {
      list.push({ type: 'profile', icon: Heart, title: '💕 Destino Romântico', message: `${destination.split(',')[0]} é perfeito para casais! Incluímos experiências especiais para vocês.` });
    }
    if ((userTypes.includes('family') || children > 0)) {
      const kidFriendly = Object.values(daySchedule).flat().filter(i => i.childFriendly).length;
      const total = Object.values(daySchedule).flat().filter(i => i.category !== 'restaurant').length;
      list.push({ type: 'profile', icon: Users, title: '👨‍👩‍👧 Roteiro Família', message: `${kidFriendly} de ${total} atividades são kids-friendly! Ótimo para viajar com crianças.` });
    }

    // Destination tip
    if (currentData.tip) {
      list.push({ type: 'tip', icon: Lightbulb, title: '💡 Dica Local', message: currentData.tip });
    }

    // Similar itineraries based on likes
    if (likedItineraries.length > 0) {
      const likedTags = new Set();
      likedItineraries.forEach(id => {
        const it = COMMUNITY_ITINERARIES.find(i => i.id === id);
        if (it) it.tags.forEach(t => likedTags.add(t));
      });
      const similarCount = COMMUNITY_ITINERARIES.filter(i => !likedItineraries.includes(i.id) && i.destination === destination && i.tags.some(t => likedTags.has(t))).length;
      if (similarCount > 0) {
        list.push({ type: 'info', icon: ThumbsUp, title: '👀 Roteiros Similares', message: `Baseado no que você curtiu, há ${similarCount} roteiros similares para ${destination.split(',')[0]}!` });
      }
    }

    return list.slice(0, 5);
  }, [itineraryGenerated, currentData, isOverBudget, remaining, totalBudget, selectedHotel, selectedFlight, tripDays, totalPayingTravelers, userProfile, destination, daySchedule, children, likedItineraries]);

  const filteredDestinations = useMemo(() => Object.entries(DESTINATIONS_DATABASE).filter(([, data]) => selectedContinent === 'all' || data.continent === selectedContinent), [selectedContinent]);
  const filteredCommunity = useMemo(() => COMMUNITY_ITINERARIES.filter(it => (communityFilter.destination === 'all' || it.destination === communityFilter.destination) && (communityFilter.type === 'all' || it.tags.includes(communityFilter.type))).sort((a, b) => b.likes - a.likes), [communityFilter]);
  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  const togglePriority = (id) => {
    if (tripPriorities.includes(id)) setTripPriorities(tripPriorities.filter(p => p !== id));
    else if (tripPriorities.length < 3) setTripPriorities([...tripPriorities, id]);
  };

  const toggleLike = (id) => {
    if (likedItineraries.includes(id)) setLikedItineraries(likedItineraries.filter(i => i !== id));
    else setLikedItineraries([...likedItineraries, id]);
  };

  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);
    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.30, hotels: totalBudget * 0.35 };
      
      // Select flight
      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers * 2 <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];
      
      // Select hotel
      const hotelBudget = budget.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudget);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];
      
      // Score activities based on profile AND priorities
      const scoreActivity = (act) => {
        let score = act.rating * 10;
        const userTypes = userProfile.types || [];
        
        // Profile-based scoring
        if (userTypes.includes('beach') && act.tags?.includes('beach')) score += 30;
        if (userTypes.includes('gastro') && act.tags?.includes('gastro')) score += 30;
        if (userTypes.includes('adventure') && act.tags?.includes('adventure')) score += 30;
        if (userTypes.includes('romantic') && act.tags?.includes('romantic')) score += 30;
        if (userTypes.includes('culture') && (act.tags?.includes('culture') || act.tags?.includes('history') || act.tags?.includes('art'))) score += 30;
        if (userTypes.includes('family') && act.childFriendly) score += 25;
        if (userTypes.includes('budget') && act.price === 0) score += 25;
        if (userTypes.includes('luxury') && act.price > 100) score += 15;
        
        // Priority-based scoring (higher weight)
        if (tripPriorities.includes('gastronomy') && act.tags?.includes('gastro')) score += 50;
        if (tripPriorities.includes('beaches') && act.tags?.includes('beach')) score += 50;
        if (tripPriorities.includes('culture') && (act.tags?.includes('culture') || act.tags?.includes('history'))) score += 50;
        if (tripPriorities.includes('adventure') && act.tags?.includes('adventure')) score += 50;
        if (tripPriorities.includes('relaxation') && (act.tags?.includes('relaxation') || act.tags?.includes('scenic'))) score += 50;
        if (tripPriorities.includes('kids') && act.childFriendly) score += 50;
        if (tripPriorities.includes('nightlife') && act.tags?.includes('nightlife')) score += 50;
        if (tripPriorities.includes('shopping') && act.tags?.includes('shopping')) score += 50;
        
        // Children adjustment
        if (children > 0 && !act.childFriendly) score -= 20;
        
        return score;
      };
      
      // Sort activities by score
      const sortedActivities = [...data.activities].sort((a, b) => scoreActivity(b) - scoreActivity(a));
      const restaurants = [...data.restaurants].sort((a, b) => {
        let scoreA = a.rating * 10, scoreB = b.rating * 10;
        if (tripPriorities.includes('gastronomy') || userProfile.types?.includes('gastro')) {
          if (a.tags?.includes('gastro')) scoreA += 30;
          if (b.tags?.includes('gastro')) scoreB += 30;
        }
        if (userProfile.types?.includes('budget')) {
          scoreA -= a.price / 10;
          scoreB -= b.price / 10;
        }
        return scoreB - scoreA;
      });
      
      // Build schedule with at least 2 activities per day + restaurants
      const schedule = {};
      let actIdx = 0, restIdx = 0;
      const usedActivities = new Set();
      
      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        
        // First day: add transfer
        if (d === 1) {
          schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: `Aeroporto → ${bestHotel.location}`, price: Math.round(80 + bestFlight.price * 0.02), duration: '1h', period: 'manhã' });
        }
        
        // Last day: less activities (check-out + flight)
        const activitiesForDay = d === tripDays ? 1 : (d === 1 ? 2 : 3);
        
        // Add morning activity
        for (let i = 0; i < sortedActivities.length && schedule[d].filter(i => i.category === 'activity').length < activitiesForDay; i++) {
          const act = sortedActivities[i];
          if (!usedActivities.has(act.id)) {
            usedActivities.add(act.id);
            schedule[d].push({ ...act, category: 'activity' });
          }
        }
        
        // Add restaurant every day
        if (restIdx < restaurants.length) {
          const rest = restaurants[restIdx % restaurants.length];
          schedule[d].push({ ...rest, category: 'restaurant', location: rest.cuisine });
          restIdx++;
        }
      }
      
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
    
    // Generate a complete schedule based on itinerary
    const schedule = {};
    for (let d = 1; d <= itinerary.duration; d++) {
      schedule[d] = [];
      if (d === 1) schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto → Hotel', location: `Aeroporto → ${hotel.location}`, price: 120, duration: '1h', period: 'manhã' });
      
      // Add 2-3 activities per day
      const dayActivities = data.activities.slice((d - 1) * 2 % data.activities.length, (d - 1) * 2 % data.activities.length + 2);
      dayActivities.forEach(act => { if (act) schedule[d].push({ ...act, category: 'activity' }); });
      
      // Add restaurant
      const rest = data.restaurants[(d - 1) % data.restaurants.length];
      if (rest) schedule[d].push({ ...rest, category: 'restaurant', location: rest.cuisine });
    }
    
    const today = new Date();
    const start = new Date(today); start.setDate(today.getDate() + 30);
    const end = new Date(start); end.setDate(start.getDate() + itinerary.duration);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    setSelectedFlight(flight);
    setSelectedHotel(hotel);
    setDaySchedule(schedule);
    setItineraryGenerated(true);
    setCurrentView('plan');
  };

  useEffect(() => { setItineraryGenerated(false); setDaySchedule({}); }, [destination]);
  useEffect(() => { if (children > childrenAges.length) setChildrenAges([...childrenAges, ...Array(children - childrenAges.length).fill(5)]); else if (children < childrenAges.length) setChildrenAges(childrenAges.slice(0, children)); }, [children]);

  // Get suggestions based on liked itineraries
  const suggestedItineraries = useMemo(() => {
    if (likedItineraries.length === 0 || !destination) return [];
    const likedTags = new Set();
    likedItineraries.forEach(id => {
      const it = COMMUNITY_ITINERARIES.find(i => i.id === id);
      if (it) it.tags.forEach(t => likedTags.add(t));
    });
    return COMMUNITY_ITINERARIES.filter(i => !likedItineraries.includes(i.id) && i.destination === destination && i.tags.some(t => likedTags.has(t))).slice(0, 3);
  }, [likedItineraries, destination]);

  // LANDING VIEW
  if (currentView === 'landing') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      <header className="p-4"><div className="max-w-7xl mx-auto flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center"><Globe size={24} className="text-white" /></div><span className="text-xl font-bold text-white">SmartTravel AI</span></div>{user ? <button onClick={() => setCurrentView('profile')} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2">{user.avatar} {user.name}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Entrar</button>}</div></header>
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/20 rounded-full text-teal-300 text-sm mb-6"><Sparkles size={16} /> Powered by AI</div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Viaje <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Inteligente</span></h1>
        <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">Crie roteiros personalizados com IA ou explore roteiros da comunidade. Preços realistas, insights inteligentes, {Object.keys(DESTINATIONS_DATABASE).length} destinos.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <button onClick={() => setCurrentView('plan')} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-teal-500/30"><Sparkles size={20} />Criar Meu Roteiro</button>
          <button onClick={() => setCurrentView('community')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><Users size={20} />Ver Comunidade ({COMMUNITY_ITINERARIES.length} roteiros)</button>
        </div>
        <div className="grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center mb-3"><Target size={20} className="text-teal-400" /></div><h3 className="font-bold text-white mb-1">Personalizado</h3><p className="text-slate-400 text-sm">Roteiros baseados no seu perfil e prioridades.</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3"><Zap size={20} className="text-emerald-400" /></div><h3 className="font-bold text-white mb-1">Insights IA</h3><p className="text-slate-400 text-sm">Recomendações inteligentes e upgrades.</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center mb-3"><Users size={20} className="text-violet-400" /></div><h3 className="font-bold text-white mb-1">Comunidade</h3><p className="text-slate-400 text-sm">Roteiros reais com avaliações.</p></div>
          <div className="bg-white/5 backdrop-blur rounded-2xl p-5 text-left"><div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center mb-3"><Sliders size={20} className="text-amber-400" /></div><h3 className="font-bold text-white mb-1">Prioridades</h3><p className="text-slate-400 text-sm">Defina o foco da sua viagem.</p></div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
    </div>
  );

  // PROFILE VIEW
  if (currentView === 'profile') {
    if (!user) { setCurrentView('landing'); return null; }
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button className="text-teal-600 font-medium">Conta</button></nav></div></header>
        <div className="max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onLogout={() => { setUser(null); setCurrentView('landing'); }} /></div>
      </div>
    );
  }

  // COMMUNITY VIEW
  if (currentView === 'community') return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}</nav></div></header>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8"><div><h1 className="text-3xl font-bold text-slate-800">Roteiros da Comunidade</h1><p className="text-slate-500">{filteredCommunity.length} roteiros verificados • {Object.keys(DESTINATIONS_DATABASE).length} destinos</p></div></div>
        <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8"><div className="flex flex-wrap gap-4"><div className="flex-1 min-w-[200px]"><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><select value={communityFilter.destination} onChange={(e) => setCommunityFilter({...communityFilter, destination: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos os Destinos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select></div><div className="flex-1 min-w-[200px]"><label className="text-xs font-medium text-slate-500 mb-1 block">Tipo de Viagem</label><select value={communityFilter.type} onChange={(e) => setCommunityFilter({...communityFilter, type: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos os Tipos</option>{TRAVELER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div></div></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} isLiked={likedItineraries.includes(it.id)} />)}</div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
    </div>
  );

  // PLAN VIEW (DEFAULT)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button className="text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}</nav></div></header>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Destination Selector */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ArrowLeftRight size={20} className="text-teal-600" />Planeje sua Viagem</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Saindo de</label><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl font-medium text-teal-700">{destination ? `${DESTINATIONS_DATABASE[destination]?.image} ${destination}` : 'Escolha abaixo ↓'}</div></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">{continents.map(c => <button key={c} onClick={() => setSelectedContinent(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${selectedContinent === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{c === 'all' ? '🌍 Todos' : c}</button>)}</div>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">{filteredDestinations.map(([name, data]) => (<button key={name} onClick={() => setDestination(name)} className={`relative overflow-hidden rounded-xl h-24 group ${destination === name ? 'ring-4 ring-teal-500 ring-offset-2' : ''}`}><div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-300" style={{ backgroundImage: `url(${data.coverUrl})` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-2 left-2"><span className="text-2xl">{data.image}</span><p className="text-white text-xs font-bold">{name.split(',')[0]}</p></div>{destination === name && <div className="absolute top-2 right-2 w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center"><Check size={14} className="text-white" /></div>}</button>))}</div>
            </div>

            {/* Trip Config + Priorities */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Ida</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Volta</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Adultos</label><input type="number" value={adults} onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Crianças</label><input type="number" value={children} onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                </div>
                
                {children > 0 && (<div className="mb-4 p-3 bg-amber-50 rounded-xl border border-amber-200"><p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1"><Baby size={14} />Idades das crianças (0-2 anos: voo grátis)</p><div className="flex flex-wrap gap-2">{Array.from({ length: children }, (_, i) => (<select key={i} value={childrenAges[i] || 5} onChange={(e) => { const a = [...childrenAges]; a[i] = parseInt(e.target.value); setChildrenAges(a); }} className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-sm">{Array.from({ length: 18 }, (_, age) => <option key={age} value={age}>{age} anos</option>)}</select>))}</div></div>)}
                
                <div className="mb-4"><label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento Total: R$ {totalBudget.toLocaleString('pt-BR')}</label><input type="range" min="5000" max="150000" step="1000" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value))} className="w-full accent-teal-600" /></div>
                
                {/* Trip Priorities */}
                <div className="mb-4">
                  <button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="flex items-center justify-between w-full p-3 bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl border border-violet-200 hover:border-violet-300 transition-all">
                    <div className="flex items-center gap-2"><Sliders size={18} className="text-violet-600" /><span className="font-semibold text-slate-700">Prioridades do Roteiro</span>{tripPriorities.length > 0 && <span className="px-2 py-0.5 bg-violet-600 text-white text-xs rounded-full">{tripPriorities.length}</span>}</div>
                    {showPriorityPanel ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  {showPriorityPanel && (
                    <div className="mt-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-xs text-slate-500 mb-3">Selecione até 3 prioridades para personalizar seu roteiro:</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {TRIP_PRIORITIES.map(p => {
                          const isSelected = tripPriorities.includes(p.id);
                          return (
                            <button key={p.id} onClick={() => togglePriority(p.id)} disabled={!isSelected && tripPriorities.length >= 3} className={`p-3 rounded-xl text-left transition-all ${isSelected ? 'bg-violet-600 text-white shadow-lg' : 'bg-white border border-slate-200 hover:border-violet-300'} ${!isSelected && tripPriorities.length >= 3 ? 'opacity-50' : ''}`}>
                              <p.icon size={20} className={isSelected ? 'text-white' : 'text-violet-500'} />
                              <p className={`font-semibold text-sm mt-1 ${isSelected ? 'text-white' : 'text-slate-700'}`}>{p.name}</p>
                              <p className={`text-[10px] mt-0.5 ${isSelected ? 'text-violet-200' : 'text-slate-400'}`}>{p.desc}</p>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                <button onClick={generateItinerary} disabled={isGenerating} className="w-full py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70 shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all">
                  {isGenerating ? <><RefreshCw size={20} className="animate-spin" />Gerando com IA...</> : <><Sparkles size={20} />Gerar Roteiro Inteligente</>}
                </button>
              </div>
            )}

            {/* Generated Itinerary */}
            {itineraryGenerated && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={22} className="text-teal-600" />Seu Roteiro Personalizado</h2><p className="text-slate-500">{origin.split(' ')[0]} → {destination} • {tripDays} dias • {adults + children} viajantes</p></div>
                  <button onClick={() => { setItineraryGenerated(false); setDaySchedule({}); }} className="text-sm text-teal-600 hover:underline flex items-center gap-1"><RefreshCw size={14} />Regenerar</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map(day => (
                    <DayCard key={day} day={day} startDate={startDate} items={daySchedule[day] || []} isFirst={day === 1} isLast={day === tripDays} origin={origin} destination={destination} flight={selectedFlight} hotel={selectedHotel} totalPayingTravelers={totalPayingTravelers} tripDays={tripDays} />
                  ))}
                </div>
              </div>
            )}

            {!destination && (<div className="bg-white rounded-2xl border border-slate-200 p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer ir e vamos criar o roteiro perfeito</p></div>)}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget Card */}
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (<>
                <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>{isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}</div>
                <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                  <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos (ida+volta)</span><span>R$ {costs.flights.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.flights || 0}%)</span></span></div>
                  <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel ({tripDays} noites)</span><span>R$ {costs.hotels.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.hotels || 0}%)</span></span></div>
                  <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.activities || 0}%)</span></span></div>
                  <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.food || 0}%)</span></span></div>
                  <div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Car size={14} />Transporte</span><span>R$ {costs.transport.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.transport || 0}%)</span></span></div>
                  <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div>
                </div>
              </>)}
            </div>

            {/* AI Insights */}
            {itineraryGenerated && insights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-teal-600" />Insights da IA</h3>
                <div className="space-y-3">{insights.map((insight, i) => <AIInsightCard key={i} insight={insight} onAction={handleInsightAction} />)}</div>
              </div>
            )}

            {/* Suggested based on likes */}
            {suggestedItineraries.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><ThumbsUp size={18} className="text-rose-500" />Recomendados para Você</h3>
                <p className="text-xs text-slate-500 mb-3">Baseado nos roteiros que você curtiu:</p>
                <div className="space-y-2">{suggestedItineraries.map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} isLiked={likedItineraries.includes(it.id)} compact />)}</div>
              </div>
            )}

            {/* Community Suggestions */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={18} className="text-amber-500" />Top Roteiros - {destination.split(',')[0]}</h3>
                <div className="space-y-2">
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} isLiked={likedItineraries.includes(it.id)} compact />)}
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda para este destino</p>}
                </div>
              </div>
            )}

            {/* Flight & Hotel Info */}
            {itineraryGenerated && selectedFlight && selectedHotel && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Info size={18} className="text-blue-500" />Suas Escolhas</h3>
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

            {/* Download Button */}
            {itineraryGenerated && (
              <button disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30'}`}>
                {isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF do Roteiro</>}
              </button>
            )}
          </div>
        </div>
      </div>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
    </div>
  );
}
