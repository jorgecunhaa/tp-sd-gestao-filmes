/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('utilizadores', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('email').unique().notNullable();
    table.string('senha').notNullable(); // SHA-256 encrypted
    table.enum('papel', ['View', 'Edit', 'Admin']).defaultTo('View').notNullable();
    table.timestamps(true, true); // criado_em, atualizado_em
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('utilizadores');
};

