import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, 
  Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, 
  Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, 
  LogOut, Bookmark, Baby, UserCheck, Compass, Mountain, Building, 
  Palmtree, Crown, Mail, Lock, Map, Sunrise, Sun, Moon, PlaneTakeoff, 
  PlaneLanding, ArrowLeftRight, MessageSquare, Car, Copy, Phone, Download
} from 'lucide-react';

const BRAZILIAN_CITIES = ['São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)', 'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)', 'Curitiba (CWB)', 'Manaus (MAO)'];

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

const INTEREST_TAGS = ['Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia', 'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia'];

const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', image: '🗼',
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h30', rating: 4.5 },
      { id: 'pf2', name: 'TAP via Lisboa', price: 2980, duration: '14h20', rating: 4.0 },
      { id: 'pf3', name: 'LATAM via Madrid', price: 3450, duration: '16h45', rating: 4.2 },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, location: 'Tuileries', rating: 4.9 },
      { id: 'ph2', name: 'Sofitel Arc de Triomphe', stars: 5, price: 1650, location: 'Arc de Triomphe', rating: 4.6 },
      { id: 'ph3', name: 'Mercure Tour Eiffel', stars: 4, price: 780, location: 'Tour Eiffel', rating: 4.4 },
      { id: 'ph4', name: 'Ibis Montmartre', stars: 3, price: 420, location: 'Montmartre', rating: 4.1 },
      { id: 'ph5', name: 'Generator Paris', stars: 2, price: 180, location: 'Canal Saint-Martin', rating: 4.0 },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq', price: 850, cuisine: 'Francesa', rating: 4.9, period: 'noite' },
      { id: 'pr2', name: 'Bouillon Chartier', price: 75, cuisine: 'Francesa', rating: 4.5, period: 'tarde' },
      { id: 'pr3', name: 'Café de Flore', price: 95, cuisine: 'Bistro', rating: 4.4, period: 'manhã' },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 160, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars' },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement' },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 85, duration: '1h30', rating: 4.6, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais' },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 195, duration: '6h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes' },
      { id: 'pa5', name: 'Tour Montmartre', price: 45, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Montmartre' },
      { id: 'pa6', name: 'Jardim de Luxemburgo', price: 0, duration: '2h', rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement' },
    ]
  },
  'Nova York, EUA': {
    continent: 'América do Norte', image: '🗽',
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 3800, duration: '10h', rating: 4.3 },
      { id: 'nf2', name: 'LATAM via Miami', price: 2950, duration: '14h', rating: 4.2 },
      { id: 'nf3', name: 'Copa via Panamá', price: 2650, duration: '13h', rating: 4.1 },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza', stars: 5, price: 4200, location: 'Central Park', rating: 4.9 },
      { id: 'nh2', name: 'citizenM Times Square', stars: 4, price: 720, location: 'Times Square', rating: 4.5 },
      { id: 'nh3', name: 'Pod 51', stars: 3, price: 380, location: 'Midtown', rating: 4.2 },
      { id: 'nh4', name: 'HI NYC Hostel', stars: 2, price: 150, location: 'Upper West', rating: 4.0 },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1200, cuisine: 'Americana', rating: 4.9, period: 'noite' },
      { id: 'nr2', name: 'Katzs Deli', price: 85, cuisine: 'Tradicional', rating: 4.7, period: 'tarde' },
      { id: 'nr3', name: 'Joes Pizza', price: 35, cuisine: 'NY Style', rating: 4.6, period: 'tarde' },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 180, duration: '2h', rating: 4.7, childFriendly: true, period: 'noite', location: '5th Avenue' },
      { id: 'na2', name: 'Estátua da Liberdade', price: 145, duration: '4h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Liberty Island' },
      { id: 'na3', name: 'Broadway Show', price: 450, duration: '3h', rating: 4.9, childFriendly: true, period: 'noite', location: 'Theater District' },
      { id: 'na4', name: 'Central Park Bike', price: 75, duration: '2h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Central Park' },
      { id: 'na5', name: 'Top of the Rock', price: 165, duration: '1h30', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Rockefeller Center' },
      { id: 'na6', name: 'Brooklyn Bridge Walk', price: 0, duration: '2h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Brooklyn Bridge' },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', image: '🌴',
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 2850, duration: '8h', rating: 4.3 },
      { id: 'mf2', name: 'LATAM - Direto', price: 2450, duration: '8h', rating: 4.4 },
      { id: 'mf3', name: 'Azul - 1 Conexão', price: 2150, duration: '11h', rating: 4.2 },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 2800, location: 'Mid-Beach', rating: 4.9 },
      { id: 'mh2', name: 'Hyatt Centric South Beach', stars: 4, price: 850, location: 'South Beach', rating: 4.6 },
      { id: 'mh3', name: 'Freehand Miami', stars: 3, price: 350, location: 'Miami Beach', rating: 4.4 },
      { id: 'mh4', name: 'Generator Miami', stars: 2, price: 150, location: 'South Beach', rating: 4.1 },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 320, cuisine: 'Japonesa', rating: 4.8, period: 'noite' },
      { id: 'mr2', name: 'Joes Stone Crab', price: 210, cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite' },
      { id: 'mr3', name: 'Versailles', price: 55, cuisine: 'Cubana', rating: 4.6, period: 'tarde' },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: '4h', rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach' },
      { id: 'ma2', name: 'Art Deco Walking Tour', price: 55, duration: '2h', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive' },
      { id: 'ma3', name: 'Everglades Tour', price: 120, duration: '5h', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades' },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood' },
      { id: 'ma5', name: 'Vizcaya Museum', price: 75, duration: '3h', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove' },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', image: '🗾',
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    flights: [
      { id: 'tf1', name: 'ANA via Houston', price: 5800, duration: '24h', rating: 4.8 },
      { id: 'tf2', name: 'Emirates via Dubai', price: 4650, duration: '28h', rating: 4.6 },
      { id: 'tf3', name: 'Qatar via Doha', price: 4350, duration: '30h', rating: 4.5 },
    ],
    hotels: [
      { id: 'th1', name: 'Park Hyatt Tokyo', stars: 5, price: 3200, location: 'Shinjuku', rating: 4.8 },
      { id: 'th2', name: 'Shinjuku Granbell', stars: 4, price: 580, location: 'Shinjuku', rating: 4.4 },
      { id: 'th3', name: 'Khaosan Tokyo', stars: 2, price: 120, location: 'Asakusa', rating: 4.1 },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1800, cuisine: 'Omakase', rating: 4.9, period: 'noite' },
      { id: 'tr2', name: 'Ichiran Ramen', price: 55, cuisine: 'Tonkotsu', rating: 4.7, period: 'tarde' },
      { id: 'tr3', name: 'Tsukiji Outer Market', price: 95, cuisine: 'Frutos do Mar', rating: 4.8, period: 'manhã' },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 110, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Sumida' },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Asakusa' },
      { id: 'ta3', name: 'teamLab Planets', price: 165, duration: '2h30', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Toyosu' },
      { id: 'ta4', name: 'DisneySea Tokyo', price: 320, duration: '10h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Urayasu' },
      { id: 'ta5', name: 'Shibuya + Harajuku', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Shibuya' },
    ]
  },
  'Roma, Itália': {
    continent: 'Europa', image: '🏛️',
    coverUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
    flights: [
      { id: 'rf1', name: 'Alitalia - Direto', price: 3650, duration: '12h', rating: 4.3 },
      { id: 'rf2', name: 'TAP via Lisboa', price: 2750, duration: '15h', rating: 4.1 },
    ],
    hotels: [
      { id: 'rh1', name: 'Hotel de Russie', stars: 5, price: 3200, location: 'Piazza del Popolo', rating: 4.9 },
      { id: 'rh2', name: 'Hotel Artemide', stars: 4, price: 650, location: 'Via Nazionale', rating: 4.5 },
      { id: 'rh3', name: 'Generator Rome', stars: 2, price: 140, location: 'Termini', rating: 4.0 },
    ],
    restaurants: [
      { id: 'rr1', name: 'La Pergola', price: 720, cuisine: 'Italiana', rating: 4.9, period: 'noite' },
      { id: 'rr2', name: 'Roscioli', price: 140, cuisine: 'Romana', rating: 4.7, period: 'tarde' },
      { id: 'rr3', name: 'Pizzeria Da Baffetto', price: 45, cuisine: 'Pizza Romana', rating: 4.6, period: 'noite' },
    ],
    activities: [
      { id: 'ra1', name: 'Coliseu + Fórum Romano', price: 145, duration: '4h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Centro Histórico' },
      { id: 'ra2', name: 'Vaticano + Capela Sistina', price: 175, duration: '5h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Cidade do Vaticano' },
      { id: 'ra3', name: 'Fontana di Trevi Tour', price: 35, duration: '2h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Centro' },
      { id: 'ra4', name: 'Aula de Pasta', price: 95, duration: '3h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Trastevere' },
    ]
  },
  'Barcelona, Espanha': {
    continent: 'Europa', image: '🏖️',
    coverUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
    flights: [
      { id: 'bf1', name: 'Iberia via Madrid', price: 2650, duration: '14h', rating: 4.2 },
      { id: 'bf2', name: 'TAP via Lisboa', price: 2450, duration: '13h', rating: 4.1 },
    ],
    hotels: [
      { id: 'bh1', name: 'Hotel Arts Barcelona', stars: 5, price: 2400, location: 'Port Olímpic', rating: 4.8 },
      { id: 'bh2', name: 'Hotel 1898', stars: 4, price: 550, location: 'Las Ramblas', rating: 4.4 },
      { id: 'bh3', name: 'Generator Barcelona', stars: 2, price: 120, location: 'Gràcia', rating: 4.1 },
    ],
    restaurants: [
      { id: 'br1', name: 'Tickets', price: 240, cuisine: 'Espanhola', rating: 4.8, period: 'noite' },
      { id: 'br2', name: 'La Boqueria', price: 50, cuisine: 'Variada', rating: 4.6, period: 'tarde' },
    ],
    activities: [
      { id: 'ba1', name: 'Sagrada Família', price: 115, duration: '2h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Eixample' },
      { id: 'ba2', name: 'Park Güell', price: 65, duration: '2h', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Gràcia' },
      { id: 'ba3', name: 'Casa Batlló', price: 95, duration: '1h30', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Passeig de Gràcia' },
      { id: 'ba4', name: 'Barceloneta Beach', price: 0, duration: '3h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Barceloneta' },
    ]
  },
  'Lisboa, Portugal': {
    continent: 'Europa', image: '🇵🇹',
    coverUrl: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200',
    flights: [
      { id: 'lf1', name: 'TAP - Direto', price: 2450, duration: '9h', rating: 4.4 },
      { id: 'lf2', name: 'Azul - Direto', price: 2280, duration: '9h', rating: 4.2 },
    ],
    hotels: [
      { id: 'lh1', name: 'Four Seasons Ritz', stars: 5, price: 2200, location: 'Marquês de Pombal', rating: 4.9 },
      { id: 'lh2', name: 'LX Boutique Hotel', stars: 4, price: 450, location: 'Cais do Sodré', rating: 4.5 },
      { id: 'lh3', name: 'Lisboa Central Hostel', stars: 2, price: 95, location: 'Baixa', rating: 4.2 },
    ],
    restaurants: [
      { id: 'lr1', name: 'Belcanto', price: 520, cuisine: 'Portuguesa', rating: 4.9, period: 'noite' },
      { id: 'lr2', name: 'Time Out Market', price: 65, cuisine: 'Variada', rating: 4.6, period: 'tarde' },
      { id: 'lr3', name: 'Pastéis de Belém', price: 25, cuisine: 'Pastelaria', rating: 4.8, period: 'manhã' },
    ],
    activities: [
      { id: 'la1', name: 'Torre de Belém', price: 55, duration: '1h30', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Belém' },
      { id: 'la2', name: 'Mosteiro dos Jerónimos', price: 65, duration: '2h', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Belém' },
      { id: 'la3', name: 'Elétrico 28', price: 25, duration: '1h', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Alfama' },
      { id: 'la4', name: 'Sintra Day Trip', price: 145, duration: '8h', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Sintra' },
    ]
  },
};

const COMMUNITY_ITINERARIES = [
  { id: 'ci1', title: 'Paris Romântica', destination: 'Paris, França', author: { name: 'Marina Silva', avatar: '👩', verified: true }, duration: 7, budget: 35000, travelers: 2, likes: 3847, rating: 4.9, reviews: 334, tags: ['romantic', 'luxury'], highlights: ['Torre Eiffel', 'Cruzeiro no Sena', 'Le Cinq'], featured: true, flightId: 'pf1', hotelId: 'ph3', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer CDG/Hotel', location: 'CDG → Hotel', price: 180, duration: '1h30', period: 'manhã' }, { activityId: 'pa1' }], 2: [{ activityId: 'pa2' }, { restaurantId: 'pr2' }], 3: [{ activityId: 'pa4' }], 4: [{ activityId: 'pa5' }, { activityId: 'pa3' }], 5: [{ activityId: 'pa6' }], 6: [{ restaurantId: 'pr1' }], 7: [] }, comments: [{ user: 'Ana', text: 'Perfeito para lua de mel!', rating: 5 }, { user: 'Bruno', text: 'Cruzeiro no Sena foi mágico!', rating: 5 }] },
  { id: 'ci2', title: 'NYC em 5 Dias', destination: 'Nova York, EUA', author: { name: 'Juliana Costa', avatar: '👩', verified: true }, duration: 5, budget: 22000, travelers: 2, likes: 4521, rating: 4.8, reviews: 412, tags: ['culture'], highlights: ['Top of the Rock', 'Broadway', 'Central Park'], featured: true, flightId: 'nf2', hotelId: 'nh3', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer JFK/Hotel', location: 'JFK → Hotel', price: 180, duration: '1h30', period: 'manhã' }, { activityId: 'na6' }], 2: [{ activityId: 'na2' }, { restaurantId: 'nr2' }], 3: [{ activityId: 'na4' }, { activityId: 'na5' }], 4: [{ activityId: 'na3' }], 5: [{ activityId: 'na1' }] }, comments: [{ user: 'Pedro', text: 'Broadway é imperdível!', rating: 5 }, { user: 'Carla', text: 'Katzs Deli é obrigatório.', rating: 4 }] },
  { id: 'ci3', title: 'Miami Beach Life', destination: 'Miami, EUA', author: { name: 'Camila Andrade', avatar: '👩', verified: true }, duration: 5, budget: 18000, travelers: 2, likes: 2678, rating: 4.7, reviews: 212, tags: ['beach'], highlights: ['South Beach', 'Wynwood', 'Everglades'], featured: true, flightId: 'mf2', hotelId: 'mh3', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer MIA/Hotel', location: 'MIA → Hotel', price: 120, duration: '1h', period: 'manhã' }, { activityId: 'ma1' }], 2: [{ activityId: 'ma4' }, { restaurantId: 'mr2' }], 3: [{ activityId: 'ma3' }], 4: [{ activityId: 'ma2' }, { activityId: 'ma5' }], 5: [{ activityId: 'ma1' }] }, comments: [{ user: 'Fernanda', text: 'South Beach é incrível!', rating: 5 }, { user: 'Ricardo', text: 'Wynwood foi o highlight!', rating: 5 }] },
  { id: 'ci4', title: 'Tóquio em Família', destination: 'Tóquio, Japão', author: { name: 'Pedro Santos', avatar: '👨', verified: true }, duration: 10, budget: 55000, travelers: 4, likes: 2156, rating: 4.8, reviews: 187, tags: ['family'], highlights: ['DisneySea', 'teamLab', 'Senso-ji'], featured: true, flightId: 'tf3', hotelId: 'th2', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer NRT/Hotel', location: 'NRT → Hotel', price: 280, duration: '2h', period: 'manhã' }], 2: [{ activityId: 'ta4' }], 3: [{ activityId: 'ta2' }, { activityId: 'ta3' }], 4: [{ activityId: 'ta5' }, { restaurantId: 'tr2' }], 5: [{ activityId: 'ta1' }], 6: [], 7: [], 8: [], 9: [], 10: [] }, comments: [{ user: 'Renata', text: 'DisneySea é o melhor!', rating: 5 }] },
  { id: 'ci5', title: 'Roma Histórica', destination: 'Roma, Itália', author: { name: 'Marcos Oliveira', avatar: '👨', verified: true }, duration: 6, budget: 24000, travelers: 2, likes: 2634, rating: 4.8, reviews: 219, tags: ['culture'], highlights: ['Coliseu', 'Vaticano', 'Trastevere'], featured: true, flightId: 'rf2', hotelId: 'rh2', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer FCO/Hotel', location: 'FCO → Hotel', price: 140, duration: '1h', period: 'manhã' }, { activityId: 'ra3' }], 2: [{ activityId: 'ra1' }, { restaurantId: 'rr2' }], 3: [{ activityId: 'ra2' }], 4: [{ activityId: 'ra4' }], 5: [{ restaurantId: 'rr3' }], 6: [] }, comments: [{ user: 'Camila', text: 'Coliseu é impressionante!', rating: 5 }] },
  { id: 'ci6', title: 'Barcelona Gaudí', destination: 'Barcelona, Espanha', author: { name: 'Sofia Martinez', avatar: '👩', verified: true }, duration: 6, budget: 22000, travelers: 2, likes: 2856, rating: 4.7, reviews: 228, tags: ['beach', 'culture'], highlights: ['Sagrada Família', 'Park Güell', 'Barceloneta'], featured: true, flightId: 'bf2', hotelId: 'bh2', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer BCN/Hotel', location: 'BCN → Hotel', price: 95, duration: '45min', period: 'manhã' }, { activityId: 'ba4' }], 2: [{ activityId: 'ba1' }, { activityId: 'ba3' }], 3: [{ activityId: 'ba2' }, { restaurantId: 'br2' }], 4: [{ restaurantId: 'br1' }], 5: [{ activityId: 'ba4' }], 6: [] }, comments: [{ user: 'Beatriz', text: 'Sagrada Família é de tirar o fôlego!', rating: 5 }] },
  { id: 'ci7', title: 'Lisboa Pastéis e Fado', destination: 'Lisboa, Portugal', author: { name: 'Antonio Ferreira', avatar: '👨', verified: true }, duration: 5, budget: 15000, travelers: 2, likes: 3456, rating: 4.8, reviews: 312, tags: ['gastro', 'culture'], highlights: ['Pastéis de Belém', 'Fado', 'Sintra'], featured: true, flightId: 'lf2', hotelId: 'lh2', dailySchedule: { 1: [{ type: 'transfer', name: 'Transfer LIS/Hotel', location: 'LIS → Hotel', price: 75, duration: '30min', period: 'manhã' }, { restaurantId: 'lr2' }], 2: [{ activityId: 'la1' }, { activityId: 'la2' }, { restaurantId: 'lr3' }], 3: [{ activityId: 'la4' }], 4: [{ activityId: 'la3' }], 5: [] }, comments: [{ user: 'Maria', text: 'Lisboa é acolhedora!', rating: 5 }, { user: 'Carlos', text: 'Sintra é obrigatório!', rating: 5 }] },
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
  const handleSubmit = (e) => { e.preventDefault(); onLogin({ name: formData.name || 'Viajante', email: formData.email, avatar: '👤', joinDate: 'Janeiro 2026', trips: 0, reviews: 0, phone: '', city: '' }); onClose(); };
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

const AIInsightCard = ({ insight }) => {
  const colors = { warning: { bg: 'bg-amber-50 border-amber-200', icon: 'text-amber-500' }, success: { bg: 'bg-emerald-50 border-emerald-200', icon: 'text-emerald-500' }, info: { bg: 'bg-blue-50 border-blue-200', icon: 'text-blue-500' }, danger: { bg: 'bg-red-50 border-red-200', icon: 'text-red-500' }, tip: { bg: 'bg-violet-50 border-violet-200', icon: 'text-violet-500' } };
  const style = colors[insight.type] || colors.info;
  const Icon = insight.icon;
  return (
    <div className={`p-3 rounded-xl border ${style.bg}`}>
      <div className="flex items-start gap-3"><Icon size={18} className={`${style.icon} flex-shrink-0 mt-0.5`} /><div className="flex-1"><p className="text-sm text-slate-700 font-medium">{insight.title}</p><p className="text-xs text-slate-500 mt-0.5">{insight.message}</p></div></div>
    </div>
  );
};

const DayCard = ({ day, startDate, items, isFirst, isLast, origin, destination, flight, totalPayingTravelers }) => {
  const dateInfo = formatDate(startDate, day - 1);
  let dayTotal = 0;
  if (isFirst && flight) dayTotal += flight.price * totalPayingTravelers;
  items.forEach(item => { dayTotal += (item.price || 0); });
  if (isLast && flight) dayTotal += flight.price * totalPayingTravelers;
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-4 text-white">
        <div className="flex items-center justify-between"><div><p className="text-teal-200 text-xs font-medium tracking-wide">{dateInfo.weekday}</p><p className="text-3xl font-bold">{dateInfo.day}/{dateInfo.month}</p></div><div className="flex items-center gap-2">{isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> Chegada</span>}{isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneTakeoff size={12} /> Partida</span>}</div></div>
        <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between"><span className="text-teal-200 text-xs">Custo do dia:</span><span className="font-bold">R$ {dayTotal.toLocaleString('pt-BR')}</span></div>
      </div>
      <div className="p-4 space-y-3">
        {isFirst && flight && <div><div className="flex items-center gap-2 mb-2"><span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1"><Sunrise size={12} /> Manhã</span></div><h4 className="font-bold text-slate-800">Chegada - {flight.name}</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{origin.split(' ')[0]} → {destination.split(',')[0]}</p><div className="flex items-center gap-3 mt-2"><span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span><span className="text-xs text-slate-400">{flight.duration} • {totalPayingTravelers} pax</span></div></div>}
        {items.map((item, idx) => { const periodStyle = getPeriodStyle(item.period); const PeriodIcon = periodStyle.icon; return (<div key={idx} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0"><div className="flex items-center gap-2 mb-2"><span className={`px-2.5 py-1 ${periodStyle.bg} ${periodStyle.text} text-xs font-semibold rounded-full flex items-center gap-1`}><PeriodIcon size={12} /> {periodStyle.label}</span>{item.childFriendly && <span className="text-xs text-pink-500">Kids OK</span>}</div><h4 className="font-bold text-slate-800">{item.name}</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{item.location || item.cuisine}</p><div className="flex items-center gap-3 mt-2">{item.price === 0 ? <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded flex items-center gap-1"><Sparkles size={10} /> Gratuito</span> : <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {item.price.toLocaleString('pt-BR')}</span>}{item.duration && <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.duration}</span>}</div></div>); })}
        {isLast && flight && <div className="border-t border-slate-100 pt-3"><div className="flex items-center gap-2 mb-2"><span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1"><Moon size={12} /> Noite</span></div><h4 className="font-bold text-slate-800">Voo de Volta</h4><p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{destination.split(',')[0]} → {origin.split(' ')[0]}</p><div className="flex items-center gap-3 mt-2"><span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span><span className="text-xs text-slate-400">{flight.duration}</span></div></div>}
        <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm"><Plus size={16} /> Adicionar atividade</button>
      </div>
    </div>
  );
};

const CommunityCard = ({ itinerary, onView, onUse, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', gastro: '🍽️ Gastronomia' };
  if (compact) return (<div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all"><div className="flex items-center gap-3"><div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${destData?.coverUrl})` }} /><div className="flex-1 min-w-0"><h4 className="font-semibold text-sm text-slate-800 truncate">{itinerary.title}</h4><p className="text-xs text-slate-500">{itinerary.duration} dias • {itinerary.destination.split(',')[0]}</p></div><div className="text-right flex-shrink-0"><div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div><p className="text-xs text-slate-400">{itinerary.likes} ❤️</p></div></div><button onClick={() => onUse && onUse(itinerary)} className="w-full mt-2 py-1.5 bg-teal-50 text-teal-600 text-xs font-medium rounded-lg hover:bg-teal-100 flex items-center justify-center gap-1"><Copy size={12} /> Usar roteiro</button></div>);
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />{itinerary.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</div>}<div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold text-sm leading-tight">{itinerary.title}</h3><p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p></div></div>
      <div className="p-4"><div className="flex items-center gap-2 mb-3"><span className="text-xl">{itinerary.author.avatar}</span><div className="flex-1"><p className="text-xs font-medium text-slate-700">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-teal-500" />}</p><p className="text-[10px] text-slate-400">{itinerary.duration} dias • R$ {itinerary.budget.toLocaleString('pt-BR')}</p></div><div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div></div><div className="flex flex-wrap gap-1 mb-3">{itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{typeLabels[t] || t}</span>)}</div><div className="flex items-center justify-between pt-3 border-t border-slate-100"><div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} />{itinerary.likes}</span><span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.comments?.length || 0}</span></div><div className="flex gap-2"><button onClick={() => onUse && onUse(itinerary)} className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded-lg hover:bg-teal-100 flex items-center gap-1"><Copy size={12} /> Usar</button><button onClick={() => onView && onView(itinerary)} className="px-2 py-1 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700">Ver</button></div></div></div>
    </div>
  );
};

const ProfilePage = ({ user, setUser, userProfile, setUserProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile || { type: '', interests: [], preferredBudget: 'medium' });
  const [tempUser, setTempUser] = useState({ ...user });
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-6"><div className="flex items-center gap-4"><div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{user.avatar}</div><div className="flex-1"><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-teal-200">{user.email}</p><p className="text-sm text-teal-300 mt-1">Membro desde {user.joinDate}</p></div><button onClick={onLogout} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 flex items-center gap-2"><LogOut size={16} /> Sair</button></div></div>
      <div className="flex gap-2 mb-6 flex-wrap">{[{ id: 'info', label: 'Informações', icon: User }, { id: 'profile', label: 'Perfil Viajante', icon: Compass }, { id: 'trips', label: 'Minhas Viagens', icon: Map }, { id: 'saved', label: 'Salvos', icon: Bookmark }].map(tab => (<button key={tab.id} onClick={() => { setActiveTab(tab.id); setEditing(false); }} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === tab.id ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}><tab.icon size={16} /> {tab.label}</button>))}</div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        {activeTab === 'info' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Salvar</button>}</div><div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-slate-500 block mb-1">Nome Completo</label><div className="relative"><User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><div className="relative"><Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">Telefone</label><div className="relative"><Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="tel" value={tempUser.phone || ''} onChange={(e) => setTempUser({...tempUser, phone: e.target.value})} disabled={!editing} placeholder="+55 (11) 99999-9999" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div><div><label className="text-sm font-medium text-slate-500 block mb-1">Cidade</label><div className="relative"><MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={tempUser.city || ''} onChange={(e) => setTempUser({...tempUser, city: e.target.value})} disabled={!editing} placeholder="São Paulo, SP" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl disabled:opacity-70" /></div></div></div></div>)}
        {activeTab === 'profile' && (<div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Salvar</button>}</div><h3 className="font-semibold text-slate-700 mb-3">Seu estilo de viagem</h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => (<button key={type.id} onClick={() => editing && setTempProfile({...tempProfile, type: type.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${tempProfile.type === type.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}><type.icon size={24} className={tempProfile.type === type.id ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="font-medium text-sm mt-2">{type.name}</p></button>))}</div><h3 className="font-semibold text-slate-700 mb-3">Interesses</h3><div className="flex flex-wrap gap-2 mb-6">{INTEREST_TAGS.map(tag => (<button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{tag}</button>))}</div><h3 className="font-semibold text-slate-700 mb-3">Orçamento preferido</h3><div className="grid grid-cols-3 gap-3">{[{ id: 'budget', label: 'Econômico', desc: 'Até R$ 15k' }, { id: 'medium', label: 'Médio', desc: 'R$ 15k - 40k' }, { id: 'luxury', label: 'Luxo', desc: 'Acima R$ 40k' }].map(opt => (<button key={opt.id} onClick={() => editing && setTempProfile({...tempProfile, preferredBudget: opt.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center ${tempProfile.preferredBudget === opt.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}><p className="font-medium">{opt.label}</p><p className="text-xs text-slate-500">{opt.desc}</p></button>))}</div></div>)}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500">Suas viagens planejadas aparecerão aqui</p></div>}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nada salvo ainda</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
      </div>
    </div>
  );
};

export default function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ type: '', interests: [], preferredBudget: 'medium' });
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
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showItineraryModal, setShowItineraryModal] = useState(false);
  const [selectedContinent, setSelectedContinent] = useState('all');

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

  const insights = useMemo(() => {
    if (!itineraryGenerated || !currentData) return [];
    const list = [];
    if (isOverBudget) { const cheaper = currentData.hotels.find(h => h.price < selectedHotel?.price); list.push({ type: 'danger', icon: AlertTriangle, title: 'Orçamento Excedido!', message: `Você está R$ ${Math.abs(remaining).toLocaleString('pt-BR')} acima. ${cheaper ? `Troque para ${cheaper.name} e economize.` : ''}` }); }
    else if (remaining > totalBudget * 0.30) { const better = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays); if (better && better.id !== selectedHotel?.id) list.push({ type: 'success', icon: Sparkles, title: 'Upgrade Disponível!', message: `Com R$ ${remaining.toLocaleString('pt-BR')} sobrando, troque para ${better.name} (5★).` }); }
    if (userProfile.type === 'family' && children > 0) list.push({ type: 'info', icon: Users, title: 'Roteiro Família', message: 'Priorizamos atividades kids-friendly!' });
    if (userProfile.type === 'gastro') list.push({ type: 'tip', icon: Utensils, title: 'Dica Gastronômica', message: 'Incluímos restaurantes bem avaliados.' });
    if (userProfile.type === 'romantic') list.push({ type: 'tip', icon: Heart, title: 'Dica Romântica', message: `${destination.split(',')[0]} é perfeito para casais!` });
    if (destination === 'Paris, França') list.push({ type: 'tip', icon: Lightbulb, title: 'Dica Paris', message: 'Paris Museum Pass economiza em museus!' });
    if (destination === 'Nova York, EUA') list.push({ type: 'tip', icon: Lightbulb, title: 'Dica NYC', message: 'CityPass economiza até 40% nas atrações!' });
    if (destination === 'Tóquio, Japão') list.push({ type: 'tip', icon: Lightbulb, title: 'Dica Tóquio', message: 'JR Pass é essencial para locomoção!' });
    return list.slice(0, 4);
  }, [itineraryGenerated, currentData, isOverBudget, remaining, totalBudget, selectedHotel, tripDays, userProfile, destination, children]);

  const filteredDestinations = useMemo(() => Object.entries(DESTINATIONS_DATABASE).filter(([, data]) => selectedContinent === 'all' || data.continent === selectedContinent), [selectedContinent]);
  const filteredCommunity = useMemo(() => COMMUNITY_ITINERARIES.filter(it => (communityFilter.destination === 'all' || it.destination === communityFilter.destination) && (communityFilter.type === 'all' || it.tags.includes(communityFilter.type))).sort((a, b) => b.likes - a.likes), [communityFilter]);
  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);
    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.35, hotels: totalBudget * 0.30 };
      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers * 2 <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];
      const hotelBudget = budget.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudget);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];
      const schedule = {};
      const activities = children > 0 ? [...data.activities].sort((a, b) => (b.childFriendly ? 1 : 0) - (a.childFriendly ? 1 : 0) || b.rating - a.rating) : [...data.activities].sort((a, b) => b.rating - a.rating);
      const restaurants = data.restaurants;
      for (let d = 1; d <= tripDays; d++) { schedule[d] = []; if (d === 1) schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: `Aeroporto → ${bestHotel.location}`, price: Math.round(bestFlight.price * 0.03 + 80), duration: '1h30', period: 'manhã' }); const act = activities[(d - 1) % activities.length]; if (act) schedule[d].push({ ...act, category: 'activity' }); const rest = restaurants[(d - 1) % restaurants.length]; if (rest) schedule[d].push({ ...rest, category: 'restaurant', location: rest.cuisine }); }
      setSelectedFlight(bestFlight); setSelectedHotel(bestHotel); setDaySchedule(schedule); setItineraryGenerated(true); setIsGenerating(false);
    }, 2000);
  };

  const useCommunityItinerary = (itinerary) => {
    const data = DESTINATIONS_DATABASE[itinerary.destination];
    if (!data) return;
    setDestination(itinerary.destination); setTotalBudget(itinerary.budget);
    const flight = data.flights.find(f => f.id === itinerary.flightId) || data.flights[0];
    const hotel = data.hotels.find(h => h.id === itinerary.hotelId) || data.hotels[0];
    const schedule = {};
    Object.entries(itinerary.dailySchedule).forEach(([day, items]) => { schedule[day] = items.map(item => { if (item.type === 'transfer' || item.type === 'free') return item; if (item.activityId) { const act = data.activities.find(a => a.id === item.activityId); return act ? { ...act, category: 'activity' } : null; } if (item.restaurantId) { const rest = data.restaurants.find(r => r.id === item.restaurantId); return rest ? { ...rest, category: 'restaurant', location: rest.cuisine } : null; } return null; }).filter(Boolean); });
    const today = new Date(); const start = new Date(today); start.setDate(today.getDate() + 30); const end = new Date(start); end.setDate(start.getDate() + itinerary.duration);
    setStartDate(start.toISOString().split('T')[0]); setEndDate(end.toISOString().split('T')[0]); setSelectedFlight(flight); setSelectedHotel(hotel); setDaySchedule(schedule); setItineraryGenerated(true); setShowItineraryModal(false); setCurrentView('plan');
  };

  useEffect(() => { setItineraryGenerated(false); setDaySchedule({}); }, [destination]);
  useEffect(() => { if (children > childrenAges.length) setChildrenAges([...childrenAges, ...Array(children - childrenAges.length).fill(5)]); else if (children < childrenAges.length) setChildrenAges(childrenAges.slice(0, children)); }, [children]);

  if (currentView === 'landing') return (<div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900"><header className="p-4"><div className="max-w-7xl mx-auto flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center"><Globe size={24} className="text-white" /></div><span className="text-xl font-bold text-white">SmartTravel AI</span></div>{user ? <button onClick={() => setCurrentView('profile')} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2">{user.avatar} {user.name}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Entrar</button>}</div></header><div className="max-w-7xl mx-auto px-4 py-16 text-center"><h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Viaje <span className="text-teal-400">Inteligente</span></h1><p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">Crie roteiros personalizados com IA ou use roteiros da comunidade.</p><div className="flex flex-col sm:flex-row gap-4 justify-center mb-12"><button onClick={() => setCurrentView('plan')} className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Sparkles size={20} />Criar Roteiro</button><button onClick={() => setCurrentView('community')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><Users size={20} />Comunidade</button></div></div><AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} /></div>);

  if (currentView === 'profile') { if (!user) { setCurrentView('landing'); return null; } return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100"><header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button className="text-teal-600 font-medium">Minha Conta</button></nav></div></header><div className="max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onLogout={() => { setUser(null); setCurrentView('landing'); }} /></div></div>); }

  if (currentView === 'community') return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100"><header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}</nav></div></header><div className="max-w-7xl mx-auto px-4 py-8"><div className="flex items-center justify-between mb-8"><div><h1 className="text-3xl font-bold text-slate-800">Roteiros da Comunidade</h1><p className="text-slate-500">{filteredCommunity.length} roteiros</p></div></div><div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8"><div className="flex flex-wrap gap-4"><div className="flex-1 min-w-[200px]"><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><select value={communityFilter.destination} onChange={(e) => setCommunityFilter({...communityFilter, destination: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select></div><div className="flex-1 min-w-[200px]"><label className="text-xs font-medium text-slate-500 mb-1 block">Tipo</label><select value={communityFilter.type} onChange={(e) => setCommunityFilter({...communityFilter, type: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl"><option value="all">Todos</option>{TRAVELER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></div></div></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onView={(i) => { setSelectedItinerary(i); setShowItineraryModal(true); }} onUse={useCommunityItinerary} />)}</div></div>{showItineraryModal && selectedItinerary && (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"><div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"><div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: `url(${DESTINATIONS_DATABASE[selectedItinerary.destination]?.coverUrl})` }}><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><button onClick={() => setShowItineraryModal(false)} className="absolute top-4 right-4 p-2 bg-black/30 rounded-full text-white"><X size={20} /></button><div className="absolute bottom-4 left-4"><h2 className="text-2xl font-bold text-white">{selectedItinerary.title}</h2><p className="text-white/80">{selectedItinerary.destination}</p></div></div><div className="p-6 overflow-y-auto max-h-[50vh]"><div className="flex items-center gap-4 mb-4"><span className="text-3xl">{selectedItinerary.author.avatar}</span><div><p className="font-semibold">{selectedItinerary.author.name}</p><p className="text-sm text-slate-500">{selectedItinerary.duration} dias • R$ {selectedItinerary.budget.toLocaleString('pt-BR')}</p></div><div className="ml-auto flex items-center gap-1 text-amber-500"><Star size={16} className="fill-amber-500" /><span className="font-bold">{selectedItinerary.rating}</span></div></div><h3 className="font-bold mb-2">✨ Destaques</h3><div className="flex flex-wrap gap-2 mb-4">{selectedItinerary.highlights.map((h, i) => <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">{h}</span>)}</div>{selectedItinerary.comments?.length > 0 && (<><h3 className="font-bold mb-2">💬 Comentários</h3><div className="space-y-2 mb-4">{selectedItinerary.comments.slice(0, 3).map((c, i) => (<div key={i} className="p-3 bg-slate-50 rounded-lg"><div className="flex items-center justify-between mb-1"><span className="font-medium text-sm">{c.user}</span><div className="flex">{Array(c.rating).fill(0).map((_, j) => <Star key={j} size={10} className="fill-amber-400 text-amber-400" />)}</div></div><p className="text-sm text-slate-600">{c.text}</p></div>))}</div></>)}<button onClick={() => useCommunityItinerary(selectedItinerary)} className="w-full py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 flex items-center justify-center gap-2"><Copy size={18} /> Usar Este Roteiro</button></div></div></div>)}<AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} /></div>);

  return (<div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100"><header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div><nav className="flex items-center gap-4"><button className="text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}</nav></div></header><div className="max-w-7xl mx-auto px-4 py-6"><div className="grid lg:grid-cols-3 gap-6"><div className="lg:col-span-2 space-y-6"><div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"><h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ArrowLeftRight size={20} className="text-teal-600" />Planeje sua Viagem</h2><div className="grid md:grid-cols-2 gap-4 mb-4"><div><label className="text-xs font-medium text-slate-500 mb-1 block">Saindo de</label><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div><div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl font-medium text-teal-700">{destination || 'Escolha abaixo ↓'}</div></div></div><div className="flex flex-wrap gap-2 mb-4">{continents.map(c => <button key={c} onClick={() => setSelectedContinent(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${selectedContinent === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{c === 'all' ? 'Todos' : c}</button>)}</div><div className="grid grid-cols-3 md:grid-cols-4 gap-3">{filteredDestinations.map(([name, data]) => (<button key={name} onClick={() => setDestination(name)} className={`relative overflow-hidden rounded-xl h-20 group ${destination === name ? 'ring-4 ring-teal-500 ring-offset-2' : ''}`}><div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform" style={{ backgroundImage: `url(${data.coverUrl})` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-2 left-2"><span className="text-lg">{data.image}</span><p className="text-white text-xs font-bold">{name.split(',')[0]}</p></div>{destination === name && <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}</button>))}</div></div>{destination && (<div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm"><div className="grid grid-cols-2 md:grid-cols-4 gap-4"><div><label className="text-xs font-medium text-slate-500 mb-1 block">Ida</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div><div><label className="text-xs font-medium text-slate-500 mb-1 block">Volta</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div><div><label className="text-xs font-medium text-slate-500 mb-1 block">Adultos</label><input type="number" value={adults} onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div><div><label className="text-xs font-medium text-slate-500 mb-1 block">Crianças</label><input type="number" value={children} onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div></div>{children > 0 && (<div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200"><p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1"><Baby size={14} />Idades (0-2: voo grátis)</p><div className="flex flex-wrap gap-2">{Array.from({ length: children }, (_, i) => (<select key={i} value={childrenAges[i] || 5} onChange={(e) => { const a = [...childrenAges]; a[i] = parseInt(e.target.value); setChildrenAges(a); }} className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-sm">{Array.from({ length: 18 }, (_, age) => <option key={age} value={age}>{age}</option>)}</select>))}</div></div>)}<div className="mt-4"><label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento: R$ {totalBudget.toLocaleString('pt-BR')}</label><input type="range" min="10000" max="150000" step="1000" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value))} className="w-full" /></div><button onClick={generateItinerary} disabled={isGenerating} className="w-full mt-4 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">{isGenerating ? <><RefreshCw size={20} className="animate-spin" />Gerando...</> : <><Sparkles size={20} />Gerar Roteiro Inteligente</>}</button></div>)}{itineraryGenerated && (<div><div className="flex items-center justify-between mb-4"><div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={22} className="text-teal-600" />Seu Roteiro</h2><p className="text-slate-500">{origin.split(' ')[0]} → {destination} • {tripDays} dias</p></div><button onClick={() => setItineraryGenerated(false)} className="text-sm text-teal-600 hover:underline flex items-center gap-1"><RefreshCw size={14} />Regenerar</button></div><div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: tripDays }, (_, i) => i + 1).map(day => (<DayCard key={day} day={day} startDate={startDate} items={daySchedule[day] || []} isFirst={day === 1} isLast={day === tripDays} origin={origin} destination={destination} flight={selectedFlight} totalPayingTravelers={totalPayingTravelers} />))}</div></div>)}{!destination && (<div className="bg-white rounded-2xl border border-slate-200 p-12 text-center"><Globe size={48} className="text-teal-300 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer ir</p></div>)}</div><div className="space-y-6"><div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white ${!itineraryGenerated && 'opacity-50'}`}><div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div><div className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>{itineraryGenerated && (<><div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>{isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}</div><div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm"><div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos (ida+volta)</span><span className="flex items-center gap-2">R$ {costs.flights.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.flights || 0}%)</span></span></div><div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel ({tripDays} noites)</span><span className="flex items-center gap-2">R$ {costs.hotels.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.hotels || 0}%)</span></span></div><div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span className="flex items-center gap-2">R$ {costs.activities.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.activities || 0}%)</span></span></div><div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span className="flex items-center gap-2">R$ {costs.food.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.food || 0}%)</span></span></div><div className="flex justify-between items-center"><span className="opacity-80 flex items-center gap-2"><Car size={14} />Transporte Local</span><span className="flex items-center gap-2">R$ {costs.transport.toLocaleString('pt-BR')} <span className="text-xs opacity-60">({costs.percentages.transport || 0}%)</span></span></div><div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div></div></>)}</div>{itineraryGenerated && insights.length > 0 && (<div className="bg-white rounded-2xl border border-slate-200 p-4"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-teal-600" />Insights da IA</h3><div className="space-y-3">{insights.map((insight, i) => <AIInsightCard key={i} insight={insight} />)}</div></div>)}{destination && (<div className="bg-white rounded-2xl border border-slate-200 p-4"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={16} className="text-amber-500" />Top Roteiros - {destination.split(',')[0]}</h3><div className="space-y-2">{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => <CommunityCard key={it.id} itinerary={it} onView={() => {}} onUse={useCommunityItinerary} compact />)}{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda</p>}</div></div>)}{itineraryGenerated && (<button disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'}`}>{isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF do Roteiro</>}</button>)}</div></div></div><AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} /></div>);
}
