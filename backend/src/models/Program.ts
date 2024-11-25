// backend/src/models/Program.ts

import mongoose, { Schema, Document } from 'mongoose';
import { IClientData } from './ClientData';

export interface IProgram extends Document {
  clientData: IClientData;
  programText: string;
}

const ProgramSchema: Schema = new Schema({
  clientData: { type: Object, required: true },
  programText: { type: String, required: true },
});

// Include virtuals to have `id` instead of `_id`
ProgramSchema.set('toJSON', {
  virtuals: true,
});

export default mongoose.model<IProgram>('Program', ProgramSchema);
