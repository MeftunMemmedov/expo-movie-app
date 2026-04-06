import { getDevice } from "@/helpers/common";
import { Movie } from "@/types";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MovieCard from "../MovieCard";

const isTablet = getDevice().tablet;
const columns = isTablet ? 5 : 3;
const { height } = Dimensions.get("screen");

interface Props {
  movies: Movie[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const MovieList = ({ movies, onRefresh, isRefreshing }: Props) => {
  if (movies.length == 0)
    return (
      <View style={styles.notFoundMessageContainer}>
        <Text style={styles.notFoundMessageText}>No movies found</Text>
      </View>
    );
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing ?? false}
          onRefresh={onRefresh}
        />
      }
      refreshing={isRefreshing}
      style={styles.movieList}
      data={movies}
      renderItem={(mov) => (
        <View style={styles.movieCardContainer}>
          <MovieCard movie={mov.item} width={"90%"} />
        </View>
      )}
      keyExtractor={(mov, index) => `mov-${mov.slug}-${index}`}
      numColumns={columns}
    />
  );
};

export default MovieList;

const styles = StyleSheet.create({
  movieList: {
    marginHorizontal: "auto",
    width: "100%",
    minHeight: height,
    marginTop: 20,
  },
  movieCardContainer: {
    aspectRatio: "2/3",
    width: `${100 / columns}%`,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundMessageContainer: {
    height: height / 1.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundMessageText: { color: "white", fontWeight: "bold", fontSize: 18 },
});
