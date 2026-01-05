/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('evaluations', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('user_id').notNullable();
    table.uuid('movie_id').notNullable();
    table.integer('rating').notNullable(); // Nota de 1 a 10 (validação feita na aplicação)
    table.text('comment').nullable();
    table.timestamps(true, true);
    
    // Foreign Keys
    table.foreign('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.foreign('movie_id').references('id').inTable('movies').onDelete('CASCADE');
    
    // Um usuário só pode avaliar o mesmo filme uma vez
    table.unique(['user_id', 'movie_id']);
  }).then(() => {
    // Adicionar constraint check usando raw SQL
    return knex.raw('ALTER TABLE evaluations ADD CONSTRAINT rating_check CHECK (rating >= 1 AND rating <= 10)');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('evaluations');
};

