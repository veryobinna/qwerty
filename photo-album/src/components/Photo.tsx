import React from 'react';
import { PhotoType } from '../Types';

const Photo: React.FC<PhotoType> = (props) => {
  const { url } = props;
  return (
    <section data-testid="photo" className="p-3">
      <img
        data-testid="photo-img"
        className="rounded-lg shadow-lg object-cover object-center max-h-4/5screen"
        src={url}
        alt="placeholder"
      />
    </section>
  );
};
export default Photo;
