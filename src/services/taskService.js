const prisma = require('../lib/prisma');
const { submitToJudge0 } = require('./judgeService');

async function getTaskById(id) {
  return await prisma.task.findUnique({ where: { id } });
}

async function submitTask({ taskId, userId, answer }) {
  const task = await getTaskById(taskId);
  if (!task) throw new Error('Тапсырма табылмады');
  console.log(answer)
  const judgeResult = await submitToJudge0(answer);

  const normalizeOutput = (str) =>
    str?.replace(/\r/g, '').replace(/\\n/g, '\n').trim();

  const output = normalizeOutput(judgeResult.stdout);
  const expected = normalizeOutput(task.expectedOutput);
  const correct = output === expected;

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
    judge: judgeResult,
  };
}

module.exports = {
  getTaskById,
  submitTask,
};
