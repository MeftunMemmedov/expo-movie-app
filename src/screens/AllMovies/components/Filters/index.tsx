import { main_red, secondary_black } from "@/constants/colors";
import { useAppSelector } from "@/store/hooks";
import { Picker } from "@react-native-picker/picker";
import { Dispatch, SetStateAction } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";

interface Props {
  haveParams: boolean;
  params: Record<string, string>;
  setParams: Dispatch<SetStateAction<Record<string, string>>>;
  onFilter: () => void;
  onReset: () => void;
}

const Filters = ({
  haveParams,
  params,
  setParams,
  onFilter,
  onReset,
}: Props) => {
  const { genres } = useAppSelector((store) => store.global);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => `${1980 + i}`,
  );
  const Filters = [
    {
      key: "genre",
      title: "Select Genre",
      options: genres?.map((genre) => ({
        label: genre.title,
        value: genre.title,
      })),
    },
    {
      key: "agerating",
      title: "Select Age Rating",
      options: ["G", "PG", "PG-13", "R", "NC-17"].map((ageRating) => ({
        label: ageRating,
        value: ageRating,
      })),
    },
    {
      key: "year",
      title: "Select Year",
      options: years.map((year) => ({ label: year, value: year })),
    },

    {
      key: "imdb",
      title: "Select IMDB Rating",
      options: Array.from({ length: 9 }).map((_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    },
  ];
  return (
    <>
      <FlatList
        numColumns={2}
        data={Filters}
        style={{ paddingBottom: 20 }}
        renderItem={(filter) => (
          <View style={styles.pickerContainer}>
            <Picker
              style={{
                color: "white",
                backgroundColor: secondary_black,
              }}
              selectedValue={params[filter.item.key] || ""}
              onValueChange={(value) => {
                setParams((prevParams) => ({
                  ...prevParams,
                  [filter.item.key]: value,
                }));
              }}
            >
              <Picker.Item
                style={styles.pickerOption}
                label={filter.item.title}
                value={""}
              />
              {filter.item.options?.map((option, index) => (
                <Picker.Item
                  style={styles.pickerOption}
                  label={option.label}
                  value={option.value}
                  key={`filter-genre-select-${index}`}
                />
              ))}
            </Picker>
          </View>
        )}
        keyExtractor={(filter, index) => `filter-${filter.title}-${index}`}
      />
      {haveParams && (
        <View style={styles.filterBtnsContainer}>
          <Pressable style={styles.filterBtn} onPress={onFilter}>
            <Text style={styles.filterBtnText}>Filter</Text>
          </Pressable>
          <Pressable style={styles.resetBtn} onPress={onReset}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </Pressable>
        </View>
      )}
    </>
  );
};

export default Filters;

const styles = StyleSheet.create({
  movieCardContainer: {
    aspectRatio: "2/3",
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    padding: 10,
    flex: 1,
    borderRadius: 30,
    overflow: "hidden",
  },
  picker: {
    paddingHorizontal: 20,
  },
  pickerOption: { fontSize: 11, textAlign: "center" },
  filterBtnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  filterBtn: {
    flex: 1,
    height: 40,
    backgroundColor: main_red,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  filterBtnText: { color: "white", textAlign: "center", fontWeight: "bold" },
  resetBtn: {
    flex: 1,
    backgroundColor: "gray",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  resetBtnText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
