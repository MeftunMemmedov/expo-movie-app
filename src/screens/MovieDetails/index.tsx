import { getMovieDetails } from "@/api/helpers/movie";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieSlider from "@/components/MovieSlider";
import NotFound from "@/components/NotFound";
import { main_red, secondary_black } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import useSWR from "swr";
import {
  CastSlider,
  MainInfo,
  TrailerPlayer,
  WatchlistBtn,
} from "./components";

const MovieDetailsScreen = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const scrollY = useRef(new Animated.Value(0)).current;

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 129],
    outputRange: ["rgba(20,20,20,0)", "rgba(20,20,20,0.9)"],
    extrapolate: "clamp",
  });

  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 129],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  const [isTrailerPlayerActive, setIsTrailerPlayerActive] =
    useState<boolean>(false);

  const { data, isLoading, isValidating, error, mutate } = useSWR(
    slug ? `movie/${slug}` : null,
    () => getMovieDetails(slug),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
    },
  );

  const onRefresh = async () => {
    await mutate();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error || !data) return <ErrorMessage text={error} />;

  const { cast, movie, relatedMovies } = data;

  if (!movie) return <NotFound text="Movie not found!" />;
  return (
    <>
      <Animated.View
        style={[styles.movieDetailsHeader, { backgroundColor: headerOpacity }]}
      >
        <Pressable style={styles.headerBackLeft} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Animated.Text
            style={{
              opacity: titleOpacity,
              color: "white",
              fontSize: movie.title.length > 15 ? 12 : 15,
              fontWeight: "bold",
            }}
          >
            {movie.title}
          </Animated.Text>
        </View>
        <View style={{ flex: 3 }}></View>
      </Animated.View>
      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <MainInfo movie={movie} />
        <Container scroll>
          <View style={styles.movieAgeRatingContainer}>
            <Text style={{ fontSize: 20, color: "gray" }}>
              {movie.age_rating}
            </Text>
          </View>
          <View style={styles.movieDetailsInfoDescriptionContainer}>
            <Text style={styles.movieDetailsInfoDescription}>
              {movie.description}
            </Text>
          </View>
          {movie.director && (
            <View style={styles.movieDirectorContainer}>
              <Text
                style={[
                  styles.movieDirectorText,
                  {
                    fontSize: movie.director?.fullName.length > 10 ? 15 : 20,
                  },
                ]}
              >
                Directed by{" "}
                <Text style={{ color: "white" }}>
                  {movie.director.fullName}
                </Text>
              </Text>
            </View>
          )}
          <View style={styles.movieActionBtnsContainer}>
            <WatchlistBtn movieId={movie.id} />
            <Pressable
              style={styles.movieActionBtn}
              onPress={() =>
                setIsTrailerPlayerActive((prevState) => !prevState)
              }
            >
              <Text style={styles.movieActionBtnText}>Watch Trailer</Text>
            </Pressable>
          </View>
          <TrailerPlayer
            url={movie.trailer_url}
            isTrailerPlayerActive={isTrailerPlayerActive}
          />
          <View style={styles.movieDetailsAdditionalInfoList}>
            {/* <View style={styles.movieDetailsAdditionalInfoContainer}>
              <Text style={styles.movieDetailsAdditionalInfo}>
                Directed by:{" "}
                <Text style={styles.movieDetailsAdditionalInfoText}>
                  {movie.director.fullName}
                </Text>
              </Text>
            </View>
            <View style={styles.movieDetailsAdditionalInfoContainer}>
              <Text style={styles.movieDetailsAdditionalInfo}>
                Age Rating:{" "}
                <Text style={styles.movieDetailsAdditionalInfoText}>
                  {movie.age_rating}
                </Text>
              </Text>
            </View> */}
          </View>
          {cast.length > 0 && <CastSlider cast={cast} />}
          <MovieSlider movies={relatedMovies} title="Recommended" />
        </Container>
      </Animated.ScrollView>
    </>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  movieDetailsHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    width: "100%",
    marginHorizontal: "auto",
    paddingHorizontal: 20,
    paddingBottom: 10,
    height: 80,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 30,
  },
  headerBackLeft: { flex: 3 },
  headerTitleContainer: {
    flex: 6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "40%",
  },
  headerTitle: {},
  movieAgeRatingContainer: {
    backgroundColor: secondary_black,
    alignSelf: "flex-start",
    padding: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  movieDetailsInfoDescriptionContainer: {
    backgroundColor: secondary_black,
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  movieDetailsInfoDescription: { color: "white", lineHeight: 20 },
  movieActionBtnsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },
  movieActionBtn: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: main_red,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  movieActionBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: 700,
  },
  movieDirectorContainer: {
    backgroundColor: secondary_black,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 15,
  },
  movieDirectorText: {
    color: "gray",
  },
  movieDetailsAdditionalInfoList: {
    flexDirection: "column",
    gap: 5,
    marginTop: 20,
  },
  movieDetailsAdditionalInfoContainer: {},
  movieDetailsAdditionalInfo: {
    color: "white",
    fontWeight: "bold",
  },
  movieDetailsAdditionalInfoText: {
    color: "white",
    fontWeight: "normal",
  },
});
