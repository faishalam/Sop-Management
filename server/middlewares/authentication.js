const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Invalid token" });
    if (token.slice(0, 7) !== "Bearer ")
      return res.status(401).json({ message: "Invalid token" });

    token = token.slice(7);
    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id);
    if (!user) return res.status(401).json({ message: "Invalid tokssn" });

    req.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      nrp: user.nrp,
    };

    next();
  } catch (error) {
    console.log(error);
  }
}

module.exports = authentication;
