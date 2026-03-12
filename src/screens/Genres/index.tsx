import Container from "@/components/Container";
import MovieSlider from "@/components/MovieSlider";
import { secondary_black } from "@/constants/colors";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import { getDevice } from "@/helpers/common";
import { useAppSelector } from "@/store/hooks";
import { Genre, GenreStackParams } from "@/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";

const isTablet = getDevice().tablet;
const columns = isTablet ? 4 : 2;
const GenreCard = ({
  genre,
  onPress,
}: {
  genre: Genre;
  onPress: () => void;
}) => {
  return (
    <View style={styles.genreCardContainer}>
      <Pressable style={styles.genreCard} onPress={onPress}>
        <Text
          style={[
            styles.genreCardText,
            { fontSize: genre.title.length > 20 ? 11 : 14 },
          ]}
        >
          {genre.title}
        </Text>
      </Pressable>
    </View>
  );
};

const Genres = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<GenreStackParams>;
}) => {
  const { genres } = useAppSelector((store) => store.global);
  return (
    <Container scroll>
      <FlatList
        scrollEnabled={false}
        data={genres}
        renderItem={(genre) => (
          <GenreCard
            genre={genre.item}
            onPress={() =>
              navigation.navigate("MoviesByGenre", { genre: genre.item })
            }
          />
        )}
        // keyExtractor={(genre, index) => `genre-${genre.slug}-${index}`}
        numColumns={columns}
      />
      {/* <MovieSlider movies={MOVIES} title="Recommended" /> */}
    </Container>
  );
};

export default Genres;

const styles = StyleSheet.create({
  genreCardContainer: {
    width: `${100 / columns}%`,
    aspectRatio: "4/2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  genreCard: {
    width: "90%",
    height: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: secondary_black,
  },
  genreCardText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
