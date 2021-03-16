import jwt from "jsonwebtoken";
import dotevn from "dotenv";
dotevn.config();

export const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res
      .status(401)
      .json({ status: 401, message: "Access token invalidation" });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Access token invalidation" });
  }
};
