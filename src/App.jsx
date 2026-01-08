import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, 
  Wallet, TrendingDown, TrendingUp, Sparkles, ChevronRight,
  ArrowRightLeft, Check, AlertTriangle, Lightbulb, Globe,
  Star, Clock, CreditCard, Shield, Zap, X, Plus, Minus,
  RefreshCw, Play, ChevronDown, ArrowRight, Edit3, Menu,
  Send, MessageCircle, Bot, ChevronUp, Download, FileText,
  Sun, Moon, Coffee, Sunrise, Sunset, Navigation, Heart
} from 'lucide-react';

// Mock Data - Multiple Destinations with realistic 2026 prices
const MOCK_DATA = {
  'Paris, França': {
    currency: '€',
    image: '🗼',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    timezone: 'CET (UTC+1)',
    language: 'Francês',
    bestSeason: 'Abril - Junho',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4850, duration: '11h 30m', class: 'Econômica', rating: 4.5, departure: '23:45', arrival: '14:15+1', airline: 'Air France', stops: 0 },
      { id: 'pf2', name: 'LATAM - 1 Conexão', price: 3680, duration: '16h 45m', class: 'Econômica', rating: 4.2, departure: '22:00', arrival: '18:45+1', airline: 'LATAM', stops: 1 },
      { id: 'pf3', name: 'TAP Portugal - 1 Conexão', price: 3250, duration: '14h 20m', class: 'Econômica', rating: 4.0, departure: '21:30', arrival: '15:50+1', airline: 'TAP', stops: 1 },
      { id: 'pf4', name: 'Air France - Business', price: 14200, duration: '11h 30m', class: 'Executiva', rating: 4.9, departure: '23:45', arrival: '14:15+1', airline: 'Air France', stops: 0 },
      { id: 'pf5', name: 'KLM - 1 Conexão', price: 3420, duration: '15h 10m', class: 'Econômica', rating: 4.3, departure: '20:15', arrival: '14:25+1', airline: 'KLM', stops: 1 },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 4200, perNight: true, location: 'Tuileries', rating: 4.9, amenities: ['Spa', 'Restaurante Michelin', 'Concierge 24h'] },
      { id: 'ph2', name: 'Plaza Athénée', stars: 5, price: 3500, perNight: true, location: 'Champs-Élysées', rating: 4.8, amenities: ['Spa', 'Piscina', 'Vista Eiffel'] },
      { id: 'ph3', name: 'Sofitel Paris Arc de Triomphe', stars: 5, price: 1850, perNight: true, location: 'Arc de Triomphe', rating: 4.6, amenities: ['Spa', 'Fitness', 'Bar Rooftop'] },
      { id: 'ph4', name: 'Mercure Paris Centre Tour Eiffel', stars: 4, price: 920, perNight: true, location: 'Tour Eiffel', rating: 4.4, amenities: ['Wi-Fi', 'Café da manhã', 'Localização'] },
      { id: 'ph5', name: 'Ibis Styles Montmartre', stars: 3, price: 520, perNight: true, location: 'Montmartre', rating: 4.1, amenities: ['Wi-Fi', 'Café da manhã'] },
      { id: 'ph6', name: 'Generator Paris', stars: 2, price: 210, perNight: true, location: 'Canal Saint-Martin', rating: 4.0, amenities: ['Wi-Fi', 'Bar', 'Eventos'] },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq ★★★', price: 980, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.9, meal: 'Jantar especial' },
      { id: 'pr2', name: 'Septime', price: 320, type: 'Bistrô Moderno', cuisine: 'Contemporânea', rating: 4.7, meal: 'Almoço/Jantar' },
      { id: 'pr3', name: 'Bouillon Chartier', price: 95, type: 'Tradicional', cuisine: 'Francesa Clássica', rating: 4.5, meal: 'Almoço/Jantar' },
      { id: 'pr4', name: 'Café de Flore', price: 140, type: 'Café', cuisine: 'Café & Bistro', rating: 4.4, meal: 'Café da manhã/Almoço' },
      { id: 'pr5', name: 'Pink Mamma', price: 110, type: 'Casual', cuisine: 'Italiana', rating: 4.6, meal: 'Almoço/Jantar' },
      { id: 'pr6', name: 'Le Comptoir du Panthéon', price: 85, type: 'Bistrô', cuisine: 'Francesa', rating: 4.3, meal: 'Almoço' },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Acesso ao Topo', price: 195, duration: '2h', type: 'Landmark', rating: 4.8, time: 'Manhã ou Pôr do Sol' },
      { id: 'pa2', name: 'Museu do Louvre - Ingresso Prioritário', price: 115, duration: '4h', type: 'Museu', rating: 4.9, time: 'Manhã' },
      { id: 'pa3', name: 'Cruzeiro Bateaux Mouches no Sena', price: 145, duration: '1h30', type: 'Experiência', rating: 4.6, time: 'Noite' },
      { id: 'pa4', name: 'Palácio de Versalhes - Tour Completo', price: 265, duration: '6h', type: 'Day Trip', rating: 4.8, time: 'Dia inteiro' },
      { id: 'pa5', name: 'Tour a Pé por Montmartre', price: 55, duration: '3h', type: 'Tour', rating: 4.5, time: 'Tarde' },
      { id: 'pa6', name: 'Catacumbas de Paris', price: 98, duration: '1h30', type: 'Atração', rating: 4.4, time: 'Tarde' },
      { id: 'pa7', name: 'Aula de Culinária Francesa', price: 185, duration: '3h', type: 'Experiência', rating: 4.7, time: 'Manhã' },
      { id: 'pa8', name: 'Museu d\'Orsay', price: 98, duration: '3h', type: 'Museu', rating: 4.8, time: 'Tarde' },
      { id: 'pa9', name: 'Show no Moulin Rouge', price: 320, duration: '2h30', type: 'Entretenimento', rating: 4.6, time: 'Noite' },
      { id: 'pa10', name: 'Degustação de Vinhos e Queijos', price: 165, duration: '2h', type: 'Experiência', rating: 4.7, time: 'Noite' },
    ]
  },
  'Nova York, EUA': {
    currency: '$',
    image: '🗽',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
    timezone: 'EST (UTC-5)',
    language: 'Inglês',
    bestSeason: 'Setembro - Novembro',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 4200, duration: '10h 15m', class: 'Econômica', rating: 4.3, departure: '22:30', arrival: '06:45+1', airline: 'American', stops: 0 },
      { id: 'nf2', name: 'Delta - Direto', price: 4580, duration: '10h 00m', class: 'Econômica', rating: 4.5, departure: '23:00', arrival: '07:00+1', airline: 'Delta', stops: 0 },
      { id: 'nf3', name: 'United - 1 Conexão', price: 3350, duration: '14h 30m', class: 'Econômica', rating: 4.1, departure: '18:00', arrival: '08:30+1', airline: 'United', stops: 1 },
      { id: 'nf4', name: 'JetBlue - Direto', price: 3680, duration: '10h 20m', class: 'Econômica', rating: 4.4, departure: '21:00', arrival: '05:20+1', airline: 'JetBlue', stops: 0 },
      { id: 'nf5', name: 'LATAM - 1 Conexão', price: 3150, duration: '13h 45m', class: 'Econômica', rating: 4.2, departure: '19:30', arrival: '09:15+1', airline: 'LATAM', stops: 1 },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza Hotel', stars: 5, price: 4800, perNight: true, location: 'Central Park South', rating: 4.9, amenities: ['Spa', 'Butler Service', 'Vista Central Park'] },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2650, perNight: true, location: 'Meatpacking District', rating: 4.7, amenities: ['Rooftop Bar', 'Piscina', 'Design'] },
      { id: 'nh3', name: '1 Hotel Brooklyn Bridge', stars: 5, price: 1950, perNight: true, location: 'Brooklyn', rating: 4.6, amenities: ['Sustentável', 'Vista Skyline', 'Spa'] },
      { id: 'nh4', name: 'citizenM Times Square', stars: 4, price: 850, perNight: true, location: 'Times Square', rating: 4.5, amenities: ['Design Moderno', 'Rooftop', 'Tech'] },
      { id: 'nh5', name: 'Pod 51', stars: 3, price: 480, perNight: true, location: 'Midtown East', rating: 4.2, amenities: ['Compacto', 'Wi-Fi', 'Localização'] },
      { id: 'nh6', name: 'HI NYC Hostel', stars: 2, price: 175, perNight: true, location: 'Upper West Side', rating: 4.0, amenities: ['Social', 'Cozinha', 'Tours'] },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1400, type: 'Fine Dining', cuisine: 'Americana Moderna', rating: 4.9, meal: 'Jantar degustação' },
      { id: 'nr2', name: 'Katz\'s Delicatessen', price: 105, type: 'Casual', cuisine: 'Deli Tradicional', rating: 4.7, meal: 'Almoço' },
      { id: 'nr3', name: 'Joe\'s Pizza', price: 48, type: 'Fast Food', cuisine: 'Pizza NY Style', rating: 4.6, meal: 'Qualquer hora' },
      { id: 'nr4', name: 'The Smith', price: 165, type: 'Bistrô', cuisine: 'Americana', rating: 4.4, meal: 'Brunch/Jantar' },
      { id: 'nr5', name: 'Shake Shack', price: 72, type: 'Fast Casual', cuisine: 'Burgers', rating: 4.5, meal: 'Almoço' },
      { id: 'nr6', name: 'Los Tacos No. 1', price: 55, type: 'Casual', cuisine: 'Mexicana', rating: 4.6, meal: 'Almoço' },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building - Deck 86º', price: 220, duration: '2h', type: 'Landmark', rating: 4.7, time: 'Pôr do Sol' },
      { id: 'na2', name: 'Estátua da Liberdade + Ellis Island', price: 175, duration: '4h', type: 'Landmark', rating: 4.8, time: 'Manhã' },
      { id: 'na3', name: 'Broadway Show - O Fantasma da Ópera', price: 520, duration: '3h', type: 'Entretenimento', rating: 4.9, time: 'Noite' },
      { id: 'na4', name: 'MoMA - Museum of Modern Art', price: 145, duration: '3h', type: 'Museu', rating: 4.8, time: 'Tarde' },
      { id: 'na5', name: 'Central Park Bike Tour', price: 95, duration: '2h', type: 'Tour', rating: 4.6, time: 'Manhã' },
      { id: 'na6', name: 'Top of the Rock', price: 198, duration: '1h30', type: 'Landmark', rating: 4.7, time: 'Noite' },
      { id: 'na7', name: '9/11 Memorial & Museum', price: 115, duration: '2h30', type: 'Memorial', rating: 4.9, time: 'Manhã' },
      { id: 'na8', name: 'Brooklyn Bridge Walk + DUMBO', price: 0, duration: '2h', type: 'Gratuito', rating: 4.5, time: 'Tarde' },
      { id: 'na9', name: 'Helicopter Tour Manhattan', price: 450, duration: '20min', type: 'Experiência', rating: 4.8, time: 'Qualquer hora' },
      { id: 'na10', name: 'NBA Game - Madison Square Garden', price: 380, duration: '3h', type: 'Esporte', rating: 4.7, time: 'Noite' },
    ]
  },
  'Tóquio, Japão': {
    currency: '¥',
    image: '🗾',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
    timezone: 'JST (UTC+9)',
    language: 'Japonês',
    bestSeason: 'Março - Maio',
    flights: [
      { id: 'tf1', name: 'ANA - 1 Conexão', price: 7200, duration: '24h 30m', class: 'Econômica', rating: 4.8, departure: '23:55', arrival: '05:25+2', airline: 'ANA', stops: 1 },
      { id: 'tf2', name: 'JAL - 1 Conexão', price: 6450, duration: '26h 15m', class: 'Econômica', rating: 4.7, departure: '22:00', arrival: '08:15+2', airline: 'JAL', stops: 1 },
      { id: 'tf3', name: 'Emirates - 1 Conexão', price: 5680, duration: '28h 00m', class: 'Econômica', rating: 4.6, departure: '01:30', arrival: '11:30+2', airline: 'Emirates', stops: 1 },
      { id: 'tf4', name: 'Qatar Airways - 1 Conexão', price: 5250, duration: '30h 45m', class: 'Econômica', rating: 4.5, departure: '02:00', arrival: '14:45+2', airline: 'Qatar', stops: 1 },
      { id: 'tf5', name: 'ANA - Business Class', price: 18500, duration: '24h 30m', class: 'Executiva', rating: 4.9, departure: '23:55', arrival: '05:25+2', airline: 'ANA', stops: 1 },
    ],
    hotels: [
      { id: 'th1', name: 'Aman Tokyo', stars: 5, price: 6200, perNight: true, location: 'Otemachi', rating: 4.9, amenities: ['Spa', 'Vista Jardins Imperiais', 'Concierge'] },
      { id: 'th2', name: 'Park Hyatt Tokyo', stars: 5, price: 3800, perNight: true, location: 'Shinjuku', rating: 4.8, amenities: ['Piscina', 'Spa', 'New York Bar'] },
      { id: 'th3', name: 'The Prince Gallery Tokyo', stars: 5, price: 2200, perNight: true, location: 'Kioicho', rating: 4.7, amenities: ['Arte', 'Spa', 'Vista cidade'] },
      { id: 'th4', name: 'Shinjuku Granbell Hotel', stars: 4, price: 720, perNight: true, location: 'Shinjuku', rating: 4.4, amenities: ['Design', 'Localização', 'Rooftop'] },
      { id: 'th5', name: 'Tokyu Stay Shibuya', stars: 3, price: 420, perNight: true, location: 'Shibuya', rating: 4.3, amenities: ['Lavanderia', 'Kitchenette', 'Wi-Fi'] },
      { id: 'th6', name: 'Khaosan Tokyo Kabuki', stars: 2, price: 145, perNight: true, location: 'Asakusa', rating: 4.1, amenities: ['Social', 'Tradicional', 'Tours'] },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 2100, type: 'Fine Dining', cuisine: 'Sushi Omakase', rating: 4.9, meal: 'Jantar reserva' },
      { id: 'tr2', name: 'Ichiran Ramen Shibuya', price: 72, type: 'Casual', cuisine: 'Tonkotsu Ramen', rating: 4.7, meal: 'Almoço/Jantar' },
      { id: 'tr3', name: 'Gonpachi Nishi-Azabu', price: 195, type: 'Izakaya', cuisine: 'Japonesa Tradicional', rating: 4.6, meal: 'Jantar' },
      { id: 'tr4', name: 'Tsukiji Outer Market', price: 135, type: 'Mercado', cuisine: 'Frutos do Mar Frescos', rating: 4.8, meal: 'Café/Almoço' },
      { id: 'tr5', name: 'CoCo Ichibanya', price: 62, type: 'Fast Casual', cuisine: 'Curry Japonês', rating: 4.4, meal: 'Almoço/Jantar' },
      { id: 'tr6', name: 'Afuri Ramen', price: 78, type: 'Casual', cuisine: 'Yuzu Shio Ramen', rating: 4.6, meal: 'Almoço/Jantar' },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree - Deck 450m', price: 135, duration: '2h', type: 'Landmark', rating: 4.7, time: 'Pôr do Sol' },
      { id: 'ta2', name: 'Templo Senso-ji + Nakamise', price: 0, duration: '2h', type: 'Templo', rating: 4.8, time: 'Manhã cedo' },
      { id: 'ta3', name: 'teamLab Planets Tokyo', price: 198, duration: '2h30', type: 'Arte Digital', rating: 4.9, time: 'Tarde' },
      { id: 'ta4', name: 'Day Trip Monte Fuji + Hakone', price: 420, duration: '11h', type: 'Day Trip', rating: 4.8, time: 'Dia inteiro' },
      { id: 'ta5', name: 'Tour Shibuya + Harajuku', price: 65, duration: '3h', type: 'Tour', rating: 4.5, time: 'Tarde' },
      { id: 'ta6', name: 'Cerimônia do Chá Tradicional', price: 115, duration: '1h30', type: 'Experiência', rating: 4.7, time: 'Tarde' },
      { id: 'ta7', name: 'Akihabara Anime + Gaming Tour', price: 85, duration: '3h', type: 'Tour', rating: 4.6, time: 'Tarde' },
      { id: 'ta8', name: 'Jardins do Palácio Imperial', price: 0, duration: '2h', type: 'Gratuito', rating: 4.6, time: 'Manhã' },
      { id: 'ta9', name: 'Experiência Samurai', price: 165, duration: '2h', type: 'Experiência', rating: 4.5, time: 'Manhã' },
      { id: 'ta10', name: 'Robot Restaurant Show', price: 285, duration: '2h', type: 'Entretenimento', rating: 4.4, time: 'Noite' },
    ]
  }
};

