// frontend/src/App.tsx
import React from 'react';
import ProgramGenerator from './containers/ProgramGenerator';
import './App.css';

const App: React.FC = () => {
  return (
    <div id="root">
      <header>
        <ProgramGenerator />
      </header>
    </div>
  );
};

export default App;