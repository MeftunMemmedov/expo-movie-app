import Container from "@/components/Container";
import SearchInput from "@/components/SearchInput";
import { main_black } from "@/constants/colors";
import { MOVIES } from "@/data/movie";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from "react-native";

const { height } = Dimensions.get("screen");
const Search = () => {
  return (
    <View style={{ backgroundColor: main_black }}>
      <View>
        <SearchInput onChange={() => {}} />
      </View>
      <Container scroll={false}>
        <View style={{ minHeight: height, paddingBottom: 100 }}>
          <FlatList
            data={MOVIES}
            renderItem={(movie) => (
              <View style={styles.resultContainer}>
                <Image
                  source={{ uri: movie.item.poster }}
                  style={styles.resultImage}
                />
                <View style={styles.resultMainInfoContainer}>
                  <Text
                    style={[
                      styles.resultTitle,
                      { fontSize: movie.item.title.length > 22 ? 12 : 14 },
                    ]}
                  >
                    {movie.item.title}
                  </Text>
                  <Text style={styles.resultAgerating}>
                    {movie.item.age_rating}
                  </Text>
                </View>
                <View style={styles.resultAdditionalInfoContainer}>
                  <Text style={styles.resultAdditionalInfoYear}>
                    {movie.item.year}
                  </Text>
                  <Text style={styles.resultAdditionalInfoRating}>
                    {movie.item.rating}
                  </Text>
                </View>
              </View>
            )}
            keyExtractor={(mov, index) => `result-${mov.slug}-${index}`}
          />
        </View>
      </Container>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  resultContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  resultImage: { width: "15%", borderRadius: 10, aspectRatio: "3/5" },
  resultMainInfoContainer: {
    width: "60%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resultTitle: { color: "white", textAlign: "left", paddingLeft: 10 },
  resultAgerating: { color: "gray" },
  resultAdditionalInfoContainer: { width: "25%" },
  resultAdditionalInfoYear: { color: "white", textAlign: "center" },
  resultAdditionalInfoRating: { color: "gold", textAlign: "center" },
});
