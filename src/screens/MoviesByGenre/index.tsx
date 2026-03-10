import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import { GenreStackParams } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MoviesByGenre = ({
  route,
}: NativeStackScreenProps<GenreStackParams, "MoviesByGenre">) => {
  const { slug } = route.params.genre;
  return (
    <Container scroll={false}>
      <MovieList movies={MOVIES} />
    </Container>
  );
};

export default MoviesByGenre;

const styles = StyleSheet.create({
  movieCardContainer: {
    aspectRatio: "2/3",
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
