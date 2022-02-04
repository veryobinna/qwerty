import React from 'react';

interface MessageProps {
  text: string;
}

const Message: React.FC<MessageProps> = ({ text }) => {
  return (
    <section className="flex h-4/5screen items-center justify-center">
      <p data-testid="error-message">{text}</p>
    </section>
  );
};
export default Message;
