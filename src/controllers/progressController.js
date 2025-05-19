const progressService = require('../services/progressService');

exports.getUserProgress = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await progressService.getUserProgress(userId);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.addProgress = async (req, res, next) => {
  try {
    const { userId, taskId } = req.body;
    const created = await progressService.addProgress(userId, taskId);

    if (!created) return res.status(400).json({ message: 'Тапсырма бұрын орындалған' });

    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

exports.getAllProgresses = async (req, res, next) => {
  try {
    const result = await progressService.getAllProgresses();
    res.json(result);
  } catch (err) {
    next(err);
  }
};