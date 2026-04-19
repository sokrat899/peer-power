export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  latitude: number;
  longitude: number;
  balance: number;
  energy_balance: number;
  is_pro: boolean;
  notifications_enabled: boolean;
  auto_sell_enabled: boolean;
  auto_sell_price: number;
  created_at: string;
}

export interface Device {
  id: string;
  user_id: string;
  name: string;
  device_type: 'solar_panel' | 'battery' | 'smart_meter' | 'ev_charger';
  capacity_kwh: number;
  current_production: number;
  is_connected: boolean;
  created_at: string;
}

export interface EnergyListing {
  id: string;
  seller_id: string;
  seller_name: string;
  energy_kwh: number;
  price_per_kwh: number;
  latitude: number;
  longitude: number;
  distance_km?: number;
  status: 'active' | 'sold' | 'cancelled';
  created_at: string;
}

export interface Transaction {
  id: string;
  buyer_id: string;
  seller_id: string;
  buyer_name: string;
  seller_name: string;
  energy_kwh: number;
  price_per_kwh: number;
  total_price: number;
  transaction_type: 'buy' | 'sell';
  status: string;
  created_at: string;
}

export interface ProductionData {
  date: string;
  production_kwh: number;
  day_name: string;
}

export interface IncomeData {
  date: string;
  income: number;
  day_name: string;
}

export interface Recommendation {
  type: 'sell' | 'buy' | 'hold' | 'price';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

export interface ForecastData {
  hour: number;
  hour_label: string;
  production_kwh: number;
  is_current: boolean;
}

export interface MarketStats {
  active_listings: number;
  total_transactions: number;
  average_price: number;
  total_energy_traded_kwh: number;
  current_demand: 'low' | 'medium' | 'high';
  price_trend: 'up' | 'down' | 'stable';
}
