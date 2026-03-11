import { NavigationContainer } from "@react-navigation/native";
import BottomTabsNavigator from "./Tabs";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  getAuthState,
  getGenreList,
  getWatchlist,
} from "@/store/global/actions";
import { getAuth } from "@/helpers/auth";

const AppRouter = () => {
  const dispatch = useAppDispatch();
  const { genres, user, watchlist } = useAppSelector((store) => store.global);

  const checkAuthStateandGet = async () => {
    const auth = await getAuth();
    if (!auth && !auth?.access) return;
    dispatch(getAuthState(auth?.access));
  };

  useEffect(() => {
    if (genres == null) {
      dispatch(getGenreList());
    }
  }, [genres]);

  useEffect(() => {
    if (user == null) {
      checkAuthStateandGet();
    }
  }, [user]);

  useEffect(() => {
    if (watchlist == null && user) {
      dispatch(getWatchlist(user));
    }
  }, [watchlist, user]);
  return (
    <NavigationContainer>
      <BottomTabsNavigator />
    </NavigationContainer>
  );
};

export default AppRouter;
