import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Account, AllMovies } from "../../screens";
import { AllMovieStack, GenreStack, MovieStack } from "../Stack";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { main_red, secondary_black } from "../../constants/colors";
import { StyleSheet } from "react-native";

const Tabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tabs.Navigator
      backBehavior="history"
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: styles.tabbar,
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
        name="Account"
        component={Account}
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

export const styles = StyleSheet.create({
  tabbar: {
    backgroundColor: secondary_black,
    paddingTop: 10,
    borderTopWidth: 0.3,
    borderColor: "red",
    height: 80,
  },
});
