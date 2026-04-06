import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Movie } from "@/types";
import { useNavigation } from "@react-navigation/native";
import { getDevice } from "@/helpers/common";

const isTablet = getDevice().tablet;

const MainInfo = ({ movie }: { movie: Movie }) => {
  const nav = useNavigation();

  return (
    <>
      <ImageBackground
        source={{ uri: movie?.poster }}
        resizeMode="cover"
        imageStyle={{ width: "100%", height: "100%" }}
        style={{
          aspectRatio: isTablet ? "16/9" : "1/1",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 10,
        }}
      />
      <View style={styles.movieDetilsContainer}>
        <View style={styles.movieDetailsInfoContainer}>
          <LinearGradient
            colors={["rgba(20,20,20,0)", "rgba(20,20,20,0.999)"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.movieDetailsInfoOverlayGradient}
          />
          <View style={styles.movieDetailsInfoInner}>
            <Text style={styles.movieDetailsInfoTitle}>{movie.title}</Text>
            <ScrollView
              horizontal
              style={{
                maxHeight: 30,
              }}
            >
              <Text style={styles.movieDetailsInfoImdbRating}>
                IMDB {movie.rating}
              </Text>
              <MaterialCommunityIcons
                name="star-four-points-small"
                size={20}
                color="white"
                style={{ marginVertical: "auto" }}
              />
              <Text style={styles.movieDetailsInfoYear}>{movie.year}</Text>
              <MaterialCommunityIcons
                name="star-four-points-small"
                size={20}
                color="white"
                style={{ marginVertical: "auto" }}
              />
              <View
                style={{ flexDirection: "row", alignItems: "center",}}
              >
                {movie.genres.map((genre) => (
                  <Text
                    key={`genre-${genre}-of-${movie.title}`}
                    style={styles.movieDetailsInfoGenre}
                  >
                    {genre}
                  </Text>
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </>
  );
};

export default MainInfo;

const styles = StyleSheet.create({
  movieDetilsContainer: {},

  movieDetailsInfoContainer: {
    aspectRatio: isTablet ? "16/9" : "1/1",
    position: "relative",
  },
  movieDetailsInfoOverlayGradient: {
    position: "absolute",
    bottom: 0,
    height: "100%",
    width: "100%",
    zIndex: 20,
  },
  movieDetailsInfoInner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 20,
    paddingHorizontal: 20,
  },
  movieDetailsInfoTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  movieDetailsInfoImdbRating: {
    color: "gold",
    fontWeight: "bold",
    fontSize: 18,
    marginVertical: "auto",
  },
  movieDetailsInfoYear: {
    color: "white",
    marginVertical: "auto",
    fontWeight: 500,
  },
  movieDetailsInfoGenre: {
    // marginVertical: "auto",
    marginRight: 10,
    color: "white",
    fontWeight: "500",
  },
});
