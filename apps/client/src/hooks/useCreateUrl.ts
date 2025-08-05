import { useState } from 'react';
import { createUrl as createUrlService } from '../services/url.service';
import type { CreateShortURL, IUrl } from '../types/url.types';

export const useCreateUrl = () => {
  const [url, setUrl] = useState<IUrl | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUrl = async (newUrl: CreateShortURL) => {
    try {
      setLoading(true);
      const data = await createUrlService(newUrl);
      setUrl(data);
      return data;
    } catch (err) {
      setError('Failed to create URL');
    } finally {
      setLoading(false);
    }
  };

  return { url, loading, error, createUrl };
};
