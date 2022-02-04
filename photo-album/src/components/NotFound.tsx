import React from 'react';

const NotFound: React.FC<{}> = () => {
  return (
    <section className="flex flex-col h-96 justify-center">
      <h1 className="text-center text-4xl font-bold">404</h1>
      <p className="text-center">Page Not Found.</p>
    </section>
  );
};
export default NotFound;
