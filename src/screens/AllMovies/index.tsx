import { getDataList } from "@/api/helpers";
import Container from "@/components/Container";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieList from "@/components/MovieList";
import SearchInput from "@/components/SearchInput";
import { main_black } from "@/constants/colors";
import BottomSheetFilter from "@/screens/AllMovies/components/BottomSheetFilter";
import { Movie } from "@/types";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AllMoviesScreen = () => {
  const { q } = useLocalSearchParams<{ q: string }>();
  const emptyParams = {};
  const [params, setParams] = useState<Record<string, string>>(emptyParams);

  const sheetRef = useRef<BottomSheet>(null);
  const haveParams = Object.keys(params).length > 0;
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const handleSnapExpand = useCallback(() => {
    sheetRef.current?.expand();
  }, []);
  const handleSnapClose = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const [searchInput, setSearchInput] = useState<string>(q || "");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const getMovies = async (reset?: "reset") => {
    let queryParams: Record<string, string> = {};
    if (params.genre) queryParams.genres = `cs.{${params.genre}}`;
    if (params.year) queryParams.year = `eq.${params.year}`;
    if (params.agerating) queryParams.age_rating = `eq.${params.agerating}`;
    if (params.imdb) queryParams.rating = `gte.${params.imdb}`;
    if (searchInput.trim() !== "")
      queryParams.title = `ilike.%${searchInput.trim()}%`;
    if (reset === "reset") {
      queryParams = {};
    }
    try {
      setIsLoading(true);
      const res = await getDataList<Movie>("mov_movies", queryParams);
      setMovies(res);
    } catch {
      setError("An error occured. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getMovies();
    } finally {
      setIsRefreshing(false);
    }
  };

  const onFilter = () => {
    getMovies();
    handleSnapClose();
  };

  const onReset = () => {
    setParams(emptyParams);
    getMovies("reset");
    handleSnapClose();
    setSearchInput("");
  };

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        pressBehavior="close" // overlay'e basınca kapanır
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  useEffect(() => {
    getMovies();
  }, []);

  if (error) return <ErrorMessage text={error} />;

  return (
    <GestureHandlerRootView>
      <Container scroll={false}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <View>
            <SearchInput
              onFilter={onFilter}
              oepnBottomSheet={handleSnapExpand}
              value={searchInput}
              inSearch={false}
              onChange={(text) => {
                setSearchInput(text.trim());
              }}
            />
            <MovieList
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
              movies={movies}
            />
          </View>
        )}
      </Container>
      <BottomSheet
        backgroundStyle={{ backgroundColor: main_black }}
        index={-1}
        backdropComponent={renderBackdrop}
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
      >
        <BottomSheetScrollView
          style={{ height: "100%", backgroundColor: main_black }}
        >
          <BottomSheetFilter
            haveParams={haveParams}
            params={params}
            setParams={setParams}
            onFilter={onFilter}
            onReset={onReset}
          />
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default AllMoviesScreen;
