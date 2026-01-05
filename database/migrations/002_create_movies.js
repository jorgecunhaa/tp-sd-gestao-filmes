/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('filmes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('titulo').notNullable();
    table.integer('ano').notNullable();
    table.string('genero').notNullable();
    table.text('descricao').nullable();
    table.string('realizador').nullable();
    table.integer('duracao').nullable(); // em minutos
    table.timestamps(true, true); // criado_em, atualizado_em
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('filmes');
};

