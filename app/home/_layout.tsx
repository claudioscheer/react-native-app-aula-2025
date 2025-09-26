import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Button } from "react-native-paper";
import { Alert } from "react-native";
import { SecureStoreService } from "@/utils/secureStore";
import { router } from "expo-router";

export default function Layout() {
  async function logout() {
    Alert.alert("Sair", "Tem certeza que desejas sair?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: async () => {
          await SecureStoreService.removeToken();
          router.replace("/login");
        },
      },
    ]);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Home",
            headerRight: () => {
              return (
                <Button icon="logout" mode="text" onPress={() => logout()}>
                  Sair
                </Button>
              );
            },
          }}
        />

        <Drawer.Screen
          name="profile"
          options={{
            title: "Profile",
            drawerLabel: "Profile",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
