class ApiError extends Error {
  constructor(
    statusCode,
    messege = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(messege);
    (this.statusCode = statusCode),
      (this.errors = errors),
      (this.message = messege),
      (this.data = null),
      (this.success = false);
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
