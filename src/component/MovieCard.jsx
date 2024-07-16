import { useQuery } from '@tanstack/react-query';

import { getPopular, makeImagePath } from '../api';
import { Link, useParams } from 'react-router-dom';

const MovieCard = ({ id, title, imgPath }) => {
  const qwe = makeImagePath(imgPath);
  return (
    <div>
      <Link to={`${id}`}>
        <div>
          <img src={qwe} alt={title} />
        </div>
        <h1>{title}</h1>
      </Link>
    </div>
  );
};
export default MovieCard;
