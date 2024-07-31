const jwt = require("jsonwebtoken");

const generateToke = (user) => {
  const token = jwt.sign({ user }, "llave", { expiresIn: "1d" });
  return token;
};

module.exports = {
  generateToke,
};
