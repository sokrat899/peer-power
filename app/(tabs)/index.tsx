import { useRouter } from 'expo-router';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import ListingCard from '../../src/components/ListingCard';
import * as Location from 'expo-location';
import { useEffect } from 'react';

const MOCK_DATA = [
  {
    id: 1,
    host_name: 'Ivan',
    distance_km: 0.8,
    price_per_hour: 5,
    power_kw: 7,
  },
  {
    id: 2,
    host_name: 'Anna',
    distance_km: 1.5,
    price_per_hour: 4.5,
    power_kw: 11,
  },
  {
    id: 3,
    host_name: 'Sergey',
    distance_km: 2.2,
    price_per_hour: 6,
    power_kw: 22,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  // 📍 Геолокация
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Location permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log('Your location:', location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      
      <Text style={styles.title}>Available chargers ⚡</Text>

      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ListingCard
            listing={item}
            onBook={(listing) =>
              router.push({
                pathname: '/booking',
                params: {
                  host_name: listing.host_name,
                  price_per_hour: listing.price_per_hour.toString(),
                  power_kw: listing.power_kw.toString(),
                },
              })
            }
          />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#020617',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 12,
  },
});