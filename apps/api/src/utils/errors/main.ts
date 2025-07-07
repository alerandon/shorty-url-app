import { Response } from 'express';
import { ZodError } from 'zod';
import {
  handleGenericError,
  handleMongooseError,
  handleUnknownError,
  handleZodError,
} from './handlers';

export const errorHandler = (error: any, res: Response): void => {
  const isZodError = error instanceof ZodError;
  const isMongooseValidationError = error?.name === 'ValidationError';
  const isMongooseDuplicateKey = error?.code === 11000;
  const isGenericError = error instanceof Error;

  if (isZodError) handleZodError(error, res);
  else if (isMongooseValidationError || isMongooseDuplicateKey)
    handleMongooseError(error, res);
  else if (isGenericError) handleGenericError(error, res);
  else handleUnknownError(error, res);
};
