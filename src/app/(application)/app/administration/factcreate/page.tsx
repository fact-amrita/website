"use client"

import { useState } from 'react';

  const [facts, setFacts] = useState<Record<number, string>>({});

  const handleDayChange = (updatedFacts: Record<number, string>) => {
    setFacts(updatedFacts);
    saveFacts(updatedFacts);

  return (
      <DailyFact onDayChange={handleDayChange} initialData={facts} />
  );
};


export default AdminPage;
