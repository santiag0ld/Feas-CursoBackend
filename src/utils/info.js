export const generateUserErrorInfo = (user) => {
  let errorMessage = "One or more properties were incomplete or not valid.\n";
  errorMessage += "List of required properties:\n";

  if (!user.first_name || typeof user.first_name !== "string") {
    errorMessage += `* first_name: needs to be a String, received ${user.first_name}\n`;
  }

  if (!user.last_name || typeof user.last_name !== "string") {
    errorMessage += `* last_name: needs to be a String, received ${user.last_name}\n`;
  }

  if (!user.email || typeof user.email !== "string") {
    errorMessage += `* email: needs to be a String, received ${user.email}\n`;
  }

  return errorMessage;
};

export const errorMiddleware = (err, req, res, next) => {

  let statusCode = 500;
  let errorMessage = "Internal Server Error";

  if (err instanceof ValidationError) {
    statusCode = 400;
    errorMessage = generateUserErrorInfo(err.user);
  } else if (err instanceof CartError) {
    statusCode = 400;
    errorMessage = "Error processing cart: " + err.message;
  } else if (err instanceof ProductError) {
    statusCode = 404;
    errorMessage = "Product not found: " + err.message;
  } else if (err instanceof AuthenticationError) {
    statusCode = 401;
    errorMessage = "Authentication failed: " + err.message;
  }

  res.status(statusCode).json({ error: errorMessage });
};

class ValidationError extends Error {
  constructor(user) {
    super();
    this.user = user;
  }
}

class CartError extends Error {}

class ProductError extends Error {}

class AuthenticationError extends Error {}
