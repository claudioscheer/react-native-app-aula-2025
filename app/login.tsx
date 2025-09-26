import { LoginService } from "@/services/login";
import { SecureStoreService } from "@/utils/secureStore";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obrigatorios", "Email e senha sao obrigatorios");
      return;
    }

    try {
      const loginService = new LoginService();
      const login = await loginService.login(email, password);

      await SecureStoreService.storeToken(login.token);
      await AsyncStorage.setItem("userId", login.user.id.toString());
      await AsyncStorage.setItem("userName", login.user.name);
      await AsyncStorage.setItem("userEmail", login.user.email);

      router.replace("/home" as any);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert("Erro login", error?.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          style={styles.input}
          placeholder="Informe seu email"
          autoCorrect={false}
          keyboardType="email-address"
          onChangeText={setEmail}
        />

        <TextInput
          label="Senha"
          mode="outlined"
          value={password}
          style={styles.input}
          placeholder="Informe sua senha"
          autoCorrect={false}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />

        <Button
          style={styles.button}
          mode="contained"
          onPress={() => handleLogin()}
        >
          Login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
  },
  input: {
    marginTop: 8,
  },
  button: {
    marginTop: 16,
  },
});
