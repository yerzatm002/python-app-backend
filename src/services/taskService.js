const prisma = require('../lib/prisma');
const { submitToJudge0 } = require('./judgeService');

async function getTaskById(id) {
  return await prisma.task.findUnique({ where: { id } });
}

async function createTask(data) {
  return await prisma.task.create({
    data,
  });
}

async function submitTask({ taskId, userId, answer }) {
  const task = await getTaskById(taskId);
  if (!task) throw new Error('Тапсырма табылмады');

  const judgeResult = await submitToJudge0(answer);

  const normalizeOutput = (str) =>
    str?.replace(/\r/g, '').replace(/\\n/g, '\n').trim();

  const output = normalizeOutput(judgeResult.stdout || '');
  const expected = normalizeOutput(task.expectedOutput || '');

  const correct = output === expected;

  // Вычисляем обратную связь
  let feedback = '✅ Дұрыс жауап!';
  let hint = null;

  if (!correct) {
    feedback = '❌ Жауап сәйкес келмейді.';

    // Советы (hint)
    if (output === '') {
      hint = 'Сіздің кодыңыз ештеңе шығармады. print(...) бар ма?';
    } else if (output.split('\n').length !== expected.split('\n').length) {
      hint = 'Қатар саны сәйкес емес. Мүмкін бір print жетіспейді.';
    } else if (output.trim() === expected.trim() + '\n') {
      hint = 'Қосымша бос қатар немесе \\n артық болуы мүмкін.';
    } else {
      hint = 'Нәтиже мен күтілетін нәтиже арасында айырмашылық бар.';
    }
  }

  // Запись прогресса при правильном ответе
  if (correct) {
    const existing = await prisma.progress.findFirst({
      where: { userId, taskId },
    });

    if (!existing) {
      await prisma.progress.create({ data: { userId, taskId } });
      await prisma.user.update({
        where: { id: userId },
        data: { xp: { increment: 10 } },
      });
    }
  }

  return {
    correct,
    output,
    expected,
    feedback,
    hint,
    judge: {
      stdout: judgeResult.stdout,
      stderr: judgeResult.stderr,
      compile_output: judgeResult.compile_output,
      status: judgeResult.status,
    },
  };
}

async function getTasksByLessonId(lessonId) {
  return await prisma.task.findMany({
    where: {
      lesson: {
        id: lessonId,
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
    },
  });
}

module.exports = {
  getTaskById,
  submitTask,
  createTask,
  getTasksByLessonId
};
