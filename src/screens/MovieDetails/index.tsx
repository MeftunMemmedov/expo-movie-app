import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MovieStackParams } from "@/types";
import { MOVIES } from "@/data/movie";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Container from "@/components/Container";
import { main_red, secondary_black } from "@/constants/colors";
import MainInfo from "./components/MainInfo";
import CastSlider from "./components/CastSlider";
import MovieSlider from "@/components/MovieSlider";
import { useRef } from "react";

const MovieDetails = ({
  route,
}: NativeStackScreenProps<MovieStackParams, "MovieDetails">) => {
  const { slug, title } = route.params;
  const nav = useNavigation();

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

  const movie = MOVIES.find((mov) => mov.slug === slug);

  if (!movie)
    return (
      <View>
        <Text>Movie not found!</Text>
      </View>
    );
  return (
    <>
      <Animated.View
        style={[styles.movieDetailsHeader, { backgroundColor: headerOpacity }]}
      >
        <Pressable style={styles.headerBackLeft} onPress={() => nav.goBack()}>
          <Ionicons name="chevron-back" size={30} color="white" />
        </Pressable>
        <View style={styles.headerTitleContainer}>
          <Animated.Text
            style={{
              opacity: titleOpacity,
              color: "white",
              fontSize: 15,
              fontWeight: "bold",
            }}
          >
            {movie.title}
          </Animated.Text>
        </View>
      </Animated.View>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <MainInfo movie={movie} />
        <Container scroll={false}>
          <View style={styles.movieDetailsInfoDescriptionContainer}>
            <Text style={styles.movieDetailsInfoDescription}>
              {movie.description}
            </Text>
          </View>
          <View style={styles.movieActionBtnsContainer}>
            <Pressable style={styles.movieActionBtn}>
              <Text style={styles.movieActionBtnText}>Add to Watchlist</Text>
            </Pressable>
            <Pressable style={styles.movieActionBtn}>
              <Text style={styles.movieActionBtnText}>Watch Trailer</Text>
            </Pressable>
          </View>
          <View style={styles.movieDetailsAdditionalInfoList}>
            <View style={styles.movieDetailsAdditionalInfoContainer}>
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
            </View>
          </View>
          <CastSlider cast={movie.cast} />
          <MovieSlider movies={MOVIES} title="Recommended" />
        </Container>
      </Animated.ScrollView>
    </>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  movieDetailsHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
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
  headerTitleContainer: { flex: 3 },
  headerTitl: {},

  movieDetailsInfoDescriptionContainer: {
    backgroundColor: secondary_black,
    padding: 20,
    borderRadius: 10,
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
  },
  movieActionBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: 700,
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
