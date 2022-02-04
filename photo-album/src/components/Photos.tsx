import React from 'react';
import { useParams } from 'react-router-dom';
import { PhotoType } from '../Types';
import { Control } from './Control';
import Message from './Message';
import Photo from './Photo';

interface Props {
  photos: PhotoType[];
}

const Photos: React.FC<Props> = ({ photos }) => {
  let nextId;
  let previousId;
  const params = useParams();
  const currentId = params.id;
  const currentIdx = currentId
    ? photos.findIndex((photo) => photo.id === +currentId)
    : -1;

  const photo = photos[currentIdx];

  if (currentIdx !== -1) {
    nextId = photos[currentIdx + 1]?.id;
    previousId = photos[currentIdx - 1]?.id;
  }

  return (
    <section className="flex items-center h-4/5screen justify-center ">
      <section className="relative">
        {photo ? (
          <Photo
            id={photo.id}
            albumId={photo.albumId}
            title={photo.title}
            url={photo.url}
          />
        ) : (
          <Message text="No photo" />
        )}
        <section>
          {previousId && (
            <Control
              location={`/photos/${previousId}`}
              styles="top-1/2 left-3.5"
              text="⬅"
            />
          )}
          {nextId && (
            <Control
              location={`/photos/${nextId}`}
              styles="top-1/2 right-3.5"
              text="➡"
            />
          )}
        </section>
      </section>
    </section>
  );
};
export default Photos;
