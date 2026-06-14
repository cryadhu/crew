import { Stack } from 'expo-router';

export default function FeedsLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Feeds', headerShown: false }} />
    </Stack>
  );
}
