import { getDataList } from "@/api/helpers";
import Auth from "@/components/Auth";
import Container from "@/components/Container";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieList from "@/components/MovieList";
import { main_red } from "@/constants/colors";
import { clearUser } from "@/store/global";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { WatchListMov } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const Account = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.global);

  const [watchlist, setWatchlist] = useState<WatchListMov[]>([]);
  const [isWatchlistLoading, setIsWatchlistLoading] = useState<boolean>(false);
  const logout = async () => {
    await AsyncStorage.removeItem("auth");
    dispatch(clearUser());
  };

  const getWatchlist = async () => {
    try {
      setIsWatchlistLoading(true);
      const watchlist = await getDataList<WatchListMov>("mov_watchlist", {
        select: "id,movieId,movie:movieId(*)",
        userId: `eq.${user?.id}`,
      });
      setWatchlist(watchlist);
    } catch {
    } finally {
      setIsWatchlistLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!user) return;
      getWatchlist();
    }, [user]),
  );
  return (
    <Container scroll={false}>
      {user ? (
        <View>
          <View style={styles.accountHeader}>
            <View style={styles.accountHeaderInfo}>
              <Text style={styles.accountHeaderName}>
                {user.user_metadata.username}
              </Text>
              <Text style={styles.accountHeaderEmail}>
                {user.user_metadata.email}
              </Text>
            </View>
            <View style={styles.accountHeaderActions}>
              <Pressable style={styles.accountHeaderLogoutBtn} onPress={logout}>
                <Text style={styles.accountHeaderLogoutBtnText}>Log out</Text>
              </Pressable>
            </View>
          </View>
          <View>
            <View style={styles.tabsContainer}>
              <Text style={styles.watchlistTab}>Watchlist</Text>
            </View>
            {isWatchlistLoading ? (
              <LoadingSpinner />
            ) : (
              <MovieList movies={watchlist.map((wm) => wm.movie!)} />
            )}
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
