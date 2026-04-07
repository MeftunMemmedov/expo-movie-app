import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieList from "@/components/MovieList";
import { useAppSelector } from "@/store/hooks";
import { Movie } from "@/types";
import { useLocalSearchParams } from "expo-router";
import useSWR from "swr";

const MoviesByGenreScreen = () => {
  const { slug } = useLocalSearchParams();
  const { genres } = useAppSelector((store) => store.global);

  const currentGenre = genres?.find((genre) => genre.slug === slug);

  const {
    data: movies,
    isLoading,
    isValidating,
    error,
    mutate,
  } = useSWR(
    slug ? `genre/${slug}` : null,
    () =>
      getDataList<Movie>("mov_movies", {
        genres: `cs.{${currentGenre?.title}}`,
      }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const onRefresh = async () => {
    await mutate();
  };

  if (error || !movies) return <ErrorMessage text={error} />;
  return (
    <Container scroll={false}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <MovieList
          isRefreshing={isValidating}
          onRefresh={onRefresh}
          movies={movies}
        />
      )}
    </Container>
  );
};

export default MoviesByGenreScreen;
