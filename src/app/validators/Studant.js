import * as Yup from "yup";
export const StudantStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id_hash: Yup.string().required(),
      name: Yup.string().required(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validator fails", message: err.inner });
  }
};
export const StudantUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id_hash: Yup.string(),
      name: Yup.string(),
      user_id: Yup.number().positive(),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Validator fails", message: err.inner });
  }
};
