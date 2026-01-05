/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('evaluations').del(); // Deletar avaliações primeiro (FK constraint)
  await knex('movies').del();
  await knex('movies').insert([
    {
      id: '10000000-0000-0000-0000-000000000001',
      title: 'The Matrix',
      year: 1999,
      genre: 'Sci-Fi',
      description: 'A computer hacker learns about the true nature of reality',
      director: 'Lana Wachowski, Lilly Wachowski',
      duration: 136
    },{
      id: '10000000-0000-0000-0000-000000000002',
      title: 'Inception',
      year: 2010,
      genre: 'Sci-Fi',
      description: 'A thief who steals corporate secrets through dream-sharing technology',
      director: 'Christopher Nolan',
      duration: 148
    },
    {
      id: '10000000-0000-0000-0000-000000000003',
      title: 'The Dark Knight',
      year: 2008,
      genre: 'Action',
      description: 'Batman faces the Joker in Gotham City',
      director: 'Christopher Nolan',
      duration: 152
    } ]);};

