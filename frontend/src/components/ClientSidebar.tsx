// frontend/src/components/ClientSidebar.tsx

import React, { useEffect, useState } from 'react';
import { ClientData, getClients } from '../api_service/ApiService';
import './ClientSidebar.css';

interface ClientSidebarProps {
  onSelectClient: (client: ClientData) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ onSelectClient }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientList = await getClients();
        setClients(clientList);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch clients');
      }
    };

    fetchClients();
  }, []);

  return (
    <div className="client-sidebar">
      <h3>Clients</h3>
      {error && <div className="error-message">{error}</div>}
      <ul>
        {clients.map((client) => (
          <li key={client.id} onClick={() => onSelectClient(client)}>
            {client.name} ({client.age} {client.gender}) - {client.fitnessLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSidebar;
