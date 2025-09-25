import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SecureStoreService } from "../utils/secureStore";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUserToken();
  }, []);

  async function checkUserToken() {
    const isAuth = await SecureStoreService.isAuthenticated();
    // Se o usuario esta autenticado, manda pra home. Se nao, login.
    if (isAuth) {
      router.replace("/home" as any);
    } else {
      router.replace("/login" as any);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>My App!</Text>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Verificando se usuário está autenticado...</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
  },
  loadingContainer: {
    marginTop: 20,
  },
});
