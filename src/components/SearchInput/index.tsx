import { secondary_black } from "@/constants/colors";
import { EvilIcons } from "@expo/vector-icons";
import { View, Text, TextInput, StyleSheet } from "react-native";

const SearchInput = ({ onChange }: { onChange: (text:string) => void }) => {
  return (
    <View style={[styles.headerContainer, { height: 80 }]}>
      <TextInput
        style={styles.headerSearchBtn}
        placeholder="Search movie.."
        placeholderTextColor="gray"
        keyboardType="default"
        onChangeText={onChange}
      />
      <EvilIcons
        style={styles.searchIcon}
        name="search"
        size={24}
        color="gray"
      />
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    position: "relative",
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
    color: "white",
  },
  searchIcon: {
    color: "gray",
    position: "absolute",
    right: "10%",
    bottom: 10,
  },
  headerSearchBtnPlaceholder: {
    color: "gray",
  },
});
