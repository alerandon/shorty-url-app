import Url from '../models/url.model';
import { createUrlSchema, TCreateUrlInput } from '../schemas/url.schema';
import { urlNotFoundMsg } from '../utils/messages';

export async function getUrls(guestId: string, page = 1, limit = 10) {
  const DEFAULT_PAGE = 1;
  const MAX_LIMIT = 100;
  const MIN_LIMIT = 1;

  const safePage = page > 0 ? page : DEFAULT_PAGE;
  const safeLimit = Math.min(Math.max(limit, MIN_LIMIT), MAX_LIMIT);
  const skip = (safePage - 1) * safeLimit;

  const findQuery = Url.find({ guestId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(safeLimit)
    .lean();
  const countQuery = Url.countDocuments({ guestId });
  const [urls, total] = await Promise.all([findQuery, countQuery]);

  const response = { urls, total, page: safePage, limit: safeLimit };
  return response;
}

export async function createUrl(data: TCreateUrlInput) {
  const validatedData = createUrlSchema.parse(data);
  const url = new Url(validatedData);
  return await url.save();
}

export async function deleteUrl(guestId: string, shortCode: string) {
  const url = await Url.findOne({ shortCode, guestId });
  if (!url) throw new Error(urlNotFoundMsg);
  await url.deleteOne();
}
