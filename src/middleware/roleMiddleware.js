/**
 * Middleware для проверки роли пользователя
 * @param {Array<string>} requiredRoles — список разрешённых ролей (например: ['ADMIN', 'TEACHER'])
 */
function checkRole(requiredRoles) {
  return (req, res, next) => {
    if (!req.user || !requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Құқығыңыз жоқ' });
    }
    next();
  };
}

module.exports = { checkRole };
