const User = require("../db/Schems");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ Error: "No user exists" });
    }

    const isMatch = await comparePasswords(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ Error: "Invalid password" });
    }

    const token = generateToken(user.toObject());

    res.status(200).json({ message: "Login successful", token });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
};

// Function to generate a JWT token
function generateToken(user) {
  const token = jwt.sign(user, "secretKey", { expiresIn: "5h" });
  return token;
}

// Function to compare a password against a hash
async function comparePasswords(password, hash) {
  try {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  } catch (error) {
    throw error;
  }
}

// Function to generate a JWT token
function generateToken(user) {
  const token = jwt.sign(user, "secretKey", { expiresIn: "5h" });
  return token;
}

module.exports = { Login };
