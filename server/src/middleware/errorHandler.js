export function notFoundHandler(req, res) {
  res.status(404).json({ message: "Route not found." });
}

export function errorHandler(error, req, res, next) {
  console.error(error);

  if (res.headersSent) {
    return next(error);
  }

  return res.status(500).json({
    message: "Something went wrong on the server.",
  });
}

