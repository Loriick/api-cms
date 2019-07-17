const jwt = require("jsonwebtoken");

const createToken = (user, secret, expiresIn) => {
  const { username, email } = user;
  return jwt.sign({ username, email }, secret, { expiresIn });
};

const unAuthenticated = currentUser => {
  if (!currentUser) {
    throw new Error("You must be signed in");
  }
};

exports.createToken = createToken;
exports.unAuthenticated = unAuthenticated;
