const router = require('express').Router();
const {
  getUserProgress,
  addProgress
} = require('../controllers/progressController');

router.get('/:id/progress', getUserProgress);
router.post('/', addProgress);

module.exports = router;
