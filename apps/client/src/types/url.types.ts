export interface IUrl {
  _id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  guestId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateShortURL = {
  originalUrl: string;
  guestId: string;
};
