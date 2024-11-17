import React, { useState } from 'react';
import axios from 'axios';
import './ProgramGenerator.css';
import { generateProgram, ClientData } from '../api_service/ApiService';

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
      <h2 className='subtitle'>(Pe)rsonal (Tr)aining (R)esearch Aide </h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            name="age"
            value={clientData.age}
            onChange={handleChange}
            placeholder="Age"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="gender"
            value={clientData.gender}
            onChange={handleChange}
            placeholder="Gender"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="fitnessLevel"
            value={clientData.fitnessLevel}
            onChange={handleChange}
            placeholder="Fitness Level"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="goals"
            value={clientData.goals}
            onChange={handleChange}
            placeholder="Goals"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="preferences"
            value={clientData.preferences}
            onChange={handleChange}
            placeholder="Preferences"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="limitations"
            value={clientData.limitations}
            onChange={handleChange}
            placeholder="Limitations"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="equipment"
            value={clientData.equipment}
            onChange={handleChange}
            placeholder="Available Equipment"
            className="input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="availability"
            value={clientData.availability}
            onChange={handleChange}
            placeholder="Availability (days/week)"
            className="input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Program'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {program && (
        <div className="program-output">
          <h2 className="output-title">Generated Workout Program</h2>
          <pre className="output-text">{program}</pre>
        </div>
      )}
    </div>
  );
};

export default ProgramGenerator;