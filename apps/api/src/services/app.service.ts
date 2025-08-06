import Url from '../models/url.model';
import { urlNotFoundMsg } from '../utils/messages';

export async function visitUrl(shortCode: string) {
  const url = await Url.findOne({ shortCode });
  if (!url) throw new Error(urlNotFoundMsg);
  url.visitCount++;
  await url.save();
  return url;
}
