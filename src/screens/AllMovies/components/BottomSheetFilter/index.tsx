import { main_red, secondary_black } from "@/constants/colors";
import { useAppSelector } from "@/store/hooks";
import { Picker } from "@react-native-picker/picker";
import React, { Dispatch, SetStateAction } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  haveParams: boolean;
  params: Record<string, string>;
  setParams: Dispatch<SetStateAction<Record<string, string>>>;
  onFilter: () => void;
  onReset: () => void;
}

const BottomSheetFilter = ({
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

  if (!genres) return null;
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Genres</Text>
        <View style={styles.filterByGenreList}>
          {genres.map((genre, index) => (
            <Pressable
              key={`bottom-sheet-genre-${genre.slug}-${index}`}
              style={[
                styles.filterCardContainer,
                {
                  backgroundColor:
                    params["genre"] === genre.title ? "white" : "black",
                },
              ]}
              onPress={() =>
                setParams((prevParams) => ({
                  ...prevParams,
                  genre: genre.title,
                }))
              }
            >
              <Text
                style={[
                  styles.filterCardTitle,
                  {
                    color: params["genre"] === genre.title ? "black" : "white",
                  },
                ]}
              >
                {genre.title}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>Age Rating</Text>
        <View style={styles.filterByAgeRatingList}>
          {["G", "PG", "PG-13", "R", "NC-17"].map((agerating, index) => (
            <Pressable
              style={[
                styles.filterCardContainer,
                {
                  backgroundColor:
                    params["agerating"] === agerating ? "white" : "black",
                },
              ]}
              key={`bottom-sheet-age-rate-${agerating}-${index}`}
              onPress={() =>
                setParams((prevParams) => ({ ...prevParams, agerating }))
              }
            >
              <Text
                style={[
                  styles.filterCardTitle,
                  {
                    color:
                      params["agerating"] === agerating ? "black" : "white",
                  },
                ]}
              >
                {agerating}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.filterContainer}>
        <Text style={styles.filterTitle}>IMDB Rating</Text>
        <View style={styles.filterByAgeRatingList}>
          {Array.from({ length: 10 }).map((_, index) => (
            <Pressable
              style={[
                styles.filterCardContainer,
                {
                  backgroundColor:
                    params["imdb"] === `${index + 1}` ? "white" : "black",
                },
              ]}
              key={`bottom-sheet-imdb-rating-${index}`}
              onPress={() =>
                setParams((prevParams) => ({
                  ...prevParams,
                  imdb: `${index + 1}`,
                }))
              }
            >
              <Text
                style={[
                  styles.filterCardTitle,
                  {
                    color:
                      params["imdb"] === `${index + 1}` ? "black" : "white",
                  },
                ]}
              >{`${index + 1}+`}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={[styles.filterContainer, { paddingRight: 15 }]}>
        <Text style={styles.filterTitle}>Year</Text>
        <View>
          <Picker
            style={{
              color: "white",
              backgroundColor: secondary_black,
            }}
            selectedValue={params["year"] || ""}
            onValueChange={(value) => {
              setParams((prevParams) => ({
                ...prevParams,
                year: value,
              }));
            }}
          >
            <Picker.Item label={"Select year"} value={currentYear} />
            {years.map((option, index) => (
              <Picker.Item
                // style={styles.}
                label={option}
                value={option}
                key={`filter-genre-select-${index}`}
              />
            ))}
          </Picker>
        </View>
      </View>

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
    </View>
  );
};

export default BottomSheetFilter;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 15,
    paddingVertical: 10,
  },
  filterContainer: {
    marginBottom: 30,
  },
  filterTitle: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  filterCardContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  filterCardTitle: {
    // color: "white",
  },
  filterByGenreContainer: {},
  filterByGenreList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  genreContainer: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  genreTitle: { color: "white" },
  filterByAgeRatingContainer: {
    marginBottom: 30,
  },
  filterByAgeRatingList: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  ageRatingContainer: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
  },
  ageRatingTitle: { color: "white" },
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
