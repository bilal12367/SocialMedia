import jwt from "jsonwebtoken";
const authMiddleware = (handler) => {
  return async (req, res) => {
    if (req.body.token) {
      const token = req.body.token;
      jwt.verify(token, process.env.SECRET_KEY, (err, data) => {
        if (err) {
          res
            .status(403)
            .json({ err: "TokenExpired", message: "Session Expired." });
        } else {
          data.token = token;
          return handler(req, res, data);
        }
      });
    } else {
      res.status(401).json({ err: "UnAuthorized", message: "Missing Token" });
    }
  };
};

export default authMiddleware;
