import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/main';
import * as appService from '../services/app.service';

export async function visitUrl(req: Request, res: Response) {
  try {
    const { shortCode } = req.params;
    const url = await appService.visitUrl(shortCode);
    res.redirect(url.originalUrl);
  } catch (error) {
    errorHandler(error, res);
  }
}
