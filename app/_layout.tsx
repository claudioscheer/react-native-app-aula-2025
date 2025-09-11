import { SecureStoreService } from "@/utils/secureStore";
import { router, Stack } from "expo-router";
import { Alert } from "react-native";
import { Button, PaperProvider } from 'react-native-paper';

export default function RootLayout() {

  async function logout() {
    Alert.alert(
      'Sair',
      'Tem certeza que desejas sair?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          style: 'destructive',
          onPress: async () => {
            await SecureStoreService.removeToken();
            router.replace('/login');
          }
        }
      ]

    )
  }

  return (
    <PaperProvider>
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
            headerRight: () => {
              return (
                <Button
                  icon="logout"
                  mode="text"
                  onPress={() => logout()}>
                  Sair
                </Button>

              );
            }
          }}
        />
      </Stack>
    </PaperProvider>
  );
}
