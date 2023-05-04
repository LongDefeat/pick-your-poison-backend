const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data */

const createToken = (user) => {
  console.assert(
    user.isAdmin !== undefined,
    "createToken passed user without isAdmin property attached"
  );

  let payload = {
    username: user.username,
    isAdmin: user.isAdmin || false,
  };

  return jwt.sign(payload, SECRET_KEY);
};

/** return payload from token */
const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

module.exports = { createToken, verifyToken };
