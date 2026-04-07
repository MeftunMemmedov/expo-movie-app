import Header from "@/components/Header";
import { store } from "@/store";
import { Stack } from "expo-router";
import "react-native-reanimated";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="movies/[slug]"
          options={{ title: "MovieDetails", headerShown: false }}
        />
        <Stack.Screen
          name="search"
          options={{
            title: "Search",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="genres/[slug]"
          options={{
            title: "MoviesByGenre",
            headerShown: true,
            header: ({ route }) => {
              const params = route.params as { title: string; slug: string };
              return <Header type="back" title={`${params.title} movies`} />;
            },
          }}
        />
      </Stack>
    </Provider>
  );
}
