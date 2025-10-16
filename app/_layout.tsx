import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";

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
        <Stack.Screen
          name="create-post"
          options={{
            headerTitle: "Novo Post",
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
