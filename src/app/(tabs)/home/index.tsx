import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieSlider from "@/components/MovieSlider";
import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const HomeScreen = () => {
  const movieSliderContents = [
    { title: "New Releases", genre: "" },
    { title: "Comedy Movies", genre: "Comedy" },
    { title: "Mystery Movies", genre: "Mystery" },
  ];

  const [movieSliderList, setMovieSliderList] = useState<
    Record<string, Movie[]>
  >({});
  const [status, setStatus] = useState<
    "loading" | "error" | "success" | "finished"
  >("loading");

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        setStatus("loading");
        const data: Record<string, Movie[]> = {};
        for (const content of movieSliderContents) {
          data[content.genre] = await getDataList<Movie>("mov_movies", {
            genres: content.genre ? `cs.{${content.genre}}` : undefined,
          });
        }
        setMovieSliderList(data);
      } catch {
        setStatus("error");
      } finally {
        setStatus("finished");
      }
    };
    getAllMovies();
  }, []);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error") return <ErrorMessage text="An Error Occured" />;
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

export default HomeScreen;

const styles = StyleSheet.create({});
