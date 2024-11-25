// frontend/src/api_service/ApiService.tsx

import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Define the type for the client data
export interface ClientData {
  id?: string; // Include the id field for existing clients
  name: string;
  age?: number; // Make age optional
  gender?: string;
  fitnessLevel: string;
  goals: string;
  preferences?: string;
  limitations?: string;
  equipment?: string;
  availability?: string;
}

// Define the type for the API response
export interface GenerateProgramResponse {
  program: string;
}

// Define the type for the new client creation response
export interface CreateClientResponse {
  message: string;
  client: ClientData;
}

// Function to create a new client
export const createClient = async (clientData: ClientData): Promise<ClientData> => {
  try {
    const response: AxiosResponse<CreateClientResponse> = await axios.post(
      `${API_BASE_URL}/create-client`,
      clientData
    );
    return response.data.client;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // Return the validation errors from the server
      throw new Error(error.response.data.error || 'Failed to create client');
    } else {
      console.error('API call failed:', error.message || error);
      throw new Error('Failed to create client');
    }
  }
};

// Function to generate a program for an existing client
export const generateProgramForClient = async (clientId: string): Promise<string> => {
  try {
    const response: AxiosResponse<GenerateProgramResponse> = await axios.post(
      `${API_BASE_URL}/generate-program`,
      { clientId }
    );
    return response.data.program;
  } catch (error: any) {
    console.error('API call failed:', error.message || error);
    throw new Error('Failed to generate program');
  }
};

// Function to get the list of clients
export const getClients = async (): Promise<ClientData[]> => {
  try {
    const response: AxiosResponse<ClientData[]> = await axios.get(`${API_BASE_URL}/clients`);
    return response.data;
  } catch (error: any) {
    console.error('API call failed:', error.message || error);
    throw new Error('Failed to fetch clients');
  }
};
