// frontend/src/components/ProgramOutput.tsx
import React from 'react';
import './ProgramOutput.css';

interface ProgramOutputProps {
  program: string;
}

const ProgramOutput: React.FC<ProgramOutputProps> = ({ program }) => {
  return (
    <div className="program-output">
      <h2 className="output-title">Generated Workout Program</h2>
      <pre className="output-text">{program}</pre>
    </div>
  );
};

export default ProgramOutput;
