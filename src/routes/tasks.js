const router = require('express').Router();
const { getTask, submitTask } = require('../controllers/taskController');

router.get('/:id', getTask);
router.post('/:id/submit', submitTask);

module.exports = router;
