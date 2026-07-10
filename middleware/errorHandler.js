const { DomainException } = require('../app/Exceptions/DomainException');
const { errorJson } = require('../app/Support/Http');

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof DomainException) {
    errorJson(res, err.message, err.status, err.code);
    return;
  }

  console.error(err);
  errorJson(res, 'Internal Server Error', 500);
}

module.exports = { errorHandler };
