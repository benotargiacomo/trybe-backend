const error = (err, req, res, _next) => {
  const status = err.status || 500;
  console.log(err);
  return res.status(status).json({ error: err.message });
};

module.exports = error;
