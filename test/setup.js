process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret-key';
process.env.JWT_EXPIRES_IN = '1h';

// Configuração de base de dados de teste
process.env.DB_HOST = process.env.DB_HOST || 'localhost';
process.env.DB_PORT = process.env.DB_PORT || 5432;
process.env.DB_NAME = process.env.DB_NAME || 'gestao_filmes_test';
process.env.DB_USER = process.env.DB_USER || 'postgres';
process.env.DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

// Executar migrações antes dos testes
const knex = require('knex');
const knexConfig = require('../knexfile');

// Usar módulo mocha para registrar hook global
const mocha = require('mocha');

// Hook global antes de todos os testes
mocha.suite.beforeAll(async function() {
  this.timeout(30000); // Aumentar timeout para migrações
  const db = knex(knexConfig.test);
  
  try {
    // Executar migrações
    await db.migrate.latest();
    console.log('✅ Migrações executadas com sucesso');
  } catch (error) {
    console.error('❌ Erro ao executar migrações:', error.message);
    // Se a base de dados não existir, criar primeiro
    if (error.message.includes('does not exist') || error.message.includes('database')) {
      console.log('\n⚠️  Base de dados de teste não existe. Por favor, crie-a manualmente:');
      console.log(`   CREATE DATABASE ${process.env.DB_NAME};`);
      console.log('   Depois execute: npm test\n');
    }
    await db.destroy();
    throw error;
  } finally {
    await db.destroy();
  }
});

