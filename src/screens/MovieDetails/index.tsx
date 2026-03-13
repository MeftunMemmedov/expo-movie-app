import {
  Animated,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Cast, Movie, MovieStackParams } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Container from "@/components/Container";
import { main_red, secondary_black } from "@/constants/colors";
import MainInfo from "./components/MainInfo";
import CastSlider from "./components/CastSlider";
import MovieSlider from "@/components/MovieSlider";
import { useCallback, useEffect, useRef, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { getMovieDetails } from "@/api/helpers/movie";
import WatchlistBtn from "./components/WatchlistBtn";
import TrailerPlayer from "./components/TrailerPlayer";
import { tabBarStyle } from "@/router/Tabs";
import NotFound from "@/components/NotFound";
import ErrorMessage from "@/components/ErrorMessage";

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

  const [movie, setMovie] = useState<Movie | null>(null);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [cast, setCast] = useState<Cast[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const [isTrailerPlayerActive, setIsTrailerPlayerActive] =
    useState<boolean>(false);

  const getCurrentMovie = async () => {
    try {
      setIsLoading(true);
      const movieData = await getMovieDetails(slug);
      if (!movieData) return;
      const { movie: currentMovie, cast, relatedMovies } = movieData;
      setMovie(currentMovie);
      setCast(cast);
      setRelatedMovies(relatedMovies);
    } catch (error) {
      setError("An error occured");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getCurrentMovie();
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    getCurrentMovie();
  }, []);

  useEffect(() => {
    nav.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      nav.getParent()?.setOptions({
        tabBarStyle: tabBarStyle.tabbar,
      });
    };
  }, [nav]);

  if (isLoading) return <LoadingSpinner />;

  if (!movie) return <NotFound text="Movie not found!" />;
  if (error) return <ErrorMessage text={error} />;
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
        <View style={{ flex: 3 }}></View>
      </Animated.View>
      <Animated.ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <MainInfo movie={movie} />
        <Container scroll={false}>
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

export default MovieDetails;

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
    flex: 3,
    flexDirection: "row",
    justifyContent: "center",
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
