import { Movie } from "@/types";
import { faker } from "@faker-js/faker";
import { createRandomCast } from "./cast";
import { createRandomGenre } from "./genre";
import { createFakeImage } from "@/helpers/common";

faker.seed(123);
export const createRandomMovie = (depth = 0): Movie => {
  return {
    id: "",
    slug: "",
    is_featured: faker.datatype.boolean({ probability: 5 }),
    title: faker.book.title(),
    genres:
      depth < 1
        ? Array.from({ length: 3 }, () => createRandomGenre().title)
        : [],
    year: "2020",
    rating: +faker.number.binary({ min: 1, max: 8 }),
    description: faker.lorem.paragraph(5),
    trailer_url: "https://www.youtube.com/watch?v=y4ZBSzYUTL0",

    images:
      depth < 1
        ? Array.from({ length: 10 }, () => createFakeImage(500, 300))
        : [],
    age_rating: faker.helpers.arrayElement(["U", "PG", "15", "18", "R18"]),
    poster: createFakeImage(300, 500),
    poster_bg: createFakeImage(1920, 1080),
    director: {
      fullName: "director",
      id: "1",
      image: createFakeImage(100, 100),
    },
    directors: Array.from({ length: 2 }, () => ({
      id: "",
      fullName: faker.book.author(),
      bio: faker.lorem.paragraph(10),
      directed:
        depth < 1
          ? Array.from({ length: 10 }, () => createRandomMovie(depth + 1))
          : [],
      image: createFakeImage(100, 100),
    })),
    cast: depth < 1 ? Array.from({ length: 20 }, () => createRandomCast()) : [],
    likes: ["user1", "user2"],
    dislikes: ["user1", "user2"],
    watchlist: [],
  };
};

export const MOVIES: Movie[] = Array.from({ length: 10 }, () =>
  createRandomMovie(),
);
