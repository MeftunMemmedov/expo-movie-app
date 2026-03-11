import { Genre } from "../genre";

export type StackParams = {
  MovieDetails: { slug: string; title: string };
  Search: undefined;
};

export type GenreStackParams = StackParams & {
  Genres: undefined;
  MoviesByGenre: { genre: Genre };
};

export type MovieStackParams = StackParams & {
  Movies: undefined;
  AllMovies: undefined;
};

export type AccountStackParams = StackParams & {
  Account: undefined;
};
