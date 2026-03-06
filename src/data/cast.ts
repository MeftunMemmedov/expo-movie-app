import { Artist, Cast } from "@/types";
import { faker } from "@faker-js/faker";
import { createRandomMovie } from "./movie";
import { createFakeImage } from "@/helpers/common";
faker.seed(123);

export const createRandomActor = (depth = 0): Artist => {
  return {
    id: "",
    fullName: faker.person.fullName(),
    bio: faker.lorem.paragraph(100),
    starred_in:
      depth < 1
        ? Array.from({ length: 10 }, () => createRandomMovie(depth + 1))
        : [],
    image: createFakeImage(100, 100),
  };
};

export const createRandomCast = (): Cast => {
  return {
    actor: createRandomActor(),
    character: faker.person.middleName(),
  };
};
