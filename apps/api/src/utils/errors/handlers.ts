import { Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { Error as MongooseError } from 'mongoose';

export function handleZodError(error: ZodError, res: Response) {
  const errorMessages = error.errors.map((err: ZodIssue) => err.message);
  return res.status(400).json({
    message: 'Validation Error',
    errors: errorMessages,
    details: error.errors,
  });
}

export function handleMongooseError(error: unknown, res: Response) {
  const isValidationError = error instanceof MongooseError.ValidationError;
  const isDuplicateKeyError = (error as any)?.code === 11000;

  if (isValidationError) {
    const errorMessages = Object.values(
      (error as MongooseError.ValidationError).errors,
    ).map((err) => (err as MongooseError.ValidatorError).message);
    return res.status(400).json({
      message: 'Mongoose Validation Error',
      errors: errorMessages,
      details: (error as MongooseError.ValidationError).errors,
    });
  }

  if (isDuplicateKeyError) {
    return res.status(400).json({
      message: 'Duplicate key error',
      error: (error as any).keyValue,
    });
  }

  return res.status(500).json({
    message: 'Mongoose Error',
    error: (error as any).message || error,
  });
}

export function handleGenericError(error: Error, res: Response) {
  return res.status(500).json({
    message: 'Internal Server Error',
    error: error.message,
  });
}

export function handleUnknownError(error: unknown, res: Response) {
  return res.status(500).json({
    message: 'Internal Server Error',
    error,
  });
}
