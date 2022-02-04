import React, { useState } from 'react';
import AWS from 'aws-sdk';
import ProgressBar from './components/ProgressBar';
import Error from './components/Error';

const S3_BUCKET = 'lagosmp4videogracccie';
const REGION = 'us-east-1';
const SIZE_LIMIT = 50000000;

AWS.config.update({
  accessKeyId: 'AKIAXGLZ7QNNHQ6TFXFL',
  secretAccessKey: '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',
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const Uploader = () => {
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fileObj = e.target.files ? e.target.files[0] : null;
    if (fileObj) {
      setSelectedFile(fileObj);
    }
  };

  const uploadFile = (file: File | null) => {
    if (file) {
      const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: file.name,
      };
      if (file.size > SIZE_LIMIT) {
        setMessage('File exceeds 50MB.');
        return;
      }
      setMessage('');

      myBucket
        .putObject(params)
        .on('httpUploadProgress', (evt) => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
        })
        .send((err) => {
          if (err) setMessage(err.message);
        });
    } else {
      setMessage('Please select a file.');
    }
  };

  return (
    <div className="upload-container">
      <div className="relative">
        <input
          className="upload-input"
          type="file"
          accept="video/mp4"
          onChange={handleFileInput}
        />
        <button
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
