// src/clients/ClientContainer.tsx
import React, { useState } from 'react';
import ClientInputForm from './ClientInputForm';
import ClientSidebar from './ClientSidebar';
import ClientProfile from './ClientProfile';
import { ClientData } from '../api_service/ApiService';
import './ClientContainer.css';

interface ClientContainerProps {
  onClientSelect: (client: ClientData) => void;
  onClientCreate: (client: ClientData) => void;
  selectedClient: ClientData | null;
}

const ClientContainer: React.FC<ClientContainerProps> = ({ 
  onClientSelect, 
  onClientCreate,
  selectedClient
}) => {
  const [showForm, setShowForm] = useState(false);

  const handleCreateClick = () => {
    setShowForm(true);
  };

  const handleClientCreated = (client: ClientData) => {
    setShowForm(false);
    onClientCreate(client);
  };

  return (
    <div className="client-container">
        <ClientSidebar 
          onSelectClient={(client) => {
            setShowForm(false);
            onClientSelect(client);
          }}
          selectedClient={selectedClient}
          onCreateClick={handleCreateClick}
        />
      <div className="client-content">
        {showForm ? (
          <ClientInputForm onClientCreated={handleClientCreated} />
        ) : selectedClient ? (
          <ClientProfile client={selectedClient} />
        ) : (
          <div className="no-selection-message">
            Select a client from the sidebar or create a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientContainer;