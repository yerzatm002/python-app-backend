const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Барлық өрісті толтырыңыз' });
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ error: 'Email тіркелген' });

    const hash = await bcrypt.hash(password, 10);
    const avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        name,
        avatar,
        xp: 0,
        level: 1,
        streak: 0,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Сервер қатесі' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email мен құпия сөз керек' });

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: 'Қате email' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Қате құпия сөз' });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Сервер қатесі' });
  }
};


exports.getMe = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: { id: true, name: true, email: true, avatar: true, xp: true, level: true, difficulty: true },
  });
  res.json(user);
};

exports.updateMe = async (req, res) => {
  const { name, avatar, difficulty } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name, avatar, difficulty },
  });

  res.json(user);
};

exports.listUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, email: true, xp: true, level: true },
  });

  res.json(users);
};