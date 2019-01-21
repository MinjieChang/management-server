exports.pagination = (req, res, next) => {
  const { query } = req;
  const pagination = { skip: 0, limit: 12 };
  if (query.skip) {
    pagination.skip = parseInt(query.skip, 10);
  }
  if (query.limit) {
    pagination.limit = parseInt(query.limit, 10);
  }
  req.query = Object.assign({}, query, pagination);
  next();
};
