/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('avaliacoes', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('utilizador_id').notNullable();
    table.uuid('filme_id').notNullable();
    table.integer('nota').notNullable(); // Nota de 1 a 10 (validação feita na aplicação)
    table.text('comentario').nullable();
    table.timestamps(true, true); // criado_em, atualizado_em
    
    // Foreign Keys
    table.foreign('utilizador_id').references('id').inTable('utilizadores').onDelete('CASCADE');
    table.foreign('filme_id').references('id').inTable('filmes').onDelete('CASCADE');
    
    // Um utilizador só pode avaliar o mesmo filme uma vez
    table.unique(['utilizador_id', 'filme_id']);
  }).then(() => {
    // Adicionar constraint check usando raw SQL
    return knex.raw('ALTER TABLE avaliacoes ADD CONSTRAINT nota_check CHECK (nota >= 1 AND nota <= 10)');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('avaliacoes');
};

