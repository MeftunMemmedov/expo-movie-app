import { getDataList } from "@/api/helpers";
import Container from "../../components/Container";
import MovieSlider from "@/components/MovieSlider";
import { MOVIES } from "@/data/movie";
import { Movie } from "@/types";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import LoadingSpinner from "@/components/LoadingSpinner";

const Movies = () => {
  const movieSliderContents = [
    { title: "New Releases", genre: "" },
    { title: "Comedy Movies", genre: "Comedy" },
    { title: "Mystery Movies", genre: "Mystery" },
  ];

  const [movieSliderList, setMovieSliderList] = useState<
    Record<string, Movie[]>
  >({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        setIsLoading(true);
        const data: Record<string, Movie[]> = {};
        for (const content of movieSliderContents) {
          data[content.genre] = await getDataList<Movie>("mov_movies", {
            genres: content.genre ? `cs.{${content.genre}}` : undefined,
          });
        }
        setMovieSliderList(data);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };
    getAllMovies();
  }, []);

  if (isLoading) return <LoadingSpinner />;
  return (
    <Container scroll>
      {movieSliderContents.map((content, index) => (
        <MovieSlider
          key={`home-screen-${content.title}-${index}-movies`}
          movies={movieSliderList[content.genre] || []}
          title={content.title}
        />
      ))}
    </Container>
  );
};

export default Movies;
