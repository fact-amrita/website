// pages/admin.tsx
import { useState } from 'react';
import DailyFact from '@/components/dashboard/admin/DailyFact'

const FactCreatePage: React.FC = () => {
  const [facts, setFacts] = useState<Record<number, string>>({});

  const handleDayChange = (updatedFacts: Record<number, string>) => {
    setFacts(updatedFacts);
    saveFacts(updatedFacts);

  return (
      <DailyFact onDayChange={handleDayChange} initialData={facts} />
  );
};

export default FactCreatePage;
