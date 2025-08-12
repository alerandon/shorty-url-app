import { useState, useEffect, useCallback } from 'react';
import { getUrls as getUrlsService } from '../../../services/api/url.service';
import type { IUrl } from '../../../types/url.types';
import { getGuestId } from '../../../utils/guest';

export const useUrls = (page: number, limit: number) => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrls = useCallback(async () => {
    try {
      setLoading(true);
      const guestId = getGuestId();
      const response = await getUrlsService({ guestId, page, limit });
      setUrls(response.data);
      setTotalPages(response.totalPages || 1);
    } catch (err) {
      setError(`Failed to fetch URLs: ${err}`);
    } finally {
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  return { urls, loading, error, totalPages, refetch: fetchUrls };
};
