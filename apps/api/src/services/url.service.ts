import Url from '../models/url.model';
import {
  createUrlSchema,
  TCreateUrlInput,
  TUpdateUrlInput,
  updateUrlSchema,
} from '../schemas/url.schema';

const urlNotFoundMsg = 'URL not found';

export async function getUrls(guestId: string) {
  const urls = await Url.find({ guestId });
  return urls;
}

export async function visitUrl(shortCode: string) {
  const url = await Url.findOne({ shortCode });
  if (!url) throw new Error(urlNotFoundMsg);
  url.visitCount++;
  await url.save();
  return url;
}

export async function createUrl(data: TCreateUrlInput) {
  const validatedData = createUrlSchema.parse(data);
  const url = new Url(validatedData);
  return await url.save();
}

export async function updateUrl(id: string, data: TUpdateUrlInput) {
  const validatedData = updateUrlSchema.parse(data);
  const url = await Url.findById(id);
  if (!url) throw new Error(urlNotFoundMsg);
  Object.assign(url, validatedData);
  return await url.save();
}

export async function deleteUrl(id: string) {
  const url = await Url.findById(id);
  if (!url) throw new Error(urlNotFoundMsg);
  await url.deleteOne();
  return { message: 'URL deleted successfully' };
}
