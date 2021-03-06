import { validationResult } from "express-validator/check";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

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
    res.status(201).send(user);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      const error = new Error("Email does not exist!");
      error.statusCode = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      { email: user.email, userId: user._id.toString() },
      process.env.SIGNATURE,
      { expiresIn: "1h" }
    );
    res.status(200).send({ token: token, userId: user._id.toString() });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
}

export default { signup, login };
