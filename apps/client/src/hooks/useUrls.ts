import { useState, useEffect } from 'react';
import { getUrls } from '../services/url.service';
import type { IUrl } from '../types/url.types';

export const useUrls = (page: number, limit: number) => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await getUrls(page, limit);
      setUrls(response.data);
      setTotalPages(response.totalPages);
    } catch (err) {
      setError(`Failed to fetch URLs: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, [page, limit]);

  return { urls, loading, error, totalPages, refetch: fetchUrls };
};
