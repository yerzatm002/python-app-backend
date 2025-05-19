const router = require('express').Router();
const { getTask, submitTask, createTask, getTasksByLesson } = require('../controllers/taskController');

router.get('/:id', getTask);
router.post('/:id/submit', submitTask);
router.post('/', createTask);
router.get('/by-lesson/:lessonId', getTasksByLesson);

module.exports = router;
