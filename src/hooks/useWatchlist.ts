import { main_black, main_red } from "@/constants/colors";
import {
  addToWatchlistAction,
  removeFromWatchlistAction,
} from "@/store/global/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Toast } from "toastify-react-native";

const useWatchlist = () => {
  const dispatch = useAppDispatch();
  const { watchlist, user } = useAppSelector((store) => store.global);

  const inWatchlist = (movieId: string) => {
    return watchlist?.some((mov) => mov.movieId === movieId);
  };

  const addToWatchlist = async (userId: string, movieId: string) => {
    try {
      dispatch(addToWatchlistAction({ userId, movieId }));
    } catch {
      Toast.show({
        type: "error",
        text1: "An error occured while adding watchlist, please try again",
        backgroundColor: "red",
        textColor: "white",
        progressBarColor: main_black,
        iconColor: main_red,
      });
    }
  };

  const removeFromWatchlist = async (userId: string, movieId: string) => {
    try {
      dispatch(removeFromWatchlistAction({ movieId, userId }));
    } catch {
      Toast.show({
        type: "error",
        text1:
          "An error occured while removing from watchlist, please try again",
        backgroundColor: "red",
        textColor: "white",
        progressBarColor: main_black,
        iconColor: main_red,
      });
    }
  };

  const toggleWatchlist = async (movieId: string, userId: string) => {
    if (inWatchlist(movieId)) {
      removeFromWatchlist(userId, movieId);
    } else {
      addToWatchlist(userId, movieId);
    }
  };

  return {
    watchlist,
    inWatchlist,
    toggleWatchlist,
  };
};

export default useWatchlist;
