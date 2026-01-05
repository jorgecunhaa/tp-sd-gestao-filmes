const { Movie, Evaluation, User } = require('../models');
const { Op } = require('sequelize');

class MovieService {
  async getAllMovies(filters = {}) {
    const { genre, year, search } = filters;
    const where = {};
    
    if (genre) {
      where.genero = genre;
    }
    
    if (year) {
      where.ano = year;
    }
    
    if (search) {
      where[Op.or] = [
        { titulo: { [Op.iLike]: `%${search}%` } },
        { descricao: { [Op.iLike]: `%${search}%` } },
        { realizador: { [Op.iLike]: `%${search}%` } }
      ];
    }
    
    return await Movie.findAll({
      where,
      include: [{
        model: Evaluation,
        as: 'evaluations',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        }]
      }],
      order: [['created_at', 'DESC']]
    });
  }

  async getMovieById(id) {
    const movie = await Movie.findByPk(id, {
      include: [{
        model: Evaluation,
        as: 'evaluations',
        include: [{
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        }]
      }]
    });
    
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    return movie;
  }

  async createMovie(movieData) {
    return await Movie.create(movieData);
  }

  async updateMovie(id, movieData) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    await movie.update(movieData);
    return movie;
  }

  async deleteMovie(id) {
    const movie = await Movie.findByPk(id);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    await movie.destroy();
    return { message: 'Filme eliminado com sucesso' };
  }

  async getMovieEvaluations(movieId) {
    const movie = await Movie.findByPk(movieId);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    return await Evaluation.findAll({
      where: { filme_id: movieId },
      include: [{
        model: User,
        as: 'user',
        attributes: ['id', 'email']
      }],
      order: [['created_at', 'DESC']]
    });
  }
}

module.exports = new MovieService();

