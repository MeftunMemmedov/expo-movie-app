import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Container from "@/components/Container";
import { Picker } from "@react-native-picker/picker";
import { GENRES } from "@/data/genre";
import SearchInput from "@/components/SearchInput";
import MovieList from "@/components/MovieList";
import { useEffect, useState } from "react";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import { main_red, secondary_black } from "@/constants/colors";
import { useAppSelector } from "@/store/hooks";

const AllMovies = () => {
  const { genres } = useAppSelector((store) => store.global);
  const emptyParams = {};
  const [params, setParams] = useState<Record<string, string>>(emptyParams);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1980 + 1 },
    (_, i) => `${1980 + i}`,
  );

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const Filters = [
    {
      key: "genre",
      title: "--Select Genre--",
      options: genres?.map((genre) => ({
        label: genre.title,
        value: genre.title,
      })),
    },
    {
      key: "agerating",
      title: "--Select Age Rating--",
      options: ["G", "PG", "PG-13", "R", "NC-17"].map((ageRating) => ({
        label: ageRating,
        value: ageRating,
      })),
    },
    {
      key: "year",
      title: "--Select Year--",
      options: years.map((year) => ({ label: year, value: year })),
    },

    {
      key: "imdb",
      title: "--Select IMDB Rating--",
      options: Array.from({ length: 9 }).map((_, i) => ({
        label: `${i + 1}`,
        value: `${i + 1}`,
      })),
    },
  ];

  const getMovies = async (reset?: "reset") => {
    let queryParams: Record<string, string> = {};
    if (params.genre) queryParams.genres = `cs.{${params.genre}}`;
    if (params.year) queryParams.year = `eq.${params.year}`;
    if (params.agerating) queryParams.age_rating = `eq.${params.agerating}`;
    if (params.imdb) queryParams.rating = `gte.${params.imdb}`;
    if (reset === "reset") {
      queryParams = {};
      setIsFiltered(false);
    }
    try {
      setIsLoading(true);
      const res = await getDataList<Movie>("mov_movies", queryParams);
      setMovies(res);
    } catch {
      setError("An error occured. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  if (error)
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );

  return (
    <Container scroll={false}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View>
          <SearchInput onChange={() => {}} />
          <FlatList
            numColumns={2}
            data={Filters}
            style={{ paddingBottom: 20 }}
            renderItem={(filter) => (
              <View
                style={{
                  padding: 10,
                  flex: 1,
                  borderRadius: 30,
                  overflow: "hidden",
                }}
              >
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
          <View style={styles.filterBtnsContainer}>
            <Pressable
              style={styles.filterBtn}
              onPress={() => {
                getMovies();
                setIsFiltered(true);
              }}
            >
              <Text style={styles.filterBtnText}>Filter</Text>
            </Pressable>
            {isFiltered && (
              <Pressable
                style={styles.resetBtn}
                onPress={() => {
                  setParams({});
                  getMovies("reset");
                }}
              >
                <Text style={styles.resetBtnText}>Reset</Text>
              </Pressable>
            )}
          </View>
          <MovieList movies={movies} />
        </View>
      )}
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
