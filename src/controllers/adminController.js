const prisma = require('../lib/prisma');

exports.listUsers = async (req, res, next) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        xp: true,
        level: true,
        streak: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    next(err);
  }
};

exports.getStats = async (req, res, next) => {
  try {
    const [totalUsers, studentsCount, teachersCount, adminCount] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.user.count({ where: { role: 'TEACHER' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
    ]);

    const totalTasksCompleted = await prisma.progress.count();

    const averageXpAgg = await prisma.user.aggregate({
      _avg: { xp: true },
    });

    const topUser = await prisma.user.findFirst({
      orderBy: { xp: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        xp: true,
        role: true,
      },
    });

    res.json({
      totalUsers,
      studentsCount,
      teachersCount,
      adminCount,
      totalTasksCompleted,
      averageXp: Math.round(averageXpAgg._avg.xp || 0),
      topUser,
    });
  } catch (err) {
    next(err);
  }
};