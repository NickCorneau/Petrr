// frontend/src/components/ProgramOutput.tsx

import React from 'react';
import './ProgramOutput.css';

interface ProgramOutputProps {
  program: string;
}

const ProgramOutput: React.FC<ProgramOutputProps> = ({ program }) => {
  return (
    <div className="program-output">
      <h3>Generated Program</h3>
      <pre>{program}</pre>
    </div>
  );
};

export default ProgramOutput;
