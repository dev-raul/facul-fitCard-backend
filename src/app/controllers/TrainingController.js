import Training from "../models/Training";
import User from "../models/User";
import { Op } from "sequelize";
class TrainingController {
  async index(req, res) {
    const user_id = parseInt(req.params.user_id);
    const user = await User.findByPk(user_id, {
      include: [{ model: Training, as: "trainings" }],
    });
    if (!user || user.trainings.lenght === 0) {
      return res.status(400).json({ error: "User not have trainings!" });
    }

    return res.json(user.trainings);
  }

  async store(req, res) {
    const { name } = req.body;
    const user_id = parseInt(req.params.user_id);

    if (!(await User.findByPk(user_id))) {
      return res.status(400).json({ error: "User not found!" });
    }

    if (user_id !== req.userId) {
      return res
        .status(400)
        .json({ error: "You are not authorized to create this training" });
    }

    const training = await Training.create({
      name,
      user_id,
    });
    return res.status(201).json(training);
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);
    const { name } = req.body;

    const training = await Training.findOne({
      where: { [Op.and]: [{ id }, { user_id }] },
    });

    if (!training) {
      return res.status(400).json({ error: "Training not found!" });
    }

    if (user_id !== parseInt(req.userId)) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update this training" });
    }

    await training.update({
      name,
    });
    return res.json(training);
  }

  async destroy(req, res) {
    const id = parseInt(req.params.id);
    const user_id = parseInt(req.params.user_id);

    const training = await Training.findOne({
      where: { [Op.and]: [{ id }, { user_id }] },
    });

    if (!training) {
      return res.status(400).json({ error: "Training not found!" });
    }

    if (user_id !== parseInt(req.userId)) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update this training" });
    }

    await training.destroy();
    return res.send();
  }
}

export default new TrainingController();
