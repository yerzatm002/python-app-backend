const prisma = require('../lib/prisma');
const { differenceInDays, isToday, isYesterday } = require('date-fns');

async function getDailyStatus(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return {
    streak: user.streak,
    completedToday: user.lastCompletedAt && isToday(user.lastCompletedAt),
  };
}

async function completeDaily(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (user.lastCompletedAt && isToday(user.lastCompletedAt)) {
    throw new Error('Бүгінгі тапсырма орындалған');
  }

  const incrementStreak = user.lastCompletedAt && isYesterday(user.lastCompletedAt);
  const resetStreak = !incrementStreak;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: {
      lastCompletedAt: new Date(),
      streak: incrementStreak ? { increment: 1 } : 1,
      xp: { increment: 5 }, // бонус
    },
  });

  return {
    message: 'Күнделікті тапсырма орындалды',
    streak: updatedUser.streak,
    xpGained: 5,
  };
}

module.exports = {
  getDailyStatus,
  completeDaily,
};
