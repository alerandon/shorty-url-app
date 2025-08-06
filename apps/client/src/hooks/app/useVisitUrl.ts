import { visitUrl as visitUrlService } from '../../services/app.service';

export const useVisitUrl = () => {
  const visitUrl = (shortUrl: string) => {
    visitUrlService(shortUrl);
  };

  return { visitUrl };
};
