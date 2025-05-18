const games = require('../../data/games.json');

/**
 * Получить мини-игру по ID
 * @param {string} id
 * @returns {object|null}
 */
function getGameById(id) {
  return games.find(g => g.id === id);
}


/**
 * Получить все мини-игры (без ответа)
 * @returns {Array}
 */
function getAllGames() {
  return games.map(({ id, type, question, code, options, correct }) => ({
    id,
    type,
    question,
    code,
    options,
    correct
  }));
}

/**
 * Проверить ответ игрока на мини-игру (MCQ)
 * @param {string} id
 * @param {number} answerIndex — индекс выбранного варианта
 * @returns {object} { correct: boolean, expected: number }
 */
function submitGame(id, answerIndex) {
  const game = getGameById(id);
  if (!game) throw new Error('Мини-ойын табылмады');

  if (typeof answerIndex !== 'number' || answerIndex < 0 || answerIndex >= game.options.length) {
    throw new Error('Жауап индексі жарамсыз');
  }

  const correct = game.correct === answerIndex;

  return {
    correct,
    expected: game.correct
  };
}

module.exports = {
  getGameById,
    getAllGames,
  submitGame,
};
