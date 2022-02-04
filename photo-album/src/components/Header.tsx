import React from 'react';
import { Link } from 'react-router-dom';

const Header:React.FC<{}> = () => {
  return (
      <header className="text-4xl font-bold w-full mb-1 p-4 border-gray-300 border-b border-solid">
        <Link className="text-gray-900 hover:text-gray-800" to="/">
          Photo Album
        </Link>
      </header>
  );
};

export default Header;
