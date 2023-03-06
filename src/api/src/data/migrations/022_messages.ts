// tbale for inbox messages
exports.up = function (knex) {
  return knex.schema.createTable("messages", table => {
    table.increments("id").primary();
    table.string("title");
    table.string("body");
    table.string("sender");
    table.string("recipient");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};
