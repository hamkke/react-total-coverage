import { Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getNowPlaying } from '../api';
import { Container } from '../styles/common';
import { containerVariants } from '../commonVariants';
import MovieCard from '../component/MovieCard';

const NowPlaying = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['nowPlayingMovie'],
    queryFn: getNowPlaying,
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
export default NowPlaying;
