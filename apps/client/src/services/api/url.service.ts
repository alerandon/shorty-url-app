import { API_URL } from '../../globals';
import type { CreateShortURL } from '../../types/url.types';

interface GetUrlsProps {
  guestId: string;
  page?: number;
  limit?: number;
}

export const getUrls = async ({
  guestId,
  page = 1,
  limit = 10,
}: GetUrlsProps) => {
  const fetchUrl = `${API_URL}/guests/${guestId}/urls?page=${page}&limit=${limit}`;
  const response = await fetch(fetchUrl);
  if (!response.ok) throw new Error('Error fetching URLs');
  return response.json();
};

export const createUrl = async (inputUrlBody: CreateShortURL) => {
  const fetchUrl = `${API_URL}/guests/${inputUrlBody.guestId}/urls`;
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(inputUrlBody),
  });
  if (!response.ok) throw new Error('Error creating URL');
  return response.json();
};

export const deleteUrl = async (guestId: string, shortCode: string) => {
  const fetchUrl = `${API_URL}/guests/${guestId}/urls/${shortCode}`;
  const response = await fetch(fetchUrl, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error deleting URL');
  return response.json();
};
