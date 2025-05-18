const router = require('express').Router();
const { getAchievements } = require('../controllers/achievementController');

router.get('/', getAchievements);

module.exports = router;
