import Training from "../models/Training";
import ItemTraining from "../models/ItemTraining";
import { Op } from "sequelize";

class ItemTrainingController {
  async index(req, res) {
    const training_id = parseInt(req.params.training_id);

    const traning = await Training.findByPk(training_id, {
      include: [
        {
          model: ItemTraining,
          as: "item_trainings",
          order: [["number", "ASC"]],
        },
      ],
    });

    return res.json(traning);
  }
  async store(req, res) {
    const { number, instrument, series, repeat, load, observation } = req.body;
    const training_id = parseInt(req.params.training_id);

    if (!(await Training.findByPk(training_id))) {
      return res.status(400).json({ error: "Training not found!" });
    }

    const itemTraning = await ItemTraining.create({
      training_id,
      number,
      instrument,
      series,
      repeat,
      load,
      observation,
    });

    return res.status(201).json(itemTraning);
  }

  async update(req, res) {
    const { number, instrument, series, repeat, load, observation } = req.body;
    const training_id = parseInt(req.params.training_id);
    const id = parseInt(req.params.id);

    if (!(await Training.findByPk(training_id))) {
      return res.status(400).json({ error: "Training not found!" });
    }
    const itemTraining = await ItemTraining.findOne({
      where: {
        [Op.and]: [{ id }, { training_id }],
      },
    });

    if (!itemTraining) {
      return res.status(400).json({ error: "Item training not found!" });
    }

    await itemTraining.update({
      number,
      instrument,
      series,
      repeat,
      observation,
      load,
    });

    return res.json(itemTraining);
  }

  async destroy(req, res) {
    const training_id = parseInt(req.params.training_id);
    const id = parseInt(req.params.id);
    const itemTraining = await ItemTraining.findOne({
      where: { [Op.and]: [{ id }, { training_id }] },
    });

    if (!itemTraining) {
      return res.status(400).json({ error: "Item training not found!" });
    }
    await itemTraining.destroy();
    return res.send();
  }
}

export default new ItemTrainingController();
