import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
const { height } = Dimensions.get("screen");
const LoadingSpinner = () => {
  return (
    <View style={{ paddingVertical: 100, height }}>
      <ActivityIndicator size={80} color={"black"} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
