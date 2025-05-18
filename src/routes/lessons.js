const router = require('express').Router();
const {
  getLesson,
  createLesson,
  updateLesson,
  deleteLesson,
} = require('../controllers/lessonController');

router.get('/:id', getLesson);
router.post('/', createLesson);
router.put('/:id', updateLesson);
router.delete('/:id', deleteLesson);

module.exports = router;
