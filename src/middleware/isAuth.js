import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const token = req.get("Authorization");
  try {
    const decodedToken = jwt.verify(token, process.env.SIGNATURE);
    if (!decodedToken) {
      const error = new Error("Not authenticated!");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
}
