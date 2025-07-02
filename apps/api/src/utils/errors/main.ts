import { Response } from 'express';
import { ZodError } from 'zod';
import {
  ValidationError as SequelizeValidationError,
  UniqueConstraintError as SequelizeUniqueConstraintError,
} from 'sequelize';
import {
  handleGenericError,
  handleSequelizeUniqueConstraintError,
  handleSequelizeValidationError,
  handleUnknownError,
  handleZodError,
} from './handlers';

export const errorHandler = (error: any, res: Response): void => {
  const isZodError = error instanceof ZodError;
  const isSequelizeUniqueConstraintError =
    error instanceof SequelizeUniqueConstraintError;
  const isSequelizeValidationError = error instanceof SequelizeValidationError;
  const isGenericError = error instanceof Error;

  if (isZodError) handleZodError(error, res);
  else if (isSequelizeUniqueConstraintError)
    handleSequelizeUniqueConstraintError(error, res);
  else if (isSequelizeValidationError)
    handleSequelizeValidationError(error, res);
  else if (isGenericError) handleGenericError(error, res);
  else handleUnknownError(error, res);
};
