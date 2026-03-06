import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AllMovies, MovieDetails, Movies, Search } from "../../../screens";
import Header from "../../../components/Header";

const Stack = createNativeStackNavigator();

const MovieStack = () => {
  return (
    <Stack.Navigator initialRouteName="Movies">
      <Stack.Screen
        name="Movies"
        component={Movies}
        options={{ header: () => <Header type="search"/> }}
      />
      <Stack.Screen
        name="AllMovies"
        component={AllMovies}
        options={{ header: () => <Header type="search"/> }}
      />
      <Stack.Screen name="MovieDetails" component={MovieDetails}  />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default MovieStack;
