// frontend/src/components/ClientInputForm.tsx
import React from 'react';
import { ClientData } from '../api_service/ApiService';
import './ClientInputForm.css';

interface ClientInputFormProps {
  clientData: ClientData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

const ClientInputForm: React.FC<ClientInputFormProps> = ({ clientData, onChange, onSubmit, loading }) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {Object.keys(clientData).map((key) => (
        <div className="form-group" key={key}>
          <input
            type="text"
            name={key}
            value={(clientData as any)[key]}
            onChange={onChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="input"
          />
        </div>
      ))}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Generating...' : 'Generate Program'}
      </button>
    </form>
  );
};

export default ClientInputForm;