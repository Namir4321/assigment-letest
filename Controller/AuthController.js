const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { readJsonFile, writeJsonFile } = require("../utils/Helper");
const { v4: uuidv4 } = require("uuid");

const {
  validateWithZodSchema,
  RegisterSchema,
  LoginSchema,
} = require("../Validation/validation");
const { hashedByBcryptPassword } = require("../utils/HashPasswordHelper");
exports.postregisteruser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validateFields = await validateWithZodSchema(
    RegisterSchema,
    req.body
  );
    const users = readJsonFile("users.json");
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const hashedPassword = await hashedByBcryptPassword(password);
    const newUser = {
      id: uuidv4(), 
      name,
      email,
      password: hashedPassword,
    };
    users.push(newUser);
    writeJsonFile("users.json", users);
    return res.status(200).json({ message: "user registered" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
exports.postloginUser = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email,password)
   const validateFields = await validateWithZodSchema(
    LoginSchema,
    req.body
  );
  try {
    const users = readJsonFile("users.json");
    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(404).json({ error: "Invalid credentials" });
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      if (isMatch) {
        const userId = user._id;
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.SECRET_KEY,
          { expiresIn: "1hr" }
        );
        const userResponse = user;
        delete userResponse.password;
        res.status(200).json({
          message: "Login Sucessfullly",
          accessToken,
          userId,
          user: userResponse,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
