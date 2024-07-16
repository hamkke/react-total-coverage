import { Outlet } from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import { useQuery } from '@tanstack/react-query';

import { getPopular } from '../api';

/**
 export interface RootInterface {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
 */

const Popular = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['popluarMovie'],
    queryFn: getPopular,
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
export default Popular;
