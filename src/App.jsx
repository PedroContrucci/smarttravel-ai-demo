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
  ChevronDown, Eye, Crown, Flame, Mail, Lock, UserPlus, 
  Home, Map, BookOpen, Bell, Sunrise, Sunset, Coffee, Moon, 
  Sun, PlaneTakeoff, PlaneLanding, ArrowLeftRight, ChevronUp,
  ThumbsDown, MessageSquare, Flag, Trash2, Image, Car, Copy
} from 'lucide-react';

// ============================================
// BRAZILIAN CITIES (Origins)
// ============================================
const BRAZILIAN_CITIES = [
  'São Paulo (GRU)', 'Rio de Janeiro (GIG)', 'Brasília (BSB)', 'Belo Horizonte (CNF)',
  'Salvador (SSA)', 'Fortaleza (FOR)', 'Recife (REC)', 'Porto Alegre (POA)',
  'Curitiba (CWB)', 'Manaus (MAO)', 'Florianópolis (FLN)', 'Natal (NAT)'
];

// ============================================
// TRAVELER PROFILE TYPES & INTERESTS
// ============================================
const TRAVELER_TYPES = [
  { id: 'adventure', name: 'Aventureiro', icon: Mountain, color: 'orange', description: 'Trilhas, esportes radicais' },
  { id: 'culture', name: 'Cultural', icon: Building, color: 'purple', description: 'Museus, história, arte' },
  { id: 'beach', name: 'Praia', icon: Palmtree, color: 'cyan', description: 'Sol, mar, relaxamento' },
  { id: 'gastro', name: 'Gastronômico', icon: Utensils, color: 'amber', description: 'Culinária local' },
  { id: 'family', name: 'Família', icon: Users, color: 'pink', description: 'Todas as idades' },
  { id: 'romantic', name: 'Romântico', icon: Heart, color: 'red', description: 'Casais, lua de mel' },
  { id: 'budget', name: 'Econômico', icon: Wallet, color: 'green', description: 'Melhor custo-benefício' },
  { id: 'luxury', name: 'Luxo', icon: Crown, color: 'yellow', description: 'Experiências premium' },
];

const INTEREST_TAGS = [
  'Praias', 'Montanhas', 'Cidades', 'Arte', 'História', 'Gastronomia',
  'Vida Noturna', 'Compras', 'Natureza', 'Aventura', 'Relaxamento', 'Fotografia',
  'Arquitetura', 'Esportes', 'Música', 'Festivais', 'Vinhos', 'Religioso'
];

