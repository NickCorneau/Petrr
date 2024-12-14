// src/programs/ProgramContainer.tsx
import React, { useState } from 'react';
import { generateProgramForClient, ClientData } from '../api_service/ApiService';
import ProgramOutput from './ProgramOutput';
import './ProgramContainer.css';

interface ProgramContainerProps {
  selectedClient: ClientData | null;
}

const ProgramContainer: React.FC<ProgramContainerProps> = ({ selectedClient }) => {
  const [program, setProgram] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateProgram = async () => {
    if (!selectedClient || !selectedClient.id) {
      setError('Please create or select a client before generating a program.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const generatedProgram = await generateProgramForClient(selectedClient.id);
      setProgram(generatedProgram);
    } catch (err: any) {
      setError('Failed to generate program. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="program-container">
      {error && <p className="error-message">{error}</p>}
      
      {selectedClient && selectedClient.id && (
        <button
          className="generate-program-button"
          onClick={handleGenerateProgram}
          disabled={loading}
        >
          {loading ? 'Generating Program...' : 'Generate Program'}
        </button>
      )}

      {program && (
        <div className="program-output">
          <ProgramOutput program={program} />
        </div>
      )}
    </div>
  );
};

export default ProgramContainer;