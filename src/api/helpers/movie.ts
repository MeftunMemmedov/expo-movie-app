import { Cast, Movie } from "@/types";
import { getData, getDataList } from ".";

export const getMovieDetails = async (
  slug: string,
): Promise<{ movie: Movie; cast: Cast[]; relatedMovies: Movie[] } | void> => {
  const movie = await getData<Movie>("mov_movies", {
    slug: `eq.${slug}`,
    select: "*,director(fullName,id,image)",
  });

  if (!movie) return;

  const cast = await getDataList<Cast>("mov_cast", {
    movie_id: `eq.${movie.id}`,
    select: "*,actor:artist_id(*)",
  });
  const relatedMovies = await getDataList<Movie>("mov_movies", {
    genres: `cs.{${movie.genres.slice(0, 2).join(",")}}`,
    slug: `neq.${slug}`,
  });
  return { movie, cast, relatedMovies };
};
