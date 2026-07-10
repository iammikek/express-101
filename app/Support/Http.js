function errorJson(res, detail, status, code = null, extraHeaders = {}) {
  const payload = { detail };
  if (code != null) payload.code = code;
  res.status(status).set(extraHeaders).json(payload);
}

module.exports = { errorJson };
