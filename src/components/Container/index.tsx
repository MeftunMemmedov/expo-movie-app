import { main_black } from "@/constants/colors";
import { ReactNode } from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  StyleProp,
  ViewStyle,
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
    { maxWidth: getMaxWidth(), width: "100%" },
  ];
  if (scroll)
    return <ScrollView style={containerStyles}>{children}</ScrollView>;

  return <View style={containerStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 50,
    backgroundColor: main_black,
  },
});
