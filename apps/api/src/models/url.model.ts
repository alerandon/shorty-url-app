import mongoose, { Schema, Document } from 'mongoose';

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
    originalUrl: { type: String, required: true, unique: true },
    shortCode: { type: String, required: true, unique: true },
    visitCount: { type: Number, required: true, default: 0 },
    guestId: { type: String, required: true },
  },
  { timestamps: true },
);

const Url = mongoose.model<IUrl>('Url', UrlSchema);

export default Url;
