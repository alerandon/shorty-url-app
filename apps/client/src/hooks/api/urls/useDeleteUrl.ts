import { useState } from 'react';
import { deleteUrl as deleteUrlService } from '../../../services/api/url.service';
import { getGuestId } from '../../../utils/guest';

export const useDeleteUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteUrl = async (shortCode: string) => {
    try {
      setLoading(true);
      const guestId = getGuestId();
      await deleteUrlService(guestId, shortCode);
      setSuccess(true);
    } catch (err) {
      setError(`Failed to delete URL: ${err}`);
    } finally {
      setLoading(false);
    }

    return success;
  };

  return { deleteUrl, loading, error, success };
};
