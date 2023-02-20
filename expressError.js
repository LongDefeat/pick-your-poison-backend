/** ExpressError extends normal JS error so a status
 * can be added when makin an instance, if needed
 *
 * error-handling middleware will return one of these errors
 */

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

/** 404 Not Found error */

class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404);
  }
}

/** 401 Unauthorized error */

class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

/** 400 Bad Request error */

class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 403);
  }
}

/** 403 Forbidden Error */

class ForbiddenError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 403);
  }
}

module.exports = {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
};
