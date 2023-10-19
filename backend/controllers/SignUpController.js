const User = require("../db/Schems");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const SignUp = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let find = await User.findOne({ email: email });

    if (find) {
      return res.status(400).json({ Error: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    let user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    let newUser = user.toObject();
    const token = generateToken(newUser);

    res.json({ message: "Register Successful", token: token });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

// Function to hash a password
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
}

// Function to generate a JWT token
function generateToken(user) {
  const token = jwt.sign(user, "secretKey", { expiresIn: "5h" });
  return token;
}

module.exports = { SignUp };
