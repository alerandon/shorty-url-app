import { Response } from 'express';
import { ZodError } from 'zod';
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError as SequelizeUniqueConstraintError,
} from 'sequelize';

export function handleZodError(error: ZodError, res: Response) {
  const errorMessages = error.errors.map((err) => err.message);
  return res.status(400).json({
    message: 'Validation Error',
    errors: errorMessages,
    details: error.errors,
  });
}

export function handleSequelizeUniqueConstraintError(
  error: SequelizeUniqueConstraintError,
  res: Response,
) {
  const errorMessage = error.message ?? 'Error de clave unica duplicada';
  return res.status(400).json({
    message: 'Database Unique Constraint Error',
    error: errorMessage,
  });
}

export function handleSequelizeValidationError(
  error: SequelizeValidationError,
  res: Response,
) {
  const errorMessages = error.errors.map((err) => err.message);
  return res.status(400).json({
    message: 'Database Validation Error',
    errors: errorMessages,
    details: error.errors,
  });
}

export function handleGenericError(error: Error, res: Response) {
  return res.status(500).json({
    message: 'Internal Server Error',
    error: `${error.message}`,
  });
}

export function handleUnknownError(error: unknown, res: Response) {
  return res.status(500).json({
    message: 'Internal Server Error',
    error,
  });
}
