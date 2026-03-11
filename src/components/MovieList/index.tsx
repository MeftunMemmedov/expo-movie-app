import { Movie } from "@/types";
import { View, FlatList, StyleSheet, Dimensions, Text } from "react-native";
import MovieCard from "../MovieCard";
import { getDevice } from "@/helpers/common";

const isTablet = getDevice().tablet;
const columns = isTablet ? 5 : 3;
const { height } = Dimensions.get("screen");

const MovieList = ({ movies }: { movies: Movie[] }) => {
  if (movies.length == 0)
    return (
      <View
        style={{
          height: height / 1.5,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>
          No movies found
        </Text>
      </View>
    );
  return (
    <FlatList
      style={{
        marginHorizontal: "auto",
        width: "100%",
        minHeight: height,
        marginTop: 20,
      }}
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
