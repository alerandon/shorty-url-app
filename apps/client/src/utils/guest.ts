import { nanoid } from 'nanoid';

export const getGuestId = (): string => {
  let guestId = localStorage.getItem('guestId');
  if (!guestId) {
    guestId = nanoid();
    localStorage.setItem('guestId', guestId);
  }
  return guestId;
};