// ============================================
// MEGA DATABASE
// ============================================
const DESTINATIONS_DATABASE = {
  'Paris, França': {
    continent: 'Europa', country: 'França', currency: '€', currencyRate: 6.2, image: '🗼',
    coverUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200',
    description: 'A cidade luz, capital mundial da moda, gastronomia e arte.',
    timezone: 'CET (UTC+1)', language: 'Francês', bestSeason: 'Abril - Junho', avgTemp: '15°C',
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
      { id: 'pr1', name: 'Le Cinq', price: 980, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.9, period: 'noite' },
      { id: 'pr2', name: 'Septime', price: 320, type: 'Bistrô', cuisine: 'Contemporânea', rating: 4.7, period: 'noite' },
      { id: 'pr3', name: 'Bouillon Chartier', price: 95, type: 'Tradicional', cuisine: 'Francesa', rating: 4.5, period: 'tarde' },
      { id: 'pr4', name: 'Café de Flore', price: 140, type: 'Café', cuisine: 'Bistro', rating: 4.4, period: 'manhã' },
      { id: 'pr5', name: 'Pink Mamma', price: 110, type: 'Casual', cuisine: 'Italiana', rating: 4.6, period: 'noite' },
      { id: 'pr6', name: 'Angelina Paris', price: 85, type: 'Café', cuisine: 'Pâtisserie', rating: 4.5, period: 'tarde' },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 195, duration: '2h', type: 'Landmark', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Champ de Mars' },
      { id: 'pa2', name: 'Museu do Louvre', price: 115, duration: '4h', type: 'Museu', rating: 4.9, childFriendly: true, period: 'manhã', location: '1º Arrondissement' },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 145, duration: '1h30', type: 'Experiência', rating: 4.6, childFriendly: true, period: 'noite', location: 'Port de la Bourdonnais' },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 265, duration: '6h', type: 'Day Trip', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Versalhes' },
      { id: 'pa5', name: 'Tour Montmartre', price: 55, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Montmartre' },
      { id: 'pa6', name: 'Museu d\'Orsay', price: 98, duration: '3h', type: 'Museu', rating: 4.8, childFriendly: true, period: 'tarde', location: '7º Arrondissement' },
      { id: 'pa7', name: 'Disneyland Paris', price: 420, duration: '10h', type: 'Parque', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Marne-la-Vallée' },
      { id: 'pa8', name: 'Show Moulin Rouge', price: 320, duration: '2h30', type: 'Show', rating: 4.6, childFriendly: false, period: 'noite', location: 'Pigalle' },
      { id: 'pa9', name: 'Arco do Triunfo', price: 65, duration: '1h', type: 'Landmark', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Place Charles de Gaulle' },
      { id: 'pa10', name: 'Jardim de Luxemburgo', price: 0, duration: '2h', type: 'Gratuito', rating: 4.6, childFriendly: true, period: 'tarde', location: '6º Arrondissement' },
    ]
  },
  'Nova York, EUA': {
    continent: 'América do Norte', country: 'Estados Unidos', currency: '$', currencyRate: 6.0, image: '🗽',
    coverUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200',
    description: 'A cidade que nunca dorme. Broadway, Central Park e arranha-céus icônicos.',
    timezone: 'EST (UTC-5)', language: 'Inglês', bestSeason: 'Set - Nov', avgTemp: '15°C',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 4200, duration: '10h', class: 'Econômica', rating: 4.3, departure: '22:30', arrival: '06:30+1', stops: 0 },
      { id: 'nf2', name: 'Delta - Direto', price: 4580, duration: '10h', class: 'Econômica', rating: 4.5, departure: '23:00', arrival: '07:00+1', stops: 0 },
      { id: 'nf3', name: 'LATAM - 1 Conexão', price: 3150, duration: '14h', class: 'Econômica', rating: 4.2, departure: '19:30', arrival: '09:30+1', stops: 1 },
      { id: 'nf4', name: 'United - Business', price: 15800, duration: '10h', class: 'Executiva', rating: 4.8, departure: '22:00', arrival: '06:00+1', stops: 0 },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza', stars: 5, price: 4800, perNight: true, location: 'Central Park', rating: 4.9, amenities: ['Icônico', 'Butler', 'Spa'] },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2650, perNight: true, location: 'Meatpacking', rating: 4.7, amenities: ['Rooftop', 'Design'] },
      { id: 'nh3', name: 'citizenM Times Square', stars: 4, price: 850, perNight: true, location: 'Times Square', rating: 4.5, amenities: ['Tech', 'Rooftop'] },
      { id: 'nh4', name: 'Pod 51', stars: 3, price: 480, perNight: true, location: 'Midtown', rating: 4.2, amenities: ['Compacto', 'Central'] },
      { id: 'nh5', name: 'HI NYC Hostel', stars: 2, price: 175, perNight: true, location: 'Upper West', rating: 4.0, amenities: ['Social', 'Tours'] },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1400, type: 'Fine Dining', cuisine: 'Americana', rating: 4.9, period: 'noite' },
      { id: 'nr2', name: 'Katz\'s Deli', price: 105, type: 'Deli', cuisine: 'Tradicional', rating: 4.7, period: 'tarde' },
      { id: 'nr3', name: 'Joe\'s Pizza', price: 48, type: 'Pizza', cuisine: 'NY Style', rating: 4.6, period: 'tarde' },
      { id: 'nr4', name: 'Shake Shack', price: 72, type: 'Fast Casual', cuisine: 'Burgers', rating: 4.5, period: 'tarde' },
      { id: 'nr5', name: 'The Smith', price: 165, type: 'Brunch', cuisine: 'Americana', rating: 4.4, period: 'manhã' },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 220, duration: '2h', type: 'Landmark', rating: 4.7, childFriendly: true, period: 'noite', location: '5th Avenue' },
      { id: 'na2', name: 'Estátua da Liberdade', price: 175, duration: '4h', type: 'Landmark', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Liberty Island' },
      { id: 'na3', name: 'Broadway Show', price: 520, duration: '3h', type: 'Teatro', rating: 4.9, childFriendly: true, period: 'noite', location: 'Theater District' },
      { id: 'na4', name: 'MoMA', price: 145, duration: '3h', type: 'Museu', rating: 4.8, childFriendly: true, period: 'tarde', location: 'Midtown' },
      { id: 'na5', name: 'Central Park Bike', price: 95, duration: '2h', type: 'Natureza', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Central Park' },
      { id: 'na6', name: 'Top of the Rock', price: 198, duration: '1h30', type: 'Landmark', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Rockefeller Center' },
      { id: 'na7', name: '9/11 Memorial', price: 115, duration: '2h30', type: 'Memorial', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Lower Manhattan' },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: '2h', type: 'Gratuito', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Brooklyn Bridge' },
      { id: 'na9', name: 'Times Square', price: 0, duration: '1h', type: 'Gratuito', rating: 4.3, childFriendly: true, period: 'noite', location: 'Times Square' },
      { id: 'na10', name: 'High Line Park', price: 0, duration: '2h', type: 'Gratuito', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Chelsea' },
    ]
  },
  'Tóquio, Japão': {
    continent: 'Ásia', country: 'Japão', currency: '¥', currencyRate: 0.04, image: '🗾',
    coverUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200',
    description: 'Tradição milenar encontra tecnologia futurista.',
    timezone: 'JST (UTC+9)', language: 'Japonês', bestSeason: 'Mar - Mai', avgTemp: '16°C',
    flights: [
      { id: 'tf1', name: 'ANA - 1 Conexão', price: 7200, duration: '24h', class: 'Econômica', rating: 4.8, departure: '23:55', arrival: '05:55+2', stops: 1 },
      { id: 'tf2', name: 'JAL - 1 Conexão', price: 6450, duration: '26h', class: 'Econômica', rating: 4.7, departure: '22:00', arrival: '08:00+2', stops: 1 },
      { id: 'tf3', name: 'Emirates - 1 Conexão', price: 5680, duration: '28h', class: 'Econômica', rating: 4.6, departure: '01:30', arrival: '11:30+2', stops: 1 },
      { id: 'tf4', name: 'Qatar - 1 Conexão', price: 5250, duration: '30h', class: 'Econômica', rating: 4.5, departure: '02:00', arrival: '14:00+2', stops: 1 },
    ],
    hotels: [
      { id: 'th1', name: 'Aman Tokyo', stars: 5, price: 6200, perNight: true, location: 'Otemachi', rating: 4.9, amenities: ['Spa', 'Vista Imperial'] },
      { id: 'th2', name: 'Park Hyatt Tokyo', stars: 5, price: 3800, perNight: true, location: 'Shinjuku', rating: 4.8, amenities: ['Piscina', 'New York Bar'] },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 720, perNight: true, location: 'Shinjuku', rating: 4.4, amenities: ['Design', 'Rooftop'] },
      { id: 'th4', name: 'Khaosan Tokyo', stars: 2, price: 145, perNight: true, location: 'Asakusa', rating: 4.1, amenities: ['Social', 'Tradicional'] },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 2100, type: 'Sushi', cuisine: 'Omakase', rating: 4.9, period: 'noite' },
      { id: 'tr2', name: 'Ichiran Ramen', price: 72, type: 'Ramen', cuisine: 'Tonkotsu', rating: 4.7, period: 'tarde' },
      { id: 'tr3', name: 'Gonpachi', price: 195, type: 'Izakaya', cuisine: 'Japonesa', rating: 4.6, period: 'noite' },
      { id: 'tr4', name: 'Tsukiji Market', price: 135, type: 'Mercado', cuisine: 'Frutos do Mar', rating: 4.8, period: 'manhã' },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 135, duration: '2h', type: 'Landmark', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Sumida' },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: '2h', type: 'Templo', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Asakusa' },
      { id: 'ta3', name: 'teamLab Planets', price: 198, duration: '2h30', type: 'Arte Digital', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Toyosu' },
      { id: 'ta4', name: 'Monte Fuji Day Trip', price: 420, duration: '11h', type: 'Day Trip', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Mt. Fuji' },
      { id: 'ta5', name: 'Shibuya + Harajuku', price: 65, duration: '3h', type: 'Tour', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Shibuya' },
      { id: 'ta6', name: 'DisneySea Tokyo', price: 380, duration: '10h', type: 'Parque', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Urayasu' },
      { id: 'ta7', name: 'Akihabara Anime Tour', price: 85, duration: '3h', type: 'Tour', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Akihabara' },
      { id: 'ta8', name: 'Meiji Shrine', price: 0, duration: '1h30', type: 'Gratuito', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Harajuku' },
    ]
  },
  'Roma, Itália': {
    continent: 'Europa', country: 'Itália', currency: '€', currencyRate: 6.2, image: '🏛️',
    coverUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200',
    description: 'A cidade eterna, berço do Império Romano.',
    timezone: 'CET (UTC+1)', language: 'Italiano', bestSeason: 'Abr - Jun', avgTemp: '18°C',
    flights: [
      { id: 'rf1', name: 'Alitalia - Direto', price: 4200, duration: '12h', class: 'Econômica', rating: 4.3, departure: '22:00', arrival: '13:00+1', stops: 0 },
      { id: 'rf2', name: 'TAP - 1 Conexão', price: 3100, duration: '15h', class: 'Econômica', rating: 4.1, departure: '21:00', arrival: '15:00+1', stops: 1 },
      { id: 'rf3', name: 'Iberia - 1 Conexão', price: 2950, duration: '16h', class: 'Econômica', rating: 4.0, departure: '20:30', arrival: '15:30+1', stops: 1 },
    ],
    hotels: [
      { id: 'rh1', name: 'Hotel de Russie', stars: 5, price: 3800, perNight: true, location: 'Piazza del Popolo', rating: 4.9, amenities: ['Spa', 'Jardim'] },
      { id: 'rh2', name: 'Hotel Artemide', stars: 4, price: 850, perNight: true, location: 'Via Nazionale', rating: 4.5, amenities: ['Rooftop', 'Wi-Fi'] },
      { id: 'rh3', name: 'Generator Rome', stars: 2, price: 180, perNight: true, location: 'Termini', rating: 4.0, amenities: ['Social', 'Bar'] },
    ],
    restaurants: [
      { id: 'rr1', name: 'La Pergola', price: 850, type: 'Fine Dining', cuisine: 'Italiana', rating: 4.9, period: 'noite' },
      { id: 'rr2', name: 'Roscioli', price: 180, type: 'Trattoria', cuisine: 'Romana', rating: 4.7, period: 'tarde' },
      { id: 'rr3', name: 'Pizzeria Da Baffetto', price: 55, type: 'Pizza', cuisine: 'Pizza Romana', rating: 4.6, period: 'noite' },
    ],
    activities: [
      { id: 'ra1', name: 'Coliseu + Fórum Romano', price: 180, duration: '4h', type: 'Histórico', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Centro Histórico' },
      { id: 'ra2', name: 'Vaticano + Capela Sistina', price: 220, duration: '5h', type: 'Museu', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Cidade do Vaticano' },
      { id: 'ra3', name: 'Fontana di Trevi Tour', price: 45, duration: '2h', type: 'Tour', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Centro' },
      { id: 'ra4', name: 'Aula de Pasta', price: 120, duration: '3h', type: 'Experiência', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Trastevere' },
      { id: 'ra5', name: 'Villa Borghese', price: 85, duration: '3h', type: 'Museu', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Villa Borghese' },
      { id: 'ra6', name: 'Trastevere Food Tour', price: 95, duration: '3h', type: 'Gastronomia', rating: 4.6, childFriendly: true, period: 'noite', location: 'Trastevere' },
    ]
  },
  'Miami, EUA': {
    continent: 'América do Norte', country: 'Estados Unidos', currency: '$', currencyRate: 6.0, image: '🌴',
    coverUrl: 'https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200',
    description: 'Praias de South Beach, Art Deco e vida noturna latina.',
    timezone: 'EST (UTC-5)', language: 'Inglês/Espanhol', bestSeason: 'Nov - Abr', avgTemp: '26°C',
    flights: [
      { id: 'mf1', name: 'American Airlines - Direto', price: 3200, duration: '8h', class: 'Econômica', rating: 4.3, departure: '23:00', arrival: '05:00+1', stops: 0 },
      { id: 'mf2', name: 'LATAM - Direto', price: 2800, duration: '8h', class: 'Econômica', rating: 4.4, departure: '22:00', arrival: '04:00+1', stops: 0 },
      { id: 'mf3', name: 'Azul - 1 Conexão', price: 2400, duration: '11h', class: 'Econômica', rating: 4.2, departure: '20:00', arrival: '05:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'mh1', name: 'Faena Miami Beach', stars: 5, price: 3500, perNight: true, location: 'Mid-Beach', rating: 4.9, amenities: ['Praia', 'Spa', 'Shows'] },
      { id: 'mh2', name: 'The Setai', stars: 5, price: 2800, perNight: true, location: 'South Beach', rating: 4.8, amenities: ['3 Piscinas', 'Spa'] },
      { id: 'mh3', name: 'Freehand Miami', stars: 3, price: 420, perNight: true, location: 'Miami Beach', rating: 4.4, amenities: ['Piscina', 'Bar'] },
      { id: 'mh4', name: 'Generator Miami', stars: 2, price: 180, perNight: true, location: 'South Beach', rating: 4.1, amenities: ['Social', 'Rooftop'] },
    ],
    restaurants: [
      { id: 'mr1', name: 'Zuma', price: 380, type: 'Japanese', cuisine: 'Japonesa', rating: 4.8, period: 'noite' },
      { id: 'mr2', name: 'Joe\'s Stone Crab', price: 250, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite' },
      { id: 'mr3', name: 'Versailles', price: 65, type: 'Cubana', cuisine: 'Cubana', rating: 4.6, period: 'tarde' },
      { id: 'mr4', name: 'KYU', price: 150, type: 'Asian BBQ', cuisine: 'Asiática', rating: 4.7, period: 'noite' },
    ],
    activities: [
      { id: 'ma1', name: 'South Beach', price: 0, duration: '4h', type: 'Praia', rating: 4.7, childFriendly: true, period: 'manhã', location: 'South Beach' },
      { id: 'ma2', name: 'Art Deco Walking Tour', price: 65, duration: '2h', type: 'Tour', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Ocean Drive' },
      { id: 'ma3', name: 'Everglades Tour', price: 145, duration: '5h', type: 'Natureza', rating: 4.6, childFriendly: true, period: 'manhã', location: 'Everglades' },
      { id: 'ma4', name: 'Wynwood Walls', price: 0, duration: '2h', type: 'Arte', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Wynwood' },
      { id: 'ma5', name: 'Key West Day Trip', price: 280, duration: '12h', type: 'Day Trip', rating: 4.5, childFriendly: true, period: 'manhã', location: 'Key West' },
      { id: 'ma6', name: 'Vizcaya Museum', price: 95, duration: '3h', type: 'Museu', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Coconut Grove' },
    ]
  },
  'Cancún, México': {
    continent: 'América do Norte', country: 'México', currency: 'MXN', currencyRate: 0.35, image: '🏝️',
    coverUrl: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?w=1200',
    description: 'Praias caribenhas, ruínas maias e cenotes.',
    timezone: 'CST (UTC-6)', language: 'Espanhol', bestSeason: 'Dez - Abr', avgTemp: '28°C',
    flights: [
      { id: 'cf1', name: 'Aeroméxico - Direto', price: 2800, duration: '7h', class: 'Econômica', rating: 4.3, departure: '06:00', arrival: '11:00', stops: 0 },
      { id: 'cf2', name: 'LATAM - 1 Conexão', price: 2400, duration: '10h', class: 'Econômica', rating: 4.2, departure: '08:00', arrival: '16:00', stops: 1 },
    ],
    hotels: [
      { id: 'ch1', name: 'Le Blanc Spa Resort', stars: 5, price: 2800, perNight: true, location: 'Zona Hoteleira', rating: 4.9, amenities: ['All-Inclusive', 'Spa'] },
      { id: 'ch2', name: 'Hyatt Ziva Cancun', stars: 5, price: 1800, perNight: true, location: 'Punta Cancun', rating: 4.7, amenities: ['All-Inclusive', 'Kids Club'] },
      { id: 'ch3', name: 'Selina Cancun', stars: 3, price: 280, perNight: true, location: 'Centro', rating: 4.2, amenities: ['Social', 'Coworking'] },
    ],
    restaurants: [
      { id: 'cr1', name: 'Lorenzillo\'s', price: 280, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite' },
      { id: 'cr2', name: 'La Habichuela', price: 180, type: 'Mexicana', cuisine: 'Yucateca', rating: 4.7, period: 'noite' },
      { id: 'cr3', name: 'Tacos Rigo', price: 35, type: 'Street Food', cuisine: 'Tacos', rating: 4.5, period: 'tarde' },
    ],
    activities: [
      { id: 'ca1', name: 'Chichén Itzá', price: 320, duration: '10h', type: 'Histórico', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Yucatán' },
      { id: 'ca2', name: 'Xcaret Park', price: 450, duration: '10h', type: 'Parque', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Riviera Maya' },
      { id: 'ca3', name: 'Isla Mujeres', price: 180, duration: '6h', type: 'Praia', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Isla Mujeres' },
      { id: 'ca4', name: 'Cenote Ik Kil', price: 95, duration: '4h', type: 'Natureza', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Valladolid' },
      { id: 'ca5', name: 'Snorkel Cozumel', price: 220, duration: '6h', type: 'Aventura', rating: 4.7, childFriendly: true, period: 'manhã', location: 'Cozumel' },
    ]
  },
  'Barcelona, Espanha': {
    continent: 'Europa', country: 'Espanha', currency: '€', currencyRate: 6.2, image: '🏖️',
    coverUrl: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1200',
    description: 'Arte de Gaudí, praias mediterrâneas e vida noturna.',
    timezone: 'CET (UTC+1)', language: 'Espanhol/Catalão', bestSeason: 'Mai - Set', avgTemp: '20°C',
    flights: [
      { id: 'bf1', name: 'Iberia - 1 Conexão', price: 2800, duration: '14h', class: 'Econômica', rating: 4.2, departure: '21:00', arrival: '14:00+1', stops: 1 },
      { id: 'bf2', name: 'TAP - 1 Conexão', price: 2650, duration: '13h', class: 'Econômica', rating: 4.1, departure: '22:00', arrival: '14:00+1', stops: 1 },
    ],
    hotels: [
      { id: 'bh1', name: 'Hotel Arts Barcelona', stars: 5, price: 2800, perNight: true, location: 'Port Olímpic', rating: 4.8, amenities: ['Praia', 'Spa'] },
      { id: 'bh2', name: 'Hotel 1898', stars: 4, price: 680, perNight: true, location: 'Las Ramblas', rating: 4.4, amenities: ['Piscina', 'Central'] },
      { id: 'bh3', name: 'Generator Barcelona', stars: 2, price: 150, perNight: true, location: 'Gràcia', rating: 4.1, amenities: ['Social', 'Terraço'] },
    ],
    restaurants: [
      { id: 'br1', name: 'Tickets', price: 280, type: 'Tapas Modernas', cuisine: 'Espanhola', rating: 4.8, period: 'noite' },
      { id: 'br2', name: 'Cal Pep', price: 150, type: 'Tapas', cuisine: 'Frutos do Mar', rating: 4.7, period: 'tarde' },
      { id: 'br3', name: 'La Boqueria', price: 60, type: 'Mercado', cuisine: 'Variada', rating: 4.6, period: 'tarde' },
    ],
    activities: [
      { id: 'ba1', name: 'Sagrada Família', price: 145, duration: '2h', type: 'Arquitetura', rating: 4.9, childFriendly: true, period: 'manhã', location: 'Eixample' },
      { id: 'ba2', name: 'Park Güell', price: 85, duration: '2h', type: 'Parque', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Gràcia' },
      { id: 'ba3', name: 'Casa Batlló', price: 120, duration: '1h30', type: 'Arquitetura', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Passeig de Gràcia' },
      { id: 'ba4', name: 'Camp Nou Tour', price: 95, duration: '2h', type: 'Esporte', rating: 4.6, childFriendly: true, period: 'tarde', location: 'Les Corts' },
      { id: 'ba5', name: 'Barceloneta Beach', price: 0, duration: '3h', type: 'Gratuito', rating: 4.5, childFriendly: true, period: 'tarde', location: 'Barceloneta' },
    ]
  },
  'Dubai, Emirados Árabes': {
    continent: 'Ásia', country: 'Emirados Árabes', currency: 'AED', currencyRate: 1.65, image: '🏙️',
    coverUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
    description: 'Luxo extremo, arranha-céus futuristas e deserto.',
    timezone: 'GST (UTC+4)', language: 'Árabe/Inglês', bestSeason: 'Nov - Mar', avgTemp: '28°C',
    flights: [
      { id: 'df1', name: 'Emirates - Direto', price: 5800, duration: '14h', class: 'Econômica', rating: 4.8, departure: '03:00', arrival: '22:00', stops: 0 },
      { id: 'df2', name: 'Qatar - 1 Conexão', price: 4200, duration: '18h', class: 'Econômica', rating: 4.5, departure: '01:00', arrival: '22:00', stops: 1 },
    ],
    hotels: [
      { id: 'dh1', name: 'Burj Al Arab', stars: 5, price: 8500, perNight: true, location: 'Jumeirah', rating: 4.9, amenities: ['Icônico', 'Butler'] },
      { id: 'dh2', name: 'Atlantis The Palm', stars: 5, price: 3200, perNight: true, location: 'Palm Jumeirah', rating: 4.7, amenities: ['Aquaventure'] },
      { id: 'dh3', name: 'Rove Downtown', stars: 4, price: 650, perNight: true, location: 'Downtown', rating: 4.4, amenities: ['Burj Khalifa View'] },
    ],
    restaurants: [
      { id: 'dr1', name: 'At.mosphere', price: 650, type: 'Fine Dining', cuisine: 'Internacional', rating: 4.8, period: 'noite' },
      { id: 'dr2', name: 'Pierchic', price: 450, type: 'Seafood', cuisine: 'Frutos do Mar', rating: 4.7, period: 'noite' },
      { id: 'dr3', name: 'Ravi Restaurant', price: 35, type: 'Casual', cuisine: 'Paquistanesa', rating: 4.6, period: 'tarde' },
    ],
    activities: [
      { id: 'da1', name: 'Burj Khalifa - At The Top', price: 280, duration: '2h', type: 'Landmark', rating: 4.9, childFriendly: true, period: 'tarde', location: 'Downtown' },
      { id: 'da2', name: 'Desert Safari', price: 220, duration: '6h', type: 'Aventura', rating: 4.7, childFriendly: true, period: 'tarde', location: 'Deserto' },
      { id: 'da3', name: 'Dubai Mall + Fountain', price: 0, duration: '4h', type: 'Compras', rating: 4.6, childFriendly: true, period: 'noite', location: 'Downtown' },
      { id: 'da4', name: 'Aquaventure Park', price: 350, duration: '6h', type: 'Parque', rating: 4.8, childFriendly: true, period: 'manhã', location: 'Palm Jumeirah' },
    ]
  },
};

// ============================================
// COMMUNITY ITINERARIES WITH DAILY DETAILS
// ============================================
const COMMUNITY_ITINERARIES = [
  // Miami
  {
    id: 'ci-miami-1', title: 'Miami Beach Life', destination: 'Miami, EUA',
    author: { name: 'Camila Andrade', avatar: '👩', verified: true },
    duration: 5, budget: 18000, travelers: 2, likes: 2678, saves: 1345, rating: 4.7, reviews: 212,
    tags: ['beach'], highlights: ['South Beach', 'Pool Parties', 'Art Deco Tour'], featured: true,
    flightId: 'mf2', hotelId: 'mh3',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: 'Aeroporto → Hotel', price: 280, duration: '2h', period: 'manhã' }, { activityId: 'ma1' }, { restaurantId: 'mr1' }],
      2: [{ activityId: 'ma4' }, { restaurantId: 'mr2' }],
      3: [{ activityId: 'ma3' }, { restaurantId: 'mr3' }],
      4: [{ activityId: 'ma2' }, { activityId: 'ma6' }, { restaurantId: 'mr4' }],
      5: [{ activityId: 'ma1' }]
    },
    comments: [{ user: 'Fernanda', text: 'Roteiro perfeito para quem quer praia e badalação!', rating: 5 }]
  },
  {
    id: 'ci-miami-2', title: 'Miami com Crianças', destination: 'Miami, EUA',
    author: { name: 'Eduardo Lima', avatar: '👨', verified: false },
    duration: 6, budget: 25000, travelers: 4, likes: 1234, saves: 678, rating: 4.5, reviews: 98,
    tags: ['family'], highlights: ['Zoo Miami', 'Everglades', 'Seaquarium'], featured: false,
    flightId: 'mf1', hotelId: 'mh3',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: 'Aeroporto → Hotel', price: 280, duration: '2h', period: 'manhã' }, { activityId: 'ma1' }],
      2: [{ activityId: 'ma3' }, { restaurantId: 'mr3' }],
      3: [{ activityId: 'ma4' }, { restaurantId: 'mr3' }],
      4: [{ activityId: 'ma6' }, { restaurantId: 'mr3' }],
      5: [{ activityId: 'ma1' }, { restaurantId: 'mr2' }],
      6: [{ activityId: 'ma2' }]
    },
    comments: []
  },
  // Paris
  {
    id: 'ci-paris-1', title: 'Paris Romântica - Lua de Mel', destination: 'Paris, França',
    author: { name: 'Marina Silva', avatar: '👩', verified: true },
    duration: 7, budget: 35000, travelers: 2, likes: 2847, saves: 1203, rating: 4.9, reviews: 234,
    tags: ['romantic', 'luxury'], highlights: ['Torre Eiffel ao Pôr do Sol', 'Cruzeiro no Sena', 'Jantar Le Cinq'], featured: true,
    flightId: 'pf1', hotelId: 'ph3',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: 'CDG → Hotel', price: 350, duration: '1h30', period: 'manhã' }, { activityId: 'pa1' }, { restaurantId: 'pr4' }],
      2: [{ activityId: 'pa2' }, { restaurantId: 'pr3' }, { activityId: 'pa3' }],
      3: [{ activityId: 'pa4' }, { restaurantId: 'pr2' }],
      4: [{ activityId: 'pa6' }, { activityId: 'pa5' }, { restaurantId: 'pr5' }],
      5: [{ activityId: 'pa10' }, { restaurantId: 'pr6' }, { activityId: 'pa9' }],
      6: [{ activityId: 'pa8' }, { restaurantId: 'pr1' }],
      7: [{ type: 'free', name: 'Manhã Livre / Compras', location: 'Champs-Élysées', price: 0, duration: '3h', period: 'manhã' }]
    },
    comments: [{ user: 'Ana', text: 'Roteiro perfeito! Fiz na lua de mel', rating: 5 }]
  },
  {
    id: 'ci-paris-2', title: 'Paris com Crianças', destination: 'Paris, França',
    author: { name: 'Carlos Mendes', avatar: '👨', verified: true },
    duration: 5, budget: 28000, travelers: 4, likes: 1523, saves: 892, rating: 4.7, reviews: 156,
    tags: ['family'], highlights: ['Disneyland Paris', 'Torre Eiffel', 'Jardim de Luxemburgo'], featured: false,
    flightId: 'pf3', hotelId: 'ph4',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: 'CDG → Hotel', price: 350, duration: '1h30', period: 'manhã' }, { activityId: 'pa1' }],
      2: [{ activityId: 'pa7' }],
      3: [{ activityId: 'pa2' }, { restaurantId: 'pr3' }],
      4: [{ activityId: 'pa10' }, { activityId: 'pa5' }, { restaurantId: 'pr5' }],
      5: [{ activityId: 'pa9' }]
    },
    comments: []
  },
  {
    id: 'ci-paris-3', title: 'Paris Econômico', destination: 'Paris, França',
    author: { name: 'Fernanda Lima', avatar: '👩', verified: false },
    duration: 6, budget: 12000, travelers: 1, likes: 2156, saves: 1450, rating: 4.6, reviews: 198,
    tags: ['budget'], highlights: ['Museus Gratuitos', 'Boulangeries Locais', 'Passeios a Pé'], featured: false,
    flightId: 'pf3', hotelId: 'ph6',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Metrô Aeroporto/Hostel', location: 'CDG → Hostel', price: 45, duration: '2h', period: 'manhã' }, { activityId: 'pa10' }],
      2: [{ activityId: 'pa2' }, { restaurantId: 'pr3' }],
      3: [{ activityId: 'pa5' }, { activityId: 'pa9' }],
      4: [{ activityId: 'pa6' }, { restaurantId: 'pr6' }],
      5: [{ activityId: 'pa1' }, { activityId: 'pa3' }],
      6: [{ type: 'free', name: 'Check-out / Compras', location: 'Marais', price: 0, duration: '3h', period: 'manhã' }]
    },
    comments: []
  },
  // Nova York
  {
    id: 'ci-nyc-1', title: 'NYC em 5 Dias - Primeiro Impacto', destination: 'Nova York, EUA',
    author: { name: 'Juliana Costa', avatar: '👩', verified: true },
    duration: 5, budget: 22000, travelers: 2, likes: 3421, saves: 1567, rating: 4.8, reviews: 312,
    tags: ['culture'], highlights: ['Top of the Rock', 'Broadway - Hamilton', 'Central Park'], featured: true,
    flightId: 'nf3', hotelId: 'nh4',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer JFK/Hotel', location: 'JFK → Hotel', price: 320, duration: '1h30', period: 'manhã' }, { activityId: 'na9' }, { restaurantId: 'nr3' }],
      2: [{ activityId: 'na2' }, { activityId: 'na7' }, { restaurantId: 'nr2' }],
      3: [{ activityId: 'na5' }, { activityId: 'na6' }, { restaurantId: 'nr4' }],
      4: [{ activityId: 'na4' }, { activityId: 'na10' }, { activityId: 'na3' }],
      5: [{ activityId: 'na8' }, { restaurantId: 'nr5' }]
    },
    comments: [{ user: 'Pedro', text: 'Seguimos e foi incrível!', rating: 5 }]
  },
  {
    id: 'ci-nyc-2', title: 'NYC de Luxo', destination: 'Nova York, EUA',
    author: { name: 'Roberto Alves', avatar: '👨', verified: true },
    duration: 7, budget: 65000, travelers: 2, likes: 1234, saves: 567, rating: 4.9, reviews: 89,
    tags: ['luxury'], highlights: ['The Plaza Hotel', 'Helicóptero Manhattan', 'Per Se Restaurant'], featured: false,
    flightId: 'nf4', hotelId: 'nh1',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Limusine JFK/Hotel', location: 'JFK → The Plaza', price: 850, duration: '1h', period: 'manhã' }, { restaurantId: 'nr1' }],
      2: [{ activityId: 'na5' }, { activityId: 'na4' }, { restaurantId: 'nr1' }],
      3: [{ activityId: 'na2' }, { activityId: 'na6' }],
      4: [{ activityId: 'na3' }, { restaurantId: 'nr5' }],
      5: [{ activityId: 'na1' }, { activityId: 'na10' }],
      6: [{ activityId: 'na7' }, { activityId: 'na8' }],
      7: [{ type: 'free', name: 'Compras 5th Avenue', location: '5th Avenue', price: 0, duration: '4h', period: 'manhã' }]
    },
    comments: []
  },
  // Tokyo
  {
    id: 'ci-tokyo-1', title: 'Tóquio em Família', destination: 'Tóquio, Japão',
    author: { name: 'Pedro Santos', avatar: '👨', verified: true },
    duration: 10, budget: 55000, travelers: 4, likes: 1956, saves: 892, rating: 4.8, reviews: 167,
    tags: ['family'], highlights: ['DisneySea Tokyo', 'teamLab Planets', 'Aula de Sushi'], featured: true,
    flightId: 'tf4', hotelId: 'th3',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Narita/Hotel', location: 'Narita → Hotel', price: 450, duration: '2h', period: 'manhã' }, { activityId: 'ta2' }],
      2: [{ activityId: 'ta6' }],
      3: [{ activityId: 'ta3' }, { activityId: 'ta5' }, { restaurantId: 'tr2' }],
      4: [{ activityId: 'ta4' }],
      5: [{ activityId: 'ta7' }, { restaurantId: 'tr3' }],
      6: [{ activityId: 'ta1' }, { activityId: 'ta8' }],
      7: [{ type: 'free', name: 'Dia de Compras', location: 'Ginza', price: 0, duration: '6h', period: 'manhã' }, { restaurantId: 'tr4' }],
      8: [{ activityId: 'ta2' }, { restaurantId: 'tr2' }],
      9: [{ activityId: 'ta5' }, { activityId: 'ta3' }],
      10: [{ type: 'free', name: 'Check-out', location: 'Hotel', price: 0, duration: '2h', period: 'manhã' }]
    },
    comments: []
  },
  {
    id: 'ci-tokyo-2', title: 'Tóquio Anime Tour', destination: 'Tóquio, Japão',
    author: { name: 'Lucas Yamamoto', avatar: '👨', verified: true },
    duration: 8, budget: 25000, travelers: 2, likes: 2345, saves: 1678, rating: 4.9, reviews: 234,
    tags: ['culture'], highlights: ['Akihabara Full Day', 'Anime Studios', 'Maid Cafés'], featured: false,
    flightId: 'tf4', hotelId: 'th4',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Narita/Hostel', location: 'Narita → Asakusa', price: 280, duration: '2h', period: 'manhã' }, { activityId: 'ta2' }],
      2: [{ activityId: 'ta7' }, { restaurantId: 'tr2' }],
      3: [{ activityId: 'ta3' }, { activityId: 'ta5' }],
      4: [{ activityId: 'ta7' }, { restaurantId: 'tr3' }],
      5: [{ activityId: 'ta1' }, { activityId: 'ta8' }],
      6: [{ activityId: 'ta6' }],
      7: [{ activityId: 'ta7' }, { restaurantId: 'tr2' }],
      8: [{ type: 'free', name: 'Último dia em Akihabara', location: 'Akihabara', price: 0, duration: '4h', period: 'manhã' }]
    },
    comments: []
  },
  // Roma
  {
    id: 'ci-roma-1', title: 'Roma Histórica', destination: 'Roma, Itália',
    author: { name: 'Marcos Oliveira', avatar: '👨', verified: true },
    duration: 6, budget: 28000, travelers: 2, likes: 2134, saves: 1023, rating: 4.8, reviews: 189,
    tags: ['culture'], highlights: ['Coliseu VIP', 'Vaticano Sem Fila', 'Fórum Romano'], featured: true,
    flightId: 'rf2', hotelId: 'rh2',
    dailySchedule: {
      1: [{ type: 'transfer', name: 'Transfer Fiumicino/Hotel', location: 'FCO → Hotel', price: 280, duration: '1h', period: 'manhã' }, { activityId: 'ra3' }, { restaurantId: 'rr3' }],
      2: [{ activityId: 'ra1' }, { restaurantId: 'rr2' }],
      3: [{ activityId: 'ra2' }, { restaurantId: 'rr3' }],
      4: [{ activityId: 'ra4' }, { activityId: 'ra6' }],
      5: [{ activityId: 'ra5' }, { restaurantId: 'rr1' }],
      6: [{ type: 'free', name: 'Manhã Livre', location: 'Trastevere', price: 0, duration: '3h', period: 'manhã' }]
    },
    comments: []
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================
const formatDate = (dateStr, addDays = 0) => {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + addDays);
  return {
    weekday: d.toLocaleDateString('pt-BR', { weekday: 'long' }).toUpperCase().replace('-FEIRA', ''),
    day: d.getDate().toString().padStart(2, '0'),
    month: (d.getMonth() + 1).toString().padStart(2, '0'),
    full: d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })
  };
};

const getPeriodStyle = (period) => {
  const styles = {
    manhã: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Sunrise, label: 'Manhã' },
    tarde: { bg: 'bg-orange-100', text: 'text-orange-700', icon: Sun, label: 'Tarde' },
    noite: { bg: 'bg-indigo-100', text: 'text-indigo-700', icon: Moon, label: 'Noite' },
  };
  return styles[period] || styles.manhã;
};

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
    onLogin({ name: formData.name || 'Viajante', email: formData.email, avatar: '👤', joinDate: '2026', trips: 0, reviews: 0 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-white/80 hover:text-white z-10"><X size={20} /></button>
        <div className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 text-white text-center">
          <Globe size={48} className="mx-auto mb-3" />
          <h2 className="text-2xl font-bold">SmartTravel AI</h2>
          <p className="opacity-80 text-sm">{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta grátis'}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {mode === 'register' && (
            <div>
              <label className="text-sm font-medium text-slate-600 block mb-1">Nome</label>
              <div className="relative"><User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="Seu nome" required /></div>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">E-mail</label>
            <div className="relative"><Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="seu@email.com" required /></div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-600 block mb-1">Senha</label>
            <div className="relative"><Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" placeholder="••••••••" required /></div>
          </div>
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
          <p className="text-center text-sm text-slate-500">{mode === 'login' ? <>Não tem conta? <button type="button" onClick={() => setMode('register')} className="text-teal-600 font-medium">Cadastre-se</button></> : <>Já tem conta? <button type="button" onClick={() => setMode('login')} className="text-teal-600 font-medium">Entrar</button></>}</p>
        </form>
      </div>
    </div>
  );
};

// AI Insight Card
const AIInsightCard = ({ insight, onAction }) => {
  const colors = {
    warning: { bg: 'bg-amber-50 border-amber-200', icon: 'text-amber-500', btn: 'bg-amber-500' },
    success: { bg: 'bg-emerald-50 border-emerald-200', icon: 'text-emerald-500', btn: 'bg-emerald-500' },
    info: { bg: 'bg-blue-50 border-blue-200', icon: 'text-blue-500', btn: 'bg-blue-500' },
    danger: { bg: 'bg-red-50 border-red-200', icon: 'text-red-500', btn: 'bg-red-500' },
  };
  const style = colors[insight.type] || colors.info;
  const Icon = insight.icon;

  return (
    <div className={`p-3 rounded-xl border ${style.bg}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={style.icon} />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-700">{insight.message}</p>
          {insight.action && (
            <button onClick={() => onAction && onAction(insight)} className={`mt-2 px-3 py-1 ${style.btn} text-white text-xs font-medium rounded-lg`}>
              {insight.action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Day Card with total cost
const DayCard = ({ day, startDate, items, isFirst, isLast, origin, destination, flight, totalPayingTravelers }) => {
  const dateInfo = formatDate(startDate, day - 1);
  
  // Calculate day total
  let dayTotal = 0;
  if (isFirst && flight) dayTotal += flight.price * totalPayingTravelers; // Flight cost on first day
  items.forEach(item => { dayTotal += (item.price || 0); });
  if (isLast && flight) dayTotal += flight.price * totalPayingTravelers; // Return flight on last day

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-700 to-teal-800 p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-teal-200 text-xs font-medium tracking-wide">{dateInfo.weekday}</p>
            <p className="text-3xl font-bold">{dateInfo.day}/{dateInfo.month}</p>
          </div>
          <div className="flex items-center gap-2">
            {isFirst && <span className="px-2 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneLanding size={12} /> Chegada</span>}
            {isLast && <span className="px-2 py-1 bg-blue-400 text-blue-900 text-xs font-bold rounded-full flex items-center gap-1"><PlaneTakeoff size={12} /> Partida</span>}
          </div>
        </div>
        {/* Day Total */}
        <div className="mt-2 pt-2 border-t border-white/20 flex items-center justify-between">
          <span className="text-teal-200 text-xs">Custo do dia:</span>
          <span className="font-bold">R$ {dayTotal.toLocaleString('pt-BR')}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* First day: Flight arrival */}
        {isFirst && flight && (
          <div className="group">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full flex items-center gap-1"><Sunrise size={12} /> Manhã</span>
            </div>
            <h4 className="font-bold text-slate-800">Chegada - {flight.name}</h4>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{origin.split(' ')[0]} → {destination.split(',')[0]}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span>
              <span className="text-xs text-slate-400">{flight.duration} • {totalPayingTravelers} passageiro(s)</span>
            </div>
          </div>
        )}

        {/* Items */}
        {items.map((item, idx) => {
          const periodStyle = getPeriodStyle(item.period);
          const PeriodIcon = periodStyle.icon;
          return (
            <div key={idx} className="border-t border-slate-100 pt-3 first:border-0 first:pt-0">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 ${periodStyle.bg} ${periodStyle.text} text-xs font-semibold rounded-full flex items-center gap-1`}>
                  <PeriodIcon size={12} /> {periodStyle.label}
                </span>
                {item.childFriendly && <span className="text-xs text-pink-500">Kids OK</span>}
              </div>
              <h4 className="font-bold text-slate-800">{item.name}</h4>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{item.location || item.cuisine}</p>
              <div className="flex items-center gap-3 mt-2">
                {item.price === 0 ? (
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-xs font-semibold rounded flex items-center gap-1"><Sparkles size={10} /> Gratuito</span>
                ) : (
                  <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {item.price.toLocaleString('pt-BR')}</span>
                )}
                {item.duration && <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={10} /> {item.duration}</span>}
              </div>
            </div>
          );
        })}

        {/* Last day: Return flight */}
        {isLast && flight && (
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full flex items-center gap-1"><Moon size={12} /> Noite</span>
            </div>
            <h4 className="font-bold text-slate-800">Voo de Volta - {flight.name}</h4>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1"><MapPin size={12} className="text-rose-400" />{destination.split(',')[0]} → {origin.split(' ')[0]}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-2 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded">R$ {(flight.price * totalPayingTravelers).toLocaleString('pt-BR')}</span>
              <span className="text-xs text-slate-400">{flight.duration}</span>
            </div>
          </div>
        )}

        {/* Add Activity */}
        <button className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-500 transition-colors flex items-center justify-center gap-2 text-sm">
          <Plus size={16} /> Adicionar atividade
        </button>
      </div>
    </div>
  );
};

