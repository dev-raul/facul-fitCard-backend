import Studant from "../models/Studant";
import Sequelize from "sequelize";
import Training from "../models/Training";
import { Op } from "sequelize";

class StudantTrainingController {
  async index(req, res) {
    const user_id = parseInt(req.params.user_id);
    const id = parseInt(req.params.studant_id);

    const studant = await Studant.findOne({
      where: {
        [Op.and]: [{ id }, { user_id }],
      },
    });
    if (!studant) {
      return res.status(400).json({ error: "Studant not found!" });
    }
    const now = new Date();
    const trainings = await studant.getTrainings({
      through: {
        where: {
          schedule: {
            [Op.gt]: now,
          },
        },
      },
      order: [[Sequelize.literal("schedule"), "ASC"]],
    });

    return res.json({
      ...studant.dataValues,
      trainings,
    });
  }
  async store(req, res) {
    const user_id = parseInt(req.params.user_id);
    const studant_id = parseInt(req.params.studant_id);
    const id = parseInt(req.params.id);

    const training = await Training.findOne({
      where: { [Op.and]: [{ id }, { user_id }] },
    });
    if (!training) {
      return res.status(400).json({ error: "Traning not found!" });
    }
    const studant = await Studant.findOne({
      where: { [Op.and]: [{ id: studant_id }, { user_id }] },
    });
    if (!studant) {
      return res.status(400).json({ error: "Studant not found!" });
    }
    const { schedule } = req.body;
    if (schedule < new Date()) {
      return res.status(400).json({});
    }

    await studant.addTraining(training, {
      through: { schedule },
    });
    return res.send();
  }
  async destroy(req, res) {
    const user_id = parseInt(req.params.user_id);
    const studant_id = parseInt(req.params.studant_id);
    const id = parseInt(req.params.id);

    const studant = await Studant.findOne({
      where: {
        [Op.and]: [{ id: studant_id }, { user_id }],
      },
    });

    if (!studant) {
      return res.status(400).json({ error: "Studant not found!" });
    }

    const training = await Training.findOne({
      where: {
        [Op.and]: [{ id }, { user_id }],
      },
    });

    if (!training) {
      return res.status(400).json({ error: "Training not found!" });
    }

    await studant.removeTraining(training);
    return res.json({ message: "Success delete studant training!" });
  }
}

export default new StudantTrainingController();
