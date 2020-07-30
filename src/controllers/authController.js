import { validationResult } from "express-validator/check";

function signup(req, res, next) {
  console.log("in signup controller");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log("there's errors");
    const error = new Error("Validation failed!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
}

export default { signup };
