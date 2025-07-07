import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/main';
import * as urlService from '../services/url.service';

export async function getUrls(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const urls = await urlService.getUrls(id);
    res.status(200).json(urls);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function viewUrl(req: Request, res: Response) {
  try {
    const { body } = req;
    const url = await urlService.viewUrl(body);
    res.redirect(url.originalUrl);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function createUrl(req: Request, res: Response) {
  try {
    const { body } = req;
    const url = await urlService.createUrl(body);
    res.status(201).json(url);
  } catch (error) {
    errorHandler(error, res);
  }
}

export async function updateUrl(req: Request, res: Response) {
  try {
    const {
      body,
      params: { id },
    } = req;
    const url = await urlService.updateUrl(id, body);
    res.status(200).json(url);
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
