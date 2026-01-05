/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('avaliacoes').del(); // Deletar avaliações primeiro (FK constraint)
  await knex('filmes').del();
  await knex('filmes').insert([
    {
      id: '10000000-0000-0000-0000-000000000001',
      titulo: 'The Matrix',
      ano: 1999,
      genero: 'Sci-Fi',
      descricao: 'A computer hacker learns about the true nature of reality',
      realizador: 'Lana Wachowski, Lilly Wachowski',
      duracao: 136
    },{
      id: '10000000-0000-0000-0000-000000000002',
      titulo: 'Inception',
      ano: 2010,
      genero: 'Sci-Fi',
      descricao: 'A thief who steals corporate secrets through dream-sharing technology',
      realizador: 'Christopher Nolan',
      duracao: 148
    },
    {
      id: '10000000-0000-0000-0000-000000000003',
      titulo: 'The Dark Knight',
      ano: 2008,
      genero: 'Action',
      descricao: 'Batman faces the Joker in Gotham City',
      realizador: 'Christopher Nolan',
      duracao: 152
    } ]);};

