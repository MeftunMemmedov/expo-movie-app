import { secondary_black } from "@/constants/colors";
import { EvilIcons } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface Props {
  onFilter?: () => void;
  onChange: (text: string) => void;
  inSearch: boolean;
  value: string;
  oepnBottomSheet?: () => void;
}

const SearchInput = ({
  onFilter,
  onChange,
  inSearch = true,
  value,
  oepnBottomSheet,
}: Props) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  return (
    <View style={[styles.headerContainer, { height: 100 }]}>
      <TextInput
        style={[
          styles.headerSearchBtn,
          {
            width: inSearch ? "90%" : "100%",
          },
        ]}
        value={value}
        placeholder="Search movie.."
        placeholderTextColor="gray"
        keyboardType="default"
        onChangeText={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {inSearch ? (
        <EvilIcons
          style={styles.searchIcon}
          name="search"
          size={24}
          color="gray"
        />
      ) : value.trim().length > 0 && isFocused ? (
        <Pressable onPress={onFilter} style={styles.filterSheetBtn}>
          <EvilIcons name="search" size={20} color="gray" />
        </Pressable>
      ) : (
        <Pressable onPress={oepnBottomSheet} style={styles.filterSheetBtn}>
          <Ionicons name="filter-sharp" size={20} color="gray" />
        </Pressable>
      )}
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
    right: "10%",
  },
  filterSheetBtn: {
    color: "gray",
    position: "absolute",
    height: 45,
    width: 45,
    bottom: 0,
    right: "3%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerSearchBtnPlaceholder: {
    color: "gray",
  },
});
