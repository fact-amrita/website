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
    setInputs({ ...inputs, [day]: value });
    onDayChange(inputs); // Pass updated data to admin function
  };

  const handleNextDay = () => {
    if (currentDay < 10) {
      setCurrentDay(currentDay + 1);
      setInputs({}); // Reset inputs for new day
    }
  };

  const renderDayInput = () => (
    <div className="day-input">
      <span>Day {currentDay}</span>
      <input
        type="number"
        value={inputs[currentDay] || ''}
        onChange={(event) => handleEdit(currentDay, event.target.value)}
        disabled={!(currentDay in inputs)} // Disable if day has no value
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
