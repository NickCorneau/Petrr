// backend/src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import Program from './models/Program';
import Client, { IClientData } from './models/ClientData';

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

// Updated `/generate-program` endpoint to accept clientId
app.post('/generate-program', async (req: Request, res: Response) => {
  const { clientId } = req.body;
  try {
    // Fetch client data from the database using clientId
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    const clientData = client.toObject();

    // Generate the program using the client data
    const response = await llmChain.invoke(clientData);

    // Save the new program to the database
    const newProgram = new Program({
      clientData,
      programText: response,
    });
    await newProgram.save();

    res.json({ program: response });
  } catch (error: any) {
    console.error('Error generating program:', error.message);
    res.status(500).json({ error: 'Failed to generate program' });
  }
});

// Updated `/create-client` endpoint with improved error handling
app.post('/create-client', async (req: Request, res: Response) => {
  const clientData: IClientData = req.body;
  try {
    const newClient = new Client(clientData);
    await newClient.save();
    res.json({ message: 'Client created successfully', client: newClient });
  } catch (error: any) {
    console.error('Error creating client:', error.message);

    if (error.name === 'ValidationError') {
      res.status(400).json({
        error: 'Validation error',
        details: error.errors,
      });
    } else {
      res.status(500).json({ error: 'Failed to create client' });
    }
  }
});

// Updated `/programs` endpoint
app.get('/programs', async (req: Request, res: Response) => {
  try {
    const programs = await Program.find();
    res.json(programs);
  } catch (error: any) {
    console.error('Error fetching programs:', error.message);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Updated `/clients` endpoint to fetch clients from the Client collection
app.get('/clients', async (req: Request, res: Response) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error: any) {
    console.error('Error fetching clients:', error.message);
    res.status(500).json({ error: 'Failed to fetch clients' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
