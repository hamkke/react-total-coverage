import { Outlet } from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import { useQuery } from '@tanstack/react-query';

import { getComingSoon } from '../api';

const ComingSoon = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['comingSoonmovie'],
    queryFn: getComingSoon,
  });

  const { results } = data || {};
  return (
    <div>
      {!isLoading &&
        results.map((item, idx) => {
          return (
            <MovieCard
              key={`${item.id}-${idx}`}
              id={item.id}
              title={item.title}
              imgPath={item.poster_path}
            />
          );
        })}

      <Outlet />
    </div>
  );
};
export default ComingSoon;
