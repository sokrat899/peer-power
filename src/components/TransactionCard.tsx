import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Transaction } from '../types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

interface TransactionCardProps {
  transaction: Transaction;
  userId: string;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ transaction, userId }) => {
  const isBuy = transaction.buyer_id === userId;
  const icon = isBuy ? 'arrow-down-circle' : 'arrow-up-circle';
  const iconColor = isBuy ? '#EF4444' : '#10B981';
  const typeText = isBuy ? 'Покупка' : 'Продажа';
  const partnerName = isBuy ? transaction.seller_name : transaction.buyer_name;
  
  const formattedDate = format(new Date(transaction.created_at), 'd MMM, HH:mm', { locale: ru });

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: isBuy ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)' }]}>
        <Ionicons name={icon} size={24} color={iconColor} />
      </View>
      
      <View style={styles.info}>
        <View style={styles.headerRow}>
          <Text style={styles.type}>{typeText}</Text>
          <Text style={[styles.amount, { color: iconColor }]}>
            {isBuy ? '-' : '+'}{transaction.total_price.toFixed(2)} ₽
          </Text>
        </View>
        <Text style={styles.partner}>{partnerName || 'Пользователь'}</Text>
        <View style={styles.detailsRow}>
          <Text style={styles.energy}>{transaction.energy_kwh.toFixed(1)} кВтч</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  type: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  partner: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  energy: {
    color: '#64748B',
    fontSize: 12,
  },
  separator: {
    color: '#64748B',
    marginHorizontal: 6,
  },
  date: {
    color: '#64748B',
    fontSize: 12,
  },
});
