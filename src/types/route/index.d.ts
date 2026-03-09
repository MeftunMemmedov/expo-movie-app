import { Genre } from "../genre";

export type StackParams = {
  MovieDetails: { slug: string; title: string };
  Search: undefined;
};

export type GenreStackParams = StackParams & {
  Genres: undefined;
  MoviesByGenre: { genre: Genre };
};
