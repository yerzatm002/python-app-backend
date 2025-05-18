const router = require('express').Router();
const { getDaily, completeDaily } = require('../controllers/dailyController');

router.get('/', getDaily); // ?userId=...
router.post('/complete', completeDaily);

module.exports = router;
