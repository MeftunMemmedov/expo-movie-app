import { View, Text, ScrollView, StyleSheet, Image } from "react-native";
import React from "react";
import { Movie } from "@/types";
import MovieCard from "../MovieCard";

const MovieSlider = ({ movies, title }: { movies: Movie[]; title: string }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Text style={styles.sliderTitle}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {movies.map((movie, index) => (
          <MovieCard
            movie={movie}
            key={`movie-slide-${Math.random()}-${index}-${movie.slug}`}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MovieSlider;

export const styles = StyleSheet.create({
  sliderTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
  },
});
