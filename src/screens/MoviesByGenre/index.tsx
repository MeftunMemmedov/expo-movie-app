import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import { GenreStackParams } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MoviesByGenre = ({
  route,
  navigation,
}: NativeStackScreenProps<GenreStackParams, "MoviesByGenre">) => {
  const { slug } = route.params.genre;
  return (
    <Container scroll={false}>
      <FlatList
        style={{ marginHorizontal: "auto" }}
        data={MOVIES}
        renderItem={(mov) => (
          <View style={styles.movieCardContainer}>
            <MovieCard movie={mov.item} width={"90%"} />
          </View>
        )}
        keyExtractor={(mov, index) => `genre-${slug}-${mov.slug}-${index}`}
        numColumns={3}
      />
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
