import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useStore } from '../src/store/useStore';

export default function TopUpScreen() {
  const router = useRouter();

  const balance = useStore((state) => state.balance);
  const setBalance = useStore((state) => state.setBalance);

  const handleTopUp = (amount: number) => {
    setBalance(balance + amount);
    alert(`Balance topped up by €${amount} 💰`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top up balance 💳</Text>

      <Text style={styles.balance}>
        Current balance: €{balance.toFixed(2)}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTopUp(10)}
      >
        <Text style={styles.buttonText}>+ €10</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTopUp(20)}
      >
        <Text style={styles.buttonText}>+ €20</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTopUp(50)}
      >
        <Text style={styles.buttonText}>+ €50</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>Back</Text>
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
  balance: {
    color: '#10B981',
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E293B',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#10B981',
    fontSize: 16,
  },
  backButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  backText: {
    color: '#64748B',
  },
});