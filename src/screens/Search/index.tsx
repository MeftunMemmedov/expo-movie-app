import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchInput from "@/components/SearchInput";
import { main_black } from "@/constants/colors";
import { Movie } from "@/types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const { height } = Dimensions.get("screen");
const SearchScreen = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedVal, setDebouncedVal] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "finished"
  >("idle");

  const searchInputValue = searchInput.trim();
  const debouncedValue = debouncedVal.trim();

  useEffect(() => {
    if (searchInputValue == "") {
      setResults([]);
      setStatus("idle");
      return;
    }
    const timeOut = setTimeout(() => {
      setDebouncedVal(searchInput);
    }, 500);
    return () => clearTimeout(timeOut);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedValue === "") return;
    const getResults = async () => {
      try {
        const res = await getDataList<Movie>("mov_movies", {
          title: `ilike.%${debouncedValue}%`,
          limit: 5,
        });
        setResults(res);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
    getResults();
  }, [debouncedVal]);
  return (
    <View style={{ backgroundColor: main_black }}>
      <View>
        <SearchInput
          value={searchInputValue}
          inSearch
          onChange={(text) => {
            setStatus("loading");
            setSearchInput(text.trim());
          }}
        />
      </View>
      <Container scroll={false}>
        {searchInputValue.length > 0 && (
          <View>
            <Link
              asChild
              href={{
                pathname: "/allmovies",
                params: { q: searchInputValue },
              }}
            >
              <Text style={{ color: "gray", textAlign: "center" }}>
                All results for{" "}
                <Text style={{ color: "white" }}>{searchInputValue}</Text>
              </Text>
            </Link>
          </View>
        )}
        {status === "idle" ? (
          <View>
            <Text style={{ color: "gray", textAlign: "center" }}>
              Type Something
            </Text>
          </View>
        ) : status === "loading" ? (
          <LoadingSpinner />
        ) : results.length > 0 ? (
          <View style={{ minHeight: height, paddingBottom: 100 }}>
            <FlatList
              keyboardShouldPersistTaps="handled"
              data={results}
              renderItem={(movie) => (
                <Link href={`/movies/${movie.item.slug}`} asChild>
                  <Pressable style={styles.resultContainer}>
                    <Image
                      source={{ uri: movie.item.poster }}
                      style={styles.resultImage}
                    />
                    <View style={styles.resultMainInfoContainer}>
                      <Text
                        style={[
                          styles.resultTitle,
                          { fontSize: movie.item.title.length > 22 ? 12 : 14 },
                        ]}
                      >
                        {movie.item.title}
                      </Text>
                      <Text style={styles.resultAgerating}>
                        {movie.item.age_rating}
                      </Text>
                    </View>
                    <View style={styles.resultAdditionalInfoContainer}>
                      <Text style={styles.resultAdditionalInfoYear}>
                        {movie.item.year}
                      </Text>
                      <Text style={styles.resultAdditionalInfoRating}>
                        {movie.item.rating}
                      </Text>
                    </View>
                  </Pressable>
                </Link>
              )}
              keyExtractor={(mov, index) => `result-${mov.slug}-${index}`}
            />
          </View>
        ) : (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>No movie found</Text>
          </View>
        )}
      </Container>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  resultContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  resultImage: { width: "10%", borderRadius: 5, aspectRatio: "2/3" },
  resultMainInfoContainer: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultTitle: { color: "white", textAlign: "left", paddingLeft: 10 },
  resultAgerating: { color: "gray" },
  resultAdditionalInfoContainer: { width: "30%" },
  resultAdditionalInfoYear: { color: "white", textAlign: "right" },
  resultAdditionalInfoRating: { color: "gold", textAlign: "right" },
  notFoundContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  notFoundText: { fontSize: 20, color: "white", fontWeight: "bold" },
});
