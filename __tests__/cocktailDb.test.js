const { run } = require("jest");
const request = require("supertest");
const app = require("../app");

const knex = require("knex");
const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "pick_your_poison_test",
  },
});

afterEach(() => db("cocktails").truncate());

test("should return all cocktails", async () => {
  await db("cocktails").insert([
    {
      name: "Margarita",
      ingredients: "Tequila, Lime juice, Triple sec",
      instructions:
        "Rub the rim of the glass with the lime slice to make the salt stick ...",
    },
    {
      name: "Old Fashioned",
      ingredients:
        "Bourbon or rye whiskey, Angostura bitters, Sugar cube, Orange slice, Cherry",
      instructions:
        "Place sugar cube in an Old Fashioned glass. Wet it down with Angostura bitters and a short splash of water ...",
    },
  ]);

  const response = await request(app).get("/cocktails");

  expect(response.status).toBe(200);
  expect(response.body.length).toBe(2);
  expect(response.body[0].name).toBe("Margarita");
  expect(response.body[1].name).toBe("Old Fashioned");
});
