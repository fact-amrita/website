import React from 'react';

interface TableData {
  number: number;
  description: string;
  date: string;
  time?: string;
  points: number;
}

interface TableProps {
  data: TableData[];
}

const TableComponent: React.FC<TableProps> = ({ data }) => {
  const renderTableRows = (data: TableData[]) => {
    const rows = data.map((row, index) => (
      <React.Fragment key={index}>
        <tr>
          <td className="px-4 py-2 text-black">{row.number}</td>
          <td className="px-4 py-2 text-black">{row.description}</td>
          <td className="px-4 py-2 text-black">{new Date(row.date).toLocaleDateString('en-GB').replace(/\//g, '-')}</td>
          <td className="px-4 py-2 text-black">{row.points}</td>
        </tr>
        <tr><td colSpan={4}><hr className="border-gray-300" /></td></tr>
      </React.Fragment>
    ));

    for (let i = rows.length / 2; i < 5; i++) {
      rows.push(
        <React.Fragment key={`empty-${i}`}>
          <tr>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
            <td className="px-4 py-2 text-black">ㅤ</td>
          </tr>
          <tr><td colSpan={4}><hr className="border-gray-300" /></td></tr>
        </React.Fragment>
      );
    }

    return rows;
  };

  return (
    <div className="overflow-y-auto w-full h-55 sm:h-45 md:h-50 lg:h-69">
      <table className="w-full bg-slate-200 border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 text-black">Number</th>
            <th className="px-4 py-2 text-black">Description</th>
            <th className="px-4 py-2 text-black">Date</th>
            <th className="px-4 py-2 text-black">Points</th>
          </tr>
        </thead>
        <tbody>
          {renderTableRows(data)}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
