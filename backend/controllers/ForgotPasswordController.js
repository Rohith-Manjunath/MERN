const User = require("../db/Schems");
const bcrypt = require("bcrypt");

const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      const { password } = req.body;

      user.password = await bcrypt.hash(password, 10);

      await user.save();

      return res.json({ message: "Password updated successfully" });
    } else {
      return res.status(404).json({ error: "User not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { ForgotPassword };
