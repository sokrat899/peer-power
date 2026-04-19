import axios from 'axios';
import { User, Device, EnergyListing, Transaction, ProductionData, IncomeData, Recommendation, ForecastData, MarketStats } from '../types';

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL || '';

const api = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User APIs
export const createUser = async (data: { name: string; email: string; address: string; latitude?: number; longitude?: number }): Promise<User> => {
  const response = await api.post('/users', data);
  return response.data;
};

export const getUser = async (userId: string): Promise<User> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await api.get(`/users/email/${encodeURIComponent(email)}`);
  return response.data;
};

export const updateUser = async (userId: string, data: Partial<User>): Promise<User> => {
  const response = await api.put(`/users/${userId}`, data);
  return response.data;
};

// Device APIs
export const createDevice = async (data: { user_id: string; name: string; device_type: string; capacity_kwh: number }): Promise<Device> => {
  const response = await api.post('/devices', data);
  return response.data;
};

export const getUserDevices = async (userId: string): Promise<Device[]> => {
  const response = await api.get(`/devices/user/${userId}`);
  return response.data;
};

export const deleteDevice = async (deviceId: string): Promise<void> => {
  await api.delete(`/devices/${deviceId}`);
};

// Listings APIs
export const createListing = async (data: { seller_id: string; energy_kwh: number; price_per_kwh: number }): Promise<EnergyListing> => {
  const response = await api.post('/listings', data);
  return response.data;
};

export const getListings = async (userId?: string, maxDistance?: number, sortBy?: string): Promise<EnergyListing[]> => {
  const params = new URLSearchParams();
  if (userId) params.append('user_id', userId);
  if (maxDistance) params.append('max_distance', maxDistance.toString());
  if (sortBy) params.append('sort_by', sortBy);
  
  const response = await api.get(`/listings?${params.toString()}`);
  return response.data;
};

export const buyEnergy = async (listingId: string, buyerId: string): Promise<any> => {
  const response = await api.post(`/listings/${listingId}/buy`, { buyer_id: buyerId, listing_id: listingId });
  return response.data;
};

// Transaction APIs
export const getUserTransactions = async (userId: string, limit?: number): Promise<Transaction[]> => {
  const params = limit ? `?limit=${limit}` : '';
  const response = await api.get(`/transactions/user/${userId}${params}`);
  return response.data;
};

// Analytics APIs
export const getProductionAnalytics = async (userId: string, days?: number): Promise<{ data: ProductionData[] }> => {
  const params = days ? `?days=${days}` : '';
  const response = await api.get(`/analytics/production/${userId}${params}`);
  return response.data;
};

export const getIncomeAnalytics = async (userId: string, days?: number): Promise<{ data: IncomeData[]; total_income: number }> => {
  const params = days ? `?days=${days}` : '';
  const response = await api.get(`/analytics/income/${userId}${params}`);
  return response.data;
};

export const getRecommendations = async (userId: string): Promise<{ recommendations: Recommendation[]; current_production: number }> => {
  const response = await api.get(`/analytics/recommendations/${userId}`);
  return response.data;
};

export const getForecast = async (userId: string): Promise<{ forecast: ForecastData[]; total_forecast_kwh: number }> => {
  const response = await api.get(`/analytics/forecast/${userId}`);
  return response.data;
};

// Market APIs
export const getMarketStats = async (): Promise<MarketStats> => {
  const response = await api.get('/market/stats');
  return response.data;
};

export default api;
