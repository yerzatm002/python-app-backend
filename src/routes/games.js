const router = require('express').Router();
const { getGame, submitGame, getAllGames  } = require('../controllers/gameController');

router.get('/:id', getGame);
router.get('/', getAllGames);
router.post('/:id/submit', submitGame);

module.exports = router;
