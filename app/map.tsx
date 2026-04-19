import { View, Text, StyleSheet } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Карта скоро появится ⚡
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020617',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});