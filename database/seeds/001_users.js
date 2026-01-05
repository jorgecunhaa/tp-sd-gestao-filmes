const crypto = require('crypto');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  
  // Função para criar hash SHA-256
  const hashPassword = (password) => {
    return crypto.createHash('sha256').update(password).digest('hex');
  };
  
  await knex('users').insert([
    {
      id: '00000000-0000-0000-0000-000000000001',
      email: 'admin@example.com',
      password: hashPassword('admin123'),
      role: 'Admin'
    },
    {
      id: '00000000-0000-0000-0000-000000000002',
      email: 'edit@example.com',
      password: hashPassword('edit123'),
      role: 'Edit'
    },
    {
      id: '00000000-0000-0000-0000-000000000003',
      email: 'view@example.com',
      password: hashPassword('view123'),
      role: 'View'
    }
  ]);
};

