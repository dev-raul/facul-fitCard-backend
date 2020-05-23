import * as Yup from "yup";
export const StudantTrainingStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      schedule: Yup.date().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validator fails", message: err.inner });
  }
};
