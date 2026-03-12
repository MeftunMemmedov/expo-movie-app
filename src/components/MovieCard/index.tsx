import { Movie, StackParams } from "@/types";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
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
  const { name: routeName } = useRoute();
  const nav = useNavigation<NativeStackNavigationProp<StackParams>>();
  return (
    <Pressable
      style={[styles.movieCard, { marginRight, width }]}
      onPress={() => {
        if (routeName === "MovieDetails") {
          nav.push("MovieDetails", { slug: movie.slug, title: movie.title });
        } else {
          nav.navigate("MovieDetails", {
            slug: movie.slug,
            title: movie.title,
          });
        }
      }}
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
