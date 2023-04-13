module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "pick_your_poison",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
  test: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      password: "",
      database: "pick_your_poison_test",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
