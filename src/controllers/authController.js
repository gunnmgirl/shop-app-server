import { validationResult } from "express-validator/check";
import bcrypt, { hash } from "bcryptjs";

import User from "../Models/userModel";

async function signup(req, res, next) {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Validation failed!");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send(user);
  } catch (error) {
    error.statusCode = 500;
    next(error);
  }
}

export default { signup };
