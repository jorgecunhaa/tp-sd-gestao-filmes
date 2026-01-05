const { Evaluation, Movie, User } = require('../models');

class EvaluationService {
  async getAllEvaluations() {
    return await Evaluation.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        },
        {
          model: Movie,
          as: 'movie',
          attributes: ['id', 'titulo', 'ano']
        }
      ],
      order: [['created_at', 'DESC']]
    });
  }

  async getEvaluationById(id) {
    const evaluation = await Evaluation.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        },
        {
          model: Movie,
          as: 'movie',
          attributes: ['id', 'titulo', 'ano']
        }
      ]
    });
    
    if (!evaluation) {
      throw new Error('Avaliação não encontrada');
    }
    
    return evaluation;
  }

  async createEvaluation(evaluationData, userId) {
    // Aceitar tanto movie_id quanto filme_id, rating quanto nota, etc.
    const movie_id = evaluationData.movie_id || evaluationData.filme_id;
    const rating = evaluationData.rating || evaluationData.nota;
    const comment = evaluationData.comment || evaluationData.comentario;
    
    // Verificar se o filme existe
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      throw new Error('Filme não encontrado');
    }
    
    // Verificar se o utilizador já avaliou este filme
    const existingEvaluation = await Evaluation.findOne({
      where: {
        utilizador_id: userId,
        filme_id: movie_id
      }
    });
    
    if (existingEvaluation) {
      throw new Error('Já existe uma avaliação deste utilizador para este filme');
    }
    
    return await Evaluation.create({
      utilizador_id: userId,
      filme_id: movie_id,
      nota: rating,
      comentario: comment
    });
  }

  async updateEvaluation(id, evaluationData, userId, userRole) {
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      throw new Error('Avaliação não encontrada');
    }
    
    // Verificar se o utilizador é o dono ou Admin
    if (evaluation.utilizador_id !== userId && userRole !== 'Admin') {
      throw new Error('Não tem permissão para editar esta avaliação');
    }
    
    const { rating, comment } = evaluationData;
    
    if (rating !== undefined) {
      evaluation.nota = rating;
    }
    
    if (comment !== undefined) {
      evaluation.comentario = comment;
    }
    
    await evaluation.save();
    return evaluation;
  }

  async deleteEvaluation(id, userId, userRole) {
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      throw new Error('Avaliação não encontrada');
    }
    
    // Verificar se o utilizador é o dono ou Admin
    if (evaluation.utilizador_id !== userId && userRole !== 'Admin') {
      throw new Error('Não tem permissão para eliminar esta avaliação');
    }
    
    await evaluation.destroy();
    return { message: 'Avaliação eliminada com sucesso' };
  }

  async getMovieEvaluation(movieId, evaluationId) {
    const evaluation = await Evaluation.findOne({
      where: {
        id: evaluationId,
        filme_id: movieId
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email']
        },
        {
          model: Movie,
          as: 'movie',
          attributes: ['id', 'titulo', 'ano']
        }
      ]
    });
    
    if (!evaluation) {
      throw new Error('Avaliação não encontrada para este filme');
    }
    
    return evaluation;
  }
}

module.exports = new EvaluationService();

