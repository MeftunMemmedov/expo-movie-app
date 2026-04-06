import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieList from "@/components/MovieList";
import { useAppSelector } from "@/store/hooks";
import { Movie } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const MoviesByGenre = () => {
  const { slug } = useLocalSearchParams();
  const { genres } = useAppSelector((store) => store.global);

  const currentGenre = genres?.find((genre) => genre.slug === slug);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

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

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getMoviesByGenre();
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    getMoviesByGenre();
  }, []);

  if (error) return <ErrorMessage text={error} />;
  return (
    <Container scroll={false}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <MovieList
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          movies={movies}
        />
      )}
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
