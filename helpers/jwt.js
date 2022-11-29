var { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: ["/auth/login"],
  });
}
async function isRevoked(req, token) {
  if (!token.payload.userID) {
    return true;
  }
  return undefined;
}

module.exports = authJwt;
