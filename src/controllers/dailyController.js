const dailyService = require('../services/dailyService');

exports.getDaily = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const result = await dailyService.getDailyStatus(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.completeDaily = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const result = await dailyService.completeDaily(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
