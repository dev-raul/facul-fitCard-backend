import Studant from "../models/Studant";
import User from "../models/User";
import { Op } from "sequelize";

class StudantController {
  async index(req, res) {
    const user_id = parseInt(req.params.user_id);
    const user = await User.findByPk(user_id, {
      include: [{ model: Studant, as: "studants" }],
    });

    if (!user || user.studants.lenght === 0) {
      return res.status(400).json({ error: "User not have studants" });
    }

    return res.json(user.studants);
  }

  async store(req, res) {
    const { id_hash, name } = req.body;
    const user_id = parseInt(req.params.user_id);

    if (!(await User.findByPk(user_id))) {
      return res.status(400).json({ error: "User not found!" });
    }

    // if (user_id !== parseInt(req.userId)) {
    //   return res
    //     .status(400)
    //     .json({ error: "You are not authorized to create this studant" });
    // }

    if (await Studant.findOne({ where: { id_hash } })) {
      return res.status(400).json({ error: "Studant already exists!" });
    }

    const studant = await Studant.create({
      id_hash,
      name,
      user_id,
    });
    return res.status(201).json(studant);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const old_user_id = parseInt(req.params.user_id);

    const studant = await Studant.findOne({
      where: { [Op.and]: [{ id }, { user_id: old_user_id }] },
    });

    if (!studant) {
      return res.status(400).json({ error: "Studant not found!" });
    }
    // if (old_user_id !== parseInt(req.userId)) {
    //   return res
    //     .status(400)
    //     .json({ error: "You are not authorized to update this studant" });
    // }

    if (!(await User.findByPk(old_user_id))) {
      return res.status(400).json({ error: "User not found!" });
    }

    const { name, user_id, id_hash } = req.body;

    if (user_id && !(await User.findByPk(user_id))) {
      return res.status(400).json({ error: "New user not exists!" });
    }

    if (id_hash && (await Studant.findOne({ where: { id_hash } }))) {
      return res.status(400).json({ error: "Studant already exists!" });
    }

    await studant.update({
      id_hash,
      name,
      user_id,
    });

    return res.json(studant);
  }

  async destroy(req, res) {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);

    const studant = await Studant.findOne({
      where: { [Op.and]: [{ id }, { user_id }] },
    });

    if (!studant) {
      return res.status(400).json({ error: "Studant not found!" });
    }

    // if (user_id !== parseInt(req.userId)) {
    //   return res
    //     .status(400)
    //     .json({ error: "You are not authorized to delete this studant" });
    // }

    await studant.destroy();
    return res.send();
  }
}

export default new StudantController();
