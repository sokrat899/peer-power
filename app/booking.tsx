import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function BookingScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const price = Number(params.price_per_hour);
  const commission = price * 0.2;
  const total = price + commission;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking ⚡</Text>

      <View style={styles.card}>
        <Text style={styles.text}>
          Host: {params.host_name}
        </Text>

        <Text style={styles.text}>
          Price: €{price}/hour
        </Text>

        <Text style={styles.text}>
          Power: {params.power_kw} kW
        </Text>

        <View style={styles.divider} />

        <Text style={styles.text}>
          Commission: €{commission.toFixed(2)}
        </Text>

        <Text style={styles.total}>
          Total: €{total.toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push({
            pathname: '/payment',
            params: {
              host_name: params.host_name,
              price_per_hour: params.price_per_hour,
              power_kw: params.power_kw,
              total: total.toString(),
            },
          });
        }}
      >
        <Text style={styles.buttonText}>
          Proceed to payment
        </Text>
      </TouchableOpacity>
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
  card: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 10,
  },
  total: {
    color: '#10B981',
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});