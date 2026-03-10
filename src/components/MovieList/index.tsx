import { Movie } from "@/types";
import { View, FlatList, StyleSheet } from "react-native";
import MovieCard from "../MovieCard";
import { getDevice } from "@/helpers/common";

const isTablet = getDevice().tablet;
const columns = isTablet ? 5 : 3;

const MovieList = ({ movies }: { movies: Movie[] }) => {
  return (
    <FlatList
      style={{ marginHorizontal: "auto" }}
      data={movies}
      renderItem={(mov) => (
        <View style={styles.movieCardContainer}>
          <MovieCard movie={mov.item} width={"90%"} />
        </View>
      )}
      keyExtractor={(mov, index) => `mov-${mov.slug}-${index}`}
      numColumns={columns}
    />
  );
};

export default MovieList;

const styles = StyleSheet.create({
  movieCardContainer: {
    aspectRatio: "2/3",
    width: `${100 / columns}%`,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
