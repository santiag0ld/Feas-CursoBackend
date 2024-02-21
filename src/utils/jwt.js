import jwt from "jsonwebtoken";

const { sign, verify } = jwt;

const JWT_PRIVATE_KEY = "jwtVV";

const createToken = (user) => {
  return sign(user, JWT_PRIVATE_KEY, { expiresIn: "1d" });
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["Authorization"];
  if (!authHeader)
    res.status(401).json({ status: "error", error: "not authenticated" });
  const token = authHeader.split(" ");
  verify(token, JWT_PRIVATE_KEY, (err, user) => {
    if (err)
      return res.status(401).json({ status: "error", error: "not authorized" });
    req.user = userDecode;
    next();
  });
};

export default {
  createToken,
  authToken,
  JWT_PRIVATE_KEY,
};
