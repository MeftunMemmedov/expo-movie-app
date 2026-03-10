import { Pressable, StyleSheet, Text, View } from "react-native";
import Container from "../Container";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

import { main_black, secondary_black } from "../../constants/colors";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { StackParams } from "@/types";

type Props =
  | { type: "search"; title?: never }
  | { type: "back"; title: string };

const Header = ({ type, title }: Props) => {
  const nav = useNavigation<NavigationProp<StackParams>>();
  return (
    <View style={{ backgroundColor: main_black }}>
      {type == "search" && (
        <View style={[styles.headerContainer, { height: 100 }]}>
          <Pressable
            style={styles.headerSearchBtn}
            onPress={() => nav.navigate("Search")}
          >
            <Text style={styles.headerSearchBtnPlaceholder}>
              Search for movie
            </Text>
            <EvilIcons name="search" size={24} color="gray" />
          </Pressable>
        </View>
      )}
      {type === "back" && (
        <View style={[styles.headerContainer, { height: 80 }]}>
          <View style={styles.headerBack}>
            <Pressable
              style={styles.headerBackLeft}
              onPress={() => nav.goBack()}
            >
              <Ionicons name="chevron-back" size={24} color="gray" />
            </Pressable>
            <View style={styles.headerBackMiddle}>
              <Text style={styles.headerBackScreenTitle}>{title}</Text>
            </View>
            <View style={styles.headerBackRight}></View>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  headerSearchBtn: {
    width: "90%",
    marginHorizontal: "auto",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 45,
    borderRadius: 50,
    backgroundColor: secondary_black,
  },
  headerSearchBtnPlaceholder: {
    color: "gray",
  },
  headerBack: { flexDirection: "row", width: "90%", marginHorizontal: "auto" },
  headerBackLeft: { flex: 3 },
  headerBackMiddle: { flex: 6 },
  headerBackScreenTitle: {
    textAlign: "center",
    margin: "auto",
    color: "white",
  },
  headerBackRight: { flex: 3 },
});
