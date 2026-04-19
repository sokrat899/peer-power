import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0F172A' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="booking" />
      <Stack.Screen name="payment" />
      <Stack.Screen name="topup" />
    </Stack>
  );
}