import { useQuery } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import MovieCard from '../component/MovieCard';
import { getPopular } from '../api';
import { Container } from '../styles/common';

import { containerVariants } from '../commonVariants';

const Popular = () => {
  const { data: data, isLoading: isLoading } = useQuery({
    queryKey: ['popularMovie'],
    queryFn: getPopular,
  });

  const { results } = data || {};
  return isLoading ? null : (
    <Container variants={containerVariants} initial='hidden' animate='visible'>
      {results.map((item) => {
        return (
          <MovieCard
            key={item.id}
            id={item.id}
            title={item.title}
            imgPath={item.poster_path}
            layoutId={item.id}
          />
        );
      })}

      <Outlet />
    </Container>
  );
};
export default Popular;
