import { SecureStoreService } from "@/utils/secureStore";
import { router, Stack } from "expo-router";
import { Alert } from "react-native";
import { Button, PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <PaperProvider>
      <StatusBar style="auto" />
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
