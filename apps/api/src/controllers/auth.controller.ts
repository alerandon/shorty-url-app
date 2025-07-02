import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { errorHandler } from '../utils/errors/main';

export async function login(req: Request, res: Response) {
  try {
    const { body } = req;
    const token = await authService.login(body);
    res.json(token);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await authService.register(body);
    res.status(201).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
}
