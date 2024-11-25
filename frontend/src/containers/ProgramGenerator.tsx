// frontend/src/containers/ProgramGenerator.tsx

import React, { useState } from 'react';
import { generateProgramForClient, ClientData } from '../api_service/ApiService';
import ClientInputForm from '../components/ClientInputForm';
import ProgramOutput from '../components/ProgramOutput';
import ClientSidebar from '../components/ClientSidebar';
import './ProgramGenerator.css';

const ProgramGenerator: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [program, setProgram] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle client creation
  const handleCreateClient = (newClient: ClientData) => {
    setSelectedClient(newClient);
    setProgram(''); // Clear the program output
  };

  // Handle program generation for the selected client
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

  // Handle client selection from the sidebar
  const handleSelectClient = (client: ClientData) => {
    setSelectedClient(client);
    setProgram(''); // Clear the program when switching clients
  };

  return (
    <div className="program-generator-container">
      <div className="client-sidebar">
        <ClientSidebar onSelectClient={handleSelectClient} />
      </div>

      <div className="program-generator-content">
        {/* Client Input Form */}
        <ClientInputForm onClientCreated={handleCreateClient} />

        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Generate Program Button */}
        {selectedClient && selectedClient.id && (
          <button
            className="generate-program-button"
            onClick={handleGenerateProgram}
            disabled={loading}
          >
            {loading ? 'Generating Program...' : 'Generate Program'}
          </button>
        )}
      </div>

      {/* Program Output */}
      {program && (
        <div className="program-output">
          <ProgramOutput program={program} />
        </div>
      )}
    </div>
  );
};

export default ProgramGenerator;