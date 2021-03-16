import jwt from "jsonwebtoken";
import dotevn from "dotenv";
dotevn.config();

export const auth = (req, res, next) => {
  let token;
  if (req.query.auth) {
    token = req.query.auth;
  }

  if (req.header("auth-token")) {
    token = req.header("auth-token");
  }

  if (!token)
    return res
      .status(401)
      .json({ status: 401, message: "Access token invalid" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(403).json({ status: 403, message: "Access token invalid" });
  }
};
