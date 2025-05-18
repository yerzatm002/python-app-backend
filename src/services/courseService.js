const prisma = require('../lib/prisma');

// Получить все курсы
async function getAllCourses() {
  return await prisma.course.findMany({
    include: {
      lessons: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

// Получить курс по ID
async function getCourseById(id) {
  return await prisma.course.findUnique({
    where: { id },
    include: { lessons: true },
  });
}

// Создать новый курс
async function createCourse(data) {
  return await prisma.course.create({ data });
}

// Обновить курс
async function updateCourse(id, data) {
  return await prisma.course.update({
    where: { id },
    data,
  });
}

// Удалить курс
async function deleteCourse(id) {
  return await prisma.course.delete({
    where: { id },
  });
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};
