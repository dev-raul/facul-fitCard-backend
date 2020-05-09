import * as Yup from "yup";

export const TrainingStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required()
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails!", error: err.inner });
  }
};
export const TrainingUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string()
    });
    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails!", error: err.inner });
  }
};
