import Container from "@/components/Container";
import { secondary_black } from "@/constants/colors";
import { getDevice } from "@/helpers/common";
import { useAppSelector } from "@/store/hooks";
import { Genre } from "@/types";
import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const isTablet = getDevice().tablet;
const columns = isTablet ? 4 : 2;
const GenreCard = ({ genre }: { genre: Genre }) => {
  return (
    <View style={styles.genreCardContainer}>
      <Link
        asChild
        href={{
          pathname: "/genres/[slug]",
          params: { title: genre.title, slug: genre.slug },
        }}
      >
        <Pressable style={styles.genreCard}>
          <Text
            style={[
              styles.genreCardText,
              { fontSize: genre.title.length > 20 ? 11 : 14 },
            ]}
          >
            {genre.title}
          </Text>
        </Pressable>
      </Link>
    </View>
  );
};

const GenresScreen = () => {
  const { genres } = useAppSelector((store) => store.global);
  return (
    <Container scroll>
      <FlatList
        scrollEnabled={false}
        data={genres}
        renderItem={(genre) => <GenreCard genre={genre.item} />}
        // keyExtractor={(genre, index) => `genre-${genre.slug}-${index}`}
        numColumns={columns}
      />
      {/* <MovieSlider movies={MOVIES} title="Recommended" /> */}
    </Container>
  );
};

export default GenresScreen;

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
