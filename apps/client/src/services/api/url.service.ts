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
  const response = await fetch(
    `${API_URL}/urls/${guestId}?page=${page}&limit=${limit}`,
  );
  if (!response.ok) throw new Error('Error fetching URLs');
  return response.json();
};

export const createUrl = async (inputUrlBody: CreateShortURL) => {
  const response = await fetch(`${API_URL}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputUrlBody),
  });
  if (!response.ok) throw new Error('Error creating URL');
  return response.json();
};
