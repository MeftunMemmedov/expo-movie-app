import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from "@react-navigation/native-stack";
import { Genres, MovieDetails, MoviesByGenre, Search } from "../../../screens";
import Header from "@/components/Header";
import { Genre, GenreStackParams } from "@/types";

const Stack = createNativeStackNavigator<GenreStackParams>();

const GenreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Genres"
        component={Genres}
        options={{ header: () => <Header type="search" /> }}
      />
      <Stack.Screen
        name="MoviesByGenre"
        component={MoviesByGenre}
        options={{
          header: ({ route }: NativeStackHeaderProps) => {
            const params = route.params as { genre: Genre };
            return <Header type="back" title={params.genre.title} />;
          },
        }}
      />
      <Stack.Screen
        name="MovieDetails"
        component={MovieDetails}
        options={{ headerShown: false }}
        // options={{
        //   header: ({ route }: NativeStackHeaderProps) => {
        //     const params = route.params as { title: string; slug: string };
        //     return <Header type="back" title={params.title} />;
        //   },
        // }}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default GenreStack;
