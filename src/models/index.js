const sequelize = require('../config/database');
const User = require('./User');
const Movie = require('./Movie');
const Evaluation = require('./Evaluation');

// Definir relações (após todos os modelos estarem carregados)
User.hasMany(Evaluation, { foreignKey: 'utilizador_id', as: 'evaluations' });
Movie.hasMany(Evaluation, { foreignKey: 'filme_id', as: 'evaluations' });
Evaluation.belongsTo(User, { foreignKey: 'utilizador_id', as: 'user' });
Evaluation.belongsTo(Movie, { foreignKey: 'filme_id', as: 'movie' });

// Sincronizar modelos (não força recriação, apenas valida estrutura)
const syncModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com PostgreSQL estabelecida com sucesso.');
    
    // Não usar sync em produção - migrations fazem isso
    if (process.env.NODE_ENV === 'development') {
      // await sequelize.sync({ alter: true });
    }
  } catch (error) {
    console.error('❌ Erro ao conectar com a base de dados:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  User,
  Movie,
  Evaluation,
  syncModels
};

