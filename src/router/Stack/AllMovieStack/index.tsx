import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllMovies, MovieDetails, Movies, Search } from "../../../screens";
import { MovieStackParams } from "@/types";

const Stack = createNativeStackNavigator<MovieStackParams>();

const AllMovieStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="AllMovies"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="AllMovies" component={AllMovies} />

      <Stack.Screen name="MovieDetails" component={MovieDetails} />
    </Stack.Navigator>
  );
};

export default AllMovieStack;
