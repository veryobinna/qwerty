import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Photos from '../components/Photos';
import { PhotosMock } from '../mock';

const renderPhotosWithRouter = (id: number) =>
  render(
    <MemoryRouter initialEntries={[`/photos/${id}`]}>
      <Routes>
        <Route path="/photos/:id" element={<Photos photos={PhotosMock} />} />
      </Routes>
    </MemoryRouter>
  );

test('Displays error message', async () => {
  const photos = render(<Photos photos={[]} />);
  const errorMessage = await photos.findByTestId('error-message');
  expect(errorMessage.textContent).toEqual('No photo');
});

test('Displays photo on url', async () => {
  const photoId = PhotosMock[0].id;
  const photos = renderPhotosWithRouter(photoId);

  const photo = await photos.findByTestId('photo-img');
  // @ts-ignore
  expect(photo.src).toContain(PhotosMock[0].url);
});

test('Displays next and previous controls', async () => {
  const previousPhotoId = PhotosMock[0].id;
  const photoId = PhotosMock[1].id;
  const nextPhotoId = PhotosMock[2].id;

  const photos = renderPhotosWithRouter(photoId);
  const controls = await photos.findAllByTestId('control');

  expect(controls.length).toEqual(2);
  // @ts-ignore
  expect(controls[0].href).toContain(`/photos/${previousPhotoId}`);
  // @ts-ignore
  expect(controls[1].href).toContain(`/photos/${nextPhotoId}`);
});

test('Displays next control only', async () => {
  const photoId = PhotosMock[0].id;
  const nextPhotoId = PhotosMock[1].id;

  const photos = renderPhotosWithRouter(photoId);

  const controls = await photos.findAllByTestId('control');
  expect(controls.length).toEqual(1);
  // @ts-ignore
  expect(controls[0].href).toContain(`/photos/${nextPhotoId}`);
});

test('Displays previous control only', async () => {
  const photoId = PhotosMock[3].id;
  const previousPhotoId = PhotosMock[2].id;

  const photos = renderPhotosWithRouter(photoId);

  const controls = await photos.findAllByTestId('control');
  expect(controls.length).toEqual(1);
  // @ts-ignore
  expect(controls[0].href).toContain(`/photos/${previousPhotoId}`);
});