// Community Card
const CommunityCard = ({ itinerary, onView, onLike, onUse, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura', gastro: '🍽️ Gastronomia' };

  if (compact) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-3 hover:shadow-md transition-all">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-sm text-slate-800 truncate">{itinerary.title}</h4>
            <p className="text-xs text-slate-500">{itinerary.duration} dias • {itinerary.destination.split(',')[0]}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
            <p className="text-xs text-slate-400">{itinerary.likes} ❤️</p>
          </div>
        </div>
        <button onClick={() => onUse && onUse(itinerary)} className="w-full mt-2 py-1.5 bg-teal-50 text-teal-600 text-xs font-medium rounded-lg hover:bg-teal-100 flex items-center justify-center gap-1">
          <Copy size={12} /> Usar este roteiro
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all">
      <div className="relative h-32 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        {itinerary.featured && <div className="absolute top-3 left-3 px-2 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1"><Crown size={12} /> DESTAQUE</div>}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-sm leading-tight">{itinerary.title}</h3>
          <p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{itinerary.author.avatar}</span>
          <div className="flex-1">
            <p className="text-xs font-medium text-slate-700">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-teal-500" />}</p>
            <p className="text-[10px] text-slate-400">{itinerary.duration} dias • R$ {itinerary.budget.toLocaleString('pt-BR')}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">
          {itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-full">{typeLabels[t] || t}</span>)}
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-3">
            <button onClick={() => onLike && onLike(itinerary.id)} className="flex items-center gap-1 text-slate-400 hover:text-rose-500 text-xs"><Heart size={14} />{itinerary.likes}</button>
            <span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.comments?.length || 0}</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => onUse && onUse(itinerary)} className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-medium rounded-lg hover:bg-teal-100 flex items-center gap-1"><Copy size={12} /> Usar</button>
            <button onClick={() => onView && onView(itinerary)} className="px-2 py-1 bg-teal-600 text-white text-xs font-medium rounded-lg hover:bg-teal-700">Ver</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Page
const ProfilePage = ({ user, userProfile, setUserProfile, onLogout }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(userProfile || { type: '', interests: [], preferredBudget: 'medium' });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-6 text-white mb-6">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">{user.avatar}</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-teal-200">{user.email}</p>
          </div>
          <button onClick={onLogout} className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 flex items-center gap-2"><LogOut size={16} /> Sair</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[{ id: 'profile', label: 'Perfil Viajante', icon: Compass }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${activeTab === tab.id ? 'bg-teal-600 text-white' : 'bg-white text-slate-600'}`}>
            <tab.icon size={16} /> {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>
          {!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border border-teal-600 text-teal-600 rounded-lg">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg">Salvar</button>}
        </div>

        <h3 className="font-semibold text-slate-700 mb-3">Seu estilo de viagem</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {TRAVELER_TYPES.map(type => (
            <button key={type.id} onClick={() => editing && setTempProfile({...tempProfile, type: type.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all ${tempProfile.type === type.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}>
              <type.icon size={24} className={tempProfile.type === type.id ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} />
              <p className="font-medium text-sm mt-2">{type.name}</p>
            </button>
          ))}
        </div>

        <h3 className="font-semibold text-slate-700 mb-3">Interesses</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {INTEREST_TAGS.map(tag => (
            <button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {tag}
            </button>
          ))}
        </div>

        <h3 className="font-semibold text-slate-700 mb-3">Orçamento preferido</h3>
        <div className="grid grid-cols-3 gap-3">
          {[{ id: 'budget', label: 'Econômico', desc: 'Até R$ 15k' }, { id: 'medium', label: 'Médio', desc: 'R$ 15k - 40k' }, { id: 'luxury', label: 'Luxo', desc: 'Acima de R$ 40k' }].map(opt => (
            <button key={opt.id} onClick={() => editing && setTempProfile({...tempProfile, preferredBudget: opt.id})} disabled={!editing} className={`p-4 rounded-xl border-2 text-center ${tempProfile.preferredBudget === opt.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200'}`}>
              <p className="font-medium">{opt.label}</p>
              <p className="text-xs text-slate-500">{opt.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
export default function App() {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState({ type: '', interests: [], preferredBudget: 'medium' });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentView, setCurrentView] = useState('landing');

  // Planning State
  const [origin, setOrigin] = useState('São Paulo (GRU)');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('2026-04-14');
  const [endDate, setEndDate] = useState('2026-04-20');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState([]);
  const [totalBudget, setTotalBudget] = useState(30000);

  // Itinerary State
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [daySchedule, setDaySchedule] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  // Community State
  const [communityFilter, setCommunityFilter] = useState({ destination: 'all', type: 'all' });
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [showItineraryModal, setShowItineraryModal] = useState(false);

  // UI State
  const [selectedContinent, setSelectedContinent] = useState('all');

  // Computed Values
  const currentData = destination ? DESTINATIONS_DATABASE[destination] : null;
  const tripDays = useMemo(() => Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24))), [startDate, endDate]);
  const payingChildren = useMemo(() => childrenAges.filter(age => age > 2).length, [childrenAges]);
  const totalPayingTravelers = adults + payingChildren;

  // Costs calculation
  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, activities: 0, food: 0, transport: 0, total: 0 };
    
    const flightCost = (selectedFlight?.price || 0) * totalPayingTravelers * 2;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    
    let activitiesCost = 0;
    let foodCost = 0;
    let transportCost = 0;
    
    Object.values(daySchedule).forEach(day => {
      day.forEach(item => {
        if (item.type === 'transfer') transportCost += (item.price || 0);
        else if (item.category === 'restaurant') foodCost += (item.price || 0);
        else activitiesCost += (item.price || 0);
      });
    });
    
    return { 
      flights: flightCost, 
      hotels: hotelCost, 
      activities: activitiesCost * totalPayingTravelers, 
      food: foodCost * totalPayingTravelers,
      transport: transportCost,
      total: flightCost + hotelCost + (activitiesCost + foodCost) * totalPayingTravelers + transportCost
    };
  }, [selectedFlight, selectedHotel, daySchedule, tripDays, totalPayingTravelers, itineraryGenerated]);

  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  // AI Insights
  const insights = useMemo(() => {
    if (!itineraryGenerated || !currentData) return [];
    const list = [];

    if (isOverBudget) {
      const cheaperHotel = currentData.hotels.find(h => h.price < selectedHotel?.price);
      list.push({ type: 'danger', icon: AlertTriangle, message: `Orçamento excedido em R$ ${Math.abs(remaining).toLocaleString('pt-BR')}! ${cheaperHotel ? `Troque para ${cheaperHotel.name} e economize.` : ''}`, action: 'Ver Hotéis' });
    } else if (remaining > totalBudget * 0.25) {
      const betterHotel = currentData.hotels.find(h => h.stars === 5 && h.price * tripDays <= remaining + (selectedHotel?.price || 0) * tripDays);
      if (betterHotel && betterHotel.id !== selectedHotel?.id) {
        list.push({ type: 'success', icon: Sparkles, message: `Upgrade disponível! ${betterHotel.name} (5★) cabe no seu orçamento.`, action: 'Ver Upgrade' });
      }
    }

    if (userProfile.type === 'family' && children > 0) {
      const kidActivities = Object.values(daySchedule).flat().filter(i => i.childFriendly);
      if (kidActivities.length < tripDays) {
        list.push({ type: 'info', icon: Lightbulb, message: 'Seu perfil é Família. Adicionamos atividades kids-friendly ao roteiro.' });
      }
    }

    if (userProfile.type === 'gastro') {
      list.push({ type: 'info', icon: Utensils, message: 'Baseado no seu perfil Gastronômico, priorizamos restaurantes bem avaliados.' });
    }

    if (userProfile.type === 'budget' && costs.total > totalBudget * 0.8) {
      list.push({ type: 'warning', icon: Wallet, message: 'Dica: Inclua mais atividades gratuitas para economizar no roteiro.' });
    }

    return list.slice(0, 3);
  }, [itineraryGenerated, currentData, isOverBudget, remaining, totalBudget, selectedHotel, tripDays, userProfile, daySchedule, costs, children]);

  // Filter destinations
  const filteredDestinations = useMemo(() => {
    return Object.entries(DESTINATIONS_DATABASE).filter(([name, data]) => {
      return selectedContinent === 'all' || data.continent === selectedContinent;
    });
  }, [selectedContinent]);

  // Filter community
  const filteredCommunity = useMemo(() => {
    return COMMUNITY_ITINERARIES.filter(it => {
      const matchesDest = communityFilter.destination === 'all' || it.destination === communityFilter.destination;
      const matchesType = communityFilter.type === 'all' || it.tags.includes(communityFilter.type);
      return matchesDest && matchesType;
    }).sort((a, b) => b.likes - a.likes);
  }, [communityFilter]);

  const continents = ['all', ...new Set(Object.values(DESTINATIONS_DATABASE).map(d => d.continent))];

  // Generate Itinerary
  const generateItinerary = () => {
    if (!destination) return;
    setIsGenerating(true);
    setTimeout(() => {
      const data = DESTINATIONS_DATABASE[destination];
      const budget = { flights: totalBudget * 0.35, hotels: totalBudget * 0.30 };

      const affordableFlights = data.flights.filter(f => f.price * totalPayingTravelers * 2 <= budget.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];

      const hotelBudgetPerNight = budget.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudgetPerNight);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];

      // Build schedule
      const schedule = {};
      const activities = children > 0 
        ? [...data.activities].sort((a, b) => (b.childFriendly ? 1 : 0) - (a.childFriendly ? 1 : 0) || b.rating - a.rating)
        : [...data.activities].sort((a, b) => b.rating - a.rating);
      const restaurants = data.restaurants;

      for (let d = 1; d <= tripDays; d++) {
        schedule[d] = [];
        if (d === 1) {
          schedule[d].push({ type: 'transfer', name: 'Transfer Aeroporto/Hotel', location: `Aeroporto → ${bestHotel.location}`, price: Math.round(bestFlight.price * 0.05), duration: '2h', period: 'manhã' });
        }
        const act = activities[(d - 1) % activities.length];
        if (act) schedule[d].push({ ...act, category: 'activity' });
        const rest = restaurants[(d - 1) % restaurants.length];
        if (rest) schedule[d].push({ ...rest, category: 'restaurant', location: rest.cuisine });
      }

      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setDaySchedule(schedule);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 2000);
  };

  // Use Community Itinerary
  const useCommunityItinerary = (itinerary) => {
    const data = DESTINATIONS_DATABASE[itinerary.destination];
    if (!data) return;

    setDestination(itinerary.destination);
    setTotalBudget(itinerary.budget);
    
    const flight = data.flights.find(f => f.id === itinerary.flightId) || data.flights[0];
    const hotel = data.hotels.find(h => h.id === itinerary.hotelId) || data.hotels[0];
    
    // Build schedule from community itinerary
    const schedule = {};
    Object.entries(itinerary.dailySchedule).forEach(([day, items]) => {
      schedule[day] = items.map(item => {
        if (item.type === 'transfer' || item.type === 'free') return item;
        if (item.activityId) {
          const act = data.activities.find(a => a.id === item.activityId);
          return act ? { ...act, category: 'activity' } : null;
        }
        if (item.restaurantId) {
          const rest = data.restaurants.find(r => r.id === item.restaurantId);
          return rest ? { ...rest, category: 'restaurant', location: rest.cuisine } : null;
        }
        return null;
      }).filter(Boolean);
    });

    // Adjust dates
    const today = new Date();
    const start = new Date(today);
    start.setDate(today.getDate() + 30);
    const end = new Date(start);
    end.setDate(start.getDate() + itinerary.duration);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
    setSelectedFlight(flight);
    setSelectedHotel(hotel);
    setDaySchedule(schedule);
    setItineraryGenerated(true);
    setShowItineraryModal(false);
    setCurrentView('plan');
  };

  // Reset
  useEffect(() => { setItineraryGenerated(false); setDaySchedule({}); }, [destination]);
  useEffect(() => { if (children > childrenAges.length) setChildrenAges([...childrenAges, ...Array(children - childrenAges.length).fill(5)]); else if (children < childrenAges.length) setChildrenAges(childrenAges.slice(0, children)); }, [children]);

  // ============================================
  // VIEWS
  // ============================================

  // Landing
  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
        <header className="p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3"><div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center"><Globe size={24} className="text-white" /></div><span className="text-xl font-bold text-white">SmartTravel AI</span></div>
            {user ? <button onClick={() => setCurrentView('profile')} className="px-4 py-2 bg-white/10 text-white rounded-lg flex items-center gap-2">{user.avatar} {user.name}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">Entrar</button>}
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Viaje <span className="text-teal-400">Inteligente</span></h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">Crie roteiros personalizados com IA ou use roteiros da comunidade.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setCurrentView('plan')} className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"><Sparkles size={20} />Criar Roteiro com IA</button>
            <button onClick={() => setCurrentView('community')} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2"><Users size={20} />Explorar Comunidade</button>
          </div>
        </div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      </div>
    );
  }

  // Profile
  if (currentView === 'profile') {
    if (!user) { setCurrentView('landing'); return null; }
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div>
            <nav className="flex items-center gap-4">
              <button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button>
              <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>
              <button className="text-teal-600 font-medium">Minha Conta</button>
            </nav>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProfilePage user={user} userProfile={userProfile} setUserProfile={setUserProfile} onLogout={() => { setUser(null); setCurrentView('landing'); }} />
        </div>
      </div>
    );
  }

  // Community
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
        <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div>
            <nav className="flex items-center gap-4">
              <button onClick={() => setCurrentView('plan')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button>
              <button className="text-teal-600 font-medium">Comunidade</button>
              {user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}
            </nav>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div><h1 className="text-3xl font-bold text-slate-800">Roteiros da Comunidade</h1><p className="text-slate-500">Descubra e replique viagens de outros viajantes</p></div>
            <button onClick={() => setCurrentView('plan')} className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 flex items-center gap-2"><Plus size={20} /> Criar Roteiro</button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label>
                <select value={communityFilter.destination} onChange={(e) => setCommunityFilter({...communityFilter, destination: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option value="all">Todos</option>
                  {Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs font-medium text-slate-500 mb-1 block">Tipo</label>
                <select value={communityFilter.type} onChange={(e) => setCommunityFilter({...communityFilter, type: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                  <option value="all">Todos</option>
                  {TRAVELER_TYPES.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunity.map(it => <CommunityCard key={it.id} itinerary={it} onView={(i) => { setSelectedItinerary(i); setShowItineraryModal(true); }} onLike={() => {}} onUse={useCommunityItinerary} />)}
          </div>
        </div>

        {/* Itinerary Modal */}
        {showItineraryModal && selectedItinerary && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative h-40 bg-cover bg-center" style={{ backgroundImage: `url(${DESTINATIONS_DATABASE[selectedItinerary.destination]?.coverUrl})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <button onClick={() => setShowItineraryModal(false)} className="absolute top-4 right-4 p-2 bg-black/30 rounded-full text-white"><X size={20} /></button>
                <div className="absolute bottom-4 left-4">
                  <h2 className="text-2xl font-bold text-white">{selectedItinerary.title}</h2>
                  <p className="text-white/80">{selectedItinerary.destination}</p>
                </div>
              </div>
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl">{selectedItinerary.author.avatar}</span>
                  <div>
                    <p className="font-semibold">{selectedItinerary.author.name}</p>
                    <p className="text-sm text-slate-500">{selectedItinerary.duration} dias • R$ {selectedItinerary.budget.toLocaleString('pt-BR')}</p>
                  </div>
                </div>
                <h3 className="font-bold mb-2">✨ Destaques</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedItinerary.highlights.map((h, i) => <span key={i} className="px-3 py-1 bg-teal-50 text-teal-700 text-sm rounded-full">{h}</span>)}
                </div>
                <button onClick={() => useCommunityItinerary(selectedItinerary)} className="w-full py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 flex items-center justify-center gap-2">
                  <Copy size={18} /> Usar Este Roteiro
                </button>
              </div>
            </div>
          </div>
        )}
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      </div>
    );
  }

  // Plan View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-slate-100">
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}><div className="w-10 h-10 bg-gradient-to-br from-teal-600 to-teal-800 rounded-xl flex items-center justify-center"><Globe size={22} className="text-white" /></div><span className="text-xl font-bold text-teal-800">SmartTravel AI</span></div>
          <nav className="flex items-center gap-4">
            <button className="text-teal-600 font-medium">Planejar</button>
            <button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>
            {user ? <button onClick={() => setCurrentView('profile')} className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center text-xl">{user.avatar}</button> : <button onClick={() => setShowAuthModal(true)} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium">Entrar</button>}
          </nav>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Origin & Destination */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><ArrowLeftRight size={20} className="text-teal-600" />Planeje sua Viagem</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Saindo de</label><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-medium">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label><div className="px-4 py-3 bg-teal-50 border border-teal-200 rounded-xl font-medium text-teal-700">{destination || 'Escolha abaixo ↓'}</div></div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">{continents.map(c => <button key={c} onClick={() => setSelectedContinent(c)} className={`px-3 py-1.5 text-xs font-medium rounded-lg ${selectedContinent === c ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600'}`}>{c === 'all' ? 'Todos' : c}</button>)}</div>
              <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                {filteredDestinations.map(([name, data]) => (
                  <button key={name} onClick={() => setDestination(name)} className={`relative overflow-hidden rounded-xl h-20 group ${destination === name ? 'ring-4 ring-teal-500 ring-offset-2' : ''}`}>
                    <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform" style={{ backgroundImage: `url(${data.coverUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-2 left-2"><span className="text-lg">{data.image}</span><p className="text-white text-xs font-bold">{name.split(',')[0]}</p></div>
                    {destination === name && <div className="absolute top-2 right-2 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Trip Config */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Ida</label><input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Volta</label><input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Adultos</label><input type="number" value={adults} onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))} min="1" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                  <div><label className="text-xs font-medium text-slate-500 mb-1 block">Crianças</label><input type="number" value={children} onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))} min="0" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div>
                </div>
                {children > 0 && (
                  <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1"><Baby size={14} />Idades (0-2: voo grátis)</p>
                    <div className="flex flex-wrap gap-2">{Array.from({ length: children }, (_, i) => (<select key={i} value={childrenAges[i] || 5} onChange={(e) => { const a = [...childrenAges]; a[i] = parseInt(e.target.value); setChildrenAges(a); }} className="px-2 py-1 bg-white border border-amber-300 rounded-lg text-sm">{Array.from({ length: 18 }, (_, age) => <option key={age} value={age}>{age}</option>)}</select>))}</div>
                  </div>
                )}
                <div className="mt-4">
                  <label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento: R$ {totalBudget.toLocaleString('pt-BR')}</label>
                  <input type="range" min="10000" max="200000" step="1000" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value))} className="w-full" />
                </div>
                <button onClick={generateItinerary} disabled={isGenerating} className="w-full mt-4 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-70">
                  {isGenerating ? <><RefreshCw size={20} className="animate-spin" />Gerando...</> : <><Sparkles size={20} />Gerar Roteiro Inteligente</>}
                </button>
              </div>
            )}

            {/* Calendar Grid - 3 columns */}
            {itineraryGenerated && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div><h2 className="text-xl font-bold text-slate-800 flex items-center gap-2"><Calendar size={22} className="text-teal-600" />Seu Roteiro</h2><p className="text-slate-500">{origin.split(' ')[0]} → {destination} • {tripDays} dias</p></div>
                  <button onClick={() => setItineraryGenerated(false)} className="text-sm text-teal-600 hover:underline flex items-center gap-1"><RefreshCw size={14} />Regenerar</button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map(day => (
                    <DayCard key={day} day={day} startDate={startDate} items={daySchedule[day] || []} isFirst={day === 1} isLast={day === tripDays} origin={origin} destination={destination} flight={selectedFlight} totalPayingTravelers={totalPayingTravelers} />
                  ))}
                </div>
              </div>
            )}

            {!destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Globe size={48} className="text-teal-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3>
                <p className="text-slate-500">Selecione para onde você quer ir</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Budget */}
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white ${!itineraryGenerated && 'opacity-50'}`}>
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (
                <>
                  <div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>
                    {isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString('pt-BR')}` : `Disponível: R$ ${remaining.toLocaleString('pt-BR')}`}
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm">
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos (ida+volta)</span><span>R$ {costs.flights.toLocaleString('pt-BR')}</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel ({tripDays} noites)</span><span>R$ {costs.hotels.toLocaleString('pt-BR')}</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString('pt-BR')}</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString('pt-BR')}</span></div>
                    <div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Car size={14} />Transporte Local</span><span>R$ {costs.transport.toLocaleString('pt-BR')}</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString('pt-BR')}</span></div>
                  </div>
                </>
              )}
            </div>

            {/* AI Insights */}
            {itineraryGenerated && insights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={16} className="text-teal-600" />Insights da IA</h3>
                <div className="space-y-3">
                  {insights.map((insight, i) => <AIInsightCard key={i} insight={insight} />)}
                </div>
              </div>
            )}

            {/* Top Community */}
            {destination && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4">
                <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={16} className="text-amber-500" />Top Roteiros - {destination.split(',')[0]}</h3>
                <div className="space-y-2">
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => <CommunityCard key={it.id} itinerary={it} onView={() => {}} onLike={() => {}} onUse={useCommunityItinerary} compact />)}
                  {COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda</p>}
                </div>
              </div>
            )}

            {/* Download */}
            {itineraryGenerated && (
              <button disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white'}`}>
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
