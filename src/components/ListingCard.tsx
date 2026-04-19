import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Charger = {
  id: number;
  host_name?: string;
  distance_km?: number;
  price_per_hour: number;
  power_kw: number;
};

type Props = {
  listing: Charger;
  onBook: (listing: Charger) => void;
};

export default function ListingCard({ listing, onBook }: Props) {
  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.sellerInfo}>

          <View style={styles.avatar}>
            <Ionicons name="car" size={20} color="#10B981" />
          </View>

          <View>
            <Text style={styles.sellerName}>
              {listing.host_name || 'Charger owner'}
            </Text>

            <View style={styles.distanceRow}>
              <Ionicons name="location-outline" size={14} color="#64748B" />
              <Text style={styles.distance}>
                {listing.distance_km?.toFixed(1) || '0.0'} km
              </Text>
            </View>
          </View>

        </View>

        <View style={styles.priceTag}>
          <Text style={styles.priceValue}>
            {listing.price_per_hour.toFixed(2)}
          </Text>
          <Text style={styles.priceUnit}>€/hour</Text>
        </View>

      </View>

      <View style={styles.details}>

        <View style={styles.detailItem}>
          <Ionicons name="flash" size={18} color="#10B981" />
          <Text style={styles.detailLabel}>Power</Text>
          <Text style={styles.detailValue}>
            {listing.power_kw} kW
          </Text>
        </View>

        <View style={styles.detailDivider} />

        <View style={styles.detailItem}>
          <Ionicons name="home" size={18} color="#F59E0B" />
          <Text style={styles.detailLabel}>Type</Text>
          <Text style={styles.detailValue}>Home</Text>
        </View>

      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onBook(listing)}
      >
        <Ionicons name="battery-charging" size={20} color="#FFFFFF" />
        <Text style={styles.buttonText}>Book</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0F172A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellerName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  distanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  distance: {
    color: '#64748B',
    fontSize: 13,
  },
  priceTag: {
    backgroundColor: '#10B981',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  priceValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceUnit: {
    color: '#FFFFFF',
    fontSize: 11,
  },
  details: {
    flexDirection: 'row',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailDivider: {
    width: 1,
    backgroundColor: '#334155',
  },
  detailLabel: {
    color: '#64748B',
    fontSize: 12,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    gap: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});