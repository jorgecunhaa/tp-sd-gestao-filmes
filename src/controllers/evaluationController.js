const evaluationService = require('../services/evaluationService');

class EvaluationController {
  async getAllEvaluations(req, res, next) {
    try {
      const evaluations = await evaluationService.getAllEvaluations();
      res.status(200).json(evaluations);
    } catch (error) {
      next(error);
    }
  }

  async getEvaluationById(req, res, next) {
    try {
      const { id } = req.params;
      const evaluation = await evaluationService.getEvaluationById(id);
      res.status(200).json(evaluation);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async createEvaluation(req, res, next) {
    try {
      const userId = req.user.id;
      const evaluation = await evaluationService.createEvaluation(req.body, userId);
      res.status(201).json(evaluation);
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Já existe uma avaliação deste utilizador para este filme') {
        return res.status(409).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateEvaluation(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.papel;
      const evaluation = await evaluationService.updateEvaluation(id, req.body, userId, userRole);
      res.status(200).json(evaluation);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Não tem permissão para editar esta avaliação') {
        return res.status(403).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteEvaluation(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const userRole = req.user.papel;
      const result = await evaluationService.deleteEvaluation(id, userId, userRole);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Não tem permissão para eliminar esta avaliação') {
        return res.status(403).json({ error: error.message });
      }
      next(error);
    }
  }

  async createMovieEvaluation(req, res, next) {
    try {
      const { id: movieId } = req.params;
      const userId = req.user.id;
      const evaluationData = { ...req.body, movie_id: movieId }; // movie_id será convertido para filme_id no service
      const evaluation = await evaluationService.createEvaluation(evaluationData, userId);
      res.status(201).json(evaluation);
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Já existe uma avaliação deste utilizador para este filme') {
        return res.status(409).json({ error: error.message });
      }
      next(error);
    }
  }

  async getMovieEvaluation(req, res, next) {
    try {
      const { id: movieId, evaluationId } = req.params;
      const evaluation = await evaluationService.getMovieEvaluation(movieId, evaluationId);
      res.status(200).json(evaluation);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada para este filme') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async updateMovieEvaluation(req, res, next) {
    try {
      const { id: movieId, evaluationId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.papel;
      const evaluation = await evaluationService.updateEvaluation(evaluationId, req.body, userId, userRole);
      
      // Verificar se a avaliação pertence ao filme
      if (evaluation.filme_id !== movieId) {
        return res.status(404).json({ error: 'Avaliação não encontrada para este filme' });
      }
      
      res.status(200).json(evaluation);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Não tem permissão para editar esta avaliação') {
        return res.status(403).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteMovieEvaluation(req, res, next) {
    try {
      const { id: movieId, evaluationId } = req.params;
      const userId = req.user.id;
      const userRole = req.user.papel;
      
      // Verificar se a avaliação pertence ao filme
      const evaluation = await evaluationService.getEvaluationById(evaluationId);
      if (evaluation.movie_id !== movieId) {
        return res.status(404).json({ error: 'Avaliação não encontrada para este filme' });
      }
      
      const result = await evaluationService.deleteEvaluation(evaluationId, userId, userRole);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Avaliação não encontrada') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'Não tem permissão para eliminar esta avaliação') {
        return res.status(403).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new EvaluationController();

