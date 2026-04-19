import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useStore } from '../store/useStore';

interface HeaderProps {
  title: string;
  showBalance?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, showBalance = false }) => {
  const { user } = useStore();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {showBalance && user && (
        <View style={styles.balanceContainer}>
          <View style={styles.balanceItem}>
            <Ionicons name="flash" size={16} color="#10B981" />
            <Text style={styles.balanceText}>{user.energy_balance.toFixed(1)} кВтч</Text>
          </View>
          <View style={styles.balanceItem}>
            <Ionicons name="wallet" size={16} color="#10B981" />
            <Text style={styles.balanceText}>{user.balance.toFixed(2)} ₽</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#0F172A',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  balanceContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  balanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  balanceText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
});
