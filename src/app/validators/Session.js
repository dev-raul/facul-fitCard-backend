import * as Yup from "yup";

export const SessionStore = async (req, res, next) => {
  try {
    const provider = JSON.parse(req.headers.provider);

    let schema;
    if (provider) {
      schema = Yup.object().shape({
        username: Yup.string().required().min(4).max(20),
        password: Yup.string().required().min(6),
      });
    } else {
      schema = Yup.object().shape({
        id_hash: Yup.string().required(),
      });
    }

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails", error: err.inner });
  }
};
