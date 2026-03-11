import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import { useAppSelector } from "@/store/hooks";
import { GenreStackParams, Movie } from "@/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const MoviesByGenre = ({
  route,
}: NativeStackScreenProps<GenreStackParams, "MoviesByGenre">) => {
  const { slug } = route.params.genre;
  const { genres } = useAppSelector((store) => store.global);

  const currentGenre = genres?.find((genre) => genre.slug === slug);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getMoviesByGenre = async () => {
      try {
        setIsLoading(true);
        const moviesByGenre = await getDataList<Movie>("mov_movies", {
          genres: `cs.{${currentGenre?.title}}`,
        });
        setMovies(moviesByGenre);
      } catch {
        setError("An error occured");
      } finally {
        setIsLoading(false);
      }
    };
    getMoviesByGenre();
  }, []);
  return (
    <Container scroll={false}>
      {isLoading ? <LoadingSpinner /> : <MovieList movies={movies} />}
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
