class InvalidEmailError extends Error {
  constructor() {
    super();
    this.code = 1098;
    this.message = 'Invalid Email Format';
    this.status = 400;
  }
}

class InvalidPasswordError extends Error {
  constructor() {
    super();
    this.code = 1097;
    this.message = 'Invalid Password Format';
    this.status = 400;
  }
}

class DuplicateEmailError extends Error {
  constructor() {
    super();
    this.code = 1099;
    this.message = 'Duplicate Email Error';
    this.status = 400;
  }
}

class ServerError extends Error {
  constructor() {
    super();
    this.code = 2000;
    this.message = 'Server Error';
    this.status = 500;
  }
}

const ERRORS = {
  InvalidEmailError,
  InvalidPasswordError,
  DuplicateEmailError,
  ServerError
};

module.exports = ERRORS;
