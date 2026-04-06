import { secondary_black } from "@/constants/colors";
import { EvilIcons } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  onChange: (text: string) => void;
  inSearch: boolean;
}

const SearchInput = ({ onChange, inSearch = true }: Props) => {
  return (
    <View style={[styles.headerContainer, { height: 100 }]}>
      <TextInput
        style={[
          styles.headerSearchBtn,
          {
            width: inSearch ? "90%" : "100%",
          },
        ]}
        placeholder="Search movie.."
        placeholderTextColor="gray"
        keyboardType="default"
        onChangeText={onChange}
      />
      <EvilIcons
        style={[
          styles.searchIcon,
          {
            right: inSearch ? "10%" : "5%",
          },
        ]}
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
    bottom: 12.5,
  },
  headerSearchBtnPlaceholder: {
    color: "gray",
  },
});
