import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Uploader from '../components/Uploader';

const mockProgress = {
  loaded: 200,
  total: 200,
};

jest.mock('aws-sdk', () => {
  const mockSend = { send: jest.fn() };
  const mockOnHttpUploadProgress = (e: string, cb: Function) => {
    cb(mockProgress);
    return mockSend;
  };
  const mockS3Bucket = {
    putObject: () => {
      return {
        on: mockOnHttpUploadProgress,
      };
    },
  };

  return {
    S3: jest.fn(() => mockS3Bucket),
    config: { update: jest.fn() },
  };
});
const mockFile = (fileSize: number) => {
  const file = new File([''], 'chess.mp4', { type: 'video/mp4' });
  Object.defineProperty(file, 'size', { value: fileSize });
  return file;
};
const mockFileUpload = async (file: File) => {
  const uploader = render(<Uploader />);
  const uploaderInput = await uploader.findByTestId('uploader-input');
  const uploaderButton = await uploader.findByTestId('uploader-button');

  await waitFor(() => {
    fireEvent.change(uploaderInput, {
      target: { files: [file] },
    });
  });

  await waitFor(() => {
    fireEvent.click(uploaderButton);
  });
  return uploader;
};

test('Displays error when no file is selected', async () => {
  const uploader = render(<Uploader />);
  const uploaderButton = await uploader.findByTestId('uploader-button');
  uploaderButton.click();
  const error = await uploader.findByTestId('error-text');
  expect(error.textContent).toEqual('Please select a file.');
});

test('Displays error on upload of file over 50MB', async () => {
  const size = 60000000;
  const uploader = await mockFileUpload(mockFile(size));
  const error = await uploader.findByTestId('error-text');
  expect(error.textContent).toEqual('File exceeds 50MB.');
});

test('Uploads a file', async () => {
  const size = 800000;
  const uploader = await mockFileUpload(mockFile(size));
  const progressBar = await uploader.findByTestId('progres-bar-text');
  expect(progressBar).toBeInTheDocument();
  expect(progressBar.textContent).toEqual('100%');
});
