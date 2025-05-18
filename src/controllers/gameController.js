const gameService = require('../services/gameService');

exports.getGame = async (req, res, next) => {
  try {
    const game = gameService.getGameById(req.params.id);
    if (!game) return res.status(404).json({ error: 'Мини-ойын табылмады' });
    res.json(game);
  } catch (err) {
    next(err);
  }
};

exports.submitGame = async (req, res, next) => {
  try {
    const { answer } = req.body;
    const result = gameService.submitGame(req.params.id, answer);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllGames = async (req, res, next) => {
  try {
    const games = gameService.getAllGames();
    res.json(games);
  } catch (err) {
    next(err);
  }
};