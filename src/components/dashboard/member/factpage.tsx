import React from 'react';

interface FactPageProps {
  facts: Record<number, string>;
}

const FactPage: React.FC<FactPageProps> = ({ facts }) => {
  return (
    <div>
      <h1>Facts of Each Day</h1>
      <div>
        {Object.entries(facts).map(([day, fact]) => (
          <div key={day} style={{ marginBottom: '10px' }}>
            <strong>Day {day}:</strong> {fact}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FactPage;
