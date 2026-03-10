import Auth from "@/components/Auth";
import Container from "@/components/Container";
import MovieCard from "@/components/MovieCard";
import MovieList from "@/components/MovieList";
import { main_red } from "@/constants/colors";
import { MOVIES } from "@/data/movie";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

const Account = () => {
  const isAuth = true;
  return (
    <Container scroll={false}>
      {isAuth ? (
        <View>
          <View style={styles.accountHeader}>
            <View style={styles.accountHeaderInfo}>
              <Text style={styles.accountHeaderName}>Name</Text>
              <Text style={styles.accountHeaderEmail}>Email</Text>
            </View>
            <View style={styles.accountHeaderActions}>
              <Pressable style={styles.accountHeaderLogoutBtn}>
                <Text style={styles.accountHeaderLogoutBtnText}>Log out</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={styles.tabsContainer}>
              <Text style={styles.watchlistTab}>Watchlist</Text>
            </View>
            <MovieList movies={MOVIES} />
          </View>
        </View>
      ) : (
        <Auth />
      )}
    </Container>
  );
};

export default Account;

const styles = StyleSheet.create({
  movieCardContainer: {
    aspectRatio: "2/3",
    width: "33%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  accountHeader: {
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountHeaderInfo: {},
  accountHeaderName: { color: "white" },
  accountHeaderEmail: { color: "white" },
  accountHeaderActions: {},
  accountHeaderLogoutBtn: {
    backgroundColor: main_red,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  accountHeaderLogoutBtnText: { color: "white" },
  tabsContainer: {
    marginTop: 20,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  watchlistTab: {
    fontSize: 20,
    color: "white",
    borderBottomWidth: 2,
    borderBottomColor: main_red,
  },
});
