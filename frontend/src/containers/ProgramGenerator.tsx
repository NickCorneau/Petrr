// frontend/src/program_generation/ProgramGenerator.tsx
import React, { useState } from 'react';
import './ProgramGenerator.css';
import { generateProgram, ClientData } from '../api_service/ApiService';
import ClientInputForm from '../components/ClientInputForm';
import ProgramOutput from '../components/ProgramOutput';

const ProgramGenerator: React.FC = () => {
  const [clientData, setClientData] = useState<ClientData>({
    age: 0,
    gender: '',
    fitnessLevel: '',
    goals: '',
    preferences: '',
    limitations: '',
    equipment: '',
    availability: '',
  });
  const [program, setProgram] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const generatedProgram = await generateProgram(clientData);
      setProgram(generatedProgram);
    } catch (err) {
      setError('Failed to generate program. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="program-generator-container">
      <h1 className="title">Hello, I'm Petrr</h1>
      <h2 className='subtitle'>(Pe)rsonal (Tr)aining (R)esearch Aide</h2>
      <ClientInputForm
        clientData={clientData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
      {error && <p className="error-message">{error}</p>}
      {program && <ProgramOutput program={program} />}
    </div>
  );
};

export default ProgramGenerator;