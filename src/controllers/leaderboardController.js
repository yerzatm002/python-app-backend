const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getLeaderboard = async (req, res) => {
  const top = await prisma.user.findMany({
    orderBy: { xp: 'desc' },
    take: 10,
    select: {
      id: true,
      name: true,
      xp: true,
      level: true,
      avatar: true,
    },
  });

  res.json(top);
};
