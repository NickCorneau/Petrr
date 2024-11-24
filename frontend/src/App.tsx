// frontend/src/App.tsx
import React from 'react';
import ProgramGenerator from './containers/ProgramGenerator';
import './App.css';

const App: React.FC = () => {
  return (
    <div id="root">
      <h1 className="title">Hello, I'm Petrr-LLM</h1>
      <h2 className="subtitle">(Pe)rsonal (Tr)aining (R)esearch Aide</h2>
      <ProgramGenerator />
    </div>
  );
};

export default App;