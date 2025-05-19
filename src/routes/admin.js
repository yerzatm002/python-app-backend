const router = require('express').Router();
const { listUsers, getStats } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/roleMiddleware');

// Только для админа
router.get('/users', listUsers);
router.get('/stats', getStats);

module.exports = router;
