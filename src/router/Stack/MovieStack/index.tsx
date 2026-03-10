import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { AllMovies, MovieDetails, Movies, Search } from "../../../screens";
import Header from "../../../components/Header";
import { MovieStackParams } from "@/types";

const Stack = createNativeStackNavigator<MovieStackParams>();

const MovieStack = () => {
  return (
    <Stack.Navigator initialRouteName="Movies">
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{ header: () => <Header type="search" /> }}
      />
      {/* <Stack.Screen
        name="AllMovies"
        component={AllMovies}
        options={{ header: () => <Header type="search" /> }}
      /> */}
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MovieStack;
