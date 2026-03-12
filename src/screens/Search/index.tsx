import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import LoadingSpinner from "@/components/LoadingSpinner";
import SearchInput from "@/components/SearchInput";
import { main_black } from "@/constants/colors";
import { MOVIES } from "@/data/movie";
import { Movie, StackParams } from "@/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  Pressable,
} from "react-native";

const { height } = Dimensions.get("screen");
const Search = () => {
  const nav = useNavigation<NavigationProp<StackParams>>();

  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedVal, setDebouncedVal] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "finished"
  >("idle");

  useEffect(() => {
    if (searchInput == "") return;
    setTimeout(() => {
      setDebouncedVal(searchInput);
    }, 500);
  }, [searchInput]);

  useEffect(() => {
    if (debouncedVal === "") return;
    const getResults = async () => {
      try {
        const res = await getDataList<Movie>("mov_movies", {
          title: `ilike.%${debouncedVal.trim()}%`,
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
          onChange={(text) => {
            setStatus("loading");
            setSearchInput(text);
          }}
        />
      </View>
      <Container scroll={false}>
        {status === "loading" ? (
          <LoadingSpinner />
        ) : results.length > 0 ? (
          <View style={{ minHeight: height, paddingBottom: 100 }}>
            <FlatList
              data={results}
              renderItem={(movie) => (
                <Pressable
                  onPress={() =>
                    nav.navigate("MovieDetails", {
                      slug: movie.item.slug,
                      title: movie.item.title,
                    })
                  }
                  style={styles.resultContainer}
                >
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

export default Search;

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
