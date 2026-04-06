import { main_black, main_red } from "@/constants/colors";
import { View, Text, Dimensions, StyleSheet } from "react-native";
const { height } = Dimensions.get("screen");
const NotFound = ({ text }: { text: string }) => {
  return (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>{text}</Text>
    </View>
  );
};

export default NotFound;

const styles = StyleSheet.create({
  notFoundContainer: {
    height,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: main_black,
  },
  notFoundText: { fontSize: 30, textAlign: "center", color: main_red },
});
