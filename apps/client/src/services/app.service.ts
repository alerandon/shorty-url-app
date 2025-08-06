import { ROOT_URL } from '../globals';

export const visitUrl = (shortUrl: string) => {
  window.location.href = `${ROOT_URL}/${shortUrl}`;
};
