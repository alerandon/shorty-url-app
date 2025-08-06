import { useState, useEffect } from 'react';
import { getUrls } from '../../../services/api/url.service';
import type { IUrl } from '../../../types/url.types';
import { getGuestId } from '../../../utils/guest';

export const useUrls = (page: number, limit: number) => {
  const [urls, setUrls] = useState<IUrl[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const guestId = getGuestId();
      const response = await getUrls({ guestId, page, limit });
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
