import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Device } from '../types';

interface DeviceCardProps {
  device: Device;
  onRemove: (deviceId: string) => void;
}

const getDeviceIcon = (type: string): keyof typeof Ionicons.glyphMap => {
  switch (type) {
    case 'solar_panel': return 'sunny';
    case 'battery': return 'battery-charging';
    case 'smart_meter': return 'speedometer';
    case 'ev_charger': return 'car-sport';
    default: return 'hardware-chip';
  }
};

const getDeviceTypeName = (type: string): string => {
  switch (type) {
    case 'solar_panel': return 'Солнечная панель';
    case 'battery': return 'Аккумулятор';
    case 'smart_meter': return 'Смарт-счётчик';
    case 'ev_charger': return 'EV Зарядка';
    default: return 'Устройство';
  }
};

export const DeviceCard: React.FC<DeviceCardProps> = ({ device, onRemove }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={getDeviceIcon(device.device_type)} size={32} color="#10B981" />
      </View>
      
      <View style={styles.info}>
        <Text style={styles.name}>{device.name}</Text>
        <Text style={styles.type}>{getDeviceTypeName(device.device_type)}</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Мощность</Text>
            <Text style={styles.statValue}>{device.capacity_kwh} кВт</Text>
          </View>
          {device.device_type === 'solar_panel' && (
            <View style={styles.stat}>
              <Text style={styles.statLabel}>Производство</Text>
              <Text style={[styles.statValue, styles.productionValue]}>
                {device.current_production.toFixed(1)} кВтч
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.actions}>
        <View style={[styles.statusBadge, device.is_connected && styles.statusConnected]}>
          <View style={[styles.statusDot, device.is_connected && styles.statusDotConnected]} />
          <Text style={styles.statusText}>{device.is_connected ? 'Подключено' : 'Отключено'}</Text>
        </View>
        <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(device.id)}>
          <Ionicons name="trash-outline" size={18} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  type: {
    color: '#64748B',
    fontSize: 13,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  stat: {},
  statLabel: {
    color: '#64748B',
    fontSize: 11,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  productionValue: {
    color: '#10B981',
  },
  actions: {
    alignItems: 'flex-end',
    gap: 10,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0F172A',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusConnected: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748B',
  },
  statusDotConnected: {
    backgroundColor: '#10B981',
  },
  statusText: {
    color: '#94A3B8',
    fontSize: 12,
  },
  removeButton: {
    padding: 8,
  },
});
