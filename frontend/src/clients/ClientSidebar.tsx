// src/clients/ClientSidebar.tsx
import React, { useEffect, useState } from 'react';
import { ClientData, getClients } from '../api_service/ApiService';
import './ClientSidebar.css';

interface ClientSidebarProps {
  onSelectClient: (client: ClientData) => void;
  selectedClient: ClientData | null;
  onCreateClick: () => void; 
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ 
  onSelectClient,
  selectedClient,
  onCreateClick
}) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="client-sidebar">
      <h3 className="client-header">Clients      
        <button 
          className="create-client-button"
          onClick={onCreateClick}
        >
        +
        </button>
      </h3>
      


      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search clients..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      {error && <div className="error-message">{error}</div>}
      
      <ul className="client-list">
        {filteredClients.map((client) => (
          <li 
            key={client.id} 
            onClick={() => onSelectClient(client)}
            className={selectedClient?.id === client.id ? 'selected' : ''}
          >
            {client.name} ({client.age} {client.gender})
          </li>
        ))}
      </ul>
      
      {filteredClients.length === 0 && searchTerm && (
        <div className="error-message">No clients found</div>
      )}
    </div>
  );
};

export default ClientSidebar;