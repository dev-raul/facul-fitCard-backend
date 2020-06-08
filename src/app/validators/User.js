import * as Yup from "yup";
export const UserStore = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required().min(4).max(20),
      password: Yup.string().required().min(6),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails", error: err.inner });
  }
};
export const UserUpdate = async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      username: Yup.string().min(4).max(20),
      oldPassword: Yup.string().min(6).required(),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required() : field
      ),
    });

    await schema.validate(req.body, { abortEarly: false });
    return next();
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Validator fails", error: err.inner });
  }
};
