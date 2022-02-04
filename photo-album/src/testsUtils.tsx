import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Photos from './components/Photos';
import { PhotosMock } from './mock';

export const renderThumbnailWithRouter = (element: React.ReactElement) =>
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={element} />
        <Route path="/photos/:id" element={<Photos photos={PhotosMock} />} />
      </Routes>
    </BrowserRouter>
  );
