const taskService = require('../services/taskService');

exports.getTask = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ error: 'Тапсырма табылмады' });
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.submitTask = async (req, res, next) => {
  const { answer, userId } = req.body;
  const taskId = req.params.id;

  try {
    const result = await taskService.submitTask({ taskId, userId, answer });
    res.json(result);
  } catch (err) {
    next(err);
  }
};
