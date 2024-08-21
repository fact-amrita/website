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
        <tr className="hover:bg-gray-100">
          <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">{row.number}</td>
          <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">{row.description}</td>
          <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">
            {new Date(row.date).toLocaleDateString('en-GB').replace(/\//g, '-')}
          </td>
          <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">{row.points}</td>
        </tr>
      </React.Fragment>
    ));

    for (let i = rows.length / 2; i < 5; i++) {
      rows.push(
        <React.Fragment key={`empty-${i}`}>
          <tr className="hover:bg-gray-100">
            <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">ㅤ</td>
            <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">ㅤ</td>
            <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">ㅤ</td>
            <td className="px-2 py-2 text-gray-700 border-b border-gray-300 text-sm">ㅤ</td>
          </tr>
        </React.Fragment>
      );
    }

    return rows;
  };

  return (
    <div className="w-full max-w-full bg-gray-50 p-4 rounded-lg shadow-lg">
      <div className="overflow-x-auto max-h-60">
        <table className="w-full bg-gray-50 border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-2 py-2 text-gray-800 border-b border-gray-300">Number</th>
              <th className="px-2 py-2 text-gray-800 border-b border-gray-300">Description</th>
              <th className="px-2 py-2 text-gray-800 border-b border-gray-300">Date</th>
              <th className="px-2 py-2 text-gray-800 border-b border-gray-300">Points</th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows(data)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
