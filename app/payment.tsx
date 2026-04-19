import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const total = Number(params.total);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Card payment 💳</Text>

      <View style={styles.card}>
        <Text style={styles.text}>Card: **** **** **** 4242</Text>
        <Text style={styles.text}>Amount: €{total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          alert('Payment successful 💸');
          router.push('/');
        }}
      >
        <Text style={styles.buttonText}>Pay</Text>
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
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});