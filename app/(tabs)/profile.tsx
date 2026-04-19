import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../../src/store/useStore';

export default function ProfileScreen() {
  const router = useRouter();

  const bookings = useStore((state) => state.bookings);
  const balance = useStore((state) => state.balance ?? 0); // 🔥 FIX
  const rateBooking = useStore((state) => state.rateBooking);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile 👤</Text>

      <Text style={styles.balance}>
        Balance: €{balance.toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.topupButton}
        onPress={() => router.push('/topup')}
      >
        <Text style={styles.topupText}>Top up balance</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>My bookings:</Text>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <Text style={{ color: '#64748B' }}>
            No bookings yet
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>⚡ {item.host_name}</Text>
            <Text style={styles.text}>€{item.price_per_hour}/hour</Text>
            <Text style={styles.text}>{item.power_kw} kW</Text>

            <TouchableOpacity
              style={styles.rateButton}
              onPress={() => rateBooking(item.id, 5)}
            >
              <Text style={styles.rating}>
                ⭐ {item.rating ? item.rating : 'Rate'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#020617',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  balance: {
    color: '#10B981',
    fontSize: 18,
    marginBottom: 12,
  },
  topupButton: {
    backgroundColor: '#1E293B',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  topupText: {
    color: '#10B981',
    fontSize: 16,
  },
  subtitle: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#1E293B',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
  },
  rateButton: {
    marginTop: 8,
  },
  rating: {
    color: '#FFD700',
    fontSize: 16,
  },
});