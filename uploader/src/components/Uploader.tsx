import React, { useState } from 'react';
import AWS from 'aws-sdk';
import ProgressBar from './ProgressBar';
import Error from './Error';
import {
  ACCESS_KEY_ID,
  ACL,
  REGION,
  S3_BUCKET,
  SECRET_ACCESS_KEY,
  SIZE_LIMIT,
} from '../constants';

AWS.config.update({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const S3Bucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Uploader = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setSelectedFile(file);
    }
  };

  const uploadFile = (file: File | null) => {
    if (file) {
      const params = {
        ACL: ACL,
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };
      if (file.size > SIZE_LIMIT) {
        setMessage('File exceeds 50MB.');
        return;
      }
      setMessage('');

      S3Bucket.putObject(params)
        .on('httpUploadProgress', (e) => {
          setProgress(Math.round((e.loaded / e.total) * 100));
        })
        .send((err) => {
          if (err) setMessage(err.message);
        });
    } else {
      setMessage('Please select a file.');
    }
  };

  return (
    <div data-testid="uploader" className="upload-container">
      <div className="relative">
        <input
          data-testid="uploader-input"
          className="upload-input"
          type="file"
          accept="video/mp4"
          onChange={handleFileInput}
        />
        <button
          data-testid="uploader-button"
          className="upload-button"
          onClick={() => uploadFile(selectedFile)}
        >
          Upload
        </button>
      </div>
      {message && <Error message={message} />}
      {!message && progress > 0 && <ProgressBar progress={progress} />}
    </div>
  );
};

export default Uploader;
