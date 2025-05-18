const prisma = require('../lib/prisma');

async function getLessonById(id) {
  return await prisma.lesson.findUnique({
    where: { id },
    include: { task: true },
  });
}

async function createLesson(data) {
  return await prisma.lesson.create({ data });
}

async function updateLesson(id, data) {
  return await prisma.lesson.update({
    where: { id },
    data,
  });
}

async function deleteLesson(id) {
  return await prisma.lesson.delete({
    where: { id },
  });
}

module.exports = {
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
};
