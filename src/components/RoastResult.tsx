import React from 'react';

interface RoastResultProps {
  result: string;
}

const RoastResult: React.FC<RoastResultProps> = ({ result }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Roast Result</h2>
      <div className="whitespace-pre-wrap">{result}</div>
    </div>
  );
};

export default RoastResult;