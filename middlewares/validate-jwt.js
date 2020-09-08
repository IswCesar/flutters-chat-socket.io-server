const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  // Read token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: "false",
      msg: "Token not found in request",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.JWT_KEY);
    console.log(uid);
    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      of: false,
      msg: "Token not valid",
    });
  }
};

module.exports = {
  validateJWT,
};
