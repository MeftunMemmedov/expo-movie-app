import { Movie } from "@/types";
import { View, Text, Image, StyleSheet } from "react-native";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <View style={styles.movieCard}>
      <Image source={{ uri: movie.poster }} style={styles.movieCardPoster} />
    </View>
  );
};

export default MovieCard;

export const styles = StyleSheet.create({
  movieCard: {
    width: 100,
    marginRight: 20,
    aspectRatio: "2/3",
    borderRadius: 8,
    overflow: "hidden",
    height: "auto",
  },
  movieCardPoster: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
