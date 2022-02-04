import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';
import App from '../App';

test('renders app', () => {
  const r = createRenderer();
  r.render(<App />);
  fetchMock.mockOnce(JSON.stringify([]));
  expect(r.getRenderOutput()).toMatchSnapshot();
});

