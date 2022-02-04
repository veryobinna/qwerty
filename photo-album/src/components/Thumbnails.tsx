import React from 'react';
import Thumbnail from './Thumbnail';
import { ThumbnailType } from '../Types';
import Message from './Message';

interface Props {
  thumbnails: ThumbnailType[];
}

const Thumbnails: React.FC<Props> = ({ thumbnails }) => {
  return !thumbnails.length ? (
    <Message text={'Photos not loaded'}/>
  ) : (
    <section className="grid gap-2 justify-items-center place-content-center grid-cols-2 lg:grid-cols-12 m-2">
      {thumbnails.map((thumbnail) => {
        return (
          <Thumbnail
            key={thumbnail.id}
            thumbnailUrl={thumbnail.thumbnailUrl}
            id={thumbnail.id}
          />
        );
      })}
    </section>
  );
};

export default Thumbnails;
