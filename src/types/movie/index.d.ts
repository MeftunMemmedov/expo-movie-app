import { Artist, Cast } from "../artist";
import { Genre } from "../genre";
import { WatchListMov } from "../watchlist";

export type Movie = {
  id: string;
  slug: string;
  title: string;
  genres: string[];
  year: string;
  rating: number;
  description: string;
  is_featured: boolean;
  //   type: string;
  trailer_url: string;
  images: string[];
  age_rating: string;
  poster: string;
  poster_bg: string;
  directors: Artist[];
  director: Artist;
  cast: Cast[];
  likes: string[];
  dislikes: string[];
  watchlist: WatchListMov[];
};
