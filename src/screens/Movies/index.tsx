import Container from "../../components/Container";
import MovieSlider from "@/components/MovieSlider";
import { MOVIES } from "@/data/movie";

const Movies = () => {
  return (
    <Container scroll>
      <MovieSlider movies={MOVIES} title="NEW" />
      <MovieSlider movies={MOVIES} title="NEW" />
      <MovieSlider movies={MOVIES} title="NEW" />
      <MovieSlider movies={MOVIES} title="NEW" />
    </Container>
  );
};

export default Movies;
