import { FlatList, StyleSheet } from "react-native";
import Container from "@/components/Container";
import { Picker } from "@react-native-picker/picker";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import SearchInput from "@/components/SearchInput";
import MovieList from "@/components/MovieList";
import { getDevice } from "@/helpers/common";


const AllMovies = () => {
  const params: Record<string, string> = {};
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => `${1900 + i}`,
  );

  const Filters = [
    {
      key: "genre",
      title: "--Select Genre--",
      selectedValue: "",
      options: GENRES.map((genre) => ({
        label: genre.title,
        value: genre.title,
      })),
    },
    {
      key: "agerating",
      title: "--Select Age Rating--",
      selectedValue: "",
      options: ["R", "PG"].map((ageRating) => ({
        label: ageRating,
        value: ageRating,
      })),
    },
    {
      key: "year",
      title: "--Select Year--",
      selectedValue: "",
      options: years.map((year) => ({ label: year, value: year })),
    },
    {
      key: "imdb",
      title: "--Select IMDB Rating--",
      selectedValue: "",
      options: Array.from({ length: 9 }).map((_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    },
  ];
  return (
    <Container scroll={false}>
      <SearchInput onChange={() => {}} />
      <FlatList
        numColumns={2}
        data={Filters}
        style={{ paddingBottom: 20 }}
        renderItem={(filter) => (
          <Picker
            style={{ color: "white", flex: 1 }}
            selectedValue={"value2"}
            onValueChange={(value) => {
              params[filter.item.key] = value;
              console.log(params);
            }}
          >
            <Picker.Item
              style={styles.pickerOption}
              label={filter.item.title}
              value={""}
            />
            {filter.item.options.map((option, index) => (
              <Picker.Item
                style={styles.pickerOption}
                label={option.label}
                value={option.value}
                key={`filter-genre-select-${index}`}
              />
            ))}
          </Picker>
        )}
        keyExtractor={(filter, index) => `filter-${filter.title}-${index}`}
      />
      <MovieList movies={MOVIES} />
    </Container>
  );
};

export default AllMovies;

const styles = StyleSheet.create({
  movieCardContainer: {
    aspectRatio: "2/3",
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  picker: {},
  pickerOption: { fontSize: 11, textAlign: "center" },
});
