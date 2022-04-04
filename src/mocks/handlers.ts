// @ts-nocheck
import { rest } from "msw";
import { db } from "./db";
import coinsData from "./coinsData";

export const handlers = [
  // GET /favs/:id (where "id" is your model's primary key), returns a user by ID;
  // GET /favs, returns all favs (supports pagination);
  // POST /favs, creates a new item;
  // PUT /favs/:id, updates an existing item by ID;
  // DELETE /favs/:id, deletes an existing user by ID;
  ...db.fav.toHandlers("rest"),

  rest.get("/assets", (req, res, ctx) => {
    return res(ctx.json(coinsData));
  })
];
