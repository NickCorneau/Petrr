import React, { useEffect, useState } from 'react';
import { ClientData, getClients } from '../api_service/ApiService';
import './ClientSidebar.css';

interface ClientSidebarProps {
  onSelectClient: (client: ClientData) => void;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ onSelectClient }) => {
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      setError(null);
      try {
        const clientsData = await getClients();
        setClients(clientsData);
      } catch (err) {
        setError('Failed to fetch clients. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  return (
    <div className="client-sidebar">
      <h3 className="title">Clients</h3>
      {loading && <p>Loading clients...</p>}
      {error && <p>{error}</p>}
      <ul>
        {clients.map((client) => (
          <li key={client._doc._id} onClick={() => onSelectClient(client)}>
            {client._doc.age} ({client._doc.gender}) - {client._doc.fitnessLevel}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSidebar;