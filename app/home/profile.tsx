import { useEffect, useState } from "react";
import { RefreshControl, ScrollView, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";

const API_URL = "https://randomuser.me/api/";
type User = {
  results: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    email: string;
  }[];
};

export default function ProfileScreen() {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRandomUser();
  }, []);

  async function fetchRandomUser() {
    setLoading(true);

    const response = await fetch(API_URL);
    const user: User = await response.json();

    setUser(user);
    setLoading(false);
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={fetchRandomUser} />
      }
    >
      <Text style={styles.name}>{user?.results[0].name.first}</Text>
      <Text style={styles.name}>{user?.results[0].name.last}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  name: {
    fontSize: 32,
  },
});
