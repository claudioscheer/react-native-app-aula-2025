import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

const IS_AUTHENTICATED_KEY = "USER_TOKEN";

export class SecureStoreService {
  static async isAuthenticated(): Promise<boolean> {
    const token = await SecureStoreService.getItem(IS_AUTHENTICATED_KEY);
    if (!token) {
      return false;
    }
    const decoded = jwtDecode(token);
    const dateNowSeconds = Math.floor(Date.now() / 1000);
    if (decoded.exp || 0 > dateNowSeconds) {
      return true;
    }

    return false;
  }

  static async storeToken(token: string): Promise<void> {
    return SecureStoreService.setItem(IS_AUTHENTICATED_KEY, token);
  }

  static async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(IS_AUTHENTICATED_KEY);
  }

  static async getStoreToken(): Promise<string> {
    const token = await SecureStoreService.getItem(IS_AUTHENTICATED_KEY);
    if (!token) {
      throw Error("O token não existir neste ponto é uma violaçáo!");
    }
    return token;
  }

  static async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      // Poderia mandar este erro para um serviço de analytics.
      console.error(error);
    }
  }

  static async getItem(key: string): Promise<string | null> {
    const item = await SecureStore.getItemAsync(key);
    return item;
  }
}
