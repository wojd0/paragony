import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="scan/dev"
        options={{
          headerTitle: "Dev Scan Tool",
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
