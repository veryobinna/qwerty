import React from 'react';
import { screen } from '@testing-library/react';
import Thumbnail from '../components/Thumbnail';

import { PhotosMock } from '../mock';
import { renderThumbnailWithRouter } from '../testsUtils';

test('Displays thumbnail', async () => {
  const { id, thumbnailUrl } = PhotosMock[0];
  const element = <Thumbnail thumbnailUrl={thumbnailUrl} id={id} />;
  const thumbnail = renderThumbnailWithRouter(element);
  const link = await thumbnail.findByTestId('thumbnail-link');
  const image = await thumbnail.findByTestId('thumbnail-img');

  // @ts-ignore
  expect(link.href).toContain(`/photos/${id}`);
  // @ts-ignore
  expect(image.src).toContain(thumbnailUrl);
});

test('Displays a photo on click', async () => {
  const { id, thumbnailUrl, url } = PhotosMock[0];
  const element = <Thumbnail thumbnailUrl={thumbnailUrl} id={id} />;
  const thumbnail = renderThumbnailWithRouter(element);
  const link = await thumbnail.findByTestId('thumbnail-link');
  link.click();
  const photoImg = screen.getByTestId('photo-img');
  const photo = screen.getByTestId('photo');
  expect(photo).toBeInTheDocument();
  // @ts-ignore
  expect(photoImg.src).toContain(url);
});
