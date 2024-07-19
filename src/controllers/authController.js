const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;
  // Aquí deberías validar el usuario y contraseña
  User.findOne({ username }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Aquí deberías verificar la contraseña
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, "your_jwt_secret_key", { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
};
