import mongoose, { Document, Schema } from 'mongoose';
import { ClientDataSchema, IClientData } from './ClientData';

export interface IProgram extends Document {
  clientData: IClientData;
  programText: string;
  createdAt: Date;
}

const ProgramSchema: Schema = new Schema({
  clientData: { type: ClientDataSchema, required: true, _id: false },
  programText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IProgram>('Program', ProgramSchema);