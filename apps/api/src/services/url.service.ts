import Url from '../models/url.model';
import {
  createUrlSchema,
  TCreateUrlInput,
  TUpdateUrlInput,
  updateUrlSchema,
} from '../schemas/url.schema';
import { urlNotFoundMsg } from '../utils/messages';

export async function getUrls(guestId: string) {
  const urls = await Url.find({ guestId });
  return urls;
}

export async function createUrl(data: TCreateUrlInput) {
  const validatedData = createUrlSchema.parse(data);
  const url = new Url(validatedData);
  return await url.save();
}

export async function updateUrl(
  guestId: string,
  shortCode: string,
  data: TUpdateUrlInput,
) {
  const validatedData = updateUrlSchema.parse(data);
  const url = await Url.findOne({ shortCode, guestId });
  if (!url) throw new Error(urlNotFoundMsg);
  Object.assign(url, validatedData);
  return await url.save();
}

export async function deleteUrl(guestId: string, shortCode: string) {
  const url = await Url.findOne({ shortCode, guestId });
  if (!url) throw new Error(urlNotFoundMsg);
  await url.deleteOne();
  return { message: 'URL deleted successfully' };
}
