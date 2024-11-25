// backend/src/models/ClientData.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface IClientData extends Document {
  name: string;
  age?: number; // Made age optional
  gender?: string;
  fitnessLevel: string;
  goals: string;
  preferences?: string;
  limitations?: string;
  equipment?: string;
  availability?: string;
}

// Mongoose schema for ClientData
const ClientDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false }, // Handles undefined age
  gender: { type: String, required: false },
  fitnessLevel: { type: String, required: true },
  goals: { type: String, required: true },
  preferences: { type: String, required: false },
  limitations: { type: String, required: false },
  equipment: { type: String, required: false },
  availability: { type: String, required: false },
});

// Include virtuals to have `id` instead of `_id`
ClientDataSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<IClientData>('Client', ClientDataSchema);
