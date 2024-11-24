import mongoose, { Schema } from 'mongoose';

export interface IClientData {
  name: string;
  age: number;
  gender: string;
  fitnessLevel: string;
  goals: string;
  preferences: string;
  limitations: string;
  equipment: string;
  availability: string;
}

export const ClientDataSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: false },
  gender: { type: String, required: false },
  fitnessLevel: { type: String, required: true },
  goals: { type: String, required: true },
  preferences: { type: String, required: false },
  limitations: { type: String, required: false },
  equipment: { type: String, required: false },
  availability: { type: String, required: false },
});