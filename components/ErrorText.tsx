import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export function ErrorText({ children }: { children: React.ReactNode }) {
  return (
    <Text style={styles.textError} variant="labelMedium">
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  textError: {
    color: "red",
  },
});
