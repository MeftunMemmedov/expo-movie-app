import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AccountStack, AllMovieStack, GenreStack, MovieStack } from "../Stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { main_red, secondary_black } from "../../constants/colors";
import { StyleSheet } from "react-native";
import { useAppSelector } from "@/store/hooks";

const Tabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  const { isBottomTabVisible } = useAppSelector((store) => store.global);
  return (
    <Tabs.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [tabBarStyle.tabbar],
      }}
    >
      <Tabs.Screen
        name="MovieStack"
        component={MovieStack}
        options={{
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
        name="GenreStack"
        component={GenreStack}
        options={{
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
        name="AllMoviesStack"
        component={AllMovieStack}
        options={{
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
        name="AccountStack"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome
              name="user"
              size={24}
              color={focused ? main_red : "white"}
            />
          ),
        }}
      />
    </Tabs.Navigator>
  );
};

export default BottomTabsNavigator;

export const tabBarStyle = StyleSheet.create({
  tabbar: {
    backgroundColor: secondary_black,
    paddingTop: 10,
    borderTopWidth: 0.3,
    borderColor: "red",
    height: 80,
  },
});
