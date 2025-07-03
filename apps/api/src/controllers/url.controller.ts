import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/main';
import * as urlService from '../services/url.service';

export async function getUrls(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const urls = await urlService.getUrls(id);
    if (!urls || urls.length === 0)
      return res.status(404).json({ message: 'No URLs found' });
    res.status(200).json(urls);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function viewUrl(req: Request, res: Response) {
  try {
    const { body } = req;
    const url = await urlService.viewUrl(body);
    if (!url) return res.status(404).json({ message: 'URL not found' });
    res.redirect(url.originalUrl);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function createUrl(req: Request, res: Response) {
  try {
    const { body } = req;
    const user = await urlService.createUrl(body);
    res.status(201).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function updateUrl(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await urlService.updateUrl(id, body);
    res.status(200).json(user);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function deleteUrl(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const response = await urlService.deleteUrl(id);
    res.status(200).json(response);
  } catch (error) {
    errorHandler(error, res);
  }
}
