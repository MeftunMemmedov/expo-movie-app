import { View } from "react-native";
import Container from "@/components/Container";
import SearchInput from "@/components/SearchInput";
import MovieList from "@/components/MovieList";
import { useEffect, useState } from "react";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import Filters from "./components/Filters";

const AllMovies = () => {
  const emptyParams = {};
  const [params, setParams] = useState<Record<string, string>>(emptyParams);

  const [searchInput, setSearchInput] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getMovies = async (reset?: "reset") => {
    let queryParams: Record<string, string> = {};
    if (params.genre) queryParams.genres = `cs.{${params.genre}}`;
    if (params.year) queryParams.year = `eq.${params.year}`;
    if (params.agerating) queryParams.age_rating = `eq.${params.agerating}`;
    if (params.imdb) queryParams.rating = `gte.${params.imdb}`;
    if (searchInput !== "") queryParams.title = `ilike.%${searchInput.trim()}%`;
    if (reset === "reset") {
      queryParams = {};
    }
    try {
      setIsLoading(true);
      const res = await getDataList<Movie>("mov_movies", queryParams);
      setMovies(res);
    } catch {
      setError("An error occured. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getMovies();
    } finally {
      setIsRefreshing(false);
    }
  };

  const onFilter = () => {
    getMovies();
  };

  const onReset = () => {
    setParams(emptyParams);
    getMovies("reset");
  };

  const haveParams = Object.keys(params).length > 0;

  useEffect(() => {
    getMovies();
  }, []);

  if (error) return <ErrorMessage text={error} />;

  return (
    <Container scroll={false}>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <View>
          <SearchInput
            inSearch={false}
            onChange={(text) => {
              setSearchInput(text);
            }}
          />
          <Filters
            haveParams={haveParams}
            params={params}
            setParams={setParams}
            onFilter={onFilter}
            onReset={onReset}
          />
          <MovieList
            isRefreshing={isRefreshing}
            onRefresh={onRefresh}
            movies={movies}
          />
        </View>
      )}
    </Container>
  );
};

export default AllMovies;
