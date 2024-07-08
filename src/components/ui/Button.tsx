import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = 'button', className = '' }) => {
  const baseClass = "px-12 py-4 text-sm font-medium uppercase tracking-widest text-black bg-white border-none rounded-full shadow-md transition-all duration-300 ease-in-out cursor-pointer outline-none hover:bg-green-400 hover:text-white hover:shadow-lg hover:-translate-y-1 active:-translate-y-0.5 justify-center items-center";
  const combinedClass = `${baseClass} ${className}`.trim(); // Combine classes

  return (
    <button
      onClick={onClick}
      className={combinedClass} 
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
