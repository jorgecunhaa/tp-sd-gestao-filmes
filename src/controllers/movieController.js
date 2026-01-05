const movieService = require('../services/movieService');

// Função para mapear dados do request (inglês) para nomes internos (português)
const mapMovieRequestToInternal = (data) => {
  const mapped = {};
  if (data.title !== undefined) mapped.titulo = data.title;
  if (data.year !== undefined) mapped.ano = data.year;
  if (data.genre !== undefined) mapped.genero = data.genre;
  if (data.description !== undefined) mapped.descricao = data.description;
  if (data.director !== undefined) mapped.realizador = data.director;
  if (data.duration !== undefined) mapped.duracao = data.duration;
  return Object.keys(mapped).length > 0 ? mapped : data;
};

// Função para mapear dados internos (português) para resposta (inglês)
const mapMovieInternalToResponse = (movie) => {
  if (!movie) return movie;
  const data = movie.toJSON ? movie.toJSON() : movie;
  return {
    ...data,
    title: data.titulo,
    year: data.ano,
    genre: data.genero,
    description: data.descricao,
    director: data.realizador,
    duration: data.duracao
  };
};

class MovieController {
  async getAllMovies(req, res, next) {
    try {
      const filters = {
        genre: req.query.genre,
        year: req.query.year ? parseInt(req.query.year) : undefined,
        search: req.query.search
      };
      const movies = await movieService.getAllMovies(filters);
      // Mapear resposta para inglês
      const mappedMovies = Array.isArray(movies) 
        ? movies.map(mapMovieInternalToResponse)
        : mapMovieInternalToResponse(movies);
      res.status(200).json(mappedMovies);
    } catch (error) {
      next(error);
    }
  }

  async getMovieById(req, res, next) {
    try {
      const { id } = req.params;
      const movie = await movieService.getMovieById(id);
      res.status(200).json(mapMovieInternalToResponse(movie));
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async createMovie(req, res, next) {
    try {
      const movieData = mapMovieRequestToInternal(req.body);
      const movie = await movieService.createMovie(movieData);
      res.status(201).json(mapMovieInternalToResponse(movie));
    } catch (error) {
      next(error);
    }
  }

  async updateMovie(req, res, next) {
    try {
      const { id } = req.params;
      const movieData = mapMovieRequestToInternal(req.body);
      const movie = await movieService.updateMovie(id, movieData);
      res.status(200).json(mapMovieInternalToResponse(movie));
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async deleteMovie(req, res, next) {
    try {
      const { id } = req.params;
      const result = await movieService.deleteMovie(id);
      res.status(200).json(result);
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }

  async getMovieEvaluations(req, res, next) {
    try {
      const { id } = req.params;
      const evaluations = await movieService.getMovieEvaluations(id);
      // Mapear avaliações também
      const mappedEvaluations = Array.isArray(evaluations)
        ? evaluations.map(evaluation => {
            const data = evaluation.toJSON ? evaluation.toJSON() : evaluation;
            return {
              ...data,
              rating: data.nota,
              comment: data.comentario,
              movie_id: data.filme_id,
              user_id: data.utilizador_id
            };
          })
        : evaluations;
      res.status(200).json(mappedEvaluations);
    } catch (error) {
      if (error.message === 'Filme não encontrado') {
        return res.status(404).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = new MovieController();

