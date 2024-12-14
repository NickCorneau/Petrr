import React from 'react';
import { ClientData } from '../api_service/ApiService';
import './ClientProfile.css';

interface ClientProfileProps {
  client: ClientData;
}

const ClientProfile: React.FC<ClientProfileProps> = ({ client }) => {
  return (
    <div className="client-profile">
      <h3>Client Profile</h3>
      <div className="profile-details">
        <div className="profile-field">
          <label>Name:</label>
          <span>{client.name}</span>
        </div>
        {client.age && (
          <div className="profile-field">
            <label>Age:</label>
            <span>{client.age}</span>
          </div>
        )}
        {client.gender && (
          <div className="profile-field">
            <label>Gender:</label>
            <span>{client.gender}</span>
          </div>
        )}
        <div className="profile-field">
          <label>Fitness Level:</label>
          <span>{client.fitnessLevel}</span>
        </div>
        <div className="profile-field">
          <label>Goals:</label>
          <span>{client.goals}</span>
        </div>
        {client.preferences && (
          <div className="profile-field">
            <label>Preferences:</label>
            <span>{client.preferences}</span>
          </div>
        )}
        {client.limitations && (
          <div className="profile-field">
            <label>Limitations:</label>
            <span>{client.limitations}</span>
          </div>
        )}
        {client.equipment && (
          <div className="profile-field">
            <label>Equipment:</label>
            <span>{client.equipment}</span>
          </div>
        )}
        {client.availability && (
          <div className="profile-field">
            <label>Availability:</label>
            <span>{client.availability}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;