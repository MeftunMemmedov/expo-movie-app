import { Movie } from "../movie";

export type Artist = {
  id: string;
  fullName: string;
  bio?: string;
  directed?: Movie[];
  starred_in?: Movie[];
  image: string;
};

export type Cast = {
  actor: Artist;
  character: string;
};
