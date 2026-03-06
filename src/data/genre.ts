import { Genre } from "@/types";
import { faker } from "@faker-js/faker";

faker.seed(12);

export const createRandomGenre = (): Genre => {
  const title = faker.book.genre();
  return {
    title,
    slug: `category-${faker.helpers.slugify(title)}`,
  };
};

export const GENRES: Genre[] = Array.from({ length: 10 }, () => createRandomGenre());
