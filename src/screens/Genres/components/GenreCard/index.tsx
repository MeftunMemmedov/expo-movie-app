import { secondary_black } from "@/constants/colors";
import { Genre } from "@/types";
import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface Props {
  genre: Genre;
  columns: number;
}

const GenreCard = ({ genre, columns }: Props) => {
  return (
    <View
      style={[
        styles.genreCardContainer,
        {
          width: `${100 / columns}%`,
        },
      ]}
    >
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

export default GenreCard;

const styles = StyleSheet.create({
  genreCardContainer: {
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
