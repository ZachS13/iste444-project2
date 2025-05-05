const { logRequest } = require("../logger");

function loggerMiddleware(req, res, next) {
  const userId =
    req.headers["user-id"] ||
    req.body?.userId ||
    req.params?.userId ||
    req.query?.userId ||
    "unknown";

  const endpoint = `${req.originalUrl} [${req.method}]`;

  logRequest({ endpoint, userId });
  next();
}

module.exports = loggerMiddleware;
