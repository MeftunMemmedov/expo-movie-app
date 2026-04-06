import { main_black, main_red } from "@/constants/colors";
import { View, Text, Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("screen");
const ErrorMessage = ({ text }: { text: string }) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{text}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  errorContainer: {
    height,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: main_black,
  },
  errorText: { fontSize: 30, textAlign: "center", color: main_red },
});
