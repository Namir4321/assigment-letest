const jwt = require("jsonwebtoken");
const { readJsonFile } = require("../utils/Helper");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);
  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated." });
  }
  try {
    const token = authHeader;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const users = readJsonFile("users.json");
    const existingUser = users.find((user) => user.id === decodedToken.userId);

    if (!existingUser) {
      return res.status(401).json({ message: "Your are not authorized." });
    }
    req.user = {
      userId: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    next();
  } catch (err) {
    console.log(err);
    return res.status(403).json({ message: "Invalid token." });
  }
};
module.exports = verifyToken;
