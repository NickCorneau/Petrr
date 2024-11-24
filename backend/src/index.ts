// backend/src/app.ts
import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import Program from './models/Program';
import { IClientData } from './models/ClientData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize the OpenAI model
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  model: 'gpt-4',
  temperature: 0.7,
});

// Define prompt template
const systemTemplate = `
As an expert personal trainer, create a personalized workout plan for the following client:

- Age: {age}
- Gender: {gender}
- Fitness Level: {fitnessLevel}
- Goals: {goals}
- Preferences: {preferences}
- Limitations: {limitations}
- Equipment: {equipment}
- Availability: {availability}

Provide detailed exercises with sets, reps, and rest periods.

Format the plan clearly for client use.
`;

const promptTemplate = ChatPromptTemplate.fromMessages([
  ['system', systemTemplate],
  ['user', 'Provide a personalized workout plan.'],
]);

// Output parser to extract the string response
const parser = new StringOutputParser();

// Combine the prompt template, model, and parser into a chain
const llmChain = promptTemplate.pipe(model).pipe(parser);

// API Endpoints
app.post('/generate-program', async (req: Request, res: Response) => {
  const clientData: IClientData = req.body;
  try {
    const response = await llmChain.invoke(clientData);
    const newProgram = new Program({
      clientData,
      programText: response,
    });
    await newProgram.save();
    res.json({ program: response });
  } catch (error) {
    console.error('Error generating program:', error);
    res.status(500).json({ error: 'Failed to generate program' });
  }
});

app.get('/programs', async (req: Request, res: Response) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
