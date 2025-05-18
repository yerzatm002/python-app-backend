const lessonService = require('../services/lessonService');

exports.getLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.getLessonById(req.params.id);
    if (!lesson) return res.status(404).json({ message: 'Сабақ табылмады' });
    res.json(lesson);
  } catch (err) {
    next(err);
  }
};

exports.createLesson = async (req, res, next) => {
  try {
    const lesson = await lessonService.createLesson(req.body);
    res.status(201).json(lesson);
  } catch (err) {
    next(err);
  }
};

exports.updateLesson = async (req, res, next) => {
  try {
    const updated = await lessonService.updateLesson(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteLesson = async (req, res, next) => {
  try {
    await lessonService.deleteLesson(req.params.id);
    res.json({ message: 'Сабақ өшірілді' });
  } catch (err) {
    next(err);
  }
};
