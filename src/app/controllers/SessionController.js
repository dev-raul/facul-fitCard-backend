import User from "../models/User";
import Studant from "../models/Studant";

class SessionController {
  async store(req, res) {
    const provider = JSON.parse(req.headers.provider);

    if (provider == true) {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        return res.status(400).json({ error: "User not found!" });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(400).json({ error: "Invalid password!" });
      }

      return res.status(201).json({
        user,
        token: user.generateToken(),
      });
    } else {
      const { id_hash } = req.body;
      const studant = await Studant.findOne({ where: { id_hash } });
      if (!studant) {
        return res.status(400).json({ error: "Studant not found!" });
      }

      return res.status(201).json({
        user: studant,
        token: studant.generateToken(),
      });
    }
  }
}

export default new SessionController();
