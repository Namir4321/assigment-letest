const bcryptjs = require("bcryptjs");
exports.hashedByBcryptPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return hashedPassword;
  } catch (err) {
    console.log(err);
  }
};
