const crypto = require('crypto');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('utilizadores').del();
  
  // Função para criar hash SHA-256
  const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
  };
  
  await knex('utilizadores').insert([
    {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@example.com',
      senha: hashPassword('admin123'),
      papel: 'Admin'
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'edit@example.com',
      senha: hashPassword('edit123'),
      papel: 'Edit'
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      email: 'view@example.com',
      senha: hashPassword('view123'),
      papel: 'View'
    }
  ]);
};

