import { Movie, StackParams } from "@/types";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, DimensionValue, Pressable } from "react-native";

const MovieCard = ({
  movie,
  marginRight = 0,
  width = "auto",
}: {
  movie: Movie;
  marginRight?: number;
  width?: DimensionValue;
}) => {
  const nav = useNavigation<NavigationProp<StackParams>>();
  return (
    <Pressable
      style={[styles.movieCard, { marginRight, width }]}
      onPress={() =>
      {
        nav.navigate("MovieDetails", { slug: movie.slug, title: movie.title })
        console.log("PRESS")
      }
      }
    >
      <Image source={{ uri: movie.poster }} style={styles.movieCardPoster} />
    </Pressable>
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
