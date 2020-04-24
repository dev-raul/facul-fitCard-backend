export default (req, res, next) => {
  const provider = req.actorProvider;
  if (!provider) {
    return res.status(401).json({ error: "You not permission!" });
  }

  return next();
};
