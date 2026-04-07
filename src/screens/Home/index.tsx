import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieSlider from "@/components/MovieSlider";
import { Movie } from "@/types";
import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

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
    "loading" | "error" | "success" | "finished" | "refresing"
  >("loading");

  const getAllMovies = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setStatus("loading");
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

  const onRefresh = () => {
    setStatus("refresing");
    getAllMovies(true);
  };

  useEffect(() => {
    getAllMovies();
  }, []);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error") return <ErrorMessage text="An Error Occured" />;
  return (
    <Container scroll={false}>
      <FlatList
        data={movieSliderContents}
        renderItem={(contentItem) => {
          const content = contentItem.item;
          return (
            <MovieSlider
              movies={movieSliderList[content.genre] || []}
              title={content.title}
            />
          );
        }}
        keyExtractor={(content, index) =>
          `home-screen-${content.title}-${index}-movies`
        }
        refreshing={status === "refresing"}
        refreshControl={
          <RefreshControl
            refreshing={status === "refresing"}
            onRefresh={onRefresh}
          />
        }
      />
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
