import { Movie } from "../movie";

export type WatchListMov = {
  id: string;
  movieId: Movie | string;
  movie: Movie;
};
