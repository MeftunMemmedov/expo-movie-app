import { Movie } from "@/types";
import { Link } from "expo-router";
import { DimensionValue, Image, StyleSheet, View } from "react-native";

const MovieCard = ({
  movie,
  marginRight = 0,
  width = "auto",
}: {
  movie: Movie;
  marginRight?: number;
  width?: DimensionValue;
}) => {
  return (
    <View style={[styles.movieCard, { marginRight, width }]}>
      <Link href={`/movies/${movie.slug}`}>
        <Image source={{ uri: movie.poster }} style={styles.movieCardPoster} />
      </Link>
    </View>
  );
};

export default MovieCard;

export const styles = StyleSheet.create({
  movieCard: {
    aspectRatio: "2/3",
    borderRadius: 8,
    height: "auto",
    overflow: "hidden",
  },
  movieCardPoster: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
