/**
 * Request Validation Middleware
 */

import Joi from 'joi';

// Copilot Chat message schema
const copilotChatSchema = Joi.object({
  messages: Joi.array().items(
    Joi.object({
      role: Joi.string().valid('user', 'assistant').required(),
      content: Joi.string().required()
    })
  ).required(),
  context: Joi.object({
    repository: Joi.string(),
    currentFile: Joi.string(),
    codeSnippet: Joi.string(),
    language: Joi.string()
  }).optional()
});

// DevOps consultation schema
const devopsConsultSchema = Joi.object({
  question: Joi.string().required(),
  context: Joi.object().optional()
});

// Repository creation schema
const repoCreateSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Z0-9-_.]+$/).required(),
  description: Joi.string().optional(),
  template: Joi.string().optional(),
  setupAITeam: Joi.boolean().default(false)
});

export function validateRequest(req, res, next) {
  let schema;
  
  switch (req.path) {
    case '/copilot/chat':
      schema = copilotChatSchema;
      break;
    case '/devops/consult':
      schema = devopsConsultSchema;
      break;
    case '/devops/create-repo':
      schema = repoCreateSchema;
      break;
    default:
      return next(); // Skip validation for other endpoints
  }

  const { error, value } = schema.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      error: 'Validation failed',
      details: error.details.map(d => d.message)
    });
  }

  req.body = value; // Use validated data
  next();
}
