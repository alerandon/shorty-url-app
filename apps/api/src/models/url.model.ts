import mongoose, { Schema, Document } from 'mongoose';
import { nanoid } from 'nanoid';

export interface IUrl extends Document {
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  guestId: string;
  createdAt: Date;
  updatedAt: Date;
}

const UrlSchema = new Schema<IUrl>(
  {
    originalUrl: { type: String, required: true },
    guestId: { type: String, required: true },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(7),
    },
    visitCount: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const Url = mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
