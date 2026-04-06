import Container from "@/components/Container";
import { getDevice } from "@/helpers/common";
import { useAppSelector } from "@/store/hooks";
import { FlatList } from "react-native";
import GenreCard from "./components/GenreCard";

const isTablet = getDevice().tablet;
const columns = isTablet ? 4 : 2;

const GenresScreen = () => {
  const { genres } = useAppSelector((store) => store.global);
  return (
    <Container scroll>
      <FlatList
        scrollEnabled={false}
        data={genres}
        renderItem={(genre) => (
          <GenreCard columns={columns} genre={genre.item} />
        )}
        // keyExtractor={(genre, index) => `genre-${genre.slug}-${index}`}
        numColumns={columns}
      />
      {/* <MovieSlider movies={MOVIES} title="Recommended" /> */}
    </Container>
  );
};

export default GenresScreen;
