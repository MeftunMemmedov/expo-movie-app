import { main_black } from "@/constants/colors";
import { ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
  useWindowDimensions
} from "react-native";

interface Props {
  children: ReactNode;
  scroll: boolean;
}

export default function Container({ children, scroll = true }: Props) {
  const { width } = useWindowDimensions();

  const getMaxWidth = () => {
    if (width >= 1200) return 1140;
    if (width >= 992) return 960;
    if (width >= 768) return 720;
    if (width >= 576) return 540;

    return "100%";
  };

  const containerStyles: StyleProp<ViewStyle> = [
    styles.container,
    { maxWidth: getMaxWidth(), minHeight: "auto", width: "100%" },
  ];

  return (
    <View style={{ backgroundColor: main_black, flex: 1 }}>
      {scroll ? (
        <ScrollView
          style={containerStyles}
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={containerStyles}>{children}</View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: main_black,
  },
});
