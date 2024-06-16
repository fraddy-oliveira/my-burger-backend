var jwt = require("jwt-decode");

const authMiddleware = async (req, res, next) => {
  if (!String(req.headers?.authorization).match(/^Bearer \S+$/)) {
    res.status(401);

    return res.json({
      error: {
        message: "Bearer token is invalid.",
      },
    });
  }

  try {
    const token = String(req.headers?.authorization).split(" ")[1];

    const tokenParse = jwt.jwtDecode(token);

    req.user = tokenParse;

    req.authToken = token;
  } catch (error) {
    res.status(401);

    return res.json({
      error: {
        message: "Bearer token is invalid.",
      },
    });
  }

  next();
};

module.exports = authMiddleware;
