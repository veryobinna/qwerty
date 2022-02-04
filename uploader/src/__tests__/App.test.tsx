import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders app', () => {
  render(<App />);
  const header = screen.getByText(/video uploader/i);
  const uploader = screen.getByTestId('uploader');
  expect(header).toBeInTheDocument();
  expect(uploader).toBeInTheDocument();
});
