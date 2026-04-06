import { main_black, main_red } from "@/constants/colors";
import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
const { height } = Dimensions.get("screen");

const LoadingSpinner = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={80} color={main_red} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  loadingContainer: {
    paddingVertical: 200,
    height,
    backgroundColor: main_black,
  },
});
