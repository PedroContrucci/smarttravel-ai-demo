import React, { useState, useMemo, useEffect } from 'react';
import { Plane, Hotel, Utensils, Camera, MapPin, Calendar, Users, Wallet, TrendingDown, TrendingUp, Sparkles, Check, AlertTriangle, Lightbulb, Globe, Star, Clock, X, Plus, RefreshCw, Heart, User, LogOut, Bookmark, Baby, UserCheck, Mountain, Building, Palmtree, Crown, Map, Sunrise, Sun, Moon, PlaneTakeoff, PlaneLanding, MessageSquare, Car, Copy, Download, Anchor, Music, ShoppingBag, Sliders, ChevronDown, ChevronUp, Trash2, Eye, Coffee, Bed, ArrowUpCircle, ArrowDownCircle, FileText, Briefcase, Activity, DollarSign, Stethoscope, AlertCircle, ChevronRight, Image, List, BookOpen, Zap, BarChart3, ArrowRight, Shield, Banknote, Target, Timer } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, ReferenceLine } from 'recharts';

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
  const styles = { manhã: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-300', dot: 'bg-amber-500', gradient: 'from-amber-400 to-orange-500' }, tarde: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500', gradient: 'from-orange-400 to-red-500' }, noite: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-300', dot: 'bg-indigo-500', gradient: 'from-indigo-400 to-purple-600' } };
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

const EXCHANGE_RATES = {
  'BRL-EUR': { rate: 0.163, trend: 'up', volatility: 0.08 },
  'BRL-USD': { rate: 0.171, trend: 'stable', volatility: 0.05 },
  'BRL-JPY': { rate: 25.8, trend: 'down', volatility: 0.12 },
  'BRL-AED': { rate: 0.628, trend: 'stable', volatility: 0.04 },
  'BRL-MVR': { rate: 2.64, trend: 'stable', volatility: 0.03 }
};

const generateForexHistory = (basePair, months = 6) => {
  const baseRate = EXCHANGE_RATES[basePair]?.rate || 1;
  const volatility = EXCHANGE_RATES[basePair]?.volatility || 0.05;
  const trend = EXCHANGE_RATES[basePair]?.trend || 'stable';
  const data = [];
  let currentRate = baseRate * (1 - volatility * 2);
  for (let i = -months; i <= 3; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() + i);
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short' });
    const trendFactor = trend === 'up' ? 0.015 : trend === 'down' ? -0.012 : 0.002;
    const noise = (Math.random() - 0.5) * volatility * baseRate;
    currentRate = currentRate * (1 + trendFactor) + noise;
    currentRate = Math.max(baseRate * 0.85, Math.min(baseRate * 1.15, currentRate));
    data.push({ month: monthName, rate: parseFloat(currentRate.toFixed(4)), projected: i > 0, isCurrent: i === 0 });
  }
  return data;
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