// AI Chat Messages
const AI_RESPONSES = {
  greeting: "Olá! Sou o assistente SmartTravel AI. Posso ajudar você a otimizar seu roteiro, sugerir trocas inteligentes ou responder dúvidas sobre seu destino. Como posso ajudar?",
  budget_high: "Notei que seu orçamento está acima do necessário! Posso sugerir upgrades como voo executivo ou hotel 5 estrelas para uma experiência premium.",
  budget_low: "Seu orçamento está apertado, mas temos ótimas opções! Posso sugerir alternativas econômicas que mantêm a qualidade da viagem.",
  hotel_tip: "Dica: hotéis 4 estrelas na mesma região geralmente oferecem o melhor custo-benefício, com economia de até 60% comparado aos 5 estrelas.",
  activity_tip: "Para maximizar seu tempo, sugiro agrupar atrações por região. Isso economiza transporte e permite aproveitar mais cada dia!"
};

// AI Insights Generator
const generateAIInsights = (budget, spent, selections, days, destination, currentData) => {
  const remaining = budget - spent;
  const percentUsed = (spent / budget) * 100;
  const insights = [];

  if (percentUsed > 100) {
    const cheaperHotel = currentData.hotels.find(h => h.price < (selections.hotel?.price || 0));
    insights.push({
      type: 'critical',
      icon: AlertTriangle,
      message: `Orçamento excedido em R$ ${Math.abs(remaining).toLocaleString('pt-BR')}! ${cheaperHotel ? `Troque para ${cheaperHotel.name} e economize R$ ${((selections.hotel?.price - cheaperHotel.price) * days).toLocaleString('pt-BR')}.` : 'Reduza passeios ou escolha voo mais econômico.'}`,
      action: 'Trocar Hotel',
      actionCategory: 'hotel',
      savings: cheaperHotel ? `Economia de R$ ${((selections.hotel?.price - cheaperHotel.price) * days).toLocaleString('pt-BR')}` : 'Ajuste necessário'
    });
  } else if (percentUsed > 85) {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      message: 'Orçamento apertado. Considere restaurantes mais casuais para ter margem de segurança.',
      action: 'Ver Restaurantes',
      actionCategory: 'restaurant',
      savings: 'Até 40% de economia'
    });
  }
  
  if (remaining > budget * 0.20 && selections.hotel?.stars < 5) {
    const upgradeHotel = currentData.hotels.find(h => h.stars === 5 && h.price * days <= remaining + (selections.hotel?.price || 0) * days);
    if (upgradeHotel) {
      insights.push({
        type: 'opportunity',
        icon: Sparkles,
        message: `Upgrade disponível! ${upgradeHotel.name} (5★) por +R$ ${((upgradeHotel.price - (selections.hotel?.price || 0)) * days).toLocaleString('pt-BR')} no total.`,
        action: 'Ver Upgrade',
        actionCategory: 'hotel',
        savings: `R$ ${remaining.toLocaleString('pt-BR')} disponível`
      });
    }
  }

  if (selections.hotel?.stars <= 3 && percentUsed < 80) {
    const betterHotel = currentData.hotels.find(h => h.stars === 4);
    if (betterHotel) {
      insights.push({
        type: 'tip',
        icon: Lightbulb,
        message: `Hotel 4★ ${betterHotel.name} disponível por +R$ ${((betterHotel.price - (selections.hotel?.price || 0)) * days).toLocaleString('pt-BR')}. Melhor custo-benefício!`,
        action: 'Comparar Hotéis',
        actionCategory: 'hotel',
        savings: 'Upgrade recomendado'
      });
    }
  }

  const cheaperFlight = currentData.flights.find(f => f.price < (selections.flight?.price || 0) && f.rating >= 4.0);
  if (cheaperFlight && percentUsed > 70) {
    insights.push({
      type: 'smart',
      icon: Zap,
      message: `Voo ${cheaperFlight.name} economiza R$ ${(((selections.flight?.price || 0) - cheaperFlight.price) * (selections.travelers || 2)).toLocaleString('pt-BR')} com boa avaliação (${cheaperFlight.rating}★).`,
      action: 'Trocar Voo',
      actionCategory: 'flight',
      savings: 'Economia inteligente'
    });
  }

  if (selections.activities?.length >= 2) {
    insights.push({
      type: 'smart',
      icon: Zap,
      message: destination.includes('Paris') 
        ? 'Combo Louvre + Orsay no mesmo dia economiza transporte e tempo!'
        : destination.includes('Nova York')
        ? 'CityPASS inclui 6 atrações principais com até 40% de desconto.'
        : 'JR Pass de 7 dias é essencial para Day Trips - economiza até 50%!',
      action: 'Ver Passeios',
      actionCategory: 'activity',
      savings: 'Otimização de tempo'
    });
  }

  return insights.slice(0, 4);
};

