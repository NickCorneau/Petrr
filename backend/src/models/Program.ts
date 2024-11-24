import mongoose, { Document, Schema } from 'mongoose';

export interface IClientData {
  age: number;
  gender: string;
  fitnessLevel: string;
  goals: string;
  preferences: string;
  limitations: string;
  equipment: string;
  availability: string;
}

export interface IProgram extends Document {
  clientData: IClientData;
  programText: string;
  createdAt: Date;
}

const ClientDataSchema: Schema = new Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  fitnessLevel: { type: String, required: true },
  goals: { type: String, required: true },
  preferences: { type: String, required: true },
  limitations: { type: String, required: true },
  equipment: { type: String, required: true },
  availability: { type: String, required: true },
});

const ProgramSchema: Schema = new Schema({
  clientData: { type: ClientDataSchema, required: true },
  programText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
