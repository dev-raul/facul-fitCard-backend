import User from "../models/User";

class UserController {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  }
  async store(req, res) {
    const { name, username, password } = req.body;
    if (await User.findOne({ where: { username } })) {
      return res.status(400).json({ error: "User already exists!" });
    }
    const user = await User.create({
      name,
      username,
      password,
    });
    return res.status(201).json(user);
  }

  async show(req, res) {
    let id = parseInt(req.params.id);

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(401).json({ error: "User not found!" });
    }
    return res.json(user);
  }

  async update(req, res) {
    let id = parseInt(req.params.id);

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (id !== parseInt(req.userId)) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update this user" });
    }

    let { name, username, oldPassword, password } = req.body;

    if (username && (await User.findOne({ where: { username } }))) {
      return res.status(400).json({ error: "User already exist" });
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).send({ error: "Password does not match" });
    }

    await user.update({
      name,
      username,
      password,
    });

    return res.json(user);
  }

  async destroy(req, res) {
    let id = parseInt(req.params.id);
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ error: "User not found!" });
    }
    if (id !== parseInt(req.userId)) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update this user" });
    }

    await user.destroy();
    return res.send();
  }
}

export default new UserController();
