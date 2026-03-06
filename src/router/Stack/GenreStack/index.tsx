import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Genres, MovieDetails, MoviesByGenre, Search } from "../../../screens";

const Stack = createNativeStackNavigator();

const GenreStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="Genres" component={Genres} />
      <Stack.Screen name="MoviesByGenre" component={MoviesByGenre} />
      <Stack.Screen name="MovieDetails" component={MovieDetails} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default GenreStack;
