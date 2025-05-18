const router = require('express').Router();
const { register, login, getMe, updateMe, listUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);

// защищённые маршруты
router.get('/me', authMiddleware, getMe);
router.put('/update', authMiddleware, updateMe);

// только для админов — пока без проверки роли
router.get('/users', authMiddleware, listUsers);

module.exports = router;
