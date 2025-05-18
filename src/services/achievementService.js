const prisma = require('../lib/prisma');
const achievements = require('../../data/achievements.json');

async function getAchievementsByUser(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { progress: true },
  });

  if (!user) throw new Error('Пайдаланушы табылмады');

  const completedTasks = user.progress.map(p => p.taskId);

  const unlockedAchievements = achievements.map(a => {
    const unlocked =
      (a.taskId && completedTasks.includes(a.taskId)) ||
      (a.minTasks && completedTasks.length >= a.minTasks) ||
      (a.minXp && user.xp >= a.minXp);

    return { ...a, unlocked };
  });

  return unlockedAchievements;
}

module.exports = {
  getAchievementsByUser,
};
