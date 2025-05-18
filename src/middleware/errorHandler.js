module.exports = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Сервер қателігі', detail: err.message });
};
