import React from 'react';
import { render } from '@testing-library/react';
import Thumbnails from '../components/Thumbnails';
import { PhotosMock } from '../mock';
import { renderThumbnailWithRouter } from '../testsUtils';

test('Displays error message', async () => {
  const photos = render(<Thumbnails thumbnails={[]} />);
  const errorMessage = await photos.findByTestId('error-message');
  expect(errorMessage.textContent).toEqual('Photos not loaded');
});

test('Displays thumbnails', async () => {
  const element = <Thumbnails thumbnails={PhotosMock} />;
  const thumbnails = await renderThumbnailWithRouter(element).findAllByTestId(
    'thumbnail'
  );
  expect(thumbnails.length).toEqual(PhotosMock.length);
});