// Progress Bar Component
const ProgressBar = ({ label, current, max, color, icon: Icon }) => {
  const percentage = Math.min((current / max) * 100, 100);
  const isOverBudget = current > max;
  
  const colorMap = {
    'text-blue-600': '#1e40af',
    'text-emerald-600': '#059669',
    'text-amber-600': '#d97706',
    'text-violet-600': '#7c3aed'
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icon size={16} className={color} />
          <span className="text-sm font-medium text-slate-700">{label}</span>
        </div>
        <span className={`text-sm font-bold ${isOverBudget ? 'text-red-500' : 'text-slate-600'}`}>
          R$ {current.toLocaleString('pt-BR')}
        </span>
      </div>
      <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: isOverBudget ? '#ef4444' : colorMap[color] || '#1e40af'
          }}
        />
      </div>
    </div>
  );
};

// Swap Modal Component
const SwapModal = ({ isOpen, onClose, category, currentItem, options, onSwap, tripDays, travelers }) => {
  if (!isOpen) return null;

  const categoryLabels = { flight: 'Voo', hotel: 'Hotel', restaurant: 'Restaurante', activity: 'Passeio' };
  const categoryIcons = { flight: Plane, hotel: Hotel, restaurant: Utensils, activity: Camera };
  const Icon = categoryIcons[category];

  const calculateImpact = (newItem) => {
    if (!currentItem) return category === 'flight' ? newItem.price * travelers : newItem.price;
    if (category === 'hotel') return (newItem.price - currentItem.price) * tripDays;
    if (category === 'flight') return (newItem.price - currentItem.price) * travelers;
    return newItem.price - currentItem.price;
  };

  const sortedOptions = [...options].sort((a, b) => a.price - b.price);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon size={24} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Escolher {categoryLabels[category]}</h3>
              <p className="text-sm text-slate-500">{sortedOptions.length} opções disponíveis</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {currentItem && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-blue-600 font-semibold mb-2">✓ SELECIONADO ATUALMENTE</p>
            <div className="flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-800">{currentItem.name}</span>
                {currentItem.stars && (
                  <div className="flex mt-1">
                    {[...Array(currentItem.stars)].map((_, i) => (
                      <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className="font-bold text-blue-600 text-lg">R$ {currentItem.price.toLocaleString('pt-BR')}</span>
                {currentItem.perNight && <span className="text-xs text-slate-500 block">/noite × {tripDays} = R$ {(currentItem.price * tripDays).toLocaleString('pt-BR')}</span>}
                {category === 'flight' && <span className="text-xs text-slate-500 block">× {travelers} = R$ {(currentItem.price * travelers).toLocaleString('pt-BR')}</span>}
              </div>
            </div>
          </div>
        )}

        <div className="p-4 overflow-y-auto max-h-[400px]">
          <div className="space-y-3">
            {sortedOptions.map((item, idx) => {
              const impact = currentItem ? calculateImpact(item) : 0;
              const isPositive = impact < 0;
              const isCurrent = currentItem?.id === item.id;

              return (
                <div 
                  key={item.id}
                  onClick={() => !isCurrent && onSwap(item)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${isCurrent ? 'border-blue-500 bg-blue-50/50 cursor-default' : 'border-slate-200 hover:border-blue-300 hover:shadow-lg hover:scale-[1.01]'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        {item.stars && (
                          <div className="flex">
                            {[...Array(item.stars)].map((_, i) => (
                              <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        )}
                        {isCurrent && <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full font-medium">Atual</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 flex-wrap">
                        {item.rating && (
                          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded">
                            <Star size={12} className="text-amber-400 fill-amber-400" />{item.rating}
                          </span>
                        )}
                        {item.location && <span className="flex items-center gap-1"><MapPin size={12} />{item.location}</span>}
                        {item.duration && <span className="flex items-center gap-1"><Clock size={12} />{item.duration}</span>}
                        {item.stops !== undefined && <span className="flex items-center gap-1"><Navigation size={12} />{item.stops === 0 ? 'Direto' : `${item.stops} conexão`}</span>}
                        {item.class && <span className="bg-slate-100 px-2 py-0.5 rounded text-xs">{item.class}</span>}
                      </div>
                      {item.amenities && (
                        <div className="flex gap-1 mt-2 flex-wrap">
                          {item.amenities.slice(0, 3).map((amenity, i) => (
                            <span key={i} className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded">{amenity}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-slate-800 text-lg">R$ {item.price.toLocaleString('pt-BR')}</p>
                      {item.perNight && <p className="text-xs text-slate-400">/noite</p>}
                      {!isCurrent && currentItem && (
                        <div className={`mt-2 px-3 py-1 rounded-full text-sm font-semibold ${isPositive ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                          {isPositive ? '↓' : '↑'} R$ {Math.abs(impact).toLocaleString('pt-BR')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="p-4 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <p className="text-xs text-slate-500 text-center">💡 Clique em uma opção para selecionar • Impacto no orçamento calculado automaticamente</p>
        </div>
      </div>
    </div>
  );
};

// PDF Generator Modal
const PDFModal = ({ isOpen, onClose, tripData }) => {
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  const { destination, startDate, endDate, tripDays, adults, children, costs, selectedFlight, selectedHotel, selectedActivities, selectedRestaurants, totalBudget, currentData } = tripData;

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const handleGeneratePDF = async () => {
    setGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const htmlContent = `<!DOCTYPE html><html lang="pt-BR"><head><meta charset="UTF-8"><title>Roteiro de Viagem - ${destination}</title><style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',sans-serif;background:linear-gradient(135deg,#1e40af 0%,#3b82f6 50%,#1e40af 100%);min-height:100vh;padding:40px}.container{max-width:800px;margin:0 auto;background:white;border-radius:24px;overflow:hidden;box-shadow:0 25px 50px -12px rgba(0,0,0,0.25)}.header{background:linear-gradient(135deg,#1e40af 0%,#3b82f6 100%);color:white;padding:48px;text-align:center}.header h1{font-size:36px;font-weight:800;margin-bottom:8px}.header .destination{font-size:48px;margin:16px 0}.header .dates{font-size:18px;opacity:0.9}.header .travelers{display:inline-block;background:rgba(255,255,255,0.2);padding:8px 24px;border-radius:50px;margin-top:16px;font-weight:500}.section{padding:32px 48px;border-bottom:1px solid #e2e8f0}.section:last-child{border-bottom:none}.section-title{font-size:20px;font-weight:700;color:#1e40af;margin-bottom:20px;display:flex;align-items:center;gap:12px}.section-title::before{content:'';width:4px;height:24px;background:linear-gradient(180deg,#1e40af,#3b82f6);border-radius:2px}.info-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}.info-card{background:#f8fafc;border-radius:12px;padding:20px;border:1px solid #e2e8f0}.info-card.highlight{background:linear-gradient(135deg,#eff6ff 0%,#dbeafe 100%);border-color:#93c5fd}.info-label{font-size:12px;color:#64748b;text-transform:uppercase;font-weight:600;letter-spacing:0.5px}.info-value{font-size:18px;font-weight:700;color:#1e293b;margin-top:4px}.info-value.price{color:#1e40af;font-size:24px}.item-row{display:flex;justify-content:space-between;align-items:center;padding:16px;background:#f8fafc;border-radius:12px;margin-bottom:12px;border:1px solid #e2e8f0}.item-name{font-weight:600;color:#1e293b}.item-detail{font-size:14px;color:#64748b;margin-top:4px}.item-price{font-weight:700;color:#1e40af;font-size:18px}.stars{color:#f59e0b}.budget-bar{background:#e2e8f0;height:12px;border-radius:6px;overflow:hidden;margin-top:12px}.budget-fill{height:100%;background:linear-gradient(90deg,#1e40af,#3b82f6);border-radius:6px}.total-section{background:linear-gradient(135deg,#1e40af 0%,#3b82f6 100%);color:white;padding:32px 48px;display:flex;justify-content:space-between;align-items:center}.total-label{font-size:18px;opacity:0.9}.total-value{font-size:36px;font-weight:800}.footer{text-align:center;padding:24px;background:#f8fafc;color:#64748b;font-size:14px}@media print{body{background:white;padding:0}.container{box-shadow:none}}</style></head><body><div class="container"><div class="header"><h1>🌍 SmartTravel AI</h1><div class="destination">${currentData.image} ${destination}</div><div class="dates">${formatDate(startDate)} → ${formatDate(endDate)}</div><div class="travelers">👥 ${adults} adulto${adults > 1 ? 's' : ''}${children > 0 ? ` + ${children} criança${children > 1 ? 's' : ''}` : ''} • ${tripDays} dias</div></div><div class="section"><div class="section-title">Resumo Financeiro</div><div class="info-grid"><div class="info-card highlight"><div class="info-label">Orçamento Total</div><div class="info-value price">R$ ${totalBudget.toLocaleString('pt-BR')}</div></div><div class="info-card highlight"><div class="info-label">Custo Planejado</div><div class="info-value price">R$ ${costs.total.toLocaleString('pt-BR')}</div></div><div class="info-card"><div class="info-label">Custo por Dia</div><div class="info-value">R$ ${Math.round(costs.total / tripDays).toLocaleString('pt-BR')}</div></div><div class="info-card"><div class="info-label">Custo por Pessoa</div><div class="info-value">R$ ${Math.round(costs.total / (adults + children)).toLocaleString('pt-BR')}</div></div></div><div class="budget-bar"><div class="budget-fill" style="width:${Math.min((costs.total / totalBudget) * 100, 100)}%"></div></div><p style="text-align:center;margin-top:8px;color:#64748b;font-size:14px">${Math.round((costs.total / totalBudget) * 100)}% do orçamento • R$ ${(totalBudget - costs.total).toLocaleString('pt-BR')} disponível</p></div><div class="section"><div class="section-title">✈️ Voo</div><div class="item-row"><div><div class="item-name">${selectedFlight?.name || 'Não selecionado'}</div><div class="item-detail">${selectedFlight?.duration || ''} • ${selectedFlight?.class || ''} • ${selectedFlight?.stops === 0 ? 'Direto' : selectedFlight?.stops + ' conexão'}</div></div><div class="item-price">R$ ${((selectedFlight?.price || 0) * (adults + children)).toLocaleString('pt-BR')}</div></div></div><div class="section"><div class="section-title">🏨 Hospedagem</div><div class="item-row"><div><div class="item-name">${selectedHotel?.name || 'Não selecionado'}</div><div class="item-detail"><span class="stars">${'★'.repeat(selectedHotel?.stars || 0)}</span> • ${selectedHotel?.location || ''}</div></div><div style="text-align:right"><div class="item-price">R$ ${((selectedHotel?.price || 0) * tripDays).toLocaleString('pt-BR')}</div><div class="item-detail">R$ ${(selectedHotel?.price || 0).toLocaleString('pt-BR')}/noite × ${tripDays}</div></div></div></div><div class="section"><div class="section-title">🎯 Passeios Incluídos</div>${selectedActivities.map(a => `<div class="item-row"><div><div class="item-name">${a.name}</div><div class="item-detail">${a.duration} • ${a.type}</div></div><div class="item-price">R$ ${a.price.toLocaleString('pt-BR')}</div></div>`).join('')}</div><div class="section"><div class="section-title">🍽️ Restaurantes Sugeridos</div>${selectedRestaurants.map(r => `<div class="item-row"><div><div class="item-name">${r.name}</div><div class="item-detail">${r.cuisine} • ${r.type}</div></div><div class="item-price">~R$ ${r.price.toLocaleString('pt-BR')}/pessoa</div></div>`).join('')}</div><div class="total-section"><div><div class="total-label">Investimento Total</div><div style="font-size:14px;opacity:0.8;margin-top:4px">Voo + Hospedagem + Passeios + Alimentação</div></div><div class="total-value">R$ ${costs.total.toLocaleString('pt-BR')}</div></div><div class="footer"><p>📱 Roteiro gerado por <strong>SmartTravel AI</strong></p><p style="margin-top:8px">Gerado em ${new Date().toLocaleDateString('pt-BR')}</p><p style="margin-top:16px;font-size:12px">Preços sujeitos a alteração. Reserve com antecedência.</p></div></div></body></html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SmartTravel_${destination.replace(/[^a-zA-Z]/g, '')}_${tripDays}dias.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setGenerating(false);
    setGenerated(true);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl animate-scaleIn">
        <div className="p-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center"><FileText size={32} /></div>
            <div><h3 className="text-xl font-bold">Gerar Guia de Viagem</h3><p className="text-emerald-100">Documento completo para sua viagem</p></div>
          </div>
        </div>
        <div className="p-6">
          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-slate-800 mb-3">📋 O documento incluirá:</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              {['Resumo financeiro completo', 'Detalhes do voo e hospedagem', 'Lista de passeios e atividades', 'Restaurantes recomendados'].map((item, i) => (
                <li key={i} className="flex items-center gap-2"><Check size={16} className="text-emerald-500" />{item}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div><p className="text-sm text-blue-600 font-medium">Destino</p><p className="font-bold text-slate-800">{destination}</p></div>
              <div className="text-right"><p className="text-sm text-blue-600 font-medium">Total</p><p className="font-bold text-slate-800">R$ {costs.total.toLocaleString('pt-BR')}</p></div>
            </div>
          </div>
          {generated && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 mb-6 flex items-center gap-3">
              <Check size={24} className="text-emerald-600" />
              <div><p className="font-semibold text-emerald-800">Download iniciado!</p><p className="text-sm text-emerald-600">Abra o arquivo e use Ctrl+P para salvar como PDF</p></div>
            </div>
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 py-3 px-4 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50 transition-colors">Cancelar</button>
            <button onClick={handleGeneratePDF} disabled={generating} className="flex-1 py-3 px-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70">
              {generating ? <><RefreshCw size={18} className="animate-spin" />Gerando...</> : <><Download size={18} />{generated ? 'Baixar Novamente' : 'Gerar e Baixar'}</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// AI Chat Component
const AIChat = ({ isOpen, onClose, destination, costs, budget }) => {
  const [messages, setMessages] = useState([{ role: 'ai', text: AI_RESPONSES.greeting }]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setTimeout(() => {
      const responses = [AI_RESPONSES.hotel_tip, AI_RESPONSES.activity_tip, budget - costs.total > 5000 ? AI_RESPONSES.budget_high : AI_RESPONSES.budget_low];
      setMessages(prev => [...prev, { role: 'ai', text: responses[Math.floor(Math.random() * responses.length)] }]);
    }, 800);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-scaleIn overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><Bot size={20} /></div>
          <div><h3 className="font-semibold">Assistente IA</h3><p className="text-xs opacity-80">Online • {destination}</p></div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors"><X size={18} /></button>
      </div>
      <div className="h-72 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-md' : 'bg-slate-100 text-slate-700 rounded-bl-md'}`}>{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Pergunte sobre seu roteiro..." className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button onClick={handleSend} className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"><Send size={18} /></button>
        </div>
      </div>
    </div>
  );
};

// Day Card Component
const DayCard = ({ day, items, onEditItem, index }) => {
  const totalDayCost = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-all" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">{day}</div>
          <div><h4 className="font-semibold text-slate-800">Dia {day}</h4><p className="text-xs text-slate-400">{items.length} atividades</p></div>
        </div>
        <span className="text-lg font-bold text-blue-600">R$ {totalDayCost.toLocaleString('pt-BR')}</span>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg group hover:bg-blue-50 transition-all cursor-pointer" onClick={() => onEditItem(item.category, item.original)}>
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${item.category === 'flight' ? 'bg-blue-100 group-hover:bg-blue-200' : item.category === 'hotel' ? 'bg-emerald-100 group-hover:bg-emerald-200' : item.category === 'restaurant' ? 'bg-amber-100 group-hover:bg-amber-200' : 'bg-violet-100 group-hover:bg-violet-200'}`}>{item.icon}</div>
            <div className="flex-1 min-w-0"><p className="text-sm font-medium text-slate-700 truncate">{item.name}</p><p className="text-xs text-slate-400">{item.time}</p></div>
            <div className="flex items-center gap-2"><span className="text-sm font-semibold text-slate-600">R$ {item.price.toLocaleString('pt-BR')}</span><Edit3 size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" /></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// AI Insight Card
const AIInsightCard = ({ insight, onAction }) => {
  const styles = {
    critical: { bg: 'bg-red-50 border-red-200', icon: 'text-red-500', btn: 'bg-red-500 hover:bg-red-600' },
    warning: { bg: 'bg-amber-50 border-amber-200', icon: 'text-amber-500', btn: 'bg-amber-500 hover:bg-amber-600' },
    tip: { bg: 'bg-blue-50 border-blue-200', icon: 'text-blue-500', btn: 'bg-blue-500 hover:bg-blue-600' },
    opportunity: { bg: 'bg-emerald-50 border-emerald-200', icon: 'text-emerald-500', btn: 'bg-emerald-500 hover:bg-emerald-600' },
    smart: { bg: 'bg-violet-50 border-violet-200', icon: 'text-violet-500', btn: 'bg-violet-500 hover:bg-violet-600' }
  };
  const style = styles[insight.type] || styles.tip;
  const Icon = insight.icon;

  return (
    <div className={`p-4 rounded-xl border ${style.bg} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white shadow-sm flex-shrink-0"><Icon size={18} className={style.icon} /></div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-700 leading-relaxed">{insight.message}</p>
          <div className="flex items-center justify-between mt-3 gap-2">
            <span className="text-xs font-semibold text-slate-500">{insight.savings}</span>
            <button onClick={() => onAction(insight.actionCategory)} className={`px-3 py-1.5 ${style.btn} text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap`}>{insight.action}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [destination, setDestination] = useState('Paris, França');
  const [startDate, setStartDate] = useState('2026-03-15');
  const [endDate, setEndDate] = useState('2026-03-22');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [totalBudget, setTotalBudget] = useState(35000);
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [swapModal, setSwapModal] = useState({ isOpen: false, category: null, currentItem: null });
  const [animateBudget, setAnimateBudget] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const currentData = MOCK_DATA[destination];
  const travelers = adults + children;

  const tripDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }, [startDate, endDate]);

  const generateItinerary = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const data = MOCK_DATA[destination];
      const budgetPerCategory = { flights: totalBudget * 0.25, hotels: totalBudget * 0.35, food: totalBudget * 0.20, activities: totalBudget * 0.20 };

      const affordableFlights = data.flights.filter(f => f.price * travelers <= budgetPerCategory.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];

      const hotelBudgetPerNight = budgetPerCategory.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudgetPerNight);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];

      const selectedRests = [data.restaurants[2], data.restaurants[3], data.restaurants[4]];

      let currentActivityCost = 0;
      const selectedActs = [];
      for (const activity of data.activities.sort((a, b) => b.rating - a.rating)) {
        const actCost = activity.price * (adults + children * 0.5);
        if (currentActivityCost + actCost <= budgetPerCategory.activities && selectedActs.length < 6) {
          selectedActs.push(activity);
          currentActivityCost += actCost;
        }
      }

      setSelectedFlight(bestFlight);
      setSelectedHotel(bestHotel);
      setSelectedRestaurants(selectedRests);
      setSelectedActivities(selectedActs);
      setItineraryGenerated(true);
      setIsGenerating(false);
    }, 1500);
  };

  useEffect(() => {
    setItineraryGenerated(false);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedRestaurants([]);
    setSelectedActivities([]);
  }, [destination]);

  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, food: 0, activities: 0, total: 0 };
    const flightCost = (selectedFlight?.price || 0) * travelers;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    const foodCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0) * tripDays;
    const activitiesCost = selectedActivities.reduce((sum, a) => sum + a.price, 0) * (adults + children * 0.5);
    return { flights: flightCost, hotels: hotelCost, food: foodCost, activities: Math.round(activitiesCost), total: flightCost + hotelCost + foodCost + Math.round(activitiesCost) };
  }, [selectedFlight, selectedHotel, selectedRestaurants, selectedActivities, adults, children, tripDays, itineraryGenerated, travelers]);

  const budgetAllocation = useMemo(() => ({ flights: totalBudget * 0.25, hotels: totalBudget * 0.35, food: totalBudget * 0.20, activities: totalBudget * 0.20 }), [totalBudget]);

  const insights = useMemo(() => {
    if (!itineraryGenerated) return [];
    return generateAIInsights(totalBudget, costs.total, { flight: selectedFlight, hotel: selectedHotel, activities: selectedActivities, travelers }, tripDays, destination, currentData);
  }, [totalBudget, costs.total, selectedFlight, selectedHotel, selectedActivities, tripDays, itineraryGenerated, destination, currentData, travelers]);

  useEffect(() => {
    if (itineraryGenerated) {
      setAnimateBudget(true);
      const timer = setTimeout(() => setAnimateBudget(false), 600);
      return () => clearTimeout(timer);
    }
  }, [costs.total, itineraryGenerated]);

  const timeline = useMemo(() => {
    if (!itineraryGenerated) return [];
    const days = [];
    for (let i = 1; i <= Math.min(tripDays, 7); i++) {
      const dayItems = [];
      if (i === 1 && selectedFlight) {
        dayItems.push({ icon: <Plane size={16} className="text-blue-500" />, name: `Chegada - ${selectedFlight.name}`, time: `${selectedFlight.arrival} • ${selectedFlight.duration}`, price: selectedFlight.price * travelers, category: 'flight', original: selectedFlight });
      }
      if (selectedHotel) {
        dayItems.push({ icon: <Hotel size={16} className="text-emerald-500" />, name: selectedHotel.name, time: `${selectedHotel.location} • ${'★'.repeat(selectedHotel.stars)}`, price: selectedHotel.price, category: 'hotel', original: selectedHotel });
      }
      if (selectedActivities[i - 1]) {
        dayItems.push({ icon: <Camera size={16} className="text-violet-500" />, name: selectedActivities[i - 1].name, time: `${selectedActivities[i - 1].duration} • ${selectedActivities[i - 1].time || selectedActivities[i - 1].type}`, price: selectedActivities[i - 1].price, category: 'activity', original: selectedActivities[i - 1] });
      }
      const restaurantIndex = (i - 1) % Math.max(selectedRestaurants.length, 1);
      if (selectedRestaurants[restaurantIndex]) {
        dayItems.push({ icon: <Utensils size={16} className="text-amber-500" />, name: selectedRestaurants[restaurantIndex].name, time: `${selectedRestaurants[restaurantIndex].meal || 'Jantar'} • ${selectedRestaurants[restaurantIndex].cuisine}`, price: selectedRestaurants[restaurantIndex].price, category: 'restaurant', original: selectedRestaurants[restaurantIndex] });
      }
      days.push({ day: i, items: dayItems });
    }
    return days;
  }, [tripDays, selectedFlight, selectedHotel, selectedActivities, selectedRestaurants, itineraryGenerated, travelers]);

  const handleSwap = (category, item) => {
    switch (category) {
      case 'flight': setSelectedFlight(item); break;
      case 'hotel': setSelectedHotel(item); break;
      case 'restaurant':
        if (swapModal.currentItem) {
          const newRests = [...selectedRestaurants];
          const idx = newRests.findIndex(r => r.id === swapModal.currentItem.id);
          if (idx >= 0) newRests[idx] = item;
          setSelectedRestaurants(newRests);
        } else setSelectedRestaurants([...selectedRestaurants.slice(0, 2), item]);
        break;
      case 'activity':
        if (swapModal.currentItem) {
          const newActs = [...selectedActivities];
          const idx = newActs.findIndex(a => a.id === swapModal.currentItem.id);
          if (idx >= 0) newActs[idx] = item;
          else newActs.push(item);
          setSelectedActivities(newActs);
        } else if (!selectedActivities.find(a => a.id === item.id)) setSelectedActivities([...selectedActivities, item]);
        break;
    }
    setSwapModal({ isOpen: false, category: null, currentItem: null });
  };

  const getSwapOptions = () => {
    switch (swapModal.category) {
      case 'flight': return currentData.flights;
      case 'hotel': return currentData.hotels;
      case 'restaurant': return currentData.restaurants;
      case 'activity': return currentData.activities;
      default: return [];
    }
  };

  const openSwapModal = (category, currentItem) => setSwapModal({ isOpen: true, category, currentItem });
  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6"><Sparkles size={16} />Powered by AI • TravelTech 2026</div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Smart<span className="text-blue-400">Travel</span> AI</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">Planeje viagens incríveis com controle total do orçamento. Nossa IA cria roteiros personalizados que cabem no seu bolso.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button onClick={() => setShowLanding(false)} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"><Play size={20} />Começar Agora</button>
            <button onClick={() => setShowLanding(false)} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"><Globe size={20} />Ver Demo</button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[{ icon: Plane, label: 'Voos Otimizados', value: '500+' }, { icon: Hotel, label: 'Hotéis Parceiros', value: '2.000+' }, { icon: Users, label: 'Viajantes Felizes', value: '50k+' }, { icon: Shield, label: 'Economia Média', value: '23%' }].map((stat, idx) => (
              <div key={idx} className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10"><stat.icon size={24} className="text-blue-400 mx-auto mb-2" /><div className="text-2xl font-bold text-white">{stat.value}</div><div className="text-xs text-slate-400">{stat.label}</div></div>
            ))}
          </div>
          <p className="text-slate-500 text-sm mt-12">© 2026 SmartTravel AI • Demo para Investidores</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <SwapModal isOpen={swapModal.isOpen} onClose={() => setSwapModal({ isOpen: false, category: null, currentItem: null })} category={swapModal.category} currentItem={swapModal.currentItem} options={getSwapOptions()} onSwap={(item) => handleSwap(swapModal.category, item)} tripDays={tripDays} travelers={travelers} />
      <PDFModal isOpen={showPDFModal} onClose={() => setShowPDFModal(false)} tripData={{ destination, startDate, endDate, tripDays, adults, children, costs, selectedFlight, selectedHotel, selectedActivities, selectedRestaurants, totalBudget, currentData }} />
      <AIChat isOpen={showChat} onClose={() => setShowChat(false)} destination={destination} costs={costs} budget={totalBudget} />

      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowLanding(true)}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200"><Globe size={22} className="text-white" /></div>
              <div><h1 className="text-xl font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent">SmartTravel AI</h1><p className="text-xs text-slate-500">Viagens inteligentes</p></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full"><span className="text-2xl">{currentData.image}</span><span className="text-sm font-medium text-slate-700">{destination}</span></div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full"><Users size={16} className="text-blue-600" /><span className="text-sm font-medium text-slate-700">{travelers}</span></div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full"><Calendar size={16} className="text-blue-600" /><span className="text-sm font-medium text-slate-700">{tripDays} dias</span></div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><MapPin size={20} className="text-blue-600" />Configure sua Viagem</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label>
                  <select value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Paris, França</option><option>Nova York, EUA</option><option>Tóquio, Japão</option>
                  </select>
                </div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Início</label><input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setItineraryGenerated(false); }} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <div><label className="text-xs font-medium text-slate-500 mb-1 block">Data Fim</label><input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setItineraryGenerated(false); }} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Viajantes</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative"><input type="number" value={adults} onChange={(e) => { setAdults(Math.max(1, parseInt(e.target.value) || 1)); setItineraryGenerated(false); }} min="1" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">ad.</span></div>
                    <div className="flex-1 relative"><input type="number" value={children} onChange={(e) => { setChildren(Math.max(0, parseInt(e.target.value) || 0)); setItineraryGenerated(false); }} min="0" className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500" /><span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">cr.</span></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento Total (R$)</label>
                <div className="flex items-center gap-4">
                  <input type="range" min="15000" max="200000" step="1000" value={totalBudget} onChange={(e) => setTotalBudget(parseInt(e.target.value))} className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
                  <div className="w-36 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center shadow-lg shadow-blue-200"><span className="text-white font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</span></div>
                </div>
              </div>
              {!itineraryGenerated && (
                <button onClick={generateItinerary} disabled={isGenerating} className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70">
                  {isGenerating ? <><RefreshCw size={20} className="animate-spin" />Gerando roteiro otimizado...</> : <><Sparkles size={20} />Gerar Roteiro Inteligente<ArrowRight size={20} /></>}
                </button>
              )}
            </div>

            {itineraryGenerated && (
              <div className="space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Clock size={20} className="text-blue-600" />Seu Roteiro - {tripDays} dias em {destination}</h3>
                  <button onClick={() => setItineraryGenerated(false)} className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"><RefreshCw size={16} />Regenerar</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => openSwapModal('flight', selectedFlight)} className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"><Plane size={16} />Trocar Voo</button>
                  <button onClick={() => openSwapModal('hotel', selectedHotel)} className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium"><Hotel size={16} />Trocar Hotel</button>
                  <button onClick={() => openSwapModal('restaurant', null)} className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition-colors text-sm font-medium"><Utensils size={16} />Restaurantes</button>
                  <button onClick={() => openSwapModal('activity', null)} className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors text-sm font-medium"><Plus size={16} />Adicionar Passeio</button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {timeline.map((day, idx) => <DayCard key={idx} day={day.day} items={day.items} onEditItem={openSwapModal} index={idx} />)}
                </div>
                {tripDays > 7 && <div className="text-center py-4"><span className="text-sm text-slate-400 bg-slate-100 px-4 py-2 rounded-full">+ {tripDays - 7} dias adicionais</span></div>}
              </div>
            )}

            {!itineraryGenerated && !isGenerating && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4"><Globe size={40} className="text-blue-600" /></div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Configure sua viagem ideal</h3>
                <p className="text-slate-500 max-w-md mx-auto">Escolha o destino, datas, número de viajantes e seu orçamento. Nossa IA criará um roteiro personalizado e otimizado para você.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 transition-transform duration-300 ${animateBudget ? 'scale-[1.02]' : ''}`}>
              <div className="flex items-center justify-between mb-4"><h2 className="text-lg font-semibold opacity-90">Orçamento Total</h2><Wallet size={24} className="opacity-80" /></div>
              <div className="text-4xl font-bold mb-1">R$ {totalBudget.toLocaleString('pt-BR')}</div>
              {itineraryGenerated && (
                <>
                  <div className="flex items-center gap-2 mt-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>
                      {isOverBudget ? <span className="flex items-center gap-1"><TrendingUp size={14} />Excedido: R$ {Math.abs(remaining).toLocaleString('pt-BR')}</span> : <span className="flex items-center gap-1"><TrendingDown size={14} />Disponível: R$ {remaining.toLocaleString('pt-BR')}</span>}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm"><span className="opacity-80">Gasto Planejado</span><span className="font-bold">R$ {costs.total.toLocaleString('pt-BR')}</span></div>
                    <div className="mt-2 h-3 bg-white/20 rounded-full overflow-hidden"><div className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-400' : 'bg-white'}`} style={{ width: `${Math.min((costs.total / totalBudget) * 100, 100)}%` }} /></div>
                    <div className="text-right text-xs mt-1 opacity-80">{Math.round((costs.total / totalBudget) * 100)}% utilizado</div>
                  </div>
                </>
              )}
              {!itineraryGenerated && <p className="mt-4 text-sm opacity-70">Gere um roteiro para ver a distribuição</p>}
            </div>

            {itineraryGenerated && (
              <>
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><CreditCard size={20} className="text-blue-600" />Distribuição por Categoria</h3>
                  <ProgressBar label="Voos" current={costs.flights} max={budgetAllocation.flights} color="text-blue-600" icon={Plane} />
                  <ProgressBar label="Hospedagem" current={costs.hotels} max={budgetAllocation.hotels} color="text-emerald-600" icon={Hotel} />
                  <ProgressBar label="Alimentação" current={costs.food} max={budgetAllocation.food} color="text-amber-600" icon={Utensils} />
                  <ProgressBar label="Passeios" current={costs.activities} max={budgetAllocation.activities} color="text-violet-600" icon={Camera} />
                  <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-xs text-slate-500 text-center">💡 Clique nos itens para trocar e compensar gastos</p></div>
                </div>

                {insights.length > 0 && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Sparkles size={20} className="text-blue-600" />Insights da IA</h3>
                    <div className="space-y-3">
                      {insights.map((insight, idx) => <AIInsightCard key={idx} insight={insight} onAction={(category) => openSwapModal(category, category === 'hotel' ? selectedHotel : category === 'flight' ? selectedFlight : null)} />)}
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Shield size={20} className="text-blue-600" />Resumo da Viagem</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl"><div className="text-2xl font-bold text-blue-600">{tripDays}</div><div className="text-xs text-slate-500 mt-1">Dias</div></div>
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl"><div className="text-2xl font-bold text-emerald-600">{selectedActivities.length}</div><div className="text-xs text-slate-500 mt-1">Passeios</div></div>
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl"><div className="text-lg font-bold text-amber-600">R$ {Math.round(costs.total / tripDays).toLocaleString('pt-BR')}</div><div className="text-xs text-slate-500 mt-1">Por dia</div></div>
                    <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl"><div className="text-lg font-bold text-violet-600">R$ {Math.round(costs.total / travelers).toLocaleString('pt-BR')}</div><div className="text-xs text-slate-500 mt-1">Por pessoa</div></div>
                  </div>
                </div>

                <button onClick={() => !isOverBudget && setShowPDFModal(true)} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200 hover:shadow-xl hover:scale-[1.02]'}`}>
                  {isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Finalizar e Baixar Roteiro</>}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <button onClick={() => setShowChat(!showChat)} className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40">
        {showChat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      <footer className="mt-12 py-6 border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 text-center"><p className="text-sm text-slate-500">SmartTravel AI © 2026 • Viagens inteligentes • Demo para Investidores</p></div>
      </footer>
    </div>
  );
}
