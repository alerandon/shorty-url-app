import { Request, Response } from 'express';
import { errorHandler } from '../utils/errors/main';
import * as urlService from '../services/url.service';

export async function getUrls(req: Request, res: Response) {
  try {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 5;
    const MAX_LIMIT = 100;
    const MIN_LIMIT = 1;

    const { guestId } = req.params;
    const { page = DEFAULT_PAGE.toString(), limit = DEFAULT_LIMIT.toString() } =
      req.query;

    const parsedPageNum = parseInt(page as string, 10) || DEFAULT_PAGE;
    const pageNum = Math.max(parsedPageNum, MIN_LIMIT);

    const parsedLimitNum = parseInt(limit as string, 10) || DEFAULT_LIMIT;
    const limitNum = Math.min(Math.max(parsedLimitNum, MIN_LIMIT), MAX_LIMIT);

    const { urls, total } = await urlService.getUrls(
      guestId,
      pageNum,
      limitNum,
    );
    const totalPages = Math.max(Math.ceil(total / limitNum), 1);
    const data = {
      data: urls,
      totalPages,
      page: pageNum,
      limit: limitNum,
      total,
    };

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

export async function deleteUrl(req: Request, res: Response) {
  try {
    const { guestId, shortCode } = req.params;
    await urlService.deleteUrl(guestId, shortCode);
    res.status(204).end();
  } catch (error) {
    errorHandler(error, res);
  }
}
