import React from 'react';
import { Link } from 'react-router-dom';

interface ControlProps {
  styles: string;
  location: string;
  text: string;
}

export const Control: React.FC<ControlProps> = ({
  styles,
  location,
  text,
}: ControlProps) => {
  return (
    <Link data-testid="control" to={location}>
      <button data-testid="control-button"
        className={`
        absolute text-sm translate-x-0 -translate-y-1/2 ${styles} w-11 h-11
        opacity-25 hover:opacity-50 border-solid bg-gray-300 rounded-full
        `}
      >
        {text}
      </button>
    </Link>
  );
};