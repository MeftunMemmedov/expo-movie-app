import Header from "@/components/Header";
import { main_red, secondary_black } from "@/constants/colors";
import { getGenreList, getWatchlist } from "@/store/global/actions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useEffect } from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  const dispatch = useAppDispatch();
  const { genres, user, watchlist } = useAppSelector((store) => store.global);

  // const checkAuthStateandGet = async () => {
  //   const auth = await getAuth();
  //   if (!auth && !auth?.access) return;
  //   dispatch(getAuthState(auth?.access));
  // };

  useEffect(() => {
    if (genres == null) {
      dispatch(getGenreList());
    }
  }, [genres]);

  // useEffect(() => {
  //   if (user == null) {
  //     checkAuthStateandGet();
  //   }
  // }, [user]);

  useEffect(() => {
    if (watchlist == null && user) {
      dispatch(getWatchlist(user));
    }
  }, [watchlist, user]);
  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [tabBarStyle.tabbar],
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "home",
          header: () => <Header type="search" />,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="movie-roll"
              size={24}
              color={focused ? main_red : "white"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="genres/index"
        options={{
          header: () => <Header type="search" />,
          title: "Movies",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="movie-open-settings"
              size={24}
              color={focused ? main_red : "white"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="allmovies/index"
        options={{
          title: "All Movies",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="movie-filter"
              size={24}
              color={focused ? main_red : "white"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="auth/index"
        options={{
          title: "Auth",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? main_red : "white"}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;

const tabBarStyle = StyleSheet.create({
  tabbar: {
    backgroundColor: secondary_black,
    paddingTop: 10,
    borderTopWidth: 0.3,
    borderColor: "red",
    height: 80,
  },
});
