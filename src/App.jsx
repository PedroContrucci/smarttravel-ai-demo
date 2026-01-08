import React, { useState, useMemo, useEffect } from 'react';
import { 
  Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, 
  Wallet, TrendingDown, TrendingUp, Sparkles, ChevronRight,
  ArrowRightLeft, Check, AlertTriangle, Lightbulb, Globe,
  Star, Clock, CreditCard, Shield, Zap, X, Plus, Minus,
  RefreshCw, Play, ChevronDown, ArrowRight, Edit3, Menu,
  Send, MessageCircle, Bot, ChevronUp
} from 'lucide-react';

// Mock Data - Multiple Destinations
const MOCK_DATA = {
  'Paris, França': {
    currency: '€',
    image: '🗼',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&q=80',
    flights: [
      { id: 'pf1', name: 'Air France - Direto', price: 4200, duration: '11h 30m', class: 'Econômica', rating: 4.5, departure: '23:45', arrival: '14:15+1' },
      { id: 'pf2', name: 'LATAM - 1 Conexão', price: 3100, duration: '16h 45m', class: 'Econômica', rating: 4.2, departure: '22:00', arrival: '18:45+1' },
      { id: 'pf3', name: 'TAP Portugal - 1 Conexão', price: 2800, duration: '14h 20m', class: 'Econômica', rating: 4.0, departure: '21:30', arrival: '15:50+1' },
      { id: 'pf4', name: 'Air France - Business', price: 12500, duration: '11h 30m', class: 'Executiva', rating: 4.9, departure: '23:45', arrival: '14:15+1' },
    ],
    hotels: [
      { id: 'ph1', name: 'Le Meurice', stars: 5, price: 3500, perNight: true, location: 'Tuileries', rating: 4.9 },
      { id: 'ph2', name: 'Plaza Athénée', stars: 5, price: 2800, perNight: true, location: 'Champs-Élysées', rating: 4.8 },
      { id: 'ph3', name: 'Mercure Paris Centre', stars: 4, price: 850, perNight: true, location: 'Tour Eiffel', rating: 4.4 },
      { id: 'ph4', name: 'Ibis Styles Montmartre', stars: 3, price: 450, perNight: true, location: 'Montmartre', rating: 4.1 },
      { id: 'ph5', name: 'Generator Paris', stars: 2, price: 180, perNight: true, location: 'Canal Saint-Martin', rating: 4.0 },
    ],
    restaurants: [
      { id: 'pr1', name: 'Le Cinq ★★★', price: 890, type: 'Fine Dining', cuisine: 'Francesa', rating: 4.9 },
      { id: 'pr2', name: 'Septime', price: 280, type: 'Bistrô Moderno', cuisine: 'Contemporânea', rating: 4.7 },
      { id: 'pr3', name: 'Bouillon Chartier', price: 85, type: 'Tradicional', cuisine: 'Francesa Clássica', rating: 4.5 },
      { id: 'pr4', name: 'Café de Flore', price: 120, type: 'Café', cuisine: 'Café & Bistro', rating: 4.4 },
      { id: 'pr5', name: 'Pink Mamma', price: 95, type: 'Casual', cuisine: 'Italiana', rating: 4.6 },
    ],
    activities: [
      { id: 'pa1', name: 'Torre Eiffel - Topo', price: 180, duration: '2h', type: 'Landmark', rating: 4.8 },
      { id: 'pa2', name: 'Museu do Louvre', price: 95, duration: '4h', type: 'Museu', rating: 4.9 },
      { id: 'pa3', name: 'Cruzeiro no Sena', price: 120, duration: '1h30', type: 'Experiência', rating: 4.6 },
      { id: 'pa4', name: 'Palácio de Versalhes', price: 220, duration: '6h', type: 'Day Trip', rating: 4.8 },
      { id: 'pa5', name: 'Montmartre Walking Tour', price: 45, duration: '3h', type: 'Tour', rating: 4.5 },
      { id: 'pa6', name: 'Catacumbas de Paris', price: 85, duration: '1h30', type: 'Atração', rating: 4.4 },
      { id: 'pa7', name: 'Degustação de Vinhos', price: 150, duration: '2h', type: 'Experiência', rating: 4.7 },
      { id: 'pa8', name: 'Museu d\'Orsay', price: 85, duration: '3h', type: 'Museu', rating: 4.8 },
    ]
  },
  'Nova York, EUA': {
    currency: '$',
    image: '🗽',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&q=80',
    flights: [
      { id: 'nf1', name: 'American Airlines - Direto', price: 3800, duration: '10h 15m', class: 'Econômica', rating: 4.3, departure: '22:30', arrival: '06:45+1' },
      { id: 'nf2', name: 'Delta - Direto', price: 4100, duration: '10h 00m', class: 'Econômica', rating: 4.5, departure: '23:00', arrival: '07:00+1' },
      { id: 'nf3', name: 'United - 1 Conexão', price: 2900, duration: '14h 30m', class: 'Econômica', rating: 4.1, departure: '18:00', arrival: '08:30+1' },
      { id: 'nf4', name: 'JetBlue - Direto', price: 3200, duration: '10h 20m', class: 'Econômica', rating: 4.4, departure: '21:00', arrival: '05:20+1' },
    ],
    hotels: [
      { id: 'nh1', name: 'The Plaza Hotel', stars: 5, price: 4200, perNight: true, location: 'Central Park', rating: 4.9 },
      { id: 'nh2', name: 'The Standard High Line', stars: 5, price: 2200, perNight: true, location: 'Meatpacking', rating: 4.7 },
      { id: 'nh3', name: 'citizenM Times Square', stars: 4, price: 780, perNight: true, location: 'Times Square', rating: 4.5 },
      { id: 'nh4', name: 'Pod 51', stars: 3, price: 420, perNight: true, location: 'Midtown East', rating: 4.2 },
      { id: 'nh5', name: 'HI NYC Hostel', stars: 2, price: 150, perNight: true, location: 'Upper West Side', rating: 4.0 },
    ],
    restaurants: [
      { id: 'nr1', name: 'Eleven Madison Park', price: 1200, type: 'Fine Dining', cuisine: 'Americana', rating: 4.9 },
      { id: 'nr2', name: 'Katz\'s Delicatessen', price: 95, type: 'Casual', cuisine: 'Deli', rating: 4.7 },
      { id: 'nr3', name: 'Joe\'s Pizza', price: 45, type: 'Fast Food', cuisine: 'Pizza', rating: 4.6 },
      { id: 'nr4', name: 'The Smith', price: 150, type: 'Bistrô', cuisine: 'Americana', rating: 4.4 },
      { id: 'nr5', name: 'Shake Shack', price: 65, type: 'Fast Casual', cuisine: 'Burgers', rating: 4.5 },
    ],
    activities: [
      { id: 'na1', name: 'Empire State Building', price: 200, duration: '2h', type: 'Landmark', rating: 4.7 },
      { id: 'na2', name: 'Estátua da Liberdade', price: 150, duration: '4h', type: 'Landmark', rating: 4.8 },
      { id: 'na3', name: 'Broadway Show', price: 450, duration: '3h', type: 'Entretenimento', rating: 4.9 },
      { id: 'na4', name: 'MoMA - Museu de Arte', price: 125, duration: '3h', type: 'Museu', rating: 4.8 },
      { id: 'na5', name: 'Central Park Bike Tour', price: 85, duration: '2h', type: 'Tour', rating: 4.6 },
      { id: 'na6', name: 'Top of the Rock', price: 180, duration: '1h30', type: 'Landmark', rating: 4.7 },
      { id: 'na7', name: '9/11 Memorial', price: 95, duration: '2h', type: 'Memorial', rating: 4.9 },
      { id: 'na8', name: 'Brooklyn Bridge Walk', price: 0, duration: '1h30', type: 'Gratuito', rating: 4.5 },
    ]
  },
  'Tóquio, Japão': {
    currency: '¥',
    image: '🗾',
    heroImage: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
    flights: [
      { id: 'tf1', name: 'ANA - Direto', price: 6800, duration: '24h 30m', class: 'Econômica', rating: 4.8, departure: '23:55', arrival: '05:25+2' },
      { id: 'tf2', name: 'JAL - 1 Conexão', price: 5900, duration: '28h 15m', class: 'Econômica', rating: 4.7, departure: '22:00', arrival: '08:15+2' },
      { id: 'tf3', name: 'Emirates - 1 Conexão', price: 5200, duration: '30h 00m', class: 'Econômica', rating: 4.6, departure: '01:30', arrival: '11:30+2' },
      { id: 'tf4', name: 'Qatar Airways - 1 Conexão', price: 4800, duration: '32h 45m', class: 'Econômica', rating: 4.5, departure: '02:00', arrival: '14:45+2' },
    ],
    hotels: [
      { id: 'th1', name: 'Aman Tokyo', stars: 5, price: 5500, perNight: true, location: 'Otemachi', rating: 4.9 },
      { id: 'th2', name: 'Park Hyatt Tokyo', stars: 5, price: 3200, perNight: true, location: 'Shinjuku', rating: 4.8 },
      { id: 'th3', name: 'Shinjuku Granbell', stars: 4, price: 650, perNight: true, location: 'Shinjuku', rating: 4.4 },
      { id: 'th4', name: 'Tokyu Stay Shibuya', stars: 3, price: 380, perNight: true, location: 'Shibuya', rating: 4.3 },
      { id: 'th5', name: 'Khaosan Tokyo Kabuki', stars: 2, price: 120, perNight: true, location: 'Asakusa', rating: 4.1 },
    ],
    restaurants: [
      { id: 'tr1', name: 'Sukiyabashi Jiro', price: 1800, type: 'Fine Dining', cuisine: 'Sushi', rating: 4.9 },
      { id: 'tr2', name: 'Ichiran Ramen', price: 65, type: 'Casual', cuisine: 'Ramen', rating: 4.7 },
      { id: 'tr3', name: 'Gonpachi Nishi-Azabu', price: 180, type: 'Izakaya', cuisine: 'Japonesa', rating: 4.6 },
      { id: 'tr4', name: 'Tsukiji Outer Market', price: 120, type: 'Mercado', cuisine: 'Frutos do Mar', rating: 4.8 },
      { id: 'tr5', name: 'CoCo Ichibanya', price: 55, type: 'Fast Casual', cuisine: 'Curry', rating: 4.4 },
    ],
    activities: [
      { id: 'ta1', name: 'Tokyo Skytree', price: 120, duration: '2h', type: 'Landmark', rating: 4.7 },
      { id: 'ta2', name: 'Templo Senso-ji', price: 0, duration: '2h', type: 'Templo', rating: 4.8 },
      { id: 'ta3', name: 'teamLab Borderless', price: 180, duration: '3h', type: 'Arte Digital', rating: 4.9 },
      { id: 'ta4', name: 'Day Trip Monte Fuji', price: 380, duration: '10h', type: 'Day Trip', rating: 4.8 },
      { id: 'ta5', name: 'Shibuya Crossing Tour', price: 45, duration: '2h', type: 'Tour', rating: 4.5 },
      { id: 'ta6', name: 'Cerimônia do Chá', price: 95, duration: '1h30', type: 'Experiência', rating: 4.7 },
      { id: 'ta7', name: 'Akihabara Anime Tour', price: 75, duration: '3h', type: 'Tour', rating: 4.6 },
      { id: 'ta8', name: 'Jardins do Palácio Imperial', price: 0, duration: '2h', type: 'Gratuito', rating: 4.6 },
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
const generateAIInsights = (budget, spent, selections, days, destination) => {
  const remaining = budget - spent;
  const percentUsed = (spent / budget) * 100;
  const insights = [];

  if (percentUsed > 95) {
    insights.push({
      type: 'critical',
      icon: AlertTriangle,
      message: 'Orçamento excedido! Recomendo trocar hotel ou reduzir passeios.',
      action: 'Ver alternativas',
      savings: `Economize R$ ${Math.floor(selections.hotel?.price * 0.5 * days) || 0}`
    });
  } else if (percentUsed > 80) {
    insights.push({
      type: 'warning',
      icon: AlertTriangle,
      message: 'Orçamento apertado. Considere opções mais econômicas em alimentação.',
      action: 'Otimizar gastos',
      savings: 'Até 30% de economia'
    });
  }
  
  if (remaining > budget * 0.25) {
    insights.push({
      type: 'opportunity',
      icon: Sparkles,
      message: 'Sobra no orçamento! Que tal um upgrade no hotel ou experiência premium?',
      action: 'Ver upgrades',
      savings: `R$ ${Math.floor(remaining * 0.6).toLocaleString('pt-BR')} disponível`
    });
  }

  if (selections.hotel?.stars < 4) {
    insights.push({
      type: 'tip',
      icon: Lightbulb,
      message: 'Hotel 4★ disponível por apenas R$ 400/noite a mais. Vale o upgrade!',
      action: 'Comparar hotéis',
      savings: 'Melhor custo-benefício'
    });
  }

  insights.push({
    type: 'smart',
    icon: Zap,
    message: destination.includes('Paris') 
      ? 'Combo Louvre + Orsay economiza 15% vs. compra separada.'
      : destination.includes('Nova York')
      ? 'CityPASS inclui 6 atrações com 40% de desconto total.'
      : 'JR Pass de 7 dias economiza até 50% em transporte.',
    action: 'Aplicar combo',
    savings: 'Economia automática'
  });

  return insights.slice(0, 3);
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
const SwapModal = ({ isOpen, onClose, category, currentItem, options, onSwap, tripDays }) => {
  if (!isOpen) return null;

  const categoryLabels = {
    flight: 'Voo',
    hotel: 'Hotel',
    restaurant: 'Restaurante',
    activity: 'Passeio'
  };

  const categoryIcons = {
    flight: Plane,
    hotel: Hotel,
    restaurant: Utensils,
    activity: Camera
  };

  const Icon = categoryIcons[category];

  const calculateImpact = (newItem) => {
    if (!currentItem) return newItem.price;
    const currentTotal = category === 'hotel' ? currentItem.price * tripDays : currentItem.price;
    const newTotal = category === 'hotel' ? newItem.price * tripDays : newItem.price;
    return newTotal - currentTotal;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl animate-scaleIn">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <Icon size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Trocar {categoryLabels[category]}</h3>
              <p className="text-sm text-slate-500">Selecione uma alternativa</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        </div>

        {currentItem && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <p className="text-xs text-blue-600 font-medium mb-1">SELECIONADO ATUALMENTE</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800">{currentItem.name}</span>
              <span className="font-bold text-blue-600">
                R$ {currentItem.price.toLocaleString('pt-BR')}
                {currentItem.perNight && '/noite'}
              </span>
            </div>
          </div>
        )}

        <div className="p-4 overflow-y-auto max-h-[400px]">
          <div className="space-y-3 stagger-children">
            {options.map(item => {
              const impact = calculateImpact(item);
              const isPositive = impact < 0;
              const isCurrent = currentItem?.id === item.id;

              return (
                <div 
                  key={item.id}
                  onClick={() => !isCurrent && onSwap(item)}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer card-hover
                    ${isCurrent 
                      ? 'border-blue-500 bg-blue-50 cursor-default' 
                      : 'border-slate-200 hover:border-blue-300'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold text-slate-800">{item.name}</h4>
                        {item.stars && (
                          <div className="flex">
                            {[...Array(item.stars)].map((_, i) => (
                              <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                            ))}
                          </div>
                        )}
                        {isCurrent && (
                          <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded-full">Atual</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 flex-wrap">
                        {item.rating && (
                          <span className="flex items-center gap-1">
                            <Star size={12} className="text-amber-400 fill-amber-400" />
                            {item.rating}
                          </span>
                        )}
                        {item.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {item.location}
                          </span>
                        )}
                        {item.duration && (
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {item.duration}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="font-bold text-slate-800">
                        R$ {item.price.toLocaleString('pt-BR')}
                        {item.perNight && <span className="text-xs font-normal text-slate-400">/noite</span>}
                      </p>
                      {!isCurrent && currentItem && (
                        <p className={`text-sm font-medium mt-1 ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                          {isPositive ? '↓' : '↑'} R$ {Math.abs(impact).toLocaleString('pt-BR')}
                          {category === 'hotel' && ' total'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <p className="text-xs text-slate-500 text-center">
            💡 Clique em uma opção para substituir • Impacto no orçamento calculado automaticamente
          </p>
        </div>
      </div>
    </div>
  );
};

// AI Chat Component
const AIChat = ({ isOpen, onClose, destination, costs, budget }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: AI_RESPONSES.greeting }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        AI_RESPONSES.hotel_tip,
        AI_RESPONSES.activity_tip,
        budget - costs.total > 5000 ? AI_RESPONSES.budget_high : AI_RESPONSES.budget_low
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: randomResponse }]);
    }, 800);
    
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 z-50 animate-scaleIn overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Assistente IA</h3>
            <p className="text-xs opacity-80">Online • {destination}</p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-colors">
          <X size={18} />
        </button>
      </div>

      <div className="h-72 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-md' 
                : 'bg-slate-100 text-slate-700 rounded-bl-md'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte sobre seu roteiro..."
            className="flex-1 px-4 py-2.5 bg-slate-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            onClick={handleSend}
            className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Day Timeline Card
const DayCard = ({ day, items, onEditItem, index }) => {
  const totalDayCost = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div 
      className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm card-hover"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
            {day}
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Dia {day}</h4>
            <p className="text-xs text-slate-400">{items.length} atividades</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-lg font-bold text-blue-600">R$ {totalDayCost.toLocaleString('pt-BR')}</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div 
            key={idx} 
            className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg group hover:bg-blue-50 transition-all cursor-pointer"
            onClick={() => onEditItem(item.category, item.original)}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
              item.category === 'flight' ? 'bg-blue-100 group-hover:bg-blue-200' :
              item.category === 'hotel' ? 'bg-emerald-100 group-hover:bg-emerald-200' :
              item.category === 'restaurant' ? 'bg-amber-100 group-hover:bg-amber-200' : 'bg-violet-100 group-hover:bg-violet-200'
            }`}>
              {item.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{item.name}</p>
              <p className="text-xs text-slate-400">{item.time}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-slate-600">R$ {item.price.toLocaleString('pt-BR')}</span>
              <Edit3 size={14} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
            </div>
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
    <div className={`p-4 rounded-xl border ${style.bg} transition-all duration-300 card-hover`}>
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-white shadow-sm">
          <Icon size={18} className={style.icon} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-700 leading-relaxed">{insight.message}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs font-semibold text-slate-500">{insight.savings}</span>
            <button 
              onClick={onAction}
              className={`px-3 py-1 ${style.btn} text-white text-xs font-medium rounded-lg transition-colors btn-press`}
            >
              {insight.action}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  // Configuration State
  const [destination, setDestination] = useState('Paris, França');
  const [startDate, setStartDate] = useState('2026-03-15');
  const [endDate, setEndDate] = useState('2026-03-22');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [totalBudget, setTotalBudget] = useState(35000);
  
  // Itinerary State
  const [itineraryGenerated, setItineraryGenerated] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  
  // UI State
  const [swapModal, setSwapModal] = useState({ isOpen: false, category: null, currentItem: null });
  const [animateBudget, setAnimateBudget] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showLanding, setShowLanding] = useState(true);

  // Get current destination data
  const currentData = MOCK_DATA[destination];

  // Calculate days
  const tripDays = useMemo(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
  }, [startDate, endDate]);

  // Auto-select items based on budget when generating itinerary
  const generateItinerary = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const data = MOCK_DATA[destination];
      const travelers = adults + children * 0.5;
      
      const budgetPerCategory = {
        flights: totalBudget * 0.25,
        hotels: totalBudget * 0.35,
        food: totalBudget * 0.20,
        activities: totalBudget * 0.20
      };

      const affordableFlights = data.flights.filter(f => f.price * (adults + children) <= budgetPerCategory.flights);
      const bestFlight = affordableFlights.sort((a, b) => b.rating - a.rating)[0] || data.flights[data.flights.length - 1];

      const hotelBudgetPerNight = budgetPerCategory.hotels / tripDays;
      const affordableHotels = data.hotels.filter(h => h.price <= hotelBudgetPerNight);
      const bestHotel = affordableHotels.sort((a, b) => b.rating - a.rating)[0] || data.hotels[data.hotels.length - 1];

      const selectedRests = data.restaurants.slice(2, 4);

      const remainingBudget = budgetPerCategory.activities;
      let activityBudget = 0;
      const selectedActs = [];
      for (const activity of data.activities.sort((a, b) => b.rating - a.rating)) {
        if (activityBudget + activity.price * travelers <= remainingBudget && selectedActs.length < 5) {
          selectedActs.push(activity);
          activityBudget += activity.price * travelers;
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

  // Reset itinerary when destination changes
  useEffect(() => {
    setItineraryGenerated(false);
    setSelectedFlight(null);
    setSelectedHotel(null);
    setSelectedRestaurants([]);
    setSelectedActivities([]);
  }, [destination]);

  // Calculate costs
  const costs = useMemo(() => {
    if (!itineraryGenerated) return { flights: 0, hotels: 0, food: 0, activities: 0, total: 0 };
    
    const travelers = adults + children;
    const flightCost = (selectedFlight?.price || 0) * travelers;
    const hotelCost = (selectedHotel?.price || 0) * tripDays;
    const foodCost = selectedRestaurants.reduce((sum, r) => sum + r.price, 0) * tripDays;
    const activitiesCost = selectedActivities.reduce((sum, a) => sum + a.price, 0) * (adults + children * 0.5);
    
    return {
      flights: flightCost,
      hotels: hotelCost,
      food: foodCost,
      activities: Math.round(activitiesCost),
      total: flightCost + hotelCost + foodCost + Math.round(activitiesCost)
    };
  }, [selectedFlight, selectedHotel, selectedRestaurants, selectedActivities, adults, children, tripDays, itineraryGenerated]);

  // Budget allocation
  const budgetAllocation = useMemo(() => ({
    flights: totalBudget * 0.25,
    hotels: totalBudget * 0.35,
    food: totalBudget * 0.20,
    activities: totalBudget * 0.20
  }), [totalBudget]);

  // AI Insights
  const insights = useMemo(() => {
    if (!itineraryGenerated) return [];
    return generateAIInsights(
      totalBudget, 
      costs.total, 
      { flight: selectedFlight, hotel: selectedHotel },
      tripDays,
      destination
    );
  }, [totalBudget, costs.total, selectedFlight, selectedHotel, tripDays, itineraryGenerated, destination]);

  // Animate budget on change
  useEffect(() => {
    if (itineraryGenerated) {
      setAnimateBudget(true);
      const timer = setTimeout(() => setAnimateBudget(false), 600);
      return () => clearTimeout(timer);
    }
  }, [costs.total, itineraryGenerated]);

  // Generate timeline
  const timeline = useMemo(() => {
    if (!itineraryGenerated) return [];
    
    const days = [];
    for (let i = 1; i <= Math.min(tripDays, 7); i++) {
      const dayItems = [];
      
      if (i === 1 && selectedFlight) {
        dayItems.push({
          icon: <Plane size={16} className="text-blue-500" />,
          name: `Chegada - ${selectedFlight.name}`,
          time: `${selectedFlight.arrival} - Check-in`,
          price: 0,
          category: 'flight',
          original: selectedFlight
        });
      }
      
      if (selectedHotel) {
        dayItems.push({
          icon: <Hotel size={16} className="text-emerald-500" />,
          name: selectedHotel.name,
          time: 'Hospedagem',
          price: selectedHotel.price,
          category: 'hotel',
          original: selectedHotel
        });
      }
      
      if (selectedActivities[i - 1]) {
        dayItems.push({
          icon: <Camera size={16} className="text-violet-500" />,
          name: selectedActivities[i - 1].name,
          time: selectedActivities[i - 1].duration,
          price: selectedActivities[i - 1].price,
          category: 'activity',
          original: selectedActivities[i - 1]
        });
      }
      
      const restaurantIndex = (i - 1) % Math.max(selectedRestaurants.length, 1);
      if (selectedRestaurants[restaurantIndex]) {
        dayItems.push({
          icon: <Utensils size={16} className="text-amber-500" />,
          name: selectedRestaurants[restaurantIndex].name,
          time: 'Jantar',
          price: selectedRestaurants[restaurantIndex].price,
          category: 'restaurant',
          original: selectedRestaurants[restaurantIndex]
        });
      }
      
      days.push({ day: i, items: dayItems });
    }
    return days;
  }, [tripDays, selectedFlight, selectedHotel, selectedActivities, selectedRestaurants, itineraryGenerated]);

  // Handle swap
  const handleSwap = (category, item) => {
    switch (category) {
      case 'flight':
        setSelectedFlight(item);
        break;
      case 'hotel':
        setSelectedHotel(item);
        break;
      case 'restaurant':
        const newRests = [...selectedRestaurants];
        const restIdx = newRests.findIndex(r => r.id === swapModal.currentItem?.id);
        if (restIdx >= 0) newRests[restIdx] = item;
        setSelectedRestaurants(newRests);
        break;
      case 'activity':
        const newActs = [...selectedActivities];
        const actIdx = newActs.findIndex(a => a.id === swapModal.currentItem?.id);
        if (actIdx >= 0) {
          newActs[actIdx] = item;
        } else {
          newActs.push(item);
        }
        setSelectedActivities(newActs);
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

  const openSwapModal = (category, currentItem) => {
    setSwapModal({ isOpen: true, category, currentItem });
  };

  const remaining = totalBudget - costs.total;
  const isOverBudget = remaining < 0;

  // Landing Page
  if (showLanding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full text-center">
          <div className="mb-8 animate-slideUp">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full text-blue-300 text-sm mb-6">
              <Sparkles size={16} />
              Powered by AI
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Smart<span className="text-blue-400">Travel</span> AI
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Planeje viagens incríveis com controle total do orçamento. 
              Nossa IA cria roteiros personalizados que cabem no seu bolso.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => setShowLanding(false)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 transition-all hover:scale-105 flex items-center justify-center gap-2"
            >
              <Play size={20} />
              Começar Agora
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2">
              <Globe size={20} />
              Ver Demo
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-slideUp" style={{ animationDelay: '0.4s' }}>
            {[
              { icon: Plane, label: 'Voos Otimizados', value: '500+' },
              { icon: Hotel, label: 'Hotéis Parceiros', value: '2.000+' },
              { icon: Users, label: 'Viajantes Felizes', value: '50k+' },
              { icon: Shield, label: 'Economia Média', value: '23%' },
            ].map((stat, idx) => (
              <div key={idx} className="p-4 bg-white/5 backdrop-blur rounded-xl border border-white/10">
                <stat.icon size={24} className="text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>

          <p className="text-slate-500 text-sm mt-12">
            © 2026 SmartTravel AI • Demo para Investidores
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Swap Modal */}
      <SwapModal
        isOpen={swapModal.isOpen}
        onClose={() => setSwapModal({ isOpen: false, category: null, currentItem: null })}
        category={swapModal.category}
        currentItem={swapModal.currentItem}
        options={getSwapOptions()}
        onSwap={(item) => handleSwap(swapModal.category, item)}
        tripDays={tripDays}
      />

      {/* AI Chat */}
      <AIChat
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        destination={destination}
        costs={costs}
        budget={totalBudget}
      />

      {/* Header */}
      <header className="glass border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setShowLanding(true)}>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <Globe size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold gradient-text">
                  SmartTravel AI
                </h1>
                <p className="text-xs text-slate-500">Viagens inteligentes</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <span className="text-2xl">{currentData.image}</span>
                <span className="text-sm font-medium text-slate-700">{destination}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <Users size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{adults + children}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full">
                <Calendar size={16} className="text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{tripDays} dias</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Configuration Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-slideUp">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-600" />
                Configure sua Viagem
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Destino</label>
                  <select 
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option>Paris, França</option>
                    <option>Nova York, EUA</option>
                    <option>Tóquio, Japão</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Data Início</label>
                  <input 
                    type="date" 
                    value={startDate}
                    onChange={(e) => { setStartDate(e.target.value); setItineraryGenerated(false); }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Data Fim</label>
                  <input 
                    type="date" 
                    value={endDate}
                    onChange={(e) => { setEndDate(e.target.value); setItineraryGenerated(false); }}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1 block">Viajantes</label>
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <input 
                        type="number" 
                        value={adults}
                        onChange={(e) => { setAdults(Math.max(1, parseInt(e.target.value) || 1)); setItineraryGenerated(false); }}
                        min="1"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">ad.</span>
                    </div>
                    <div className="flex-1 relative">
                      <input 
                        type="number" 
                        value={children}
                        onChange={(e) => { setChildren(Math.max(0, parseInt(e.target.value) || 0)); setItineraryGenerated(false); }}
                        min="0"
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">cr.</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-100">
                <label className="text-xs font-medium text-slate-500 mb-2 block">Orçamento Total (R$)</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="10000" 
                    max="150000" 
                    step="1000"
                    value={totalBudget}
                    onChange={(e) => setTotalBudget(parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <div className="w-36 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl text-center shadow-lg shadow-blue-200">
                    <span className="text-white font-bold">R$ {totalBudget.toLocaleString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              {/* Generate Button */}
              {!itineraryGenerated && (
                <button
                  onClick={generateItinerary}
                  disabled={isGenerating}
                  className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 btn-press"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={20} className="animate-spin" />
                      Gerando roteiro otimizado...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Gerar Roteiro Inteligente
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Itinerary */}
            {itineraryGenerated && (
              <div className="space-y-4 animate-slideUp">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Clock size={20} className="text-blue-600" />
                    Seu Roteiro - {tripDays} dias em {destination}
                  </h3>
                  <button
                    onClick={() => setItineraryGenerated(false)}
                    className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={16} />
                    Regenerar
                  </button>
                </div>

                {/* Quick Swap Buttons */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => openSwapModal('flight', selectedFlight)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium btn-press"
                  >
                    <Plane size={16} />
                    Trocar Voo
                  </button>
                  <button
                    onClick={() => openSwapModal('hotel', selectedHotel)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors text-sm font-medium btn-press"
                  >
                    <Hotel size={16} />
                    Trocar Hotel
                  </button>
                  <button
                    onClick={() => openSwapModal('activity', null)}
                    className="flex items-center gap-2 px-4 py-2 bg-violet-50 text-violet-700 rounded-lg hover:bg-violet-100 transition-colors text-sm font-medium btn-press"
                  >
                    <Plus size={16} />
                    Adicionar Passeio
                  </button>
                </div>

                {/* Timeline Cards */}
                <div className="grid gap-4 md:grid-cols-2 stagger-children">
                  {timeline.map((day, idx) => (
                    <DayCard 
                      key={idx} 
                      day={day.day} 
                      items={day.items}
                      onEditItem={openSwapModal}
                      index={idx}
                    />
                  ))}
                </div>

                {tripDays > 7 && (
                  <div className="text-center py-4">
                    <span className="text-sm text-slate-400 bg-slate-100 px-4 py-2 rounded-full">
                      + {tripDays - 7} dias adicionais seguindo o mesmo padrão
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {!itineraryGenerated && !isGenerating && (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
                  <Globe size={40} className="text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Configure sua viagem ideal</h3>
                <p className="text-slate-500 max-w-md mx-auto">
                  Escolha o destino, datas, número de viajantes e seu orçamento. 
                  Nossa IA criará um roteiro personalizado e otimizado para você.
                </p>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            
            {/* Main Budget Card */}
            <div className={`bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-200 transition-transform duration-300 animate-slideUp ${animateBudget ? 'scale-[1.02]' : ''}`}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold opacity-90">Orçamento Total</h2>
                <Wallet size={24} className="opacity-80" />
              </div>
              
              <div className="text-4xl font-bold mb-1">
                R$ {totalBudget.toLocaleString('pt-BR')}
              </div>
              
              {itineraryGenerated && (
                <>
                  <div className="flex items-center gap-2 mt-4">
                    <div className={`px-3 py-1.5 rounded-full text-sm font-medium ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>
                      {isOverBudget ? (
                        <span className="flex items-center gap-1">
                          <TrendingUp size={14} />
                          Excedido: R$ {Math.abs(remaining).toLocaleString('pt-BR')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <TrendingDown size={14} />
                          Disponível: R$ {remaining.toLocaleString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <div className="flex justify-between text-sm">
                      <span className="opacity-80">Gasto Planejado</span>
                      <span className="font-bold">R$ {costs.total.toLocaleString('pt-BR')}</span>
                    </div>
                    <div className="mt-2 h-3 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${isOverBudget ? 'bg-red-400' : 'bg-white'}`}
                        style={{ width: `${Math.min((costs.total / totalBudget) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-right text-xs mt-1 opacity-80">
                      {Math.round((costs.total / totalBudget) * 100)}% utilizado
                    </div>
                  </div>
                </>
              )}

              {!itineraryGenerated && (
                <p className="mt-4 text-sm opacity-70">
                  Gere um roteiro para ver a distribuição do orçamento
                </p>
              )}
            </div>

            {/* Category Breakdown */}
            {itineraryGenerated && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-slideUp" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-blue-600" />
                  Distribuição por Categoria
                </h3>
                
                <ProgressBar 
                  label="Voos" 
                  current={costs.flights} 
                  max={budgetAllocation.flights}
                  color="text-blue-600"
                  icon={Plane}
                />
                <ProgressBar 
                  label="Hospedagem" 
                  current={costs.hotels} 
                  max={budgetAllocation.hotels}
                  color="text-emerald-600"
                  icon={Hotel}
                />
                <ProgressBar 
                  label="Alimentação" 
                  current={costs.food} 
                  max={budgetAllocation.food}
                  color="text-amber-600"
                  icon={Utensils}
                />
                <ProgressBar 
                  label="Passeios" 
                  current={costs.activities} 
                  max={budgetAllocation.activities}
                  color="text-violet-600"
                  icon={Camera}
                />

                <div className="mt-4 pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 text-center">
                    💡 Clique nos itens do roteiro para trocar e compensar gastos
                  </p>
                </div>
              </div>
            )}

            {/* AI Insights */}
            {itineraryGenerated && insights.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-slideUp" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-blue-600" />
                  Insights da IA
                </h3>
                
                <div className="space-y-3">
                  {insights.map((insight, idx) => (
                    <AIInsightCard 
                      key={idx} 
                      insight={insight} 
                      onAction={() => {
                        if (insight.type === 'critical' || insight.type === 'tip') {
                          openSwapModal('hotel', selectedHotel);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quick Stats */}
            {itineraryGenerated && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm animate-slideUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield size={20} className="text-blue-600" />
                  Resumo da Viagem
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-blue-600">{tripDays}</div>
                    <div className="text-xs text-slate-500 mt-1">Dias</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-600">{selectedActivities.length}</div>
                    <div className="text-xs text-slate-500 mt-1">Passeios</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl">
                    <div className="text-lg font-bold text-amber-600">
                      R$ {Math.round(costs.total / tripDays).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Por dia</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-violet-50 to-violet-100/50 rounded-xl">
                    <div className="text-lg font-bold text-violet-600">
                      R$ {Math.round(costs.total / (adults + children)).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Por pessoa</div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA Button */}
            {itineraryGenerated && (
              <button 
                disabled={isOverBudget}
                className={`w-full py-4 font-bold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 btn-press
                  ${isOverBudget 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-200 hover:shadow-xl hover:scale-[1.02]'}`}
              >
                <Check size={20} />
                {isOverBudget ? 'Ajuste o orçamento para continuar' : 'Finalizar Planejamento'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating AI Chat Button */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg shadow-blue-300 hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center z-40"
      >
        {showChat ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-slate-500">
            SmartTravel AI © 2026 • Viagens inteligentes com orçamento controlado • Demo para Investidores
          </p>
        </div>
      </footer>
    </div>
  );
}
