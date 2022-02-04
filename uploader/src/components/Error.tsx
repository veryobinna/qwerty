import React from 'react';

interface Props {
  message: string;
}
const Error: React.FC<Props> = ({ message }) => {
  return (
    <section data-testid="error" className="error">
      <p data-testid="error-text">{message}</p>
    </section>
  );
};
export default Error;