const PredictiveExchangeEngine = ({ origin, destination, tripBudget }) => {
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
  const buySignal = useMemo(() => calculateBuySignal(forexHistory), [forexHistory]);
  const estimatedExpense = tripBudget * 0.6;
  const destAmount = estimatedExpense * directRate;
  const BuySignalIcon = buySignal.icon;

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 rounded-2xl border border-emerald-200 overflow-hidden shadow-lg">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm"><Banknote size={24} className="text-white" /></div>
        <div><h3 className="font-bold text-white text-lg">Motor de Câmbio Preditivo</h3><p className="text-emerald-100 text-sm">Análise IA para otimização de conversão</p></div>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">{CURRENCY_DATABASE.BRL.flag}</span>
              <ArrowRight size={16} className="text-teal-500" />
              <span className="text-2xl">{CURRENCY_DATABASE[destCurrency]?.flag}</span>
            </div>
            <p className="text-center text-2xl font-bold text-slate-800">{CURRENCY_DATABASE[destCurrency]?.symbol} {directRate.toFixed(destCurrency === 'JPY' ? 2 : 3)}</p>
            <p className="text-center text-xs text-slate-500 mt-1">Cotação Direta</p>
            <div className={`mt-2 text-center text-xs px-2 py-1 rounded-full ${EXCHANGE_RATES[directPair]?.trend === 'up' ? 'bg-red-100 text-red-600' : EXCHANGE_RATES[directPair]?.trend === 'down' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
              {EXCHANGE_RATES[directPair]?.trend === 'up' ? '↑ Alta' : EXCHANGE_RATES[directPair]?.trend === 'down' ? '↓ Queda' : '→ Estável'}
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl">{CURRENCY_DATABASE.BRL.flag}</span>
              <ArrowRight size={16} className="text-blue-500" />
              <span className="text-2xl">{CURRENCY_DATABASE[globalCurrency]?.flag}</span>
            </div>
            <p className="text-center text-2xl font-bold text-slate-800">{CURRENCY_DATABASE[globalCurrency]?.symbol} {globalRate.toFixed(3)}</p>
            <p className="text-center text-xs text-slate-500 mt-1">Via {globalCurrency}</p>
            <div className="mt-2 text-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-600">Moeda Global</div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-center gap-2 mb-3"><span className="text-2xl">💰</span></div>
            <p className="text-center text-2xl font-bold text-teal-600">~{CURRENCY_DATABASE[destCurrency]?.symbol} {destAmount.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            <p className="text-center text-xs text-slate-500 mt-1">Estimativa Viagem</p>
            <div className="mt-2 text-center text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-600">60% do orçamento</div>
          </div>
        </div>
        <div className={`p-4 rounded-xl border-2 ${buySignal.signal === 'buy' ? 'bg-emerald-50 border-emerald-300' : buySignal.signal === 'wait' ? 'bg-amber-50 border-amber-300' : 'bg-slate-50 border-slate-300'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${buySignal.signal === 'buy' ? 'bg-emerald-500' : buySignal.signal === 'wait' ? 'bg-amber-500' : 'bg-slate-500'}`}>
              <BuySignalIcon size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className={`font-bold text-lg ${buySignal.signal === 'buy' ? 'text-emerald-700' : buySignal.signal === 'wait' ? 'text-amber-700' : 'text-slate-700'}`}>
                {buySignal.signal === 'buy' ? '⭐ ' : buySignal.signal === 'wait' ? '⏳ ' : ''}{buySignal.message}
              </p>
              <p className="text-sm text-slate-600 mt-1">Análise baseada em tendências de mercado e projeção de 90 dias</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-slate-700 flex items-center gap-2"><BarChart3 size={18} className="text-teal-600" />Tendência BRL/{destCurrency}</h4>
            <span className="text-xs text-slate-500">Últimos 6 meses + Projeção 3 meses</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={forexHistory}>
              <defs><linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.3}/><stop offset="95%" stopColor="#14b8a6" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#94a3b8" />
              <YAxis tick={{ fontSize: 11 }} stroke="#94a3b8" domain={['dataMin - 0.01', 'dataMax + 0.01']} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e2e8f0' }} formatter={(value) => [`${CURRENCY_DATABASE[destCurrency]?.symbol} ${value}`, 'Taxa']} />
              <ReferenceLine x={forexHistory.find(d => d.isCurrent)?.month} stroke="#f59e0b" strokeDasharray="5 5" label={{ value: 'Hoje', position: 'top', fontSize: 10 }} />
              <Area type="monotone" dataKey="rate" stroke="#14b8a6" strokeWidth={2} fill="url(#colorRate)" dot={(props) => { const { cx, cy, payload } = props; if (payload.projected) return <circle cx={cx} cy={cy} r={4} fill="#f59e0b" stroke="#fff" strokeWidth={2} />; if (payload.isCurrent) return <circle cx={cx} cy={cy} r={6} fill="#14b8a6" stroke="#fff" strokeWidth={2} />; return <circle cx={cx} cy={cy} r={3} fill="#14b8a6" />; }} />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-3">
            <span className="flex items-center gap-2 text-xs text-slate-600"><span className="w-3 h-3 rounded-full bg-teal-500"></span> Histórico</span>
            <span className="flex items-center gap-2 text-xs text-slate-600"><span className="w-3 h-3 rounded-full bg-amber-500"></span> Projeção IA</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 border border-slate-200">
          <p className="text-xs font-semibold text-slate-500 uppercase mb-2 flex items-center gap-1"><Lightbulb size={12} /> Dicas de Câmbio</p>
          <ul className="space-y-2">
            <li className="text-sm text-slate-600 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Use cartões com IOF reduzido (1.1% vs 6.38%)</li>
            <li className="text-sm text-slate-600 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Evite trocar em aeroportos (-15% em média)</li>
            <li className="text-sm text-slate-600 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500 flex-shrink-0" />Considere conta global (Wise, Nomad)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// ========== DESTINATION GUIDES ==========
const DESTINATION_GUIDES = {
  'Paris, França': { visa: { required: false, info: 'Brasileiros não precisam de visto para estadias de até 90 dias no Espaço Schengen.', docs: ['Passaporte válido (6 meses)', 'Comprovante de hospedagem', 'Seguro viagem obrigatório', 'Passagem de volta'] }, health: { vaccines: ['Nenhuma vacina obrigatória'], insurance: 'Seguro viagem obrigatório - cobertura mínima €30.000', tips: ['Leve kit básico de medicamentos'] }, currency: { code: 'EUR', name: 'Euro', symbol: '€', rate: 6.15, trend: 'up', tips: ['Use cartões com IOF reduzido', 'Evite trocar em aeroportos'] } },
  'Miami, EUA': { visa: { required: true, info: 'Visto B1/B2 americano obrigatório para brasileiros.', docs: ['Passaporte válido', 'Formulário DS-160', 'Comprovante financeiro', 'Vínculo com Brasil'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Altamente recomendado (saúde cara nos EUA)', tips: ['Mantenha documentos do seguro acessíveis'] }, currency: { code: 'USD', name: 'Dólar', symbol: '$', rate: 5.85, trend: 'stable', tips: ['Gorjetas de 15-20% são esperadas'] } },
  'Tóquio, Japão': { visa: { required: false, info: 'Brasileiros têm isenção de visto para estadias de até 90 dias.', docs: ['Passaporte válido', 'Comprovante de hospedagem', 'Passagem de volta'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Recomendado', tips: ['Sistema de saúde excelente'] }, currency: { code: 'JPY', name: 'Iene', symbol: '¥', rate: 0.039, trend: 'down', tips: ['Japão ainda usa muito dinheiro'] } },
  'Dubai, EAU': { visa: { required: false, info: 'Brasileiros recebem visto de 90 dias na chegada.', docs: ['Passaporte válido (6 meses)', 'Reserva de hotel'] }, health: { vaccines: ['Nenhuma obrigatória'], insurance: 'Recomendado', tips: ['Clima extremo no verão'] }, currency: { code: 'AED', name: 'Dirham', symbol: 'د.إ', rate: 1.59, trend: 'stable', tips: ['Dólar amplamente aceito'] } },
  'Maldivas': { visa: { required: false, info: 'Visto de 30 dias gratuito na chegada.', docs: ['Passaporte válido (6 meses)', 'Reserva de hotel'] }, health: { vaccines: ['Febre amarela se vindo de área endêmica'], insurance: 'Obrigatório', tips: ['Leve protetor solar reef-safe'] }, currency: { code: 'MVR', name: 'Rufia', symbol: 'Rf', rate: 0.38, trend: 'stable', tips: ['Dólar aceito em resorts'] } }
};

const printStyles = `@media print { @page { margin: 0.8cm; size: A4; } body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .no-print { display: none !important; } .print-avoid-break { page-break-inside: avoid; } }`;

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
      <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="p-8 bg-gradient-to-br from-teal-600 to-emerald-600 text-white text-center">
          <Globe size={56} className="mx-auto mb-4" /><h2 className="text-2xl font-bold">SmartTravel AI</h2><p className="text-teal-100 text-sm mt-1">Viaje de forma inteligente</p>
        </div>
        <div className="p-6">
          <div className="flex gap-2 mb-6">{['login', 'signup'].map(m => <button key={m} onClick={() => setMode(m)} className={`flex-1 py-3 rounded-xl font-medium transition-all ${mode === m ? 'bg-teal-600 text-white' : 'bg-slate-100'}`}>{m === 'login' ? 'Entrar' : 'Criar Conta'}</button>)}</div>
          <div className="space-y-4">{mode === 'signup' && <input type="text" placeholder="Nome completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" />}<input type="email" placeholder="E-mail" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" /><input type="password" placeholder="Senha" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border rounded-xl" /></div>
          <button onClick={() => { const user = { name: form.name || 'Viajante', email: form.email, avatar: '🌍', trips: 0, joinDate: '2025' }; onLogin(user); onClose(); }} className="w-full mt-6 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-bold rounded-xl">{mode === 'login' ? 'Entrar' : 'Criar Conta'}</button>
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
        <div className={`p-5 rounded-xl ${guide.visa.required ? 'bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200' : 'bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200'}`}><div className="flex items-center gap-3 mb-3"><div className={`p-2 rounded-lg ${guide.visa.required ? 'bg-amber-500' : 'bg-emerald-500'}`}><FileText size={20} className="text-white" /></div><h4 className="font-bold text-slate-800">Visto</h4></div><p className={`text-sm font-semibold ${guide.visa.required ? 'text-amber-600' : 'text-emerald-600'}`}>{guide.visa.required ? '⚠️ Obrigatório' : '✅ Não necessário'}</p><p className="text-xs text-slate-600 mt-2">{guide.visa.info}</p></div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border border-blue-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 rounded-lg bg-blue-500"><Stethoscope size={20} className="text-white" /></div><h4 className="font-bold text-slate-800">Saúde</h4></div><p className="text-xs text-slate-600">{guide.health.insurance}</p><div className="mt-2 flex flex-wrap gap-1">{guide.health.vaccines.map((v, i) => <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{v}</span>)}</div></div>
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border border-emerald-200"><div className="flex items-center gap-3 mb-3"><div className="p-2 rounded-lg bg-emerald-500"><DollarSign size={20} className="text-white" /></div><h4 className="font-bold text-slate-800">Moeda</h4></div><p className="text-2xl font-bold text-emerald-700">{guide.currency.symbol} {guide.currency.code}</p><p className="text-xs text-slate-600 mt-1">1 BRL ≈ {guide.currency.rate} {guide.currency.code}</p></div>
      </div>
      <div className="bg-white/70 rounded-xl p-4"><p className="text-xs font-semibold text-slate-500 uppercase mb-2">📋 Documentos necessários</p><div className="flex flex-wrap gap-2">{guide.visa.docs.map((d, i) => <span key={i} className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">{d}</span>)}</div></div>
      <div className="bg-white/70 rounded-xl p-4"><p className="text-xs font-semibold text-slate-500 uppercase mb-2">💡 Dicas de câmbio</p><ul className="space-y-1">{guide.currency.tips.map((tip, i) => <li key={i} className="text-sm text-slate-600 flex items-center gap-2"><ChevronRight size={12} className="text-emerald-500" />{tip}</li>)}</ul></div>
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
            {idx === 0 && <div className="absolute top-3 left-3 px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700">📸 {images.length} fotos</div>}
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
          <button className="absolute top-4 right-4 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all" onClick={() => setSelectedImage(null)}><X size={24} /></button>
          <img src={selectedImage} alt="Gallery" className="max-w-full max-h-[90vh] rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

const PremiumItineraryRenderer = ({ dailySchedule, destination }) => {
  const [expandedDay, setExpandedDay] = useState(1);
  const typeIcons = { arrival: PlaneLanding, flight: Plane, hotel: Hotel, checkout: Briefcase, transfer: Car, activity: Camera, restaurant: Utensils, rest: Bed };
  const getTypeColor = (type) => ({ arrival: 'from-blue-500 to-indigo-500', flight: 'from-blue-400 to-cyan-500', hotel: 'from-purple-500 to-violet-500', checkout: 'from-orange-400 to-amber-500', transfer: 'from-cyan-500 to-teal-500', activity: 'from-emerald-500 to-green-500', restaurant: 'from-rose-500 to-pink-500', rest: 'from-indigo-400 to-purple-400' }[type] || 'from-emerald-500 to-green-500');
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl border border-teal-200">
        <BookOpen size={20} className="text-teal-600" /><p className="text-sm text-teal-700 font-medium">Guia Premium • Cronograma de {dailySchedule.length} dias</p>
      </div>
      {dailySchedule.map((dayData, idx) => {
        const isExpanded = expandedDay === dayData.day;
        return (
          <div key={idx} className={`bg-white rounded-2xl border overflow-hidden transition-all duration-500 ${isExpanded ? 'shadow-xl border-teal-300' : 'shadow-sm border-slate-200 hover:border-slate-300'}`}>
            <button onClick={() => setExpandedDay(isExpanded ? null : dayData.day)} className={`w-full text-left px-5 py-4 flex items-center justify-between transition-all ${isExpanded ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white' : 'bg-slate-50 hover:bg-slate-100'}`}>
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${isExpanded ? 'bg-white/20' : 'bg-teal-100 text-teal-700'}`}>{dayData.day}</div>
                <div><h4 className={`font-bold ${isExpanded ? 'text-white' : 'text-slate-800'}`}>Dia {dayData.day} — {dayData.theme}</h4><p className={`text-xs ${isExpanded ? 'text-teal-100' : 'text-slate-500'}`}>{dayData.items.length} atividades</p></div>
              </div>
              <ChevronDown size={20} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-500 overflow-hidden ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-5 space-y-3">
                {dayData.items.map((item, itemIdx) => {
                  const ItemIcon = typeIcons[item.type] || Camera;
                  return (
                    <div key={itemIdx} className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all group">
                      <div className="text-center w-20 flex-shrink-0">
                        <div className="font-mono text-sm font-bold text-teal-600">{item.time}</div>
                        {item.endTime && <><div className="text-xs text-slate-400">—</div><div className="font-mono text-xs text-slate-500">{item.endTime}</div></>}
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${getTypeColor(item.type)} shadow-lg group-hover:scale-110 transition-transform`}><ItemIcon size={20} className="text-white" /></div>
                      <div className="flex-1 min-w-0"><p className="font-semibold text-slate-800 group-hover:text-teal-700 transition-colors">{item.name}</p><p className="text-xs text-slate-500 capitalize mt-0.5">{item.type === 'restaurant' ? '🍽️ Refeição' : item.type === 'activity' ? '🎯 Atividade' : item.type === 'transfer' ? '🚗 Transporte' : item.type}</p></div>
                      {item.cost > 0 && <div className="text-right flex-shrink-0"><span className="px-3 py-1.5 bg-emerald-100 text-emerald-700 text-sm font-bold rounded-lg">R$ {item.cost.toLocaleString()}</span></div>}
                    </div>
                  );
                })}
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between"><span className="text-xs text-slate-500">Total do dia:</span><span className="font-bold text-teal-600">R$ {dayData.items.reduce((sum, item) => sum + (item.cost || 0), 0).toLocaleString()}</span></div>
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
  const colors = { upgrade: 'border-emerald-300 bg-emerald-50', downgrade: 'border-amber-300 bg-amber-50', danger: 'border-red-300 bg-red-50', tip: 'border-blue-300 bg-blue-50', info: 'border-slate-300 bg-slate-50' };
  return (
    <div className={`p-4 rounded-xl border-2 ${colors[insight.type] || colors.tip} transition-all hover:shadow-md`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${insight.type === 'upgrade' ? 'bg-emerald-500' : insight.type === 'downgrade' ? 'bg-amber-500' : insight.type === 'danger' ? 'bg-red-500' : 'bg-blue-500'}`}>
          <insight.icon size={18} className="text-white" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-slate-800 text-sm">{insight.title}</p>
          <p className="text-xs text-slate-600 mt-1">{insight.message}</p>
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
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div><h2 className="text-xl font-bold text-slate-800">{mode === 'swap' ? 'Trocar Atividade' : 'Adicionar ao Dia ' + dayNum}</h2><p className="text-sm text-slate-500 mt-1">Escolha uma opção abaixo</p></div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-xl transition-all"><X size={24} className="text-slate-500" /></button>
        </div>
        <div className="p-4 border-b border-slate-100">
          <div className="flex gap-2 mb-4">{['activities', 'restaurants'].map(t => <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2.5 rounded-xl font-medium transition-all ${tab === t ? 'bg-teal-600 text-white' : 'bg-slate-100 hover:bg-slate-200'}`}>{t === 'activities' ? '🎯 Atividades' : '🍽️ Restaurantes'}</button>)}</div>
          <input type="text" placeholder="Buscar..." value={search} onChange={e => setSearch(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
        </div>
        <div className="p-4 overflow-y-auto max-h-[50vh]">
          <div className="grid gap-3">
            {filtered.map(item => (
              <div key={item.id} onClick={() => { onSelect({ ...item, category: tab === 'restaurants' ? 'restaurant' : 'activity', location: item.location || item.cuisine, startTime: item.startTime || '10:00', endTime: TimeSlotEngine.calculateEndTime(item.startTime || '10:00', item.duration), period: item.period || 'manhã' }); onClose(); }} className="p-4 border border-slate-200 rounded-xl hover:border-teal-400 hover:shadow-md cursor-pointer transition-all group">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800 group-hover:text-teal-600">{item.name}</h4>
                    <p className="text-xs text-slate-500 mt-1">{item.location || item.cuisine} • {item.duration}h • ⭐ {item.rating}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-teal-600">R$ {item.price}</p>
                    <p className="text-xs text-slate-400">por pessoa</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {mode === 'swap' && current && (
          <div className="p-4 border-t border-slate-200 bg-slate-50">
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
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative h-56 bg-cover bg-center" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/40 rounded-full text-white transition-all"><X size={24} /></button>
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {itinerary.badges?.map((badge, i) => <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">{badge}</span>)}
            </div>
            <h2 className="text-3xl font-bold text-white">{itinerary.title}</h2>
            <p className="text-white/80 mt-1 flex items-center gap-2"><MapPin size={14} /> {itinerary.destination} • {itinerary.duration} dias</p>
          </div>
        </div>
        <div className="flex border-b border-slate-200">{['overview', 'itinerary', 'gallery', 'exchange'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-4 font-medium transition-all ${activeTab === tab ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}>{tab === 'overview' ? '📋 Visão Geral' : tab === 'itinerary' ? '📅 Roteiro' : tab === 'gallery' ? '📸 Galeria' : '💱 Câmbio'}</button>)}</div>
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <span className="text-4xl">{itinerary.author.avatar}</span>
                <div className="flex-1"><p className="font-semibold text-slate-800">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={14} className="inline text-teal-500" />}</p><p className="text-sm text-slate-500">{itinerary.travelers} viajantes</p></div>
                <div className="text-right"><div className="flex items-center gap-1"><Star size={20} className="text-amber-500 fill-amber-500" /><span className="text-2xl font-bold text-slate-800">{itinerary.rating}</span></div><p className="text-xs text-slate-500">{itinerary.reviews} avaliações</p></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50 rounded-xl text-center"><p className="text-2xl font-bold text-emerald-700">R$ {(itinerary.budget/1000).toFixed(0)}k</p><p className="text-xs text-emerald-600">Orçamento Total</p></div>
                <div className="p-4 bg-blue-50 rounded-xl text-center"><p className="text-2xl font-bold text-blue-700">{itinerary.duration}</p><p className="text-xs text-blue-600">Dias</p></div>
                <div className="p-4 bg-rose-50 rounded-xl text-center"><p className="text-2xl font-bold text-rose-700">{itinerary.likes.toLocaleString()}</p><p className="text-xs text-rose-600">Curtidas</p></div>
              </div>
              <div><h4 className="font-semibold text-slate-800 mb-3">✨ Destaques</h4><div className="flex flex-wrap gap-2">{itinerary.highlights.map((h, i) => <span key={i} className="px-3 py-1.5 bg-teal-100 text-teal-700 text-sm rounded-full font-medium">{h}</span>)}</div></div>
              {itinerary.comments?.length > 0 && <div><h4 className="font-semibold text-slate-800 mb-3">💬 Avaliações Recentes</h4><div className="space-y-3">{itinerary.comments.slice(0, 3).map(c => <div key={c.id} className="p-4 bg-slate-50 rounded-xl"><div className="flex items-center gap-2 mb-2"><span className="text-xl">{c.avatar}</span><span className="font-medium text-slate-700">{c.user}</span><div className="flex items-center gap-1 ml-auto">{Array(c.rating).fill(0).map((_, i) => <Star key={i} size={12} className="text-amber-500 fill-amber-500" />)}</div></div><p className="text-sm text-slate-600">{c.text}</p><p className="text-xs text-slate-400 mt-2">{c.date}</p></div>)}</div></div>}
            </div>
          )}
          {activeTab === 'itinerary' && itinerary.dailySchedule && <PremiumItineraryRenderer dailySchedule={itinerary.dailySchedule} destination={itinerary.destination} />}
          {activeTab === 'gallery' && destData?.galleryUrls && <MasonryGallery images={destData.galleryUrls} destination={itinerary.destination} />}
          {activeTab === 'exchange' && <PredictiveExchangeEngine origin="Brasil" destination={itinerary.destination} tripBudget={itinerary.budget} tripDate="2026-04-20" />}
        </div>
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 border-2 border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-100">Fechar</button>
          <button onClick={() => { onUse(itinerary); onClose(); }} className="flex-1 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg flex items-center justify-center gap-2"><Sparkles size={18} /> Usar este Roteiro</button>
        </div>
      </div>
    </div>
  );
};

const TimelineActivityCard = ({ item, onEdit, onRemove, showActions = true, isFirst = false, isLast = false }) => {
  const periodStyle = getPeriodStyle(item.period);
  const ItemIcon = getCategoryIcon(item);
  const isSpecialItem = ['flight', 'hotel', 'transfer', 'rest', 'checkout', 'daily-hotel'].includes(item.type);
  return (
    <div className="relative pl-10 pb-5 print-avoid-break group">
      <div className={`absolute left-[14px] top-0 ${isLast ? 'h-6' : 'h-full'} w-0.5 ${isFirst ? 'bg-gradient-to-b from-teal-400 to-teal-200' : 'bg-teal-200'}`} />
      <div className={`absolute left-[7px] top-1 w-4 h-4 rounded-full border-2 border-white shadow-md ${periodStyle.dot} z-10 group-hover:scale-125 transition-transform`} />
      <div className={`ml-2 p-4 rounded-xl border transition-all ${isSpecialItem ? 'bg-gradient-to-r from-slate-50 to-slate-100 border-slate-200' : `${periodStyle.bg} ${periodStyle.border}`} hover:shadow-lg group-hover:border-teal-400`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl ${isSpecialItem ? 'bg-slate-200' : `bg-gradient-to-br ${periodStyle.gradient}`} shadow-md`}>
            <ItemIcon size={20} className={isSpecialItem ? 'text-slate-600' : 'text-white'} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap"><h4 className={`font-semibold ${isSpecialItem ? 'text-slate-700' : 'text-slate-800'}`}>{item.name}</h4>{item.rating && <span className="flex items-center gap-0.5 text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded-full"><Star size={10} className="fill-amber-500" /> {item.rating}</span>}</div>
            <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">{item.location && <span className="flex items-center gap-1"><MapPin size={11} /> {item.location}</span>}{item.duration && !isSpecialItem && <span className="flex items-center gap-1"><Clock size={11} /> {item.duration}h</span>}{item.startTime && <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${periodStyle.bg} ${periodStyle.text}`}>{item.startTime}{item.endTime ? ` - ${item.endTime}` : ''}</span>}</div>
          </div>
          <div className="text-right flex-shrink-0">{item.price !== undefined && <p className="font-bold text-teal-600">R$ {item.price.toLocaleString()}</p>}{!isSpecialItem && showActions && <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity no-print"><button onClick={() => onEdit && onEdit(item)} className="p-1.5 bg-slate-100 hover:bg-teal-100 rounded-lg text-slate-500 hover:text-teal-600 transition-all" title="Trocar"><RefreshCw size={14} /></button><button onClick={() => onRemove && onRemove()} className="p-1.5 bg-slate-100 hover:bg-red-100 rounded-lg text-slate-500 hover:text-red-500 transition-all" title="Remover"><Trash2 size={14} /></button></div>}</div>
        </div>
      </div>
    </div>
  );
};

const TimelineDaySection = ({ day, dayNumber, totalDays, dateInfo, items, flight, hotel, origin, destination, totalPayingTravelers, arrivalInfo, returnTime, onEditItem, onAddItem, onRemoveItem, upgradeInsight, isArrivalDay, isRestDay }) => {
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
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md py-3 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg"><span className="text-white font-bold text-lg">{dayNumber}</span></div>
            <div><p className="font-bold text-slate-800">{dateInfo.weekday}</p><p className="text-sm text-slate-500">{dateInfo.day}/{dateInfo.month}/{dateInfo.year}</p></div>
          </div>
          {isRestDay && <span className="ml-auto px-3 py-1.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1"><Bed size={12} /> Dia de Recuperação — Apenas Jantar</span>}
          {isLastDay && <span className="ml-auto px-3 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">Último Dia</span>}
        </div>
      </div>
      <div className="relative">
        {upgradeInsight && <div className="mb-4"><AIInsightCard insight={upgradeInsight} onAction={() => {}} /></div>}
        {allDayItems.map((entry, idx) => <TimelineActivityCard key={entry.key} item={entry.item} onEdit={entry.onEdit} onRemove={entry.onRemove} showActions={entry.showActions} isFirst={idx === 0} isLast={idx === allDayItems.length - 1} />)}
        {!isRestDay && <div className="relative pl-10 pb-4"><div className="absolute left-[14px] top-0 h-8 w-0.5 bg-gradient-to-b from-teal-200 to-transparent" /><button onClick={() => onAddItem && onAddItem(day)} className="ml-2 w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-400 hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50 transition-all flex items-center justify-center gap-2 no-print hover:shadow-md"><Plus size={18} /> Adicionar Atividade</button></div>}
      </div>
    </div>
  );
};

const CommunityCard = ({ itinerary, onUse, onLike, onViewDetails, isLiked, compact = false }) => {
  const destData = DESTINATIONS_DATABASE[itinerary.destination];
  const typeLabels = { romantic: '💕 Romântico', family: '👨‍👩‍👧 Família', budget: '💰 Econômico', luxury: '👑 Luxo', culture: '🏛️ Cultural', beach: '🏖️ Praia', adventure: '🏔️ Aventura' };
  
  if (compact) {
    return (
      <div className="bg-white/80 backdrop-blur-md rounded-xl border border-white/50 p-3 hover:shadow-xl transition-all cursor-pointer group hover:bg-white/90" onClick={() => onViewDetails && onViewDetails(itinerary)} style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-md" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
          <div className="flex-1 min-w-0"><h4 className="font-semibold text-sm text-slate-800 truncate group-hover:text-teal-600 transition-colors">{itinerary.title}</h4><p className="text-xs text-slate-500">{itinerary.duration} dias • R$ {(itinerary.budget/1000).toFixed(0)}k</p></div>
          <div className="flex items-center gap-1 text-amber-500"><Star size={12} className="fill-amber-500" /><span className="text-xs font-bold">{itinerary.rating}</span></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 overflow-hidden hover:shadow-2xl transition-all group" style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}>
      <div className="relative h-44 bg-cover bg-center overflow-hidden" style={{ backgroundImage: `url(${destData?.coverUrl})` }}>
        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${destData?.coverUrl})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {itinerary.featured && <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold rounded-full shadow-lg flex items-center gap-1"><Crown size={10} /> DESTAQUE</span>}
          {itinerary.badges?.slice(0, 1).map((badge, i) => <span key={i} className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] font-semibold rounded-full shadow-md">{badge}</span>)}
        </div>
        <button onClick={(e) => { e.stopPropagation(); onLike && onLike(itinerary.id); }} className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${isLiked ? 'bg-rose-500 text-white scale-110' : 'bg-white/20 text-white hover:bg-white/40 hover:scale-110'}`}><Heart size={18} className={isLiked ? 'fill-white' : ''} /></button>
        <div className="absolute bottom-3 left-3 right-3"><h3 className="text-white font-bold text-lg leading-tight drop-shadow-lg">{itinerary.title}</h3><p className="text-white/80 text-xs flex items-center gap-1 mt-1"><MapPin size={10} /> {itinerary.destination}</p></div>
      </div>
      <div className="p-4 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">{itinerary.author.avatar}</span>
          <div className="flex-1"><p className="text-xs font-medium text-slate-700">{itinerary.author.name} {itinerary.author.verified && <UserCheck size={10} className="inline text-teal-500" />}</p><p className="text-[10px] text-slate-400">{itinerary.duration} dias • R$ {itinerary.budget.toLocaleString()}</p></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-amber-50 rounded-full border border-amber-200"><Star size={14} className="text-amber-500 fill-amber-500" /><span className="text-sm font-bold text-amber-700">{itinerary.rating}</span></div>
        </div>
        <div className="flex flex-wrap gap-1 mb-3">{itinerary.tags.map(t => <span key={t} className="px-2 py-0.5 bg-slate-100/80 text-slate-600 text-[10px] rounded-full backdrop-blur-sm">{typeLabels[t] || t}</span>)}</div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-200/50">
          <div className="flex items-center gap-3"><span className="flex items-center gap-1 text-slate-400 text-xs"><Heart size={14} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />{itinerary.likes.toLocaleString()}</span><span className="flex items-center gap-1 text-slate-400 text-xs"><MessageSquare size={14} />{itinerary.reviews}</span></div>
          <button onClick={() => onViewDetails && onViewDetails(itinerary)} className="text-xs font-medium text-teal-600 hover:text-teal-700 flex items-center gap-1 px-3 py-1.5 bg-teal-50 rounded-lg hover:bg-teal-100 transition-all"><Eye size={14} /> Ver Detalhes</button>
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
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-600 hover:text-teal-600 transition-all"><ChevronUp className="rotate-[-90deg]" size={20} /> Voltar</button>
      <div className="bg-gradient-to-br from-teal-600 to-emerald-600 rounded-2xl p-8 text-white text-center mb-6 shadow-xl"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-5xl">{user.avatar}</div><h1 className="text-2xl font-bold">{user.name}</h1><p className="text-teal-100">{user.email}</p><div className="mt-4 flex justify-center gap-8"><div><p className="text-2xl font-bold">{user.trips}</p><p className="text-xs text-teal-200">Viagens</p></div><div><p className="text-2xl font-bold">{user.joinDate}</p><p className="text-xs text-teal-200">Membro desde</p></div></div></div>
      <div className="flex gap-2 mb-6">{['info', 'profile', 'trips', 'saved'].map(tab => <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-3 rounded-xl font-medium transition-all ${activeTab === tab ? 'bg-teal-600 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tab === 'info' ? 'Informações' : tab === 'profile' ? 'Perfil' : tab === 'trips' ? 'Viagens' : 'Salvos'}</button>)}</div>
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        {activeTab === 'info' && <div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Informações Pessoais</h2>{!editing ? <button onClick={() => setEditing(true)} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium transition-all">Editar</button> : <button onClick={() => { setUser(tempUser); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all">Salvar</button>}</div><div className="grid md:grid-cols-2 gap-4"><div><label className="text-sm font-medium text-slate-500 block mb-1">Nome</label><input type="text" value={tempUser.name} onChange={(e) => setTempUser({...tempUser, name: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border rounded-xl disabled:opacity-70 transition-all" /></div><div><label className="text-sm font-medium text-slate-500 block mb-1">E-mail</label><input type="email" value={tempUser.email} onChange={(e) => setTempUser({...tempUser, email: e.target.value})} disabled={!editing} className="w-full px-4 py-3 bg-slate-50 border rounded-xl disabled:opacity-70 transition-all" /></div></div></div>}
        {activeTab === 'profile' && <div><div className="flex items-center justify-between mb-6"><h2 className="text-lg font-bold text-slate-800">Perfil do Viajante</h2>{!editing ? <button onClick={() => { setTempProfile(userProfile); setEditing(true); }} className="px-4 py-2 border-2 border-teal-600 text-teal-600 rounded-lg hover:bg-teal-50 font-medium transition-all">Editar</button> : <button onClick={() => { setUserProfile(tempProfile); setEditing(false); }} className="px-4 py-2 bg-teal-600 text-white rounded-lg font-medium hover:bg-teal-700 transition-all">Salvar</button>}</div><h3 className="font-semibold text-slate-700 mb-2">Estilos de viagem <span className="text-xs text-slate-400">(até 3)</span></h3><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">{TRAVELER_TYPES.map(type => { const isSelected = (tempProfile.types || []).includes(type.id); return <button key={type.id} onClick={() => toggleType(type.id)} disabled={!editing} className={`p-4 rounded-xl border-2 text-center transition-all hover:scale-105 ${isSelected ? 'border-teal-500 bg-teal-50 shadow-md' : 'border-slate-200 hover:border-slate-300'} ${!editing && 'opacity-70'}`}><type.icon size={28} className={isSelected ? 'text-teal-600 mx-auto' : 'text-slate-400 mx-auto'} /><p className="font-medium text-sm mt-2">{type.name}</p>{isSelected && <span className="text-[10px] text-teal-600 font-semibold">✓</span>}</button>; })}</div><h3 className="font-semibold text-slate-700 mb-3">Interesses</h3><div className="flex flex-wrap gap-2">{INTEREST_TAGS.map(tag => <button key={tag} onClick={() => { if (!editing) return; setTempProfile({...tempProfile, interests: tempProfile.interests?.includes(tag) ? tempProfile.interests.filter(i => i !== tag) : [...(tempProfile.interests || []), tag]}); }} disabled={!editing} className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 ${tempProfile.interests?.includes(tag) ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{tag}</button>)}</div></div>}
        {activeTab === 'trips' && <div className="text-center py-12"><Map size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma viagem ainda</h3><p className="text-slate-500">Suas viagens aparecerão aqui</p></div>}
        {activeTab === 'saved' && <div className="text-center py-12"><Bookmark size={48} className="text-slate-300 mx-auto mb-4" /><h3 className="text-lg font-semibold text-slate-800 mb-2">Nada salvo</h3><p className="text-slate-500">Roteiros salvos aparecerão aqui</p></div>}
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
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-2"><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span><span className="text-xs px-2 py-0.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-full font-semibold ml-2">2026</span></div><div className="flex items-center gap-4">{user ? <><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button></> : <button onClick={() => setShowAuthModal(true)} className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 font-medium">Entrar</button>}</div></div></nav>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-100 to-purple-100 rounded-full text-violet-700 text-sm font-semibold mb-6"><Zap size={16} /> Motor de Câmbio Preditivo • Roteiros Full-Depth</div>
          <h1 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6">Planeje viagens <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">incríveis</span> com IA</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">Roteiros personalizados, projeção de câmbio, otimização de orçamento e sugestões inteligentes baseadas no seu perfil.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => { if (!user) setShowAuthModal(true); else setCurrentView('planner'); }} className="px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center gap-2 hover:scale-105"><Sparkles size={24} /> Começar a Planejar</button>
            <button onClick={() => setCurrentView('community')} className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-bold text-lg hover:border-teal-500 hover:text-teal-600 transition-all hover:scale-105">Ver Comunidade</button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-4 gap-6">
            {[{ icon: Sparkles, title: 'IA Personalizada', desc: 'Roteiros adaptados ao seu perfil', color: 'from-teal-500 to-emerald-500' }, { icon: BarChart3, title: 'Câmbio Preditivo', desc: 'Previsão de melhor momento de compra', color: 'from-violet-500 to-purple-500' }, { icon: Wallet, title: 'Smart Budget', desc: 'Otimização automática de custos', color: 'from-amber-500 to-orange-500' }, { icon: Users, title: 'Comunidade', desc: 'Roteiros de viajantes reais', color: 'from-rose-500 to-pink-500' }].map((f, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl transition-all hover:scale-105 group">
                <div className={`w-14 h-14 bg-gradient-to-br ${f.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}><f.icon size={28} className="text-white" /></div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-slate-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16"><h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Destinos Populares</h2><div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">{Object.entries(DESTINATIONS_DATABASE).map(([name, dest]) => <div key={name} onClick={() => { setDestination(name); setCurrentView('planner'); if (!user) setShowAuthModal(true); }} className="relative h-48 rounded-2xl overflow-hidden cursor-pointer group"><div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110" style={{ backgroundImage: `url(${dest.coverUrl})` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" /><div className="absolute bottom-4 left-4 right-4"><p className="text-white font-bold text-lg">{name.split(',')[0]}</p><p className="text-white/80 text-sm">{dest.continent}</p></div></div>)}</div></div>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={(u) => { setUser(u); setCurrentView('planner'); }} />
      </div>
    );
  }

  // ========== COMMUNITY PAGE ==========
  if (currentView === 'community') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button className="text-teal-600 font-medium">Comunidade</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div></div></nav>
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8"><h1 className="text-3xl font-bold text-slate-800">Comunidade de Viajantes</h1><p className="text-slate-600 mt-2">Descubra roteiros completos de viajantes reais</p></div>
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <select value={communityFilter.destination} onChange={e => setCommunityFilter({...communityFilter, destination: e.target.value})} className="px-4 py-2 border border-slate-200 rounded-lg bg-white"><option value="all">Todos os destinos</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select>
            <select value={communityFilter.type} onChange={e => setCommunityFilter({...communityFilter, type: e.target.value})} className="px-4 py-2 border border-slate-200 rounded-lg bg-white"><option value="all">Todos os tipos</option>{['romantic', 'family', 'budget', 'luxury', 'culture', 'beach', 'adventure'].map(t => <option key={t} value={t}>{t}</option>)}</select>
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
      <div className="min-h-screen bg-slate-50">
        <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-slate-600 hover:text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button><button onClick={() => { setUser(null); setCurrentView('landing'); }} className="text-red-500 hover:text-red-600 font-medium flex items-center gap-1"><LogOut size={18} /> Sair</button></div></div></nav>
        <div className="max-w-7xl mx-auto px-4 py-8"><ProfilePage user={user} setUser={setUser} userProfile={userProfile} setUserProfile={setUserProfile} onBack={() => setCurrentView('planner')} /></div>
      </div>
    );
  }

  // ========== PLANNER PAGE ==========
  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-40 no-print"><div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between"><div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentView('landing')}><Globe size={28} className="text-teal-600" /><span className="text-xl font-bold text-slate-800">SmartTravel <span className="text-teal-600">AI</span></span></div><div className="flex items-center gap-4"><button onClick={() => setCurrentView('planner')} className="text-teal-600 font-medium">Planejar</button><button onClick={() => setCurrentView('community')} className="text-slate-600 hover:text-teal-600 font-medium">Comunidade</button>{user && <button onClick={() => setCurrentView('profile')} className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"><span className="text-lg">{user.avatar}</span>{user.name.split(' ')[0]}</button>}</div></div></nav>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm no-print">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><PlaneTakeoff size={14} /> Origem</label><select value={origin} onChange={e => setOrigin(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">{BRAZILIAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><PlaneLanding size={14} /> Destino</label><select value={destination} onChange={e => { setDestination(e.target.value); setItineraryGenerated(false); }} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl"><option value="">Selecione...</option>{Object.keys(DESTINATIONS_DATABASE).map(d => <option key={d} value={d}>{d}</option>)}</select></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Calendar size={14} /> Datas</label><div className="flex gap-2"><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="flex-1 px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm" /></div></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Users size={14} /> Viajantes</label><div className="flex gap-2"><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"><button onClick={() => setAdults(Math.max(1, adults - 1))} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{adults} adultos</span><button onClick={() => setAdults(adults + 1)} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div><div className="flex-1 flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"><button onClick={() => { setChildren(Math.max(0, children - 1)); setChildrenAges(childrenAges.slice(0, -1)); }} className="w-8 h-8 bg-slate-200 rounded-lg">-</button><span className="flex-1 text-center text-sm">{children} crian.</span><button onClick={() => { setChildren(children + 1); setChildrenAges([...childrenAges, 5]); }} className="w-8 h-8 bg-slate-200 rounded-lg">+</button></div></div></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 pt-4 border-t border-slate-100">
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Wallet size={14} /> Orçamento Total</label><input type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Ida</label><input type="time" value={outboundDepartureTime} onChange={e => setOutboundDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Clock size={14} /> Horário Volta</label><input type="time" value={returnDepartureTime} onChange={e => setReturnDepartureTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" /></div>
            <div><label className="text-sm font-medium text-slate-600 block mb-2 flex items-center gap-1"><Sliders size={14} /> Prioridades</label><button onClick={() => setShowPriorityPanel(!showPriorityPanel)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-left flex items-center justify-between"><span className="text-sm">{tripPriorities.length > 0 ? `${tripPriorities.length} selecionadas` : 'Selecionar...'}</span>{showPriorityPanel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button></div>
          </div>
          {showPriorityPanel && <div className="mb-6 p-4 bg-slate-50 rounded-xl"><p className="text-sm text-slate-600 mb-3">Selecione até 3 prioridades:</p><div className="flex flex-wrap gap-2">{TRIP_PRIORITIES.map(p => <button key={p.id} onClick={() => togglePriority(p.id)} className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${tripPriorities.includes(p.id) ? 'bg-teal-600 text-white' : 'bg-white border border-slate-200 hover:border-teal-400'}`}><p.icon size={16} /> {p.name}</button>)}</div></div>}
          <button onClick={generateItinerary} disabled={!destination || isGenerating} className={`w-full py-4 font-bold rounded-xl text-white flex items-center justify-center gap-2 shadow-lg transition-all ${!destination ? 'bg-slate-300 cursor-not-allowed' : isGenerating ? 'bg-teal-400' : 'bg-gradient-to-r from-teal-600 to-emerald-600 hover:shadow-teal-500/30 hover:scale-[1.02]'}`}>{isGenerating ? <><RefreshCw size={20} className="animate-spin" /> Gerando roteiro...</> : <><Sparkles size={20} /> Gerar Roteiro Inteligente</>}</button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 main-content">
            {itineraryGenerated && (
              <div className="space-y-6">
                <div className="flex gap-2 mb-4 no-print">
                  <button onClick={() => setItineraryTab('timeline')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'timeline' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white border border-slate-200 hover:border-teal-400'}`}><Calendar size={18} /> Timeline</button>
                  <button onClick={() => setItineraryTab('guide')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'guide' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white border border-slate-200 hover:border-teal-400'}`}><BookOpen size={18} /> Guia</button>
                  <button onClick={() => setItineraryTab('exchange')} className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${itineraryTab === 'exchange' ? 'bg-teal-600 text-white shadow-lg' : 'bg-white border border-slate-200 hover:border-teal-400'}`}><Banknote size={18} /> Câmbio</button>
                </div>
                
                {itineraryTab === 'timeline' && (
                  <>
                    {arrivalInfo && <div className={`arrival-banner rounded-2xl p-5 flex items-center gap-4 shadow-lg print-avoid-break ${arrivalInfo.isOvernightFlight ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white' : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'}`}><div className={`p-4 rounded-xl ${arrivalInfo.isOvernightFlight ? 'bg-orange-600/30' : 'bg-blue-600/30'}`}>{arrivalInfo.isOvernightFlight ? <Moon size={32} /> : <PlaneLanding size={32} />}</div><div className="flex-1"><p className="font-bold text-lg flex items-center gap-2">Chegada às {arrivalInfo.time}<span className="text-sm font-normal opacity-90">(horário local de {destination?.split(',')[0]})</span>{arrivalInfo.dayLabel && <span className="ml-2 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full border border-white/30">{arrivalInfo.dayLabel}</span>}</p><p className="text-sm opacity-90 mt-1">Fuso: {arrivalInfo.timezoneDiff > 0 ? '+' : ''}{arrivalInfo.timezoneDiff}h • Duração: {arrivalInfo.flightHours}h{arrivalInfo.requiresRest && <span className="ml-3 inline-flex items-center gap-1"><Bed size={14} /><span className="font-medium">Dia 1 reservado para recuperação</span></span>}</p></div></div>}
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                      {Array.from({ length: tripDays }, (_, i) => i + 1).map(dayNum => {
                        const dateInfo = formatDateFull(actualStartDate, dayNum - 1);
                        const isRestDay = dayNum === 1 && arrivalInfo?.requiresRest;
                        return <TimelineDaySection key={dayNum} day={dayNum} dayNumber={dayNum} totalDays={tripDays} dateInfo={dateInfo} items={daySchedule[dayNum] || []} flight={selectedFlight} hotel={selectedHotel} origin={origin} destination={destination} totalPayingTravelers={totalPayingTravelers} arrivalInfo={arrivalInfo} returnTime={returnDepartureTime} onEditItem={handleEditItem} onAddItem={handleAddItem} onRemoveItem={handleRemoveItem} upgradeInsight={dayNum === 1 ? upgradeInsight : null} isArrivalDay={dayNum === 1} isRestDay={isRestDay} />;
                      })}
                    </div>
                  </>
                )}
                
                {itineraryTab === 'guide' && (
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6"><div className="p-3 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl shadow-lg"><Globe size={24} className="text-white" /></div><div><h2 className="text-xl font-bold text-slate-800">Guia do Destino</h2><p className="text-sm text-slate-500">{destination}</p></div></div>
                    <DestinationGuide destination={destination} />
                  </div>
                )}
                
                {itineraryTab === 'exchange' && <div className="exchange-section"><PredictiveExchangeEngine origin={origin} destination={destination} tripBudget={totalBudget} tripDate={startDate} /></div>}
              </div>
            )}
            {!destination && <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center"><Globe size={64} className="text-teal-200 mx-auto mb-4" /><h3 className="text-xl font-bold text-slate-800 mb-2">Escolha um destino</h3><p className="text-slate-500">Selecione para onde você quer ir</p></div>}
          </div>

          <div className="space-y-6 no-print sidebar-print">
            <div className={`bg-gradient-to-br from-teal-600 to-teal-800 rounded-2xl p-6 text-white shadow-xl ${!itineraryGenerated && 'opacity-60'}`}>
              <div className="flex items-center justify-between mb-2"><h3 className="font-semibold">Orçamento</h3><Wallet size={20} /></div>
              <div className="text-3xl font-bold">R$ {totalBudget.toLocaleString()}</div>
              {itineraryGenerated && <><div className={`mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${isOverBudget ? 'bg-red-500/30' : 'bg-white/20'}`}>{isOverBudget ? <TrendingUp size={14} /> : <TrendingDown size={14} />}{isOverBudget ? `Excedido: R$ ${Math.abs(remaining).toLocaleString()}` : `Disponível: R$ ${remaining.toLocaleString()}`}</div><div className="mt-4 pt-4 border-t border-white/20 space-y-2 text-sm"><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Plane size={14} />Voos</span><span>R$ {costs.flights.toLocaleString()} ({costs.percentages.flights || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Hotel size={14} />Hotel</span><span>R$ {costs.hotels.toLocaleString()} ({costs.percentages.hotels || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Camera size={14} />Passeios</span><span>R$ {costs.activities.toLocaleString()} ({costs.percentages.activities || 0}%)</span></div><div className="flex justify-between"><span className="opacity-80 flex items-center gap-2"><Utensils size={14} />Alimentação</span><span>R$ {costs.food.toLocaleString()} ({costs.percentages.food || 0}%)</span></div><div className="flex justify-between font-bold pt-2 border-t border-white/20"><span>Total</span><span>R$ {costs.total.toLocaleString()}</span></div></div></>}
            </div>
            {itineraryGenerated && insights.length > 0 && <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-teal-600" /> Insights da IA</h3><div className="space-y-3">{insights.map((insight, i) => <AIInsightCard key={i} insight={insight} onAction={handleInsightAction} />)}</div></div>}
            {destination && <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200 p-4 shadow-sm"><h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Crown size={18} className="text-amber-500" /> Top Roteiros - {destination.split(',')[0]}</h3><div className="space-y-2">{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).slice(0, 3).map(it => <CommunityCard key={it.id} itinerary={it} onUse={useCommunityItinerary} onLike={toggleLike} onViewDetails={(it) => setCommunityDetailModal({ isOpen: true, itinerary: it })} isLiked={likedItineraries.includes(it.id)} compact />)}{COMMUNITY_ITINERARIES.filter(i => i.destination === destination).length === 0 && <p className="text-sm text-slate-400 text-center py-4">Nenhum roteiro ainda</p>}</div></div>}
            {itineraryGenerated && <button onClick={handlePrint} disabled={isOverBudget} className={`w-full py-4 font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all ${isOverBudget ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-emerald-500/30 hover:scale-[1.02]'}`}>{isOverBudget ? <><AlertTriangle size={20} />Ajuste o orçamento</> : <><Download size={20} />Baixar PDF (com Câmbio)</>}</button>}
          </div>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} onLogin={setUser} />
      <ActivityModal isOpen={activityModal.isOpen} onClose={() => setActivityModal({ isOpen: false, day: null, idx: null, current: null, mode: 'add' })} activities={currentData?.activities || []} restaurants={currentData?.restaurants || []} current={activityModal.current} mode={activityModal.mode} dayNum={activityModal.day} onSelect={handleSelectActivity} onRemove={() => activityModal.day && activityModal.idx !== null && handleRemoveItem(activityModal.day, activityModal.idx)} />
      <CommunityDetailModal itinerary={communityDetailModal.itinerary} isOpen={communityDetailModal.isOpen} onClose={() => setCommunityDetailModal({ isOpen: false, itinerary: null })} onUse={useCommunityItinerary} />
    </div>
  );
}
