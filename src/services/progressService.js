const prisma = require('../lib/prisma');

async function getUserProgress(userId) {
  const progress = await prisma.progress.findMany({
    where: { userId },
    select: { taskId: true },
  });

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { xp: true },
  });

  // Массив айди задач
  const taskIds = progress.map(p => p.taskId);

  // Получаем задачи по taskId
  const tasks = await prisma.task.findMany({
    where: { id: { in: taskIds } },
    select: { id: true, title: true },
  });

  return {
    xp: user?.xp || 0,
    totalTasks: tasks.length,
    completedTasks: tasks.map(task => ({
      taskId: task.id,
      title: task.title,
    })),
  };
}

async function addProgress(userId, taskId) {
  const existing = await prisma.progress.findFirst({
    where: { userId, taskId },
  });

  if (existing) return null;

  return await prisma.progress.create({
    data: { userId, taskId },
  });
}

module.exports = {
  getUserProgress,
  addProgress,
};
