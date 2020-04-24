export default (req, res, next) => {
  if (!req.headers.provider) {
    return res.status(401).json({ error: "You not permission!" });
  }
  const provider = JSON.parse(req.headers.provider);
  if (!provider) {
    return res.status(401).json({ error: "You not permission!" });
  }

  return next();
};
