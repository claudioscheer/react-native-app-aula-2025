import { SecureStoreService } from "@/utils/secureStore";
import { router } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { Alert, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

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
            drawerLabel: "Posts",
            title: "Posts",
            headerRight: () => {
              return (
                <View style={styles.postActions}>
                  <Button icon="plus" mode="text" onPress={() => logout()}>
                    Novo Post
                  </Button>
                  <Button icon="logout" mode="text" onPress={() => logout()}>
                    Sair
                  </Button>
                </View>
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

const styles = StyleSheet.create({
  postActions: {
    flexDirection: "row",
    gap: 2,
  },
});
