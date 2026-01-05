/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('evaluations').del();
  
  await knex('evaluations').insert([
    {
      id: '20000000-0000-0000-0000-000000000001',
      user_id: '00000000-0000-0000-0000-000000000002',
      movie_id: '10000000-0000-0000-0000-000000000001',
      rating: 9,
      comment: 'Um clássico absoluto da ficção científica!'
    },
    {
      id: '20000000-0000-0000-0000-000000000002',
      user_id: '00000000-0000-0000-0000-000000000002',
      movie_id: '10000000-0000-0000-0000-000000000002',
      rating: 10,
      comment: 'Mente-bending e visualmente espetacular!'
    },
    {
      id: '20000000-0000-0000-0000-000000000003',
      user_id: '00000000-0000-0000-0000-000000000003',
      movie_id: '10000000-0000-0000-0000-000000000001',
      rating: 8,
      comment: 'Bom filme, mas um pouco complexo.'
    }
  ]);
};

