import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'http://localhost:5000';

// Define the type for the client data
export interface ClientData {
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

// Define the type for the API response
export interface GenerateProgramResponse {
  program: string;
}

// Function to generate the workout program
export const generateProgram = async (clientData: ClientData): Promise<string> => {
  try {
    const response: AxiosResponse<GenerateProgramResponse> = await axios.post(
      `${API_BASE_URL}/generate-program`,
      clientData
    );
    return response.data.program;
  } catch (error: any) {
    console.error('API call failed:', error.message || error);
    throw new Error('Failed to generate program');
  }
};

export const getClients = async (): Promise<ClientData[]> => {
  try {
    const response: AxiosResponse<ClientData[]> = await axios.get(`${API_BASE_URL}/clients`);
    return response.data;
  } catch (error: any) {
    console.error('API call failed:', error.message || error);
    throw new Error('Failed to fetch clients');
  }
};