import { Movie } from "@/types";
import { Link } from "expo-router";
import { DimensionValue, Image, StyleSheet } from "react-native";

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
    <Link
      href={`/movies/${movie.slug}`}
      style={[styles.movieCard, { marginRight, width }]}
    >
      <Image source={{ uri: movie.poster }} style={styles.movieCardPoster} />
    </Link>
  );
};

export default MovieCard;

export const styles = StyleSheet.create({
  movieCard: {
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
