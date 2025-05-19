const router = require('express').Router();
const {
  getUserProgress,
  addProgress,
  getAllProgresses,
} = require('../controllers/progressController');

router.get('/:id/progress', getUserProgress);
router.post('/', addProgress);
router.get('/all', getAllProgresses);

module.exports = router;
