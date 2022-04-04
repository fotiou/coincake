import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  fav: {
    id: primaryKey(String),
    name: String,
  },
});
