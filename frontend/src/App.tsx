// src/App.tsx
import React, { useState } from 'react';
import ClientContainer from './clients/ClientContainer';
import ProgramContainer from './programs/ProgramContainer';
import { ClientData } from './api_service/ApiService';
import './App.css';

const App: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);

  const handleClientSelect = (client: ClientData) => {
    setSelectedClient(client);
  };

  const handleClientCreate = (client: ClientData) => {
    setSelectedClient(client);
  };

  return (
    <div className="app-container">
      <h1 className="title">Hello, I'm Petrr-LLM</h1>
      <h2 className="subtitle">(Pe)rsonal (Tr)aining (R)esearch Aide</h2>
      <ClientContainer 
        onClientSelect={handleClientSelect}
        onClientCreate={handleClientCreate}
        selectedClient={selectedClient}
      />
      <ProgramContainer selectedClient={selectedClient} />
    </div>
  );
};

export default App;