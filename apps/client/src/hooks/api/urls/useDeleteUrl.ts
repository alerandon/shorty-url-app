import { useState } from 'react';
import { deleteUrl as deleteUrlService } from '../../../services/api/url.service';
import { getGuestId } from '../../../utils/guest';

export const useDeleteUrl = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteUrl = async (shortCode: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const guestId = getGuestId();
      await deleteUrlService(guestId, shortCode);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(`Failed to delete URL: ${err}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteUrl, loading, error, success };
};
