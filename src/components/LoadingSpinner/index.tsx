import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoadingSpinner = () => {
  return (
    <View style={{ paddingVertical: 100 }}>
      <ActivityIndicator size={80} color={"black"} />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({});
