const courseService = require('../services/courseService');

// Получение всех курсов
exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseService.getAllCourses();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// Получение одного курса
exports.getCourse = async (req, res, next) => {
  try {
    const course = await courseService.getCourseById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Курс табылмады' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// Создание курса
exports.createCourse = async (req, res, next) => {
  try {
    const newCourse = await courseService.createCourse(req.body);
    res.status(201).json(newCourse);
  } catch (err) {
    next(err);
  }
};

// Обновление курса
exports.updateCourse = async (req, res, next) => {
  try {
    const updated = await courseService.updateCourse(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// Удаление курса
exports.deleteCourse = async (req, res, next) => {
  try {
    await courseService.deleteCourse(req.params.id);
    res.json({ message: 'Курс өшірілді' });
  } catch (err) {
    next(err);
  }
};
