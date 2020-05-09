import * as Yup from "yup";

export const ItemTrainerStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      number: Yup.number()
        .positive()
        .required(),
      instrument: Yup.string().required(),
      series: Yup.number()
        .positive()
        .required(),
      repeat: Yup.number()
        .positive()
        .required(),
      load: Yup.number()
        .positive()
        .required(),
      observation: Yup.string()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails!", error: err.inner });
  }
};
export const ItemTrainerUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      number: Yup.number().positive(),

      instrument: Yup.string(),
      series: Yup.number().positive(),

      repeat: Yup.number().positive(),

      load: Yup.number().positive(),

      observation: Yup.string()
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails!", error: err.inner });
  }
};
