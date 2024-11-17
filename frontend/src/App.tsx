import React from 'react';
import ProgramGenerator from './program_generation/ProgramGenerator';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <ProgramGenerator />
      </header>
    </div>
  );
};

export default App;