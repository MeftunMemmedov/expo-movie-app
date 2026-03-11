import { Cast, Movie } from "@/types";
import { getData, getDataList } from ".";

export const getMovieDetails = async (
  slug: string,
): Promise<{ movie: Movie; cast: Cast[] } | void> => {
  const movie = await getData<Movie>("mov_movies", {
    slug: `eq.${slug}`,
    select: "*,director(*)",
  });

  if (!movie) return;

  const cast = await getDataList<Cast>("mov_cast", {
    movie_id: `eq.${movie.id}`,
    select: "*,actor:artist_id(*)",
  });

  return { movie, cast };
};
