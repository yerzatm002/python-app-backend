const achievementService = require('../services/achievementService');

exports.getAchievements = async (req, res, next) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).json({ error: 'userId қажет' });

  try {
    const data = await achievementService.getAchievementsByUser(userId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
