import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/main';
import * as urlService from '../services/url.service';

export async function getUrls(req: Request, res: Response) {
  try {
    const { guestId } = req.params;
    const urls = await urlService.getUrls(guestId);
    const data = { data: urls, totalPages: Math.ceil(urls.length / 10) };
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function createUrl(req: Request, res: Response) {
  try {
    const {
      body,
      params: { guestId },
    } = req;
    const url = await urlService.createUrl({ ...body, guestId });
    const data = { data: url };
    res.status(201).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function updateUrl(req: Request, res: Response) {
  try {
    const {
      body,
      params: { guestId, shortCode },
    } = req;
    const url = await urlService.updateUrl(guestId, shortCode, body);
    const data = { data: url };
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function deleteUrl(req: Request, res: Response) {
  try {
    const { guestId, shortCode } = req.params;
    const response = await urlService.deleteUrl(guestId, shortCode);
    if (!response) {
      return res.status(404).json({ message: 'URL not found' });
    }
    const data = { message: 'URL deleted successfully' };
    res.status(200).json(data);
  } catch (error) {
    errorHandler(error, res);
  }
}
