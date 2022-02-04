import React from 'react';
import { Link } from 'react-router-dom';
import { ThumbnailType } from '../Types';

const Thumbnail: React.FC<ThumbnailType> = (props) => {
  const { thumbnailUrl, id } = props;

  return (
    <section
      data-testid="thumbnail"
      className={`
      hover:translate-y-0.5 transform hover:cursor-pointer shadow-sm 
      hover:border-solid hover:border-2 hover:border-slate-100
      `}
    >
      <Link data-testid="thumbnail-link" to={`/photos/${id}`}>
        <img
          data-testid="thumbnail-img"
          className="rounded-sm"
          src={thumbnailUrl}
          alt="thumbnail"
        />
      </Link>
    </section>
  );
};
export default Thumbnail;
