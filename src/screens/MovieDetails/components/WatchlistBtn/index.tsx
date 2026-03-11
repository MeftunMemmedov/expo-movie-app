import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import useWatchlist from "@/hooks/useWatchlist";
import { main_red } from "@/constants/colors";

const WatchlistBtn = ({ movieId }: { movieId: string }) => {
  const {
    user,
    status: {
      watchlistAction: { LOADING: isWatchlistActionLoading },
    },
  } = useAppSelector((store) => store.global);

  const { inWatchlist, toggleWatchlist } = useWatchlist();
  const isMovInWatchlist = inWatchlist(movieId);

  if (!user) return null;
  return (
    <Pressable
      disabled={isWatchlistActionLoading}
      style={styles.movieActionBtn}
      onPress={() => toggleWatchlist(movieId, user.id)}
    >
      {isWatchlistActionLoading ? (
        <ActivityIndicator size={10} color={"black"} />
      ) : (
        <Text style={styles.movieActionBtnText}>
          {isMovInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </Text>
      )}
    </Pressable>
  );
};

export default WatchlistBtn;

const styles = StyleSheet.create({
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
});
