import { Movie } from "@/types";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "../MovieCard";

const MovieSlider = ({ movies, title }: { movies: Movie[]; title: string }) => {
  if (!movies || movies.length === 0) return null;
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={styles.sliderTitle}>{title}</Text>
      <FlatList
        data={movies}
        renderItem={(mov) => (
          <MovieCard movie={mov.item} marginRight={20} width={120} />
        )}
        keyExtractor={(mov, index) =>
          `movie-slide-${Math.random()}-${index}-${mov.slug}`
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieSlider;

export const styles = StyleSheet.create({
  sliderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
});
