import Url from '../models/url.model';
import {
  createUrlSchema,
  TCreateUrlInput,
  TUpdateUrlInput,
  updateUrlSchema,
} from '../schemas/url.schema';

export async function getUrls(id: string) {
  return await Url.findAll({ where: { guestId: id } });
}

export async function viewUrl(shortCode: string) {
  return await Url.findOne({ where: { shortCode } });
}

export async function createUrl(data: TCreateUrlInput) {
  const validatedData = createUrlSchema.parse(data);
  return await Url.create(validatedData);
}

export async function updateUrl(id: string, data: TUpdateUrlInput) {
  const validatedData = updateUrlSchema.parse(data);
  const url = await Url.findByPk(id);
  if (!url) throw new Error('URL not found');
  return await url.update(validatedData);
}

export async function deleteUrl(id: string) {
  const url = await Url.findByPk(id);
  if (!url) throw new Error('URL not found');
  await url.destroy();
  return { message: 'URL deleted successfully' };
}
