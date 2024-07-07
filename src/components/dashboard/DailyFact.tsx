"use client";

import React, { FC, useState } from 'react';

interface DailyFactProps {
  onDayChange: (data: Record<number, string>) => void;
  initialData?: Record<number, string>;
}

const DailyFact: FC<DailyFactProps> = ({ onDayChange, initialData = {} }) => {
  const [currentDay, setCurrentDay] = useState(1);
  const [inputs, setInputs] = useState<Record<number, string>>(initialData);

  const handleEdit = (day: number, value: string) => {
    const updatedInputs = { ...inputs, [day]: value };
    setInputs(updatedInputs);
    onDayChange(updatedInputs); 
  };

  const handleNextDay = () => {
    if (currentDay < 10) {
      setCurrentDay(currentDay + 1);
    }
  };

  const renderDayInput = () => (
    <div className="day-input">
      <span>Day {currentDay}</span>
      <input
        type="text"
        value={inputs[currentDay] || ''}
        onChange={(event) => handleEdit(currentDay, event.target.value)}
      />
      <button onClick={() => handleEdit(currentDay, inputs[currentDay] || '')}>
        {currentDay in inputs ? 'Close' : 'Edit'}
      </button>
    </div>
  );

  return (
    <div>
      {renderDayInput()}
      {currentDay < 10 && <button onClick={handleNextDay}>Next Day</button>}
    </div>
  );
};

export default DailyFact;
