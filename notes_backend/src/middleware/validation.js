function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

/**
 * Validate payload for creating a note.
 */
function validateCreateNote(req, res, next) {
  const { title, content } = req.body || {};
  const errors = [];
  if (!isNonEmptyString(title)) errors.push('title is required and must be a non-empty string');
  if (!isNonEmptyString(content)) errors.push('content is required and must be a non-empty string');
  if (errors.length) {
    return res.status(400).json({ status: 'fail', errors });
  }
  return next();
}

/**
 * Validate payload for updating a note.
 * Allows partial updates but values must be non-empty strings if provided.
 */
function validateUpdateNote(req, res, next) {
  const { title, content } = req.body || {};
  const hasTitle = Object.prototype.hasOwnProperty.call(req.body || {}, 'title');
  const hasContent = Object.prototype.hasOwnProperty.call(req.body || {}, 'content');

  if (!hasTitle && !hasContent) {
    return res.status(400).json({
      status: 'fail',
      errors: ['At least one of title or content must be provided'],
    });
  }

  const errors = [];
  if (hasTitle && !isNonEmptyString(title)) errors.push('title must be a non-empty string when provided');
  if (hasContent && !isNonEmptyString(content)) errors.push('content must be a non-empty string when provided');

  if (errors.length) {
    return res.status(400).json({ status: 'fail', errors });
  }
  return next();
}

module.exports = {
  validateCreateNote,
  validateUpdateNote,
};
