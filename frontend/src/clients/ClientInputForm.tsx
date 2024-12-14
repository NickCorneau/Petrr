// frontend/src/components/ClientInputForm.tsx

import React, { useState } from 'react';
import { ClientData, createClient } from '../api_service/ApiService';
import './ClientInputForm.css';

interface ClientInputFormProps {
  onClientCreated: (client: ClientData) => void; // Callback to handle client creation
}

const ClientInputForm: React.FC<ClientInputFormProps> = ({ onClientCreated }) => {
  const [clientData, setClientData] = useState<ClientData>({
    name: '',
    age: undefined, // Initialize age as undefined
    gender: '',
    fitnessLevel: '',
    goals: '',
    preferences: '',
    limitations: '',
    equipment: '',
    availability: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClientData((prevData: ClientData) => ({
      ...prevData,
      [name]:
        name === 'age'
          ? value === ''
            ? undefined
            : parseInt(value, 10)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate required fields
    if (!clientData.name || !clientData.fitnessLevel || !clientData.goals) {
      setError('Please fill in all required fields.');
      setLoading(false);
      return;
    }

    try {
      const newClient = await createClient(clientData);
      onClientCreated(newClient); // Notify parent component
      // Reset form
      setClientData({
        name: '',
        age: undefined,
        gender: '',
        fitnessLevel: '',
        goals: '',
        preferences: '',
        limitations: '',
        equipment: '',
        availability: '',
      });
    } catch (error: any) {
      setError(error.message || 'Failed to create client');
    } finally {
      setLoading(false);
    }
  };

  // List of fields with display names and required status
  const fields = [
    { name: 'name', label: 'Name', required: true },
    { name: 'age', label: 'Age', required: false },
    { name: 'gender', label: 'Gender', required: false },
    { name: 'fitnessLevel', label: 'Fitness Level', required: true },
    { name: 'goals', label: 'Goals', required: true },
    { name: 'preferences', label: 'Preferences', required: false },
    { name: 'limitations', label: 'Limitations', required: false },
    { name: 'equipment', label: 'Equipment', required: false },
    { name: 'availability', label: 'Availability', required: false },
  ];

  return (
    <form onSubmit={handleSubmit} className="form">
      <h3 className="title">Client Input Form</h3>
      {fields.map((field) => (
        <div className="form-group" key={field.name}>
          <input
            type={field.name === 'age' ? 'number' : 'text'}
            name={field.name}
            value={
              field.name === 'age'
                ? clientData.age !== undefined
                  ? clientData.age
                  : ''
                : (clientData as any)[field.name]
            }
            onChange={handleChange}
            placeholder={`${field.label}${field.required ? ' *' : ''}`}
            className="input"
            required={field.required}
          />
        </div>
      ))}
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? 'Creating new client...' : 'Create Client'}
      </button>
    </form>
  );
};

export default ClientInputForm;
