import { API_URL } from '../globals';
import type { CreateShortURL } from '../types/url.types';

export const getUrls = async (page: number = 1, limit: number = 10) => {
  const response = await fetch(`${API_URL}/urls?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Error fetching URLs');
  }
  return response.json();
};

export const visitUrl = async (shortUrl: string) => {
  const response = await fetch(`${API_URL}/urls/${shortUrl}`);
  if (!response.ok) {
    throw new Error('Error fetching URL');
  }
  return response.json();
};

export const createUrl = async (url: CreateShortURL) => {
  const response = await fetch(`${API_URL}/urls`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(url),
  });
  if (!response.ok) {
    throw new Error('Error creating URL');
  }
  return response.json();
};
