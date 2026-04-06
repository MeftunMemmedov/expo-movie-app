import { createNewData, deleteData, getDataList } from "@/api/helpers";
import { getUser } from "@/api/helpers/auth";
import { Genre, User, WatchListMov } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const getGenreList = createAsyncThunk(
  "data/getGenreList",
  async (_, thunkAPI) => {
    try {
      const res = await getDataList<Genre>("mov_genres");

      return res;
    } catch (error) {
      const err = error as AxiosError;
      throw thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const getAuthState = createAsyncThunk(
  "auth/getAuthState",
  async (access_token: string, thunkAPI) => {
    try {
      const user = getUser(access_token);
      return user;
    } catch (error) {
      const err = error as AxiosError;
      throw thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const getWatchlist = createAsyncThunk(
  "user/getWatchllist",
  async (user: User, thunkAPI) => {
    try {
      const watchlist = await getDataList<WatchListMov>("mov_watchlist", {
        select: "id,movieId",
        userId: `eq.${user.id}`,
      });
      return watchlist;
    } catch (error) {
      const err = error as AxiosError;
      throw thunkAPI.rejectWithValue(err.response?.data);
    }
  },
);

export const addToWatchlistAction = createAsyncThunk<
  any,
  { userId: string; movieId: string }
>("watchlist/addToWatchlist", async ({ userId, movieId }, thunkAPI) => {
  try {
    await createNewData("mov_watchlist", { userId, movieId });
  } catch (error) {
    const err = error as AxiosError;
    throw thunkAPI.rejectWithValue(err.response?.data);
  }
});

export const removeFromWatchlistAction = createAsyncThunk<
  any,
  { userId: string; movieId: string }
>("watchlist/remvoeFromWatchlist", async ({ userId, movieId }, thunkAPI) => {
  try {
    await deleteData("mov_watchlist", {
      userId: `eq.${userId}`,
      movieId: `eq.${movieId}`,
    });
  } catch (error) {
    const err = error as AxiosError;
    throw thunkAPI.rejectWithValue(err.response?.data);
  }
});
