import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Link, router } from "expo-router";
import { main_black, secondary_black } from "../../constants/colors";

type Props =
  | { type: "search"; title?: never }
  | { type: "back"; title: string };

const Header = ({ type, title }: Props) => {
  return (
    <View style={{ backgroundColor: main_black }}>
      {type == "search" && (
        <View style={[styles.headerContainer, { height: 100 }]}>
          <Link href="/search" asChild>
            <Pressable style={styles.headerSearchBtn}>
              <Text style={styles.headerSearchBtnPlaceholder}>
                Search for movie
              </Text>
              <EvilIcons name="search" size={24} color="gray" />
            </Pressable>
          </Link>
        </View>
      )}
      {type === "back" && (
        <View style={[styles.headerContainer, { height: 80 }]}>
          <View style={styles.headerBack}>
            <Pressable
              style={styles.headerBackLeft}
              onPress={() => router.back()}
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
