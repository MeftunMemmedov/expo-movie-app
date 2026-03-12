import { Genre, User, WatchListMov } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  addToWatchlistAction,
  getAuthState,
  getGenreList,
  getWatchlist,
  removeFromWatchlistAction,
} from "./actions";
import { AxiosError } from "axios";

type Status = {
  LOADING: boolean;
  SUCCESS: boolean;
  FAILURE: boolean;
};
const initialStatus: Status = {
  LOADING: false,
  SUCCESS: false,
  FAILURE: false,
};

const LOADING: Status = { LOADING: true, SUCCESS: false, FAILURE: false };
const SUCCESS: Status = { LOADING: false, SUCCESS: true, FAILURE: false };
const FAILURE: Status = { LOADING: true, SUCCESS: false, FAILURE: true };

interface StateProps {
  isBottomTabVisible: boolean;
  genres: Genre[] | null;
  user: User | null;
  watchlist: WatchListMov[] | null;
  status: {
    genre: Status;
    user: Status;
    watchlist: Status;
    watchlistAction: Status;
  };
  error: AxiosError | null;
}

const initialState: StateProps = {
  isBottomTabVisible: true,
  genres: null,
  user: null,
  watchlist: null,
  status: {
    genre: initialStatus,
    user: initialStatus,
    watchlist: initialStatus,
    watchlistAction: initialStatus,
  },
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
    setIsBottomTabVisible: (state, action) => {
      state.isBottomTabVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGenreList.pending, (state) => {
        state.status.genre = { ...LOADING };
      })
      .addCase(getGenreList.fulfilled, (state, { payload }) => {
        state.status.genre = { ...SUCCESS };
        state.genres = payload;
      })
      .addCase(getGenreList.rejected, (state, error) => {
        state.status.genre = { ...FAILURE };
        state.error = error.payload as AxiosError;
      });
    builder
      .addCase(getAuthState.pending, (state) => {
        state.status.user = { ...LOADING };
      })
      .addCase(getAuthState.fulfilled, (state, { payload }) => {
        state.status.user = { ...SUCCESS };
        state.user = payload;
      })
      .addCase(getAuthState.rejected, (state, error) => {
        state.status.user = { ...FAILURE };
        state.error = error.payload as AxiosError;
        state.user = null;
      });
    builder
      .addCase(getWatchlist.pending, (state) => {
        state.status.watchlist = { ...LOADING };
      })
      .addCase(getWatchlist.fulfilled, (state, { payload }) => {
        state.status.watchlist = { ...SUCCESS };
        state.watchlist = payload;
      });
    builder
      .addCase(addToWatchlistAction.pending, (state) => {
        state.status.watchlistAction = { ...LOADING };
      })
      .addCase(addToWatchlistAction.fulfilled, (state, { meta }) => {
        state.status.watchlistAction = { ...SUCCESS };
        if (state.watchlist) {
          state.watchlist = [
            ...state.watchlist,
            { id: "", movieId: meta.arg.movieId },
          ];
        }
      });
    builder
      .addCase(removeFromWatchlistAction.pending, (state) => {
        state.status.watchlistAction = { ...LOADING };
      })
      .addCase(removeFromWatchlistAction.fulfilled, (state, { meta }) => {
        state.status.watchlistAction = { ...SUCCESS };
        if (state.watchlist) {
          const filtered = state.watchlist?.filter(
            (mov) => mov.movieId !== meta.arg.movieId,
          );
          state.watchlist = filtered;
        }
      });
  },
});

export const { clearUser, setIsBottomTabVisible } = globalSlice.actions;
export default globalSlice.reducer;
