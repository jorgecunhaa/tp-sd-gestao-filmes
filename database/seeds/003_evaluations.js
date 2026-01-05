/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('avaliacoes').del();
  
  await knex('avaliacoes').insert([
    {
      id: '20000000-0000-0000-0000-000000000001',
      utilizador_id: '00000000-0000-0000-0000-000000000002',
      filme_id: '10000000-0000-0000-0000-000000000001',
      nota: 9,
      comentario: 'Um clássico absoluto da ficção científica!'
    },
    {
      id: '20000000-0000-0000-0000-000000000002',
      utilizador_id: '00000000-0000-0000-0000-000000000002',
      filme_id: '10000000-0000-0000-0000-000000000002',
      nota: 10,
      comentario: 'Mente-bending e visualmente espetacular!'
    },
    {
      id: '20000000-0000-0000-0000-000000000003',
      utilizador_id: '00000000-0000-0000-0000-000000000003',
      filme_id: '10000000-0000-0000-0000-000000000001',
      nota: 8,
      comentario: 'Bom filme, mas um pouco complexo.'
    }
  ]);
};

