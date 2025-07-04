import Url from '../models/url.model';
import {
  createUrlSchema,
  TCreateUrlInput,
  TUpdateUrlInput,
  updateUrlSchema,
} from '../schemas/url.schema';

const urlNotFoundMsg = 'URL not found';

export async function getUrls(id: string) {
  return await Url.findAll({ where: { guestId: id } });
}

export async function viewUrl(shortCode: string) {
  const url = await Url.findOne({ where: { shortCode } });
  if (!url) throw new Error(urlNotFoundMsg);
  url.increment('visitCount', { by: 1 });
  return url;
}

export async function createUrl(data: TCreateUrlInput) {
  const validatedData = createUrlSchema.parse(data);
  return await Url.create(validatedData);
}

export async function updateUrl(id: string, data: TUpdateUrlInput) {
  const validatedData = updateUrlSchema.parse(data);
  const url = await Url.findByPk(id);
  if (!url) throw new Error(urlNotFoundMsg);
  return await url.update(validatedData);
}

export async function deleteUrl(id: string) {
  const url = await Url.findByPk(id);
  if (!url) throw new Error(urlNotFoundMsg);
  await url.destroy();
  const response = { message: 'URL deleted successfully' };
  return response;
}
