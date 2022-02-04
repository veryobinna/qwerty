import React from 'react';
import { render } from '@testing-library/react';
import ProgressBar from '../components/ProgressBar';

test('displays progress bar', async () => {
  let progress = render(<ProgressBar progress={0} />);
  const innerDiv = await progress.findByTestId('progres-bar-inner-div');
  const text = await progress.findByTestId('progres-bar-text');

  for (let i = 0; i < 100; i += 10) {
    progress.rerender(<ProgressBar progress={i} />);
    expect(innerDiv.style.width).toEqual(`${i}%`);
    expect(innerDiv.style.borderBottomRightRadius).toEqual('0');
    expect(innerDiv.style.borderTopRightRadius).toEqual('0');
    expect(text.textContent).toEqual(`${i}%`);
  }

  progress.rerender(<ProgressBar progress={100} />);
  expect(innerDiv.style.width).toEqual('100%');
  expect(innerDiv.style.borderBottomRightRadius).toEqual('40px');
  expect(innerDiv.style.borderTopRightRadius).toEqual('40px');
  expect(text.textContent).toEqual('100%');
});