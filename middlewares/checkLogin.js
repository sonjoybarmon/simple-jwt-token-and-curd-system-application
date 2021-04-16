const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userName, userId } = decoded;
    (req.userName = userName), (req.userId = userId), next();
  } catch {
    next("Authentication Failure");
  }
};

module.exports = checkLogin;
