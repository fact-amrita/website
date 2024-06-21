import React from 'react';

interface BoxProps {
  number: number;
  text: string;
}

const Box: React.FC<BoxProps> = ({ number, text }) => {
  return (
    <div className="flex flex-col justify-center items-center bg-white text-black text-md text-fit font-bold h-24 w-full rounded-lg">
      <span>{number}</span>  
      <span>{text}</span>
    </div>
  );
};

export default Box;
